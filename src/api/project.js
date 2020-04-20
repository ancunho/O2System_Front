import { axios } from '@/utils/request'
import QS from 'qs'

export function getProjectList () {
  return axios({
    url: '/project/list',
    method: 'get'
  })
}

export function getProjectTimelineList (parameter) {
  return axios({
    url: '/project/timeline/list',
    method: 'post',
    data: QS.stringify(parameter)
  })
}

export function projectBaseInfoAdd (parameter) {
  return axios({
    url: '/project/baseinfo/create',
    method: 'post',
    data: parameter
  })
}

export function projectDetailAdd (parameter) {
  return axios({
    url: '/project/detail/create',
    method: 'post',
    data: parameter
  })
}

// /api/project/list
// /api/project/list
// /api/project/list

// /api/member/list/name ---- 只返回id和realname的借口

// /api/customer/list/name ----아이디와 고객이름만 반환
