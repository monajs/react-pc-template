import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { upload } from '@/service/upload.js'
import { toast } from '@/core/util'
import { Icon, Button } from 'antd'
import './index.less'

class FileUpload extends Component {
  static defaultProps = {
    maxFileSize: 1
  }

  formRef = React.createRef()
  inputRef = React.createRef()

  uploadFile = () => {
    if (this.uploading) return
    const { maxFileSize, local, onChange } = this.props
    const input = this.inputRef.current
    if (!input.files || !input.files[0]) {
      toast.error('上传文件异常')
      return false
    }

    const fileInfo = input.files[0]

    if (fileInfo && fileInfo.size > maxFileSize * 1024 * 1024) {
      toast.error(`文件大小需小于${maxFileSize}M`)
      return false
    }

    const formData = new FormData()
    formData.append('file', fileInfo)

    if (local) {
      onChange && onChange({ formData, fileInfo })
    } else {
      this.upload(formData)
    }
  }

  // 上传cdn
  upload = (formData) => {
    this.uploading = true
    this.setState({})
    const { onChange } = this.props
    upload(formData).then(({ fullFileId = '' }) => {
      onChange && fullFileId && onChange(fullFileId)
    }).finally(() => {
      this.uploading = false
      this.setState({})
    })
  }

  render () {
    const { children, className, text } = this.props
    return (
      <div ref={this.formRef}
        name='imgUpload'
        className={['comp-img-upload', ' c-po pos-r', className]}
      >
        <If condition={children}>
          {children}
        </If>
        <If condition={!children}>
          <Button type='primary'>
            <Icon type='upload' /> {text || '上传'}
          </Button>
        </If>
        <input
          className='input c-po pos-a pos-a-full'
          name='file'
          type='file'
          accept='true'
          ref={this.inputRef}
          onChange={this.uploadFile} />
      </div>
    )
  }
}

FileUpload.propTypes = {
  text: PropTypes.string,
  local: PropTypes.bool,
  maxFileSize: PropTypes.number,
  className: PropTypes.string,
  onChange: PropTypes.func,
  children: PropTypes.node
}

export default FileUpload
