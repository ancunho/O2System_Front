import { axios } from '@/utils/request'
import QS from 'qs'

export function getProjectList () {
  return axios({
    url: '/project/list',
    method: 'get'
  })
}

export function getProjectView (parameter) {
  return axios({
    url: '/project/view',
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
    method: 'post',
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

export function getProjectRecordList (parameter) {
  return axios({
    url: '/project/record/by_id',
    method: 'post',
    data: QS.stringify(parameter)
  })
}

export function getProjectRecordUpdate (parameter) {
  return axios({
    url: '/project/record/update',
    method: 'post',
    data: parameter
  })
}
