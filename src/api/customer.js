import { axios } from '@/utils/request'
import QS from 'qs'

export function getCustomerList () {
  return axios({
    url: '/customer/list',
    method: 'get'
  })
}

export function getCustomerNameList () {
  return axios({
    url: '/customer/list/name',
    method: 'get'
  })
}

export function getCustomerById (parameter) {
  return axios({
    url: '/customer/detail',
    method: 'post',
    data: QS.stringify(parameter)
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

export function checkCustomerName (parameter) {
  return axios({
    url: '/customer/check_customer_name',
    method: 'post',
    data: QS.stringify(parameter)
  })
}

export function getProjectByCustomer (parameter) {
  return axios({
    url: '/customer/project_list_by_customer_name',
    method: 'post',
    data: QS.stringify(parameter)
  })
}
