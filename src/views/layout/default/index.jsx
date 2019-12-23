import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { Layout } from 'antd'
import { TITLE, LOGO } from '@/constant/enum'
import routeCtrl from '@/ctrl/router'
import menuCtrl from '@/ctrl/menu'
import Header from './header'
import SubTitle from './subTitle'
import Menus from './menus'
import './index.less'

const { Sider, Content } = Layout

const DefaultLayout = (props) => {
  const { children, location } = props
  const [collapsed, setCollapsed] = useState(menuCtrl.collapsed)
  const [metaInfo, setMetaInfo] = useState({})
  const [path, setPath] = useState([])
  const [routeInfo, setRouteInfo] = useState(routeCtrl.getCurrentRouteInfo(location))

  useEffect(() => {
    const toggleCollapsed = (status) => {
      setCollapsed(status)
    }

    // 监听菜单缩小的指令
    menuCtrl.on(menuCtrl.TOGGLE_COLLAPSED, toggleCollapsed)
    return (() => {
      menuCtrl.off(menuCtrl.TOGGLE_COLLAPSED, toggleCollapsed)
    })
  }, [])

  useEffect(() => {
    const routeInfo = routeCtrl.getCurrentRouteInfo(location)
    setRouteInfo(routeInfo)
    const { meta = {} } = routeInfo
    setMetaInfo(meta)
    document.title = meta.title || TITLE

    const getActivePath = () => {
      setPath(menuCtrl.getCurrentPath(location) || [])
    }
    getActivePath()
    // 监听菜单初始化完成的指令
    menuCtrl.on(menuCtrl.INITED, getActivePath)
    return (() => {
      menuCtrl.off(menuCtrl.INITED, getActivePath)
    })
  }, [location])

  if (routeInfo.hideLayout) {
    return children
  }

  return (
    <Layout className='page-wrap'>
      <Sider width={250} collapsed={collapsed} className='page-wrap-aside'>
        <div className='module-logo'>
          <div className='inner h-full flex-center-y p-l-30'>
            <img className='m-r-15' src={LOGO} alt='' />
            <If condition={!collapsed}>
              {TITLE}
            </If>
          </div>
        </div>
        <Menus />
      </Sider>
      <Layout>
        <Header className='page-wrap-header' />
        <If condition={path.length > 0 || metaInfo.subTitle}>
          <SubTitle path={path} subTitle={metaInfo.subTitle} />
        </If>
        <Content className='p-20'>
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}

DefaultLayout.propTypes = {
  location: PropTypes.object,
  children: PropTypes.node
}

export default withRouter(DefaultLayout)
