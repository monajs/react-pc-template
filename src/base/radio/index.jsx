/**
 * Radio
 * author: yangxi
 */

import Form from '@monajs/react-form'
import { Radio } from 'antd'

const { withFormContext } = Form

const RadioGroup = Radio.Group

const RG = withFormContext(RadioGroup, (val) => val.target.value)

Radio.Group = RG

export default Radio
