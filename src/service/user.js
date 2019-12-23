import { postCache } from '@/core/ajax'
import { singleRequest } from '@/core/util'

const LOGININFOURL = '/business/brandHub/getSupplierInfo'

/**
 * 获取商家基本信息
 */
export const getUserInfo = () => {
  return singleRequest(LOGININFOURL, () => postCache(LOGININFOURL))
}
