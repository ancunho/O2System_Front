import { axios } from '@/utils/request'
import QS from 'qs'

export function getCommonConfig (parameter) {
  return axios({
    url: '/common/config',
    method: 'post',
    data: QS.stringify(parameter)
  })
}
