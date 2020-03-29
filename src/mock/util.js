const responseBody = {
  msg: '',
  data: null,
  status: 0
}

export const builder = (data, msg, status = 0, headers = {}) => {
  responseBody.data = data
  responseBody.status = status
  if (msg !== undefined && msg !== null) {
    responseBody.msg = msg
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

export const getBodyByQs = (options) => {
  return options.body && JSON.parse('{"' + decodeURIComponent(options.body)
    .replace(/"/g, '\\"')
    .replace(/&/g, '","')
    .replace(/=/g, '":"') + '"}')
}
