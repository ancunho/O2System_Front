import { axios } from '@/utils/request'
import QS from 'qs'

export function getCustomerList () {
  return axios({
    url: '/customer/list',
    method: 'get'
  })
}

export function customerAdd (parameter) {
  return axios({
    url: '/customer/create',
    method: 'post',
    data: parameter
  })
}

export function customerUpdate (parameter) {
  return axios({
    url: '/customer/update',
    method: 'post',
    data: parameter
  })
}

export function customerDelete (parameter) {
  return axios({
    url: '/customer/delete',
    method: 'post',
    data: QS.stringify(parameter)
  })
}
