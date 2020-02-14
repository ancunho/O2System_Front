import { axios } from '@/utils/request'

export function getCustomerList () {
  return axios({
    url: '/customer/list',
    method: 'get'
  })
}
