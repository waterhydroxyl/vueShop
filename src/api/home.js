import service from 'api/request'

export function getHomeMultidata() {
  return service({
    url: '/home/multidata',
    method: 'get'
  })
}
export function getHomeGood(type, page) {
  return service({
    url: '/home/data',
    method: 'get',
    params: {
      type,
      page
    }
  })
}
