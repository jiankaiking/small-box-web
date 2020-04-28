import {
  url_str
} from './env'
import {
  Message
} from 'element-ui'
import store from '@/store/index.js'

export default async (url = '', data = {}, type = 'GET', method = 'fetch') => {
  let token = store.state.UserToken
  let requestConfig
  if (token == null || token == undefined) {
    requestConfig = {
      credentials: 'include',
      method: type,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      cache: 'force-cache'

    }
  } else {
    requestConfig = {
      credentials: 'include',
      method: type,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token
      },
      mode: 'cors',
      cache: 'force-cache'

    }
  }
  type = type.toUpperCase()
  url = url_str + url
  if (type == 'GET') {
    let dataStr = '' // 数据拼接字符串
    Object.keys(data).forEach(key => {
      dataStr += key + '=' + data[key] + '&'
    })

    if (dataStr !== '') {
      dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'))
      url = url + '?' + dataStr
    }
  }

  if (window.fetch && method == 'fetch') {
    if (type == 'POST') {
      Object.defineProperty(requestConfig, 'body', {
        value: JSON.stringify(data)
      })
    }

    try {
      const response = await fetch(url, requestConfig)
      const responseJson = await response.json()
      // if (response.status == 403) {
      //   // 设置token
      //   Message.warning({
      //     message: '授权失败，请重新登录'
      //   })
      //   store.commit('LOGIN_OUT')
      //   setTimeout(() => {
      //     window.location.reload()
      //   }, 1000)
      // }
      return responseJson
    } catch (error) {
      throw new Error(error)
    }
  } else {
    return new Promise((resolve, reject) => {
      let requestObj
      if (window.XMLHttpRequest) {
        requestObj = new XMLHttpRequest()
      } else {
        requestObj = new ActiveXObject()
      }

      let sendData = ''
      if (type == 'POST') {
        sendData = JSON.stringify(data)
      }

      requestObj.open(type, url, true)
      requestObj.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
      requestObj.setRequestHeader('token', store.state.UserToken)
      requestObj.send(sendData)
      requestObj.onreadystatechange = () => {
        if (requestObj.readyState == 4) {
          if (requestObj.status == 200) {
            let obj = requestObj.response
            if (typeof obj !== 'object') {
              obj = JSON.parse(obj)
            }
            resolve(obj)
          } else {
            reject(requestObj)
          }
        }
      }
    })
  }
}
