const getters = {
  device: state => state.app.device,
  theme: state => state.app.theme,
  color: state => state.app.color,
  multiTab: state => state.app.multiTab,
  addRouters: state => state.permission.addRouters,
  token: state => state.user.token,
  role: state => state.user.role,
  userInfo: state => state.user.info,
  department: state => state.common.department,
  question: state => state.common.question,
  lang: state => state.i18n.lang
}

export default getters
