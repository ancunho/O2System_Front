import { axios } from '@/utils/request'
import QS from 'qs'

export function getCommonConfig (parameter) {
  return axios({
    url: '/common/config',
    method: 'post',
    data: QS.stringify(parameter)
  })
}

export function getCommonConfigList (parameter) {
  return axios({
    url: '/common/config/list',
    method: 'post'
  })
}

export const uploadFileUrl = '/common/file/single/upload'
