/**
 * 动态生成配置文件
 * Author: yangxi
 */

const glob = require('glob')
const fs = require('fs-extra')
const path = require('path')
const { saveConfig } = require('../core/util')
const { log } = require('../core/util')
const NODE_ENV = process.env.NODE_ENV

const copy = () => {
  glob.sync('./config/*.json', {
    matchBase: true
  }).forEach(function (entry) {
    const entryConfPath = entry.replace('./config', '../../config')
    const outputConfPath = entry.replace('./config', '../../src/config')
    let config = require(path.resolve(__dirname, entryConfPath))
    config = Object.assign({}, config['common'], config[NODE_ENV])
    saveConfig(config, path.resolve(__dirname, outputConfPath))
  })
}

fs.remove(path.resolve(__dirname, '../../src/config'), err => {
  if (err) {
    log.error(err)
    throw new Error(err)
  }
  fs.ensureDir(path.resolve(__dirname, '../../src/config'), err => {
    if (err) {
      log.error(err)
      throw new Error(err)
    }
    log.success('Update config success.\n')
    copy()
  })
})
