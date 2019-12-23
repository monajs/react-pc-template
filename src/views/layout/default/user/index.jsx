import React, { Component } from 'react'
import { Menu, Icon, Dropdown } from 'antd'
import { Link } from 'react-router-dom'
import './index.less'

class UserComponent extends Component {
  state = {
    userInfo: ''
  }

  loginOutOpt = () => {
    console.log('logout')
  }

  render () {
    const menu = (<Menu className='pull-right'>
      <Menu.Item key='0' className='p-l-30 p-r-30'>
        <Link to='/accountManage'>账号管理</Link>
      </Menu.Item>
      <Menu.Item key='1' className='p-l-30 p-r-30'>
        <a onClick={this.loginOutOpt}>退出</a>
      </Menu.Item>
    </Menu>)

    const { userInfo } = this.state

    return (
      <div className='module-user h-full flex-center-y'>
        <Dropdown overlay={menu} trigger={['click']} className='c-po' placement='bottomLeft'>
          <div className='user-name flex-center-y'>
            <span className='m-l-20'>{userInfo}</span>
            <Icon type='down' className='icon-down m-l-10' />
          </div>
        </Dropdown>
        <Link className='help-link m-l-20' to='/help'>帮助中心</Link>
      </div>
    )
  }
}

export default UserComponent
