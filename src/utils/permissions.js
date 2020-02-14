export function actionToObject (json) {
  try {
    return JSON.parse(json)
  } catch (e) {
    console.log('err', e.msg)
  }
  return []
}
