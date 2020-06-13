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
  customerType: state => state.common.customerType,
  customerDevelopmentSkill: state => state.common.customerDevelopmentSkill,
  customerChannel: state => state.common.customerChannel,
  customerTarget: state => state.common.customerTarget,
  productPackage: state => state.common.productPackage,
  productConcept: state => state.common.productConcept,
  productType: state => state.common.productType,
  lang: state => state.i18n.lang
}

export default getters
