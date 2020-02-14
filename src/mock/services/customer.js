import Mock from 'mockjs2'
import { builder } from '../util'

const customerList = (options) => {
  console.log('request options ↓↓↓', options)

  const data = []
  for (let i = 1; i < 99; i++) {
    data.push({
      id: i,
      customerName: Mock.mock('@cname'),
      director: Mock.mock('@cname'),
      phone: Mock.mock('@natural'),
      wechat: Mock.mock('@word(7)'),
      description: Mock.mock('@@word(10)'),
      salesVolumn: Mock.mock('@integer(0, 10000)'),
      developmentSkill: Mock.mock('@integer(0, 1)'),
      target: Mock.mock('@word(10)'),
      productList: Mock.mock('@word(10)'),
      city: Mock.mock('@word(5)'),
      address: Mock.mock('@word(15)'),
      other: Mock.mock('@cname'),
      imagePhoto: Mock.mock('@dataImage("180x180")')
    })
  }

  return builder({
    data: data
  })
}

Mock.mock(/\/customer\/list/, 'get', customerList)
