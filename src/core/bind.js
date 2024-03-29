/**
 * Two-way Data Binding
 * Author: yangxi
 */

class Bind {
  //输入框数据改变  需要bind(this,[name,ctx])
  //参数可以是字符串 name 或者数组 [name,ctx]
  //ctx 是要修改的对象
  valueChange (info, e) {
    if (info instanceof Array) {
      if (info.length > 1) {
        info[1][info[0]] = e.target.value
      } else {
        this.state[info[0]] = e.target.value
      }
    } else {
      this.state[info] = e.target.value
    }
    this.setState(this.state)
  }

  //数据改变  需要bind(this,[name,ctx])
  //参数可以是字符串 name 或者数组 [name,ctx]
  //ctx 是要修改的对象
  dataChange (info, val) {
    if (info instanceof Array) {
      if (info.length > 1) {
        info[1][info[0]] = val
      } else {
        this.state[info[0]] = val
      }
    } else {
      this.state[info] = val
    }
    this.setState(this.state)
  }

  checkChange (info, e) {
    if (info instanceof Array) {
      if (info.length > 1) {
        info[1][info[0]] = e.target.checked
      } else {
        this.state[info[0]] = e.target.checked
      }
    } else {
      this.state[info] = e.target.checked
    }
    this.setState(this.state)
  }

  //时间改变  需要bind(this,[name,ctx])
  //参数可以是字符串 name 或者数组 [name,ctx]
  //ctx 是要修改的对象
  timeChange (info, date) {
    const _date = date ? date.getTime() : undefined
    if (info instanceof Array) {
      if (info.length > 1) {
        info[1][info[0]] = _date
      } else {
        this.state[info[0]] = _date
      }
    } else {
      this.state[info] = _date
    }
    this.setState(this.state)
  }

  toggleBool (info) {
    if (info instanceof Array) {
      if (info.length > 1) {
        info[1][info[0]] = !info[1][info[0]]
      } else {
        this.state[info[0]] = !this.state[info[0]]
      }
    } else {
      this.state[info] = !this.state[info]
    }
    this.setState(this.state)
  }
}

export default new Bind
