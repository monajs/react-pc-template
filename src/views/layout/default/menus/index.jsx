/**
 * 支持无限级菜单
 * 建议控制在三级以内
 * Author: yangxi
 */

import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { Menu, Icon } from 'antd'
import menuCtrl from '@/ctrl/menu'
import './index.less'

// 子菜单
const subMenus = (menus) => {
  return (
    <For each='menu' of={menus}>
      <If condition={menu.children && menu.children.length > 0}>
        <Menu.SubMenu
          key={menu.key}
          title={
            <span>
                <If condition={menu.icon}>
                  <Icon type={menu.icon} />
                </If>
                <span>{menu.name}</span>
              </span>
          }>
          {subMenus(menu.children)}
        </Menu.SubMenu>
      </If>
      <If condition={!menu.children || menu.children.length === 0}>
        <Menu.Item key={menu.key}>
          <Link to={menu.url}>
            <If condition={menu.icon}>
              <Icon type={menu.icon} />
            </If>
            <span>{menu.name}</span>
          </Link>
        </Menu.Item>
      </If>
    </For>
  )
}

const Menus = (props) => {
  const { location = {} } = props
  const [menus, setMenus] = useState([])
  const [defaultSelectedKeys, setDefaultSelectedKeys] = useState([])
  const [defaultOpenKeys, setDefaultOpenKeys] = useState([])
  const [inited, setInited] = useState(false)

  /* eslint-disable react-hooks/exhaustive-deps */
  // 因为 location 属性是 react-router 默认注入的，会随着路由改变而改变，不能设置为 hook 的依赖项
  useEffect(() => {
    menuCtrl.getMenus().then((menus) => {
      setMenus(menus)
      const currentMenuInfo = menuCtrl.getCurrentMenuInfo(location)
      const { selectedKeys = [], openKeys = [] } = currentMenuInfo || {}
      setDefaultSelectedKeys(selectedKeys)
      setDefaultOpenKeys(openKeys)
      setInited(true)
    })
  }, [])
  /* eslint-disable react-hooks/exhaustive-deps */

  return (
    <div className='page-menus w-full pos-r'>
      <If condition={inited}>
        <Menu
          className='menu-group'
          defaultSelectedKeys={defaultSelectedKeys}
          defaultOpenKeys={defaultOpenKeys}
          mode='inline'
          theme='dark'
        >
          {subMenus(menus)}
        </Menu>
      </If>
    </div>
  )
}

Menus.propTypes = {
  location: PropTypes.object
}

export default withRouter(Menus)
