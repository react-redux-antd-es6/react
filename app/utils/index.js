import { message } from 'antd'
import { hashHistory } from 'react-router'
import * as ajaxFun from './ajax'

export const ajax = ajaxFun
export function isArray(arr) {
  return Object.prototype.toString.call(arr) === '[object Array]'
}

const logOut = () => {
  sessionStorage.clear()
  hashHistory.push('/login')
}

export const createAjaxAction = (api, startAction, endAction) => (data, cb, reject) =>
  (dispatch) => {
    let respon
    let newData = data
    startAction && dispatch(startAction())
    // 每个请求带上token
    const token = sessionStorage.getItem('token')
    if (token) {
      if (!newData) {
        newData = {}
      }
      newData.token = token || null
    }
    newData = isArray(newData) ? newData : [newData]
    api(...newData)
      .then(checkStatus) // eslint-disable-line no-use-before-define
      .then(response => response.json())
      .then((resp) => {
        respon = resp
        endAction && dispatch(endAction({ req: newData, res: resp }))
      })
      .then(() => {
        switch (respon.status) {
        case 1:
          cb && cb(respon)
          break
        case 0:
          if (typeof (reject) === 'function') {
            reject(respon)
          } else {
            message.error(respon.msg)
          }
          break
        default:
          console.log('status的返回值不是0或1')
          logOut()
        }
      })
      .catch(catchError) // eslint-disable-line no-use-before-define
  }

/* export const createAjax = (url, param, callback) => {
  let respon;
  ajax.fetchJSONByPost(url)(param)
    .then(checkStatus) // eslint-disable-line no-use-before-define
    .then(response => response.json())
    .then((resp) => {
      respon = resp
    })
    .then(() => {
      if (respon.status === 1) {
        callback && callback(respon.data)
      }
    })
    .catch(catchError) // eslint-disable-line no-use-before-define
} */

/* export const hasResponseError = (data, errorHandler) => {
  // 101  表示非法获取数据 跳转到登陆页面
  if (data && data.status === '-1') {
    logOut()
    return true
  }
  // if (data && data.errorCode == '102') {
  //   logOut()
  //   return true
  // }
  // 如果是401  表示其他错误
  // if (data && data.errorCode == '401') {
  // message.error(data.msg)
  // return true
  // }
  if (typeof data !== 'object') {
    try {
      // eslint-disable-next-line no-param-reassign
      data = JSON.parse(`${data}`);
    } catch (e) {
      message.error(`非法的响应数据格式，请联系管理员！[${data}]`) // eslint-disable-line no-undef
      return true
    }
  }
  if (!data.status && errorHandler === undefined) {
    return true
  }
  if (!data.status && data.httpError && errorHandler !== undefined) {
    return typeof errorHandler === 'function' ? errorHandler(data.httpError) : errorHandler
  }

  return false
}; */

/* export const createApiCustomAjax = (api, startAction, endAction) => (data, apiParam, cb) =>
  (dispatch) => {
    let respon
    dispatch(startAction())
    // eslint-disable-next-line no-param-reassign
    data = isArray(data) ? data : [data]
    api(apiParam)(...data)
      .then(checkStatus) // eslint-disable-line no-use-before-define
      .then(response => response.json())
      .then((resp) => {
        respon = resp
        dispatch(endAction({ req: data, res: resp }))
      })
      .then(() => {
        if (respon.status === 1) {
          cb && cb(respon)
        }
      })
      .catch(catchError) // eslint-disable-line no-use-before-define
  }

export const fakeAjaxAction = (startAction, endAction, callBackAction) => (data, cb) => dispatch => {
  dispatch(startAction())
  dispatch(endAction({ req: {}, res: { data: data } }))
  callBackAction && dispatch(callBackAction())
} */

function catchError(error) {
  const { response } = error
  if (!response) {
    console.log(error)
    return
  }
  if (response.status === 401) {
    message.error('请重新登录！')
    // 线上环境，刷新页面以重定向到登录页面
    process.env.NODE_ENV === 'production' && location.reload()
  } else if (response.status === 403) {
    message.error('你缺少相关权限，部分功能无法使用')
  }
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  }
  const error = new Error(response.statusText)
  error.response = response
  throw error
}
