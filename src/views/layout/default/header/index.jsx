import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'antd'
import menuCtrl from '@/ctrl/menu'
import User from '../user'
import './index.less'

const Header = (props) => {
  const { className } = props
  const [collapsed, setCollapsed] = useState(menuCtrl.collapsed)

  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
    menuCtrl.emit(menuCtrl.TOGGLE_COLLAPSED, !collapsed)
  }

  return (
    <header className={[className, 'page-header', 'd-f', 'pos-r']}>
      <div className='menu-ctrl h-full flex-center c-po' onClick={toggleCollapsed}>
        <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'} />
      </div>
      <User />
    </header>
  )
}

Header.propTypes = {
  className: PropTypes.string
}

export default Header
