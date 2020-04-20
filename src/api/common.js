import { axios } from '@/utils/request'
import QS from 'qs'

export function getCommonConfig (parameter) {
  return axios({
    url: '/common/config',
    method: 'post',
    data: QS.stringify(parameter)
  })
}

// PRODUCT_CATEGORY - 카테고리
// PRODUCT_PACKAGE - 포장유형
// PRODUCT_CONCEPT - 제품컨셉
// PRODUCT_TYPE - 식품유형
