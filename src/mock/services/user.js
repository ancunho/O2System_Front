import Mock from 'mockjs2'
import { builder, getBodyByQs } from '../util'

const username = ['admin', 'super']
const password = ['admin']

const login = (options) => {
  const body = getBodyByQs(options)
  if (!username.includes(body.username) || !password.includes(body.password)) {
    return builder({}, '账户或密码错误', 1)
  }

  return builder({
    'token': '4291d7da9005377ec9aec4a71ea837f'
  }, '成功', 0)
}

const logout = () => {
  return builder({}, '[测试接口] 注销成功')
}

const info = (options) => {
  const userInfo = {
    'username': 'admin',
    'password': '',
    'realname': '某某',
    'imagePhoto': '/avatar.jpg',
    'empno': '123456789',
    'phone': '17712341234',
    'email': 'admin@admin.com',
    'department': 1002,
    'question': 2003,
    'address': ['31', '3101', '310113'],
    'answer': '问题',
    'wechat': 'wechatId',
    'role': 'ROLE_ADMIN'
  }
  return builder(userInfo)
}

const create = () => {
  return builder({}, '注册成功')
}

const checkUsername = () => {
  return builder({}, '可以使用')
}

const checkEmail = () => {
  return builder({}, '可以使用')
}

const forgetGetQuestion = () => {
  return builder('你的偶像是？')
}

const forgetCheckAnswer = () => {
  return builder('token-123456')
}

const forgetResetPassword = () => {
  return builder({}, '修改成功')
}

const userInfoUpdate = () => {
  return builder({}, '修改成功')
}

const updatePassword = () => {
  return builder({}, '修改成功')
}

Mock.mock(/\/user\/info/, 'get', info)
Mock.mock(/\/user\/login/, 'post', login)
Mock.mock(/\/user\/logout/, 'post', logout)
Mock.mock(/\/user\/create/, 'post', create)
Mock.mock(/\/user\/check_username/, 'post', checkUsername)
Mock.mock(/\/user\/check_email/, 'post', checkEmail)
Mock.mock(/\/user\/forget_get_question/, 'post', forgetGetQuestion)
Mock.mock(/\/user\/forget_check_answer/, 'post', forgetCheckAnswer)
Mock.mock(/\/user\/forget_reset_password/, 'post', forgetResetPassword)
Mock.mock(/\/user\/info\/update/, 'post', userInfoUpdate)
Mock.mock(/\/user\/update\/password/, 'post', updatePassword)
