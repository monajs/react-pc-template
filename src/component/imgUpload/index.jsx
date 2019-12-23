/**
 * 上传图片
 * Author: yangxi
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { upload } from '@/service/upload.js'
import { toast } from '@/core/util'
import { Icon } from 'antd'
import './index.less'

class ImgUpload extends Component {
  static defaultProps = {
    maxFileSize: 10
  }
  formRef = React.createRef()
  inputRef = React.createRef()

  uploadFile = () => {
    if (this.uploading) return
    const { maxFileSize, onUpload } = this.props
    const input = this.inputRef.current

    if (input.files && input.files[0]) {
      if (input.files[0].size > maxFileSize * 1024 * 1024) {
        toast.error(`文件大小需小于${maxFileSize}M'`)
        return false
      }
    } else if (!input.value) {
      return false
    }
    console.log(this.formRef.current)
    const formData = new FormData()
    console.log(this.inputRef.current.result)
    formData.append('file', input.files[0])
    this.uploading = true
    this.setState({})
    upload(formData).then(({ fullFileId = '' }) => {
      onUpload && fullFileId && onUpload(fullFileId)
    }).catch((e) => {
      console.log(e)
    }).finally(() => {
      this.uploading = false
      this.setState({})
    })
  }

  render () {
    const { children, className, hide } = this.props
    if (hide) {
      return null
    }
    return (
      <div ref={this.formRef}
           name='imgUpload'
           className={['comp-img-upload', ' c-po pos-r', className]}
          >
        <If condition={children}>
          {children}
        </If>
        <If condition={!children}>
          <div className='default-container c-po flex-center flex-direction-col'>
            <Icon className='icon' type={this.uploading ? 'loading' : 'plus'} />
            <div className='text m-t-5'>上传</div>
          </div>
        </If>
        <input
          className='input c-po pos-a pos-a-full'
          name='file'
          accept='image/png, image/jpeg'
          type='file'
          ref={this.inputRef}
          onChange={this.uploadFile} />
      </div>
    )
  }
}

ImgUpload.propTypes = {
  maxFileSize: PropTypes.number,
  hide: PropTypes.bool,
  className: PropTypes.string,
  onUpload: PropTypes.func,
  children: PropTypes.node
}

export default ImgUpload
