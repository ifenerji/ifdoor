var gpio = require('rpi-gpio')
var express = require('express')
var gpiop = gpio.promise

var DOOR_PIN = 11
var PORT = 8980
var API_KEY = process.env.API_KEY

var app = express()
// chain api key middleware
app.use(checkApiKey)

// front door api
app.post('/api/frontdoor', (req, res) => {
  openDoor()
    .then(r => {
      res.statusCode = 200
      res.send({ message: 'Door opened.' })
    })
    .catch(e => {
      res.statusCode = 500
      res.send({ message: 'Something went wrong while opening door.' })
    })
})

// start app
app.listen(PORT)

function openDoor () {
  return gpiop.setup(DOOR_PIN, gpio.DIR_OUT)
    .then(() => {
      gpiop.write(DOOR_PIN, true)
      sleep(1000)
      gpiop.write(DOOR_PIN, false)
        .then(() => gpiop.destroy())
    })
}


function checkApiKey (req, res, next) {
  if (req.headers['x-apikey'] !== API_KEY) {
    res.statusCode = 403
    return res.send({
      error: 'Api key is required to acceess content.'
    })
  }
  next()
}

function sleep(delay) {
  var start = new Date().getTime();
  while (new Date().getTime() < start + delay);
}
