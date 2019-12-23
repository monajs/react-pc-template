/**
 * menu service
 * Author: yangxi
 */

import Events from '@monajs/events'
import { getMenus } from '@/service/menus.js'
import routerCtrl from './router'

class MenuCtrl extends Events {
  TOGGLE_COLLAPSED = 'toggleCollapsed'
  INITED = 'inited'
  collapsed = false
  menus = []
  menuStark = []

  getMenus () {
    if (this.menus.length > 0) {
      return Promise.resolve(this.menus)
    }
    return getMenus().then((menus = []) => {
      this.menus = menus
      this.initMenus()

      //下发菜单初始化完成的消息
      this.emit(this.INITED)
      return this.menus
    })
  }

  // 格式化生成一个带 key 的项目
  // 导出一个拍平的菜单项目
  initMenus () {
    const stark = []
    let key = 1
    this.menus.forEach((v) => {
      stark.push(v)
    })
    while (stark.length > 0) {
      const item = stark.shift()
      item.key = String(key++)
      this.menuStark.push(item)
      if (item.children && item.children.length > 0) {
        item.children.forEach((child) => {
          child.parent = item
          stark.push(child)
        })
      }
    }
  }

  openKeys = []

  // 递归获取父节点key
  getparentKeys (item = {}) {
    if (item.parent) {
      this.openKeys.push(item.parent.key)
      this.getparentKeys(item.parent)
    }
  }

  // 获取匹配到当前pathname的菜单信息
  getCurrentMenuInfo (location = {}) {
    const { pathname = '' } = location
    // 用group 标记当前在哪个菜单分组下
    const { group } = routerCtrl.getCurrentRouteInfo(location)
    const tag = group || pathname
    this.openKeys = []
    const selectedKeys = []
    let currentMenu = null
    for (let i = 0; i < this.menuStark.length; i++) {
      const item = this.menuStark[i]
      if (item.url === tag) {
        selectedKeys.push(item.key)
        currentMenu = item
        this.getparentKeys(item)
        break
      }
    }
    return {
      currentMenu,
      selectedKeys,
      openKeys: [...new Set(this.openKeys)]
    }
  }

  // 通过pathname获取菜单
  getMenuByPathname (pathname) {
    if (!pathname) return null
    const list = this.menuStark.filter((item) => item.url === pathname)
    return list.length > 0 ? list[0] : null
  }

  // 获取当前菜单下的菜单路径
  getCurrentPath (location = {}) {
    const { pathname = '' } = location
    let currentMenu = this.getMenuByPathname(pathname)
    const path = []
    const subPath = () => {
      while (currentMenu) {
        path.unshift(currentMenu)
        currentMenu = currentMenu.parent
        subPath()
      }
    }
    subPath()
    return path
  }
}

export default new MenuCtrl
