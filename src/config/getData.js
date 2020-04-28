import fetch from '../config/fetch'

/**
 * 权限 permission
 */
export const getPermission = (account) => fetch('/login/selectPowerByAccount', {
  account
}, 'POST')
/**
 * 上传图片接口(所有)
 */
export const uploadImg = file => fetch('/admin/uploadImg', file, 'POST')
/**
 * 保存banner图片
 */
export const saveBannerImg = param => fetch('/banner/add', param, 'POST')
/**
 * 删除banner图片
 */
export const deleteBannerImg = id => fetch('/banner/delete', {
  id
}, 'GET')
/**
 * 轮播banner回显
 */
export const getAllBanner = () => fetch('/banner/banners', 'GET')
/**
 * 查询影片信息(所有)
 */
export const getAllFilm = (pageNum) => fetch('/admin/film/list', {
  pageNum
}, 'GET')
/**
 * 影片信息更新
 */
export const refreshAllFilm = () => fetch('/admin/film/updateAllFilmInfo', 'GET')
/**
 * 查询影院信息
 */
export const getAllCinema = (pageNum) => fetch('/admin/cinemaInfo/cinemas', {
  pageNum
}, 'GET')
/**
 * 编辑影院
 */
export const editCinemaData = (param) => fetch('/admin/cinemaInfo/edit', param, 'POST')
/**
 * 获取单个影院信息
 */
export const cinemaInfoData = (id) => fetch('/admin/cinemaInfo/info', {
  id
}, 'GET')
/**
 * 添加影片封面图片
 */
export const uploadMovieImg = param => fetch('/admin/film/uploadFilmImage', param, 'POST')
/**
 * 修改影片封面图片
 */
export const editMovieImg = param => fetch('/admin/film/editFilmImage', param, 'POST')
/**
 * 小食信息
 */
export const getFoodList = pageNum => fetch('/admin/food/list', {
  pageNum
}, 'GET')
/**
 * 上传小食图片
 */
export const updateFoodImg = param => fetch('/admin/food/updateImage', param, 'POST')
/**
 * 更新小食
 */
export const refreshFoodList = param => fetch('/admin/food/syncFoodsList', param, 'GET')

/**
 * 获取vip卡列表
 */
export const getVipCard = (pageNum) => fetch('/admin/goods/vipCards', {
  pageNum
}, 'GET')
/**
 * 添加会员卡
 */
export const addVipCard = (param) => fetch('/admin/goods/add', param, 'POST')
/**
 * 编辑会员卡
 */
export const editVipCard = (param) => fetch('/admin/goods/edit', param, 'POST')
/**
 * 获取vip卡片信息
 */
export const vipCardInfo = (id) => fetch('/admin/goods/vipCardInfo', {
  id
}, 'GET')
/**
 * 修改vip卡片状态
 */
export const changeVipState = (param) => fetch('/admin/goods/changeStatus', param, 'POST')

/**
 * 订单管理(销售额统计)
 */
export const orderDataCount = () => fetch('/admin/order/saleroom', 'GET')
/**
 * 小食订单列表
 */
export const orderFoodList = (param) => fetch('/admin/order/goods', param, 'POST')
/**
 * 电影订单列表
 */
export const orderCinemaList = (param) => fetch('/admin/order/cinemas', param, 'POST')
/**
 * vip卡订单列表
 */
export const orderVipList = (param) => fetch('/admin/order/vipcard', param, 'POST')
/**
 * 会员卡订单详情
 */
export const vipDataDetail = (id) => fetch('/admin/order/vipOrderDetail', {
  id
}, 'GET')
/**
 * 小食订单详情
 *
 *
 */
export const foodDataDetail = (id) => fetch('/admin/order/goodsOrderDetail', {
  id
}, 'GET')
/**
 * 电影票订单详情
 */
export const cinemaDataDetail = (id) => fetch('/admin/order/cinemaOrderDetail', {
  id
}, 'GET')
/**
 * 获取一条退款原因
 */
export const oneRefundReason = (orderNo) => fetch('/admin/order/oneRefundReason', {
  orderNo
}, 'GET')
/**
 * 批量送达小食
 */
export const deliveryFood = (foodsOrderId) => fetch('/admin/order/deliveryFood', {
  foodsOrderId
}, 'POST')
/**
 * 订单导出
 */
export const exportOrderList = (param) => fetch('/admin/order/exportOrderList',
  param, 'POST')

/**
 * 影城列表
 */
export const cinemaListData = () => fetch('/admin/goods/searchCinemas', 'GET')

/**
 * 用户管理列表
 */
export const userDataList = (param) => fetch('/admin/user/list', param, 'POST')
/**
 * 禁用用户
 */
export const userDisabled = (param) => fetch('/admin/user/disableUser', param, 'POST')
/**
 * 是否标记为员工
 */
export const userMarkStaff = (param) => fetch('/admin/user/markUser', param, 'POST')
/**
 * 用户详情
 */
export const userDataDetail = (param) => fetch('/admin/user/userDetail', param, 'POST')
/**
 * 登录明细
 */
export const userLoginDetail = (param) => fetch('/admin/user/loginDetail', param, 'POST')
/**
 * 观影明细
 */
export const userCimenaDetail = (param) => fetch('/admin/user/cimenaDetail', param, 'POST')
/**
 * 激活明细
 */
export const userActiveDetail = (param) => fetch('/admin/user/activeDetail', param, 'POST')
/**
 * 用户评价
 */
export const userEvaluationDetail = (param) => fetch('/admin/user/evaluationDetail', param, 'POST')
/**
 * 导出用户信息excel
 */
export const exportExcelOfUser = (param) => fetch('/admin/user/exportExcelOfUser', param, 'POST')

/**
 * 意见管理列表
 */
export const feedBackList = (param) => fetch('/admin/feedback/searchFeedback', param, 'POST')
/**
 * 修改跟进状态
 */
export const changeFollowStatus = (id) => fetch('/admin/feedback/changeFollowStatus', id, 'GET')
/**
 * 获取常见问题列表
 */
export const QuestionList = () => fetch('/commonReason/list', 'GET')
/**
 * 修改常见问题
 */
export const editQuestionData = (param) => fetch('/commonReason/edit', param, 'POST')
/**
 * 添加常见问题
 */
export const addQuestionData = (param) => fetch('/commonReason/add', param, 'POST')
/**
 * 删除常见问题
 */
export const deleteQuestionData = (id) => fetch('/commonReason/remove', {
  id
}, 'GET')
/**
 * 获取常见问题
 */
export const getQuestionData = (id) => fetch('/commonReason/oneCommonReason', {
  id
}, 'GET')
/**
 * 基础设置列表
 */
export const getFundReason = () => fetch('/admin/basicSetUp/refundReason', 'GET')
/**
 * 添加退款原因
 */
export const addFundReason = (refundReason) => fetch('/admin/basicSetUp/addRefundReason', {
  refundReason
}, 'GET')
/**
 * 删除退款原因
 */
export const deleteFundReason = (id) => fetch('/admin/basicSetUp/removeRefundReason', {
  id
}, 'GET')
/**
 * 获取退改签须知/使用说明
 */
export const getNotice = () => fetch('/admin/basicSetUp/refundNotice', 'GET')
/**
 * 修改退改签须知/使用说明
 */
export const editNotice = (param) => fetch('/admin/basicSetUp/editRefundNotice', param, 'POST')

/**
 * 账号密码登录
 */
export const accountLogin = (userName, password) => fetch('/admin/login', {
  userName,
  password
}, 'POST')
