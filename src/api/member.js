import { axios } from '@/utils/request'
import QS from 'qs'

export function getMemberList () {
  return axios({
    url: '/member/list',
    method: 'get'
  })
}

export function memberAdd (parameter) {
  return axios({
    url: '/member/create',
    method: 'post',
    data: parameter
  })
}

export function memberUpdate (parameter) {
  return axios({
    url: '/member/update',
    method: 'post',
    data: parameter
  })
}

export function memberStatus (parameter) {
  return axios({
    url: '/member/update/status',
    method: 'post',
    data: QS.stringify(parameter)
  })
}

export function memberResetPassword (parameter) {
  return axios({
    url: '/member/update/reset/password',
    method: 'post',
    data: QS.stringify(parameter)
  })
}

export function memberDelete (parameter) {
  return axios({
    url: '/member/delete',
    method: 'post',
    data: QS.stringify(parameter)
  })
}
