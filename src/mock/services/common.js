import Mock from 'mockjs2'
import { builder, getBodyByQs } from '../util'

const getCommonConfig = (options) => {
  const body = getBodyByQs(options)

  const list = {
    department: [],
    question: []
  }

  for (let i = 1; i < 10; i++) {
    list.department.push({
      cnfValue: (1000 + i).toString(),
      cnfNote: '人事部' + i
    })
    list.question.push({
      cnfValue: (2000 + i).toString(),
      cnfNote: '问题' + i
    })
  }

  return builder(list[body['CNF_CODE']])
}

const getCommonConfigList = (options) => {
  const list = []

  for (let i = 1; i < 5; i++) {
    list.push({
      cnfNote: '部门' + i,
      cnfCode: 'department'
    })
    list.push({
      cnfNote: '问题' + i,
      cnfCode: 'question'
    })
    list.push({
      cnfNote: '客户类型' + i,
      cnfCode: 'customerType'
    })
    list.push({
      cnfNote: '开发能力' + i,
      cnfCode: 'customerDevelopmentSkill'
    })
    list.push({
      cnfNote: '主要渠道' + i,
      cnfCode: 'customerChannel'
    })
    list.push({
      cnfNote: '主要市场' + i,
      cnfCode: 'customerTarget'
    })
    list.push({
      cnfNote: '包装类型' + i,
      cnfCode: 'productPackage'
    })
    list.push({
      cnfNote: '产品概念' + i,
      cnfCode: 'productConcept'
    })
    list.push({
      cnfNote: '产品剂型' + i,
      cnfCode: 'productType'
    })
  }

  return builder(list)
}

Mock.mock('/api/common/config', 'post', getCommonConfig)
Mock.mock('/api/common/config/list', 'post', getCommonConfigList)
