/**
 * 启动本地node 服务，替代 nginx
 * Author: yangxi
 */

const express = require('express')
const url = require('url')
const proxy = require('http-proxy-middleware')

const options = {
  target: 'http://127.0.0.1:7000', // target host
  changeOrigin: true, // needed for virtual hosted sites
  ws: true, // proxy websockets
  pathRewrite: {},
  router: {}
}

// mount `proxy` in web server
const app = express(options)
const appProxy = proxy(options)
app.use('/*', appProxy)

app.listen(80)

