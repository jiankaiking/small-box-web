import {
  isNumber
} from 'util'

export const constant = {}
constant.payObj = [{
  code: '0',
  name: '停用'
},
{
  code: '1',
  name: '启用'
},
{
  code: '2',
  name: '冻结'
}
]
// 用户类型
constant.userObj = [{
  code: 0,
  name: '普通用户'
},
{
  code: 1,
  name: '会员用户'
},
{
  code: 2,
  name: '员工'
}
]
// 订单状态
constant.vipStatus = [{
  code: '1',
  name: '已付款',
  state: true
},
{
  code: '2',
  name: '待付款',
  state: false
},
{
  code: '3',
  name: '已关闭',
  state: false
},
{
  code: '4',
  name: '已改签',
  state: true
},
{
  code: '5',
  name: '已退款',
  state: true
}
]
// 订单详情
constant.vipType = [{
  code: 2,
  name: '会员卡'
},
{
  code: 1,
  name: '电影票'
},
{
  code: 0,
  name: '小食'
}
]
// 小食订单状态
constant.vipFood = [{
  code: 1,
  name: '待付款',
  state: true
},
{
  code: 11,
  name: '已关闭',
  state: false
},
{
  code: 3,
  name: '已付款',
  state: false
},
{
  code: 4,
  name: '支付失败',
  state: true
}
]
// 出票情况
constant.vipTicket = [{
  code: 0,
  name: '待取票',
  state: true
},
{
  code: 1,
  name: '已取票',
  state: false
},
{
  code: 2,
  name: '已改签',
  state: false
},
{
  code: 3,
  name: '已退款',
  state: true
}
]
// 电影票订单状态
constant.vipCinema = [{
  code: 0,
  name: '已退款',
  state: true
},
{
  code: 1,
  name: '待付款',
  state: false
},
{
  code: 2,
  name: '已关闭',
  state: false
},
{
  code: 3,
  name: '已改签',
  state: true
},
{
  code: 4,
  name: '已付款',
  state: true
}
]
// 电影票订单状态
constant.vipCard = [{
  code: 0,
  name: '未支付',
  state: true
},
{
  code: 1,
  name: '已付款',
  state: false
}
]
// 表单状态过滤
export function getStatus (val) {
  for (let i = 0; i < constant.payObj.length; i++) {
    if (val === constant.payObj[i].code) {
      return constant.payObj[i].name
    }
  }
}
// 出票状态过滤
export function getOrderIssued (val) {
  for (let i = 0; i < constant.vipTicket.length; i++) {
    if (val === constant.vipTicket[i].code) {
      return constant.vipTicket[i].name
    }
  }
}
// 订单状态过滤
export function getOrderStatus (val) {
  for (let i = 0; i < constant.vipStatus.length; i++) {
    if (val === constant.vipStatus[i].code) {
      return constant.vipStatus[i].name
    }
  }
}
// 订单类型过滤
export function getOrderType (val) {
  for (let i = 0; i < constant.vipType.length; i++) {
    if (val === constant.vipType[i].code) {
      return constant.vipType[i].name
    }
  }
}
// 小食订单类型过滤
export function getOrderFoodType (val) { // type=0 小食订单,type=1 电影票订单,type=2 vip卡片订单
  let resData = constant.vipFood
  for (let i = 0; i < resData.length; i++) {
    if (val === parseInt(resData[i].code)) {
      return resData[i].name
    }
  }
}
// 电影票订单类型过滤
export function getOrderCinemaType (val) { // type=0 小食订单,type=1 电影票订单,type=2 vip卡片订单
  let resData = constant.vipCinema
  for (let i = 0; i < resData.length; i++) {
    if (val === parseInt(resData[i].code)) {
      return resData[i].name
    }
  }
}
// VIP卡片订单类型过滤
export function getOrderVipType (val) { // type=0 小食订单,type=1 电影票订单,type=2 vip卡片订单
  let resData = constant.vipCard
  for (let i = 0; i < resData.length; i++) {
    if (val === parseInt(resData[i].code)) {
      return resData[i].name
    }
  }
}
// 用户类型过滤
export function getUserType (val) {
  for (let i = 0; i < constant.userObj.length; i++) {
    if (val === constant.userObj[i].code) {
      return constant.userObj[i].name
    }
  }
}
// 时间过滤
export function getTime (val) {
  if (!val) return ''
  let arr = val.split('T')
  return arr[0] + ' ' + arr[1]
}
export function getDateTime (val) {
  if (!val) return ''
  let arr = val.split('T')
  return arr[0]
}
// 会员状态
export function getVipStatus (val) { // 0 禁用 1正常
  if (val === 1) {
    return '正常'
  } else if (val === 0) {
    return '禁用'
  } else {
    return ''
  }
}
// 是否为会员
export function getIsVip (val) { // 0 不是 1是
  if (val === 1) {
    return '是'
  } else {
    return '否'
  }
}
// 是否显示出票情况
export function getIssued (val) {
  for (let i = 0; i < constant.vipCinema.length; i++) {
    if (val === constant.vipCinema[i].code) {
      return constant.vipCinema[i].state
    }
  }
}
// 座位格式化
export function getMovieSeat (val) {
  if (!val) return ''
  // var seat = val.split('-')
  // return seat[1] + '排' + seat[2] + '座'
  return val.rowId + '排' + val.columnId + '座'
}

// 获取年月日
export function getNumTime (val) {
  if (!val) return ''
  var date = new Date(val)
  var y = date.getFullYear()
  var m = date.getMonth() + 1
  var d = date.getDate()
  if (m < 10) m = '0' + m
  if (d < 10) d = '0' + d
  return y + '.' + m + '.' + d
}
/***
 * 格式化时间
 * @param date
 * @param fmt
 * @returns {*}
 */
export function dateFormat (date, fmt) {
  if (date) {
    // 判断 Date类型
    if (typeof date === 'string') {
      date = new Date(parseInt(date))
    } else {
      date = new Date(date)
    }
  } else {
    return '-'
  }
  let o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S': date.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
};
/**
 *   功能:实现VBScript的DateAdd功能.
 * @param interval 参数:interval,字符串表达式，表示要添加的时间间隔.
 * @param number 参数:number,数值表达式，表示要添加的时间间隔的个数.
 * @param date 参数:date,时间对象.
 *   返回:新的时间对象.
 *   var now = new Date();
 *   var newDate = DateAdd( 'd', 5, now);
 *---------------   DateAdd(interval,number,date)   -----------------
 * **/
export function DateAdd (interval, number, data) {
  let date = new Date(data)
  switch (interval) {
    case 'y': {
      date.setFullYear(date.getFullYear() + number)
      return dateFormat(date)
    }
    case 'q': {
      date.setMonth(date.getMonth() + number * 3)
      return dateFormat(date)
    }
    case 'M': {
      date.setMonth(date.getMonth() + number)
      return dateFormat(date)
    }
    case 'w': {
      date.setDate(date.getDate() + number * 7)
      return dateFormat(date)
    }
    case 'd': {
      date.setDate(date.getDate() + number)
      return dateFormat(date, 'yyyy-MM-dd')
    }
    case 'h': {
      date.setHours(date.getHours() + number)
      return dateFormat(date)
    }
    case 'm': {
      date.setMinutes(date.getMinutes() + number)
      return dateFormat(date)
    }
    case 's': {
      date.setSeconds(date.getSeconds() + number)
      return dateFormat(date)
    }
    default: {
      date.setDate(date.getDate() + number)
      return dateFormat(date)
    }
  }
}
