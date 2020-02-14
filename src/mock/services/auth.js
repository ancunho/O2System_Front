import Mock from 'mockjs2'
import { builder, getBody } from '../util'

const username = ['admin', 'super']
// 强硬要求相同密码
const password = ['demo'] // admin, demo

const login = (options) => {
  const body = getBody(options)
  console.log('mock: body', body)
  if (!username.includes(body.username) || !password.includes(body.password)) {
    return builder({ isLogin: true }, '账户或密码错误', 401)
  }

  return builder({
    'username': 'admin',
    'token': '4291d7da9005377ec9aec4a71ea837f'
  }, '', 200, { 'Custom-Header': Mock.mock('@guid') })
}

const logout = () => {
  return builder({}, '[测试接口] 注销成功')
}

Mock.mock(/\/auth\/login/, 'post', login)
Mock.mock(/\/auth\/logout/, 'post', logout)
