import React, { useState } from 'react'
import { Button } from 'antd'
import { Link } from 'react-router-dom'

import './index.less'

const Home = () => {
  const [show, setShow] = useState(false)

  return (
    <div className='test'>
      <If condition={show}>
        <div>Home - afjd1</div>
        <img src='./aaa.png' alt='' />
      </If>
      <Link to='/test'>Tacos</Link>
      <img src='./aaa.png' alt='' />
      <Button className='button' type='primary' onClick={() => setShow(true)}>Primary</Button>
      <hr />

    </div>
  )
}

export default Home
