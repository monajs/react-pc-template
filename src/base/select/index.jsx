/**
 * Select
 * author: yangxi
 */

import Form from '@monajs/react-form'
import { Select } from 'antd'

const { withFormContext } = Form
const { Option } = Select

const S = withFormContext(Select)

S.Option = Option
export default S


