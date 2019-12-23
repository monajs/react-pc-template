/**
 * cache service
 * Author: yangxi
 */

import BaseServer from '@/base/BaseServer'

class CacheServer extends BaseServer {
  cacheMap = {}

  //页面缓存
  update (name, value, expire) {
    const cached = this.get(name)
    const cache = {
      value: value
    }
    //如果设置持久缓存，并且设置过生存时间，清空
    if ((!expire || expire < 0) && cached && cached.timeout) {
      clearTimeout(cached.timeout)
    }
    if (expire > 0) {
      if (cached && cached.timeout) {
        cache.timeout = cached.timeout
      } else {
        cache.timeout = setTimeout(() => {
          this.delete(name)
        }, expire * 1000 + Date.now())
      }
    }
    this.cacheMap[name] = cache
  }

  get (name) {
    return this.cacheMap[name]
  }

  getValue (name) {
    const cache = this.get(name) || {}
    return cache.value
  }

  delete (name) {
    clearTimeout(this.cacheMap[name].timeout)
    delete(this.cacheMap[name])
  }

  clean () {
    Object.keys(this.cacheMap).forEach((i) => {
      this.delete(i)
    })
  }

  addLocalStorage (k, v) {
    if (typeof(v) === 'object') {
      localStorage.setItem(k, JSON.stringify[v])
    } else {
      localStorage.setItem(k, v)
    }
  }

  getLocalStorage (k) {
    const _v = localStorage.getItem(k)
    if (!_v) {
      return
    }
    let v = _v
    try {
      v = JSON.parse(_v)
      return v
    } catch (e) {
      return _v
    }
  }

}

export default new CacheServer
