import Mock from 'mockjs2'
import { builder, getBodyByQs } from '../util'

const customerList = (options) => {
  const data = []
  for (let i = 1; i < 15; i++) {
    data.push({
      'id': i,
      'customerCd': Mock.mock('@name'),
      'customerName': Mock.mock('@cname'),
      'director': Mock.mock('@cname'),
      'province': '31',
      'city': '3101',
      'area': '310112',
      'address': Mock.mock('@word(15)'),
      'salesVolumn': Mock.mock('@integer(0, 10000)'),
      'developmentSkill': Mock.mock('@word(5)'),
      'phone': Mock.mock('@natural'),
      'wechat': Mock.mock('@word(7)'),
      'description': Mock.mock('@cparagraph(5)'),
      'target': Mock.mock('@word(10)'),
      'productList': Mock.mock('@word(10)'),
      'distribution': Mock.mock('@word(10)'),
      'salesMan': '[1,2,3]',
      // 'status': Mock.mock('@pick(["0", "1"])'),
      'customerImage': Mock.mock('@dataImage("150x150")')
    })
  }

  return builder(data)
}

const customerNameList = () => {
  const data = []
  for (let i = 1; i < 16; i++) {
    data.push({
      'id': i,
      'customerName': Mock.mock('@cname')
    })
  }

  return builder(data)
}

const getCustomerById = (options) => {
  const body = getBodyByQs(options)
  return builder({
    'id': body.customerId,
    'customerCd': Mock.mock('@name'),
    'customerName': Mock.mock('@cname'),
    'director': Mock.mock('@cname'),
    'province': '31',
    'city': '3101',
    'area': '310112',
    'address': Mock.mock('@word(15)'),
    'salesVolumn': Mock.mock('@integer(0, 10000)'),
    'developmentSkill': Mock.mock('@word(5)'),
    'phone': Mock.mock('@natural'),
    'wechat': Mock.mock('@word(7)'),
    'description': Mock.mock('@cparagraph(5)'),
    'target': Mock.mock('@word(10)'),
    'productList': Mock.mock('@word(10)'),
    'distribution': Mock.mock('@word(10)'),
    'salesMan': '[1,2,3]',
    // 'status': Mock.mock('@pick(["0", "1"])'),
    'customerImage': Mock.mock('@dataImage("150x150")')
  })
}

const customerAdd = () => {
  return builder({}, '新建成功')
}

const customerUpdate = () => {
  return builder({}, '更新成功')
}

const customerDelete = () => {
  return builder({}, '删除成功')
}

Mock.mock('/api/customer/list', 'get', customerList)
Mock.mock('/api/customer/list/name', 'get', customerNameList)
Mock.mock('/api/customer/detail', 'post', getCustomerById)
Mock.mock('/api/customer/create', 'post', customerAdd)
Mock.mock('/api/customer/update', 'post', customerUpdate)
Mock.mock('/api/customer/delete', 'post', customerDelete)
