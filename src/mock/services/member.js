import Mock from 'mockjs2'
import { builder } from '../util'

const memberList = () => {
  const data = []
  for (let i = 1; i < 16; i++) {
    data.push({
      'id': i,
      'username': Mock.mock('@word(5, 7)'),
      'realname': Mock.mock('@cname'),
      'imagePhoto': Mock.mock('@dataImage("150x150")'),
      'empno': Mock.mock(/\d{5,7}/),
      'phone': Mock.mock(/\d{11}/),
      'email': Mock.mock('@email'),
      'department': '部门1',
      'question': '问题1',
      'province': '31',
      'city': '3101',
      'area': '310112',
      'address': Mock.mock('@ctitle(7)'),
      'answer': Mock.mock('@ctitle(7)'),
      'wechat': Mock.mock(/\d{8}/),
      'qq': Mock.mock(/\d{10}/),
      'birthday': Mock.mock('@date'),
      'sex': Mock.mock('@pick(["男", "女"])'),
      'status': Mock.mock('@pick(["0", "1"])'),
      'createtime': Mock.mock('@date')
    })
  }

  return builder(data)
}

const memberNameList = () => {
  const data = []
  for (let i = 1; i < 16; i++) {
    data.push({
      'id': i,
      'realname': Mock.mock('@cname')
    })
  }

  return builder(data)
}

const memberAdd = () => {
  return builder({
    'id': 99,
    'username': Mock.mock('@word(5, 7)'),
    'realname': Mock.mock('@cname'),
    'imagePhoto': Mock.mock('@dataImage("150x150")'),
    'empno': Mock.mock(/\d{5,7}/),
    'phone': Mock.mock(/\d{11}/),
    'email': Mock.mock('@email'),
    'department': '部门1',
    'question': '问题1',
    'province': '31',
    'city': '3101',
    'area': '310112',
    'address': Mock.mock('@ctitle(7)'),
    'answer': Mock.mock('@ctitle(7)'),
    'wechat': Mock.mock(/\d{8}/),
    'qq': Mock.mock(/\d{10}/),
    'birthday': Mock.mock('@date'),
    'sex': Mock.mock('@pick(["男", "女"])'),
    'status': Mock.mock('@pick(["0", "1"])'),
    'createtime': Mock.mock('@date')
  }, '新建成功')
}

const memberUpdate = () => {
  return builder({}, '更新成功')
}

const memberStatus = () => {
  return builder({}, '修改状态成功')
}

const memberResetPassword = () => {
  return builder({}, '初始化成功')
}

const memberDelete = () => {
  return builder({}, '删除成功')
}

Mock.mock('/api/member/list', 'get', memberList)
Mock.mock('/api/member/list/name', 'get', memberNameList)
Mock.mock('/api/member/create', 'post', memberAdd)
Mock.mock('/api/member/update', 'post', memberUpdate)
Mock.mock('/api/member/update/status', 'post', memberStatus)
Mock.mock('/api/member/update/reset/password', 'post', memberResetPassword)
Mock.mock('/api/member/delete', 'post', memberDelete)
