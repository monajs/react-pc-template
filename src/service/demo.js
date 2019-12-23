import { post } from '@/core/ajax'

export const gweetInit = () => {
  return post('/business/registerSmsSend', {
    userName: 18758271730,
    password: 'Yx12fdsfsdsdfs32+',
    phone: 15957153937,
    email: '599321378@qq.com',
    geetest_challenge: '7a0ef19c0fe8ce4d9f2a6daebdecd4a29o',
    geetest_validate: 'a0b4000f327e95e8267ad1abd59e3a53',
    geetest_seccode: 'a0b4000f327e95e8267ad1abd59e3a53|jordan'
  }).then((res) => {
    console.log(res)
  })
}
