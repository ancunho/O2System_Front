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
      'projectSalesMan': '[' + Mock.mock('@integer(0, 10)') + ',' + Mock.mock('@integer(0, 10)') + ']',
      'projectPriceTotal': Mock.mock(/\d{7}/) + '元',
      'projectStarttime': Mock.mock('@date'),
      'projectEndtime': Mock.mock('@date'),
      'createtime': Mock.mock('@date')
    })
  }

  return builder(data)
}

const getProjectBaseinfo = (options) => {
  return builder({
    'customer': {
      'address': '阿斯顿看风使舵 XXXX号',
      'author': 'cunho',
      'customerCd': 'customer002',
      'customerName': 'customer name2222',
      'customerNameKr': 'customer kr name2222',
      'description': 'text text texttext text texttext text texttext text text',
      'developmentSkill': 'developementskill',
      'director': 'direcotr',
      'distribution': 'distribution',
      'phone': '18521095572',
      'productList': '["牛奶","水果","冰淇淋","可乐"]',
      'projectId': '[2,23]',
      'province': '31',
      'city': '3101',
      'area': '310112',
      'salesMan': '[1,2,3]',
      'salesVolumn': '1,000,000',
      'status': '1',
      'target': 'target',
      'wechat': 'cunho910'
    },
    'projectCd': '2020041800002',
    'projectEndtime': '2022-09-01',
    'projectName': 'project name2222',
    'projectPriceTotal': '90000元',
    'projectSalesMan': '[1,2,3]',
    'projectStarttime': '2020-03-01',
    'projectStatus': '1'
  })
}

const getProjectDetail = (options) => {
  return builder({
    'projectPrice': {
      'actualInput': '11111',
      'actualProduction': '9999',
      'dealPlace': 'text',
      'descriptionList': '[{"key":"key","value":"value"}]',
      'orderQuantity': '111',
      'packageSpec': '22222',
      'personInCharge': 'text',
      'priceList': '[{"project":"project","price":"price","setPrice":"setPrice","percent":"percent"}]',
      'productName': '제품명',
      'projectId': 1,
      'projectProductId': 2,
      'releaseDate': '2020-04-20',
      'remark': 'text text text',
      'specialComment': 'text',
      'theoryQuantity': '88888',
      'unitWeight': '99',
      'valueNoVat': 'text',
      'weight': '999',
      'yieldPercent': '8'
    },
    'projectProduct': {
      'productCategory': '3002',
      'productConcept': '5001',
      'productDetail': 'text text text text',
      'productImage': '',
      'productMainMaterial': '["text1","222","333","444"]',
      'productName': '제품명',
      'productPackage': '4004',
      'productQuantity': '234',
      'productSubMaterial': '["aaa","bbb","cccc","dddd"]',
      'productTargetContent': 'text text text',
      'productTargetPrice': '3999',
      'productType': '6005',
      'projectId': 1
    },
    'projectRecordList': [{
      'projectId': 1,
      'recordContent': '[{"title":"title","date":"2020-05-05","content":"content","principal":"principal","check":"check"}]',
      'recordId': '1'
    }],
    'projectTimelineList': [{
      'projectId': 1,
      'timelineAuthor': 'XXXXX',
      'timelineContent': 'json',
      'timelineId': '1'
    }]
  })
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
  }, '新建成功')
}

const projectBaseInfoUpdate = () => {
  return builder({}, '更新成功')
}

const projectDetailAdd = () => {
  return builder({}, '新建成功')
}

const projectDetailUpdate = () => {
  return builder({}, '更新成功')
}

const getProjectTimelineList = (options) => {
  const data = []
  for (let i = 1; i < 7; i++) {
    data.push({
      'id': i,
      'projectId': Mock.mock(/\d{3}/),
      'meetingTime': Mock.mock('@natural(0, 180)'),
      'meetingDate': Mock.mock('@date'),
      'timelineContent': Mock.mock('@cparagraph(5)'),
      'timelineAuthor': Mock.mock('@cname')
    })
  }

  return builder(data)
}

const projectTimelineAdd = () => {
  return builder({}, '新建成功')
}

const projectTimelineUpdate = () => {
  return builder({}, '更新成功')
}

const projectTimelineDelete = () => {
  return builder({}, '删除成功')
}

Mock.mock('/api/project/list', 'get', projectList)
Mock.mock('/api/project/view', 'post', getProjectBaseinfo)
Mock.mock('/api/project/detail', 'get', getProjectDetail)
Mock.mock('/api/project/baseinfo/create', 'post', projectBaseInfoAdd)
Mock.mock('/api/project/baseinfo/update', 'post', projectBaseInfoUpdate)
Mock.mock('/api/project/detail/create', 'post', projectDetailAdd)
Mock.mock('/api/project/detail/update', 'post', projectDetailUpdate)
Mock.mock('/api/project/timeline/list', 'get', getProjectTimelineList)
Mock.mock('/api/project/timeline/create', 'post', projectTimelineAdd)
Mock.mock('/api/project/timeline/update', 'post', projectTimelineUpdate)
Mock.mock('/api/project/timeline/delete', 'post', projectTimelineDelete)
