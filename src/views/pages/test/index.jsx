import React, { useState } from 'react'
import { Button, Row, Col } from 'antd'
import Form from '@monajs/react-form'
import { Input, Select, FormItem } from '@monajs/antd-form'

const { Option } = Select
const { Proxy } = Form
const { TextArea } = Input

const Test = () => {
  const [input, setInput] = useState('sss')
  const formRef = React.createRef()

  const getForm = () => {
    const formData = formRef.current.getFormData()
    const verifyInfo = formRef.current.getVerifyInfo()
    console.log(formData)
    console.log(verifyInfo)
  }

  const onChange = (e) => {
    setInput(e.target.value)
  }

  const reset = () => {
    formRef.current.reset()
  }

  return (
    <Form ref={formRef}>
      <Row>
        <Col span={8} className='p-15'>
          <FormItem bn='name' label='输入框' required>
            <TextArea bn='name' defaultValue={'ss'} onChange={onChange} verify verifyMsg='请检查事' />
          </FormItem>
        </Col>
        <Col span={8} className='p-15'>
          <FormItem bn='id' label='下拉框' required>
            <Input bn='id' verify={(val) => val === 'aaa'} verifyMsg={(verify) => verify.val} />
          </FormItem>
        </Col>
        <Col span={8} className='p-15'>
          <FormItem bn='scholl' label='下拉框' required>
            <Proxy
              style={{ width: 300 }}
              to={Select}
              bn='scholl'
              placeholder='请输入'>
              <Option key={'1'} value='1'>1</Option>
              <Option key={'2'} value='2'>2</Option>
            </Proxy>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <If condition={input === 'ss'}>
          <Col span={8} className='p-15'>
            <FormItem bn='age'>
              <Input bn='age' verify={(val) => val === 'bbb'} verifyMsg='请检查事input实上' />
            </FormItem>
          </Col>
        </If>
        <Col span={8} className='p-15'>
          <FormItem bn='other' label='下拉框' desc='请选择' required>
            <Proxy
              style={{ width: 300 }}
              to={Select}
              bn='other'
              verify={(val) => val === '3'}
              verifyMsg={(verify) => verify.val}
              placeholder='请输入other'>
              <Option key={'3'} value='3'>3</Option>
              <Option key={'4'} value='4'>4</Option>
            </Proxy>
          </FormItem>
        </Col>
      </Row>
      <Button onClick={getForm}>提交</Button>
      <Button onClick={reset}>重置</Button>
    </Form>
  )
}

export default Test
