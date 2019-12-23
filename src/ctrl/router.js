/**
 * 获取当前页面的信息
 * 因为route配置不允许携带业务配置参数
 * Author: yangxi
 */

import Events from '@monajs/events'
import { matchPath } from 'react-router'
import config from '@/router/config'

const { routes = [] } = config

class RouterCtrl extends Events {
  constructor () {
    super()
    this.initRouteInfo()
  }

  initRouteInfo () {
    routes.forEach((item = {}) => {
      this.routeInfo[item.path] = item
    })
  }

  routeInfo = {}

  getCurrentRouteInfo (location = {}) {
    const { pathname = '' } = location
    if (Object.keys(this.routeInfo).length === 0) {
      this.initRouteInfo()
    }
    let res = {}
    for (const i in this.routeInfo) {
      const item = this.routeInfo[i]
      const matchInfo = matchPath(pathname, {
        path: item.path,
        exact: item.exact
      }) || {}
      if (matchInfo && matchInfo.isExact) {
        res = {
          ...item,
          ...matchInfo
        }
        break
      }
    }
    return res
  }
}

export default new RouterCtrl
