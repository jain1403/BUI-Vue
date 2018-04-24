require('./check-versions')()

var config = require('../config')

var opn = require('opn')
var path = require('path')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = process.env.NODE_ENV === 'testing'
  ? require('./webpack.prod.conf')
  : require('./webpack.dev.conf')
const { FsdServer, ExpressServer, URL, start } = require('fsd-web-server')

var predixAuth = require('./predix.auth.js')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
    log: () => {}
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

var _resolve
var readyPromise = new Promise(resolve => {
    _resolve = resolve
})

FsdServer.on('ready', () => {
  // handle fallback for HTML5 history API
  ExpressServer.use(require('connect-history-api-fallback')())

  // serve webpack bundle output
  ExpressServer.use(devMiddleware)

  // enable hot-reload and state-preserving
  // compilation error display
  ExpressServer.use(hotMiddleware)

  // serve pure static assets
  var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
  ExpressServer.use(staticPath, ExpressServer.static('./static'))

  start()

  devMiddleware.waitUntilValid(() => {
    // when env is testing, don't need open it
    if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
      opn(URL)
    }
    _resolve()
  })

})

module.exports = {
    ready: readyPromise,
    close: ExpressServer.close
}
