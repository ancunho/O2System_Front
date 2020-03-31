import { axios } from '@/utils/request'
import QS from 'qs'

export function login (parameter) {
  return axios({
    url: '/user/login',
    method: 'post',
    data: QS.stringify(parameter)
  })
}

export function logout () {
  return axios({
    url: '/user/logout',
    method: 'post'
  })
}

export function getInfo () {
  return axios({
    url: '/user/info',
    method: 'get'
  })
}

export function register (parameter) {
  return axios({
    url: '/user/create',
    method: 'post',
    data: parameter
  })
}

export function checkUsername (parameter) {
  return axios({
    url: '/user/check_username',
    method: 'post',
    data: QS.stringify(parameter)
  })
}

export function checkEmail (parameter) {
  return axios({
    url: '/user/check_email',
    method: 'post',
    data: QS.stringify(parameter)
  })
}

export function forgetGetQuestion (parameter) {
  return axios({
    url: '/user/forget_get_question',
    method: 'post',
    data: QS.stringify(parameter)
  })
}

export function forgetCheckAnswer (parameter) {
  return axios({
    url: '/user/forget_check_answer',
    method: 'post',
    data: QS.stringify(parameter)
  })
}

export function forgetResetPassword (parameter) {
  return axios({
    url: '/user/forget_reset_password',
    method: 'post',
    data: QS.stringify(parameter)
  })
}

export function userInfoUpdate (parameter) {
  return axios({
    url: '/api/user/info/update',
    method: 'post',
    data: parameter
  })
}

export function updatePassword (parameter) {
  return axios({
    url: '/user/update/password',
    method: 'post',
    data: QS.stringify(parameter)
  })
}
