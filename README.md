## ifdoor

Remotely opens door from Raspberry PI through relay.

### Run
To start server run following on PI.
```bash
$ npm install
$ export IFDOOR_API_KEY="secret-api-key"
$ export IFDOOR_PORT=8980
$ npm start
```

### API
[POST] **/api/frontdoor**  
Opens door.

### Authentication
Endpoints requires api-key. Send api key defined with `API_KEY` environment variable with `x-apikey` header.

### Example 
curl -H x-apikey="secret-api-key" http://localhost:8980/api/frontdoor

### Author
Ismail Demirbilek