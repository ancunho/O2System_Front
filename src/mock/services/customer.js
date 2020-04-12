import Mock from 'mockjs2'
import { builder } from '../util'

const customerList = (options) => {
  const data = []
  for (let i = 1; i < 15; i++) {
    data.push({
      id: i,
      customerName: Mock.mock('@cname'),
      director: Mock.mock('@cname'),
      phone: Mock.mock('@natural'),
      wechat: Mock.mock('@word(7)'),
      description: Mock.mock('@word(10)'),
      salesVolumn: Mock.mock('@integer(0, 10000)'),
      developmentSkill: Mock.mock('@word(5)'),
      target: Mock.mock('@word(10)'),
      productList: Mock.mock('@word(10)'),
      city: Mock.mock('@word(5)'),
      address: Mock.mock('@word(15)'),
      other: Mock.mock('@cname'),
      imagePhoto: Mock.mock('@dataImage("150x150")')
    })
  }

  return builder(data)
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
Mock.mock('/api/customer/create', 'post', customerAdd)
Mock.mock('/api/customer/update', 'post', customerUpdate)
Mock.mock('/api/customer/delete', 'post', customerDelete)
