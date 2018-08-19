/*
 * @Author: beyondouyuan
 * @Date:   2018-06-16 06:39:25
 * @Last Modified by:   beyondouyuan
 * @Last Modified time: 2018-08-10 00:27:48
 */

export const isMobile = () => {
  const flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i) ? true : false
  return flag;
}

export const setStorage = (k, v) => {
  localStorage.setItem(k, JSON.stringify(v))
}

export const getStorage = (k) => {
  return JSON.parse(localStorage.getItem(k))
}

export const removeStorage = (k) => {
  return localStorage.removeItem(k)
}

export const setSessionStorage = (k, v) => {
  sessionStorage.setItem(k, JSON.stringify(v))
}

export const getSessionStorage = (k) => {
  return JSON.parse(sessionStorage.getItem(k))
}
export const removeSessionStorage = (k) => {
  return sessionStorage.removeItem(k)
}
