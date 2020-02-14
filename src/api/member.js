import { axios } from '@/utils/request'

export function getMemberList () {
  return axios({
    url: '/member/list',
    method: 'get'
  })
}
