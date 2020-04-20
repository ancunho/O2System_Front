import Mock from 'mockjs2'
import { builder } from '../util'

const projectList = (options) => {
  const data = []
  for (let i = 1; i < 15; i++) {
    data.push({
      'id': i,
      'projectCd': Mock.mock(/\d{10}/),
      'projectName': Mock.mock('@cname'),
      'projectCustomer': Mock.mock('@cname'),
      'productName': Mock.mock('@cname'),
      'projectStatus': Mock.mock('@pick(["1", "2", "3", "4", "5"])'),
      'projectSalesMan': '[1,2,3]',
      'projectPriceTotal': Mock.mock(/\d{7}/) + '元',
      'projectStarttime': Mock.mock('@date'),
      'projectEndtime': Mock.mock('@date'),
      'createtime': Mock.mock('@date')
    })
  }

  return builder(data)
}

const getProjectTimelineList = (options) => {
  const data = []
  for (let i = 1; i < 7; i++) {
    data.push({
      'id': i,
      'projectId': Mock.mock(/\d{3}/),
      'timelineContent': Mock.mock('@cparagraph(5)'),
      'timelineAuthor': Mock.mock('@cname'),
      'createtime': Mock.mock('@date')
    })
  }

  return builder(data)
}

const projectBaseInfoAdd = () => {
  return builder({
    'id': 666,
    'projectCd': Mock.mock(/\d{10}/),
    'projectName': Mock.mock('@cname'),
    'projectCustomer': Mock.mock('@cname'),
    'productName': Mock.mock('@cname'),
    'projectStatus': Mock.mock('@pick(["1", "2", "3", "4", "5"])'),
    'projectSalesMan': '[1,2,3]',
    'projectPriceTotal': Mock.mock(/\d{7}/) + '元',
    'projectStarttime': Mock.mock('@date'),
    'projectEndtime': Mock.mock('@date'),
    'createtime': Mock.mock('@date'),
    'customer': {
      'id': 999,
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
      'description': Mock.mock('@word(50)'),
      'target': Mock.mock('@word(10)'),
      'productList': Mock.mock('@word(10)'),
      'distribution': Mock.mock('@word(10)'),
      'salesMan': '[1,2,3]',
      // 'status': Mock.mock('@pick(["0", "1"])'),
      'customerImage': Mock.mock('@dataImage("150x150")')
    }
  }, '成功')
}

const projectDetailAdd = () => {
  return builder({}, '成功')
}

Mock.mock('/api/project/list', 'get', projectList)
Mock.mock('/api/project/timeline/list', 'post', getProjectTimelineList)
Mock.mock('/api/project/baseinfo/create', 'post', projectBaseInfoAdd)
Mock.mock('/api/project/detail/create', 'post', projectDetailAdd)
