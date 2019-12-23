import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import './index.less'

const SubTitle = (props) => {
  const { subTitle = '', path = [] } = props
  const [pathTitle, setPathTitle] = useState([])

  useEffect(() => {
    const titles = path.map((item) => item.name)
    if (titles.length > 0 && titles[titles.length - 1] === subTitle) {
      titles.pop()
    }
    setPathTitle(titles.join(' / '))
  }, [subTitle, path])
  return (
    <div className='page-sub-title w-full flex-center-y'>
      <span>{pathTitle}</span>
      <If condition={pathTitle && subTitle}>
        <span>&nbsp;/&nbsp;</span>
      </If>
      <b>{subTitle}</b>
    </div>
  )
}

SubTitle.propTypes = {
  subTitle: PropTypes.string,
  path: PropTypes.array
}

export default SubTitle
