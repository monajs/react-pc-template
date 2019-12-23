import axios from 'axios'
import qs from 'qs'
import cacheServer from '@/core/cache'
import { OUTTIME } from '@/constant/enum'
import { toast } from '@/core/util'
import { basename } from '@/config/index'

const instance = axios.create({
  timeout: OUTTIME,
  withCredentials: true
})

// 处理请求url
// 添加mock功能
const urlHandler = (url) => {
  const mockMap = window.mocks || {}
  const mockValue = mockMap[url]
  const mockBaseUrl = 'http://mock.mtmm.com/mock/273'
  if (mockValue) {
    const regex = /(http|https):\/\/([\w.]+\/?)\S*/
    return regex.test(mockValue) ? mockValue + url : mockBaseUrl + url
  }
  return url
}

// 请求响应处理
const resFilter = (res, config = {}) => {
  const { autoError = true } = config
  const { data = {} } = res
  const { success, errorMessage } = data
  if (!success) {
    autoError && toast.error(errorMessage || '网络错误')
    return Promise.reject(res)
  }
  return res
}

instance.interceptors.response.use(null, function resErrorHandler (error) {
  toast.error('网络错误')
  return Promise.reject(error)
})

// 统一处理请求响应
// 过滤response
const withFilter = (p, config) => p().then((res) => resFilter(res, config))

// 统一处理 headers
// 默认 'X-Requested-With': 'XMLHttpRequest'
const withHeaders = (config = {}) => {
  const { headers = {} } = config
  return { 'X-Requested-With': 'XMLHttpRequest', ...headers }
}

// axios 默认get方式
export const get = (url, params = {}, config = {}) => withFilter(
  () => instance.get(
    urlHandler(url),
    {
      params,
      ...config,
      headers: withHeaders(config)
    }),
  config
)

// axios 默认post方式
export const post = (url, params = {}, config = {}) => withFilter(
  () => instance.post(
    urlHandler(url),
    qs.stringify(params),
    {
      ...config,
      headers: withHeaders(config)
    }),
  config
)

// 提交formData
export const postFormData = (url, params = {}, config = {}) => withFilter(
  () => instance.post(
    url,
    params,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      transformRequest: [(data) => {
        return data
      }],
      ...config
    }),
  config
)

// 提交修改 request content-type 为'application/json'
export const postJson = (url, params = {}, config = {}) => withFilter(
  () => instance.post(
    url,
    params,
    {
      headers: {
        'Content-Type': 'application/json'
      },
      ...config
    }),
  config
)

// axios post方式 不走过滤器
export const postRes = (url, params = {}, config = {}) => instance.post(
  urlHandler(url),
  qs.stringify(params),
  url.includes('sso') ? config : {
    headers: { 'X-Requested-With': 'XMLHttpRequest' },
    ...config
  })

// 优先获取缓存中的数据
export const getCache = (url, data, expire) => {
  const name = `${url}___${qs.stringify(data || {})}`
  if (cacheServer.get(name)) {
    return Promise.resolve(cacheServer.getValue(name))
  }
  return get(url, data).then((res) => {
    cacheServer.update(name, res, expire)
    return res
  })
}

// 优先获取缓存中的数据
export const postCache = (url, data, expire) => {
  const name = `${url}___${qs.stringify(data || {})}`
  if (cacheServer.get(name)) {
    return Promise.resolve(cacheServer.getValue(name))
  }
  return post(url, data).then((res) => {
    cacheServer.update(name, res, expire)
    return res
  })
}
