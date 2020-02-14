import Mock from 'mockjs2'
import { builder } from '../util'

const info = (options) => {
  const userInfo = {
    'username': 'admin',
    'password': '',
    'realname': '某某',
    'imagePhoto': '/avatar.jpg',
    'empno': '123456789',
    'phone': '17712341234',
    'email': 'admin@admin.com',
    'department': '销售部',
    'wechat': 'wechatId',
    'role': 'admin'
  }
  return builder(userInfo)
}

Mock.mock(/\/api\/user\/info/, 'get', info)
