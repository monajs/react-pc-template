import React from 'react'
import { render } from 'react-dom'
import Router from '@/router/index'
import moment from 'moment'
import 'moment/locale/zh-cn'

moment.locale('zh-cn')
import '@/style/app.less'
import mockConfig from '@/mock/index.mock.json'

if (window.ENV === 'dev') {
  window.mocks = mockConfig
}

render(<Router />, document.getElementById('appWrapper'))
