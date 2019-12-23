/**
 * Checkbox
 * author: yangxi
 */

import Form from '@monajs/react-form'
import { Checkbox } from 'antd'

const { withFormContext } = Form

const CheckboxGroup = Checkbox.Group

const CbG = withFormContext(CheckboxGroup)

Checkbox.Group = CbG

export default Checkbox
