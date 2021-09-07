import axios from 'axios'

const service = axios.create({
  baseURL: '/loginapi', // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})
service.interceptors.request.use((config) => {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  // console.log(config)
  return config
})
export function userRegister(loginForm) {
  return service({
    url: '/users',
    method: 'POST',
    data: loginForm
  })
}
export function userLogin(loginForm) {
  return service({
    url: '/login',
    method: 'POST',
    data: loginForm
  })
}
