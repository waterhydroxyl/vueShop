export function debounce(fun, delay) {
  let timer = null
  return function (...arg) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fun.apply(this, arg)
    }, delay)
  }
}

export function throttle(fun, delat) {
  let canRun = true
  return function (...arg) {
    if (!canRun) {
      return
    }
    setTimeout(() => {
      fun.apply(this, arg)
      canRun = true
    }, delat)
    canRun = false
  }
}

const TokenKey = 'Token'

export function setToken(token) {
  return window.localStorage.setItem(TokenKey, token)
}
export function getToken() {
  return window.localStorage.getItem(TokenKey)
}
export function removeToken() {
  return window.localStorage.remove(TokenKey)
}
