import request from '../utils/request'

const api = {
  searchTable: '/search-table'
}

export default api

export function getSearchTable (params) {
  return request({
    method: 'get',
    url: api.searchTable,
    params
  })
}
