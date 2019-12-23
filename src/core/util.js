import React from 'react'
import { message } from 'antd'
import { TOASTDURATION, TOASTCOUNT } from '@/constant/enum'
import moment from 'moment'

const singleReqList = {}

/**
 * 系统统一建议使用的提示工具
 */
message.config({
  duration: TOASTDURATION,
  maxCount: TOASTCOUNT
})
export const toast = message

/**
 * 合并同一时间短发出的同一个请求
 * @param key
 * @param request
 * @returns {*}
 */
export const singleRequest = (key, request) => {
  if (singleReqList[key]) {
    return singleReqList[key]
  }

  const promise = request()
  singleReqList[key] = promise

  promise.then(() => {
    delete(singleReqList[key])
  }).catch(() => {
    delete(singleReqList[key])
  })
  return promise
}

export const copyArray = (list) => {
  const res = []
  list.forEach((item) => {
    res.push(item)
  })
  return res
}

const getDisplayName = (WrappedComponent) => {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

// 给组件添加 displayName
export const HOC = (WrappedComponent) => {
  class HOC extends React.Component {
    render () {
      return <WrappedComponent {...this.props} />
    }
  }

  HOC.displayName = `HOC(${getDisplayName(WrappedComponent)})`
  return HOC
}

/**
 * 对象保护
 * Safely get a dot-notated path within a nested object
 * with ability to return a default if the full key path does not exist or the value is undefined
 * dlv(obj, 'a.b.c.f')
 */
export const dlv = (obj, key, def, p) => {
  p = 0
  key = key.split ? key.split('.') : key
  while (obj && p < key.length) obj = obj[key[p++]]
  return (obj === undefined || p < key.length) ? def : obj
}
