import { axios } from '@/utils/request'
import QS from 'qs'

export function getProjectList () {
  return axios({
    url: '/project/list',
    method: 'get'
  })
}

export function getProjectBaseinfo (parameter) {
  return axios({
    url: '/project/view',
    method: 'get',
    data: QS.stringify(parameter)
  })
}

export function getProjectDetail (parameter) {
  return axios({
    url: '/project/detail',
    method: 'get',
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

export function projectBaseInfoUpdate (parameter) {
  return axios({
    url: '/project/baseinfo/update',
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

export function projectDetailUpdate (parameter) {
  return axios({
    url: '/project/detail/update',
    method: 'post',
    data: parameter
  })
}

export function getProjectTimelineList (parameter) {
  return axios({
    url: '/project/timeline/list',
    method: 'get',
    data: QS.stringify(parameter)
  })
}

export function projectTimelineAdd (parameter) {
  return axios({
    url: '/project/timeline/create',
    method: 'post',
    data: parameter
  })
}

export function projectTimelineUpdate (parameter) {
  return axios({
    url: '/project/timeline/update',
    method: 'post',
    data: parameter
  })
}

export function projectTimelineDelete (parameter) {
  return axios({
    url: '/project/timeline/delete',
    method: 'post',
    data: QS.stringify(parameter)
  })
}
