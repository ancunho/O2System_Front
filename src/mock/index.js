import { isIE } from '@/utils/util'

// 判断环境不是 prod 或者 preview 是 true 时，加载 mock 服务
if (process.env.NODE_ENV !== 'production' || process.env.VUE_APP_PREVIEW === 'true') {
  if (isIE()) {
    console.error('ERROR: `mockjs` NOT SUPPORT `IE` PLEASE DO NOT USE IN `production` ENV.')
  }
  // 使用同步加载依赖
  // 防止 vuex 中的 GetInfo 早于 mock 运行，导致无法 mock 请求返回结果
  const Mock = require('mockjs2')
  require('./services/common')
  require('./services/user')
  require('./services/member')
  require('./services/customer')
  require('./services/project')

  Mock.setup({
    timeout: 100 // setter delay time
  })
}
