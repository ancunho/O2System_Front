const responseBody = {
  msg: '',
  data: null,
  status: 0
}

export const builder = (data, msg, status = 0, headers = {}) => {
  responseBody.data = data
  if (msg !== undefined && msg !== null) {
    responseBody.msg = msg
  }
  if (status !== undefined && status !== 0) {
    responseBody.status = status
    responseBody._status = status
  }
  if (headers !== null && typeof headers === 'object' && Object.keys(headers).length > 0) {
    responseBody._headers = headers
  }
  return responseBody
}

export const getQueryParameters = (options) => {
  const url = options.url
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse('{"' + decodeURIComponent(search)
    .replace(/"/g, '\\"')
    .replace(/&/g, '","')
    .replace(/=/g, '":"') + '"}')
}

export const getBody = (options) => {
  return options.body && JSON.parse(options.body)
}
