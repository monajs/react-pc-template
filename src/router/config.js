import React from 'react'
import { Redirect } from 'react-router-dom'
import Home from '@/views/pages/home'
import Test from '@/views/pages/test'
import Exception from '@/views/pages/exception/index'

const Exception403 = () => <Exception type='403' />
const Exception404 = () => <Exception type='404' />
const Exception500 = () => <Exception type='500' />
const NoMatch404 = () => <Redirect to='/exception/404' />

export default {
  routes: [
    {
      path: '/',
      exact: true,
      component: Home,
      meta: {
        subTitle: '首页',
        title: '首页'
      }
    },
    {
      path: '/test',
      exact: true,
      component: Test,
      meta: {
        subTitle: 'test',
        subTitleIcon: 'mail',
        title: 'test'
      }
    },
    {
      path: '/home',
      exact: true,
      component: Home
    },
    {
      path: '/exception/403',
      exact: true,
      component: Exception403
    },
    {
      path: '/exception/404',
      exact: true,
      component: Exception404
    },
    {
      path: '/exception/500',
      exact: true,
      component: Exception500
    },
    {
      path: '/*',
      render: NoMatch404
    }
  ]
}
