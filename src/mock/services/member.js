import Mock from 'mockjs2'
import { builder } from '../util'

const memberList = (options) => {
  console.log('request options ↓↓↓', options)

  const data = []
  for (let i = 1; i < 99; i++) {
    data.push({
      id: i,
      username: Mock.mock('@sentence(1)'),
      realname: Mock.mock('@cname'),
      empno: Mock.mock('@natural'),
      phone: Mock.mock('@natural'),
      email: Mock.mock('@email'),
      department: Mock.mock('@csentence(6)'),
      status: Mock.mock('@integer(0, 1)'),
      wechat: Mock.mock('@word(7)'),
      imagePhoto: Mock.mock('@dataImage("180x180")')
    })
  }

  return builder({
    data: data
  })
}

Mock.mock(/\/member\/list/, 'get', memberList)
