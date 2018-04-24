const cfenv   = require('cfenv')

/* Get Cloud Foundry app environment */
const appEnv = cfenv.getAppEnv()

/* Pass VCAP env vars to FsdServer */
process.env.UAA_ISSUER = appEnv.getService('evn-dev-uaa').credentials.issuerId
process.env.UAA_REDIRECT_URI = '/callback'
process.env.APPLICATION_NAME = appEnv.name
process.env.APPLICATION_URL = appEnv.url

const { FsdServer, ExpressServer, start } = require('fsd-web-server');

FsdServer.on('ready', () => {
  /*
    You may need to update Express to be aware of where your static files are stored
    By default it looks for HTML files in the www/ directory of the current working directory.
  */
  ExpressServer.use('/static', ExpressServer.static('www/static'));
  ExpressServer.use('/', (req, res) => {
    res.render('index', { title: 'ejs' });
  });

  // When you are finished customing the server to run for you, simply call start
  start();
});
