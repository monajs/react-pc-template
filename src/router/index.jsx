import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import DefaultLayout from '@/views/layout/default'
import indexConfig from '@/config/index'
import { hot } from 'react-hot-loader'
import RouteMap from './routeMap'

const RouterEntry = () => {
  return (
    <Router basename={indexConfig.basename}>
      <DefaultLayout>
        <RouteMap />
      </DefaultLayout>
    </Router>
  )
}

export default hot(module)(RouterEntry)
