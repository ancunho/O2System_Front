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
      cnfValue: 1000 + i,
      cnfNote: '人事部' + i,
      cnfNoteKr: '인사부' + i
    })
    list.question.push({
      cnfValue: 2000 + i,
      cnfNote: '问题' + i,
      cnfNoteKr: '물음' + i
    })
  }

  return builder(list[body['CNF_CODE']])
}

Mock.mock(/\/common\/config/, 'post', getCommonConfig)
