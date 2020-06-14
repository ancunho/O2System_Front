import Mock from 'mockjs2'
import { builder, getBodyByQs } from '../util'

const customerList = (options) => {
  const data = []
  for (let i = 1; i < 15; i++) {
    data.push({
      'id': i,
      'customerCd': Mock.mock('@name'),
      'customerName': Mock.mock('@cname'),
      'customerType': '客户类型1',
      'director': Mock.mock('@cname'),
      'province': '31',
      'city': '3101',
      'area': '310112',
      'address': Mock.mock('@word(15)'),
      'salesVolumn': Mock.mock('@integer(0, 10000)'),
      'developmentSkill': '["开发能力1", "开发能力2"]',
      'phone': Mock.mock('@natural'),
      'description': Mock.mock('@cparagraph(5)'),
      'channel': '["主要渠道1", "主要渠道2"]',
      'target': '主要市场1,具体内容',
      'productList': Mock.mock('@word(10)'),
      'salesMan': '[' + Mock.mock('@integer(0, 10)') + ',' + Mock.mock('@integer(0, 10)') + ']',
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
    'customerType': '客户类型1',
    'director': Mock.mock('@cname'),
    'province': '31',
    'city': '3101',
    'area': '310112',
    'address': Mock.mock('@word(15)'),
    'salesVolumn': Mock.mock('@integer(0, 10000)'),
    'developmentSkill': '["开发能力1", "开发能力2"]',
    'phone': Mock.mock('@natural'),
    'description': Mock.mock('@cparagraph(5)'),
    'channel': '["主要渠道1", "主要渠道2"]',
    'target': '主要市场1,具体内容',
    'productList': Mock.mock('@word(10)'),
    'salesMan': '[' + Mock.mock('@integer(0, 10)') + ',' + Mock.mock('@integer(0, 10)') + ']',
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

const checkCustomerName = () => {
  return builder({}, '可以使用')
}

const getProjectByCustomer = (options) => {
  const data = []
  for (let i = 1; i < 7; i++) {
    data.push({
      'id': i,
      'projectCd': Mock.mock(/\d{10}/),
      'projectName': Mock.mock('@cname'),
      'productName': Mock.mock('@cname'),
      'projectStatus': Mock.mock('@pick(["1", "2", "3", "4", "5"])'),
      'projectSalesMan': '[' + Mock.mock('@integer(0, 10)') + ',' + Mock.mock('@integer(0, 10)') + ']',
      'projectPriceTotal': Mock.mock(/\d{7}/) + '元',
      'projectStarttime': Mock.mock('@date'),
      'projectEndtime': Mock.mock('@date'),
      'projectCreater': '2',
      'createtime': Mock.mock('@date')
    })
  }

  return builder(data)
}

Mock.mock('/api/customer/list', 'get', customerList)
Mock.mock('/api/customer/list/name', 'get', customerNameList)
Mock.mock('/api/customer/detail', 'post', getCustomerById)
Mock.mock('/api/customer/create', 'post', customerAdd)
Mock.mock('/api/customer/update', 'post', customerUpdate)
Mock.mock('/api/customer/delete', 'post', customerDelete)
Mock.mock('/api/customer/check_customer_name', 'post', checkCustomerName)
Mock.mock('/api/customer/project_list_by_customer_name', 'post', getProjectByCustomer)
