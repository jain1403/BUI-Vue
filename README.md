# evn-analytics-app-vue
Vue.js project for the EVN Analytic Catalog

## Local Project Setup

### Connect to UAA

The application runs using the node dependency fsd-web-server.  This is an express web server that has UAA, Redis, and a Reverse Proxy already configured. Further documentation on the fsd-web-servercan be found at the following links.

* [UAA Integrated Web Server and Reverse Proxy](https://apphub-site-app.run.aws-usw02-pr.ice.predix.io/catalog/513)
* [FSD Web Server Repository](https://github.build.ge.com/COMBINE/fsd-web-server)

To enable UAA, create a file in the main app directory called server.config.json with the following contents.

``` 
{
  "APPLICATION_NAME": "evn-analytics-app",
  "PORT": 5000,
  "LOG_LEVEL": "debug",
  "UAA_CLIENT_CREDENTIAL": "<evn-dev-uaa-client-credential>",
  "UAA_ISSUER": "https://3dc4259c-1187-4620-ae13-47b34e129969.predix-uaa.run.aws-usw02-pr.ice.predix.io/oauth/token",
  "FSD_REVERSE_PROXY": {
    "/health": { "authorization": "none", "target": "localhost:5000/health" }
  }
}
```

### Build the Application

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:5000
gulp build:dev

# build for production with minification
gulp build:prod

# build for production and view the bundle analyzer report
npm run build --report
```

### Testing

``` bash
# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```
