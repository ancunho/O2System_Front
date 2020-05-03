import Mock from 'mockjs2'
import { builder, getBodyByQs } from '../util'

const getCommonConfig = (options) => {
  const body = getBodyByQs(options)

  const list = {
    department: [],
    question: [],
    productCategory: [],
    productPackage: [],
    productConcept: [],
    productType: []
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
    list.productCategory.push({
      cnfValue: (3000 + i).toString(),
      cnfNote: '分类' + i
    })
    list.productPackage.push({
      cnfValue: (4000 + i).toString(),
      cnfNote: '包装类型' + i
    })
    list.productConcept.push({
      cnfValue: (5000 + i).toString(),
      cnfNote: '产品概念' + i
    })
    list.productType.push({
      cnfValue: (6000 + i).toString(),
      cnfNote: '产品类型' + i
    })
  }

  return builder(list[body['CNF_CODE']])
}

Mock.mock('/api/common/config', 'post', getCommonConfig)
