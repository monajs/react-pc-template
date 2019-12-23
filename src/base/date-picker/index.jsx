/**
 * DatePicker
 * author: yangxi
 */

import Form from '@monajs/react-form'

import { DatePicker } from 'antd'

const { withFormContext } = Form

const { MonthPicker, RangePicker, WeekPicker } = DatePicker

const D = withFormContext(DatePicker)
const M = withFormContext(MonthPicker)
const R = withFormContext(RangePicker)
const W = withFormContext(WeekPicker)

D.MonthPicker = M
D.RangePicker = R
D.WeekPicker = W

export default D
