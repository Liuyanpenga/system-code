
  // 整个项目api的管理

import request from "./request"
export default {
  // home组件 左侧表格数据获取
  getTableData(params) {
    return request({
      url: '/home/getTableData',
      method: 'get',
      data: params,
      mock: true
    })
  },
  getCountData() {
    return request({
      url: '/home/getCountData',
      method: 'get',
      mock: true
    })
  },
  getEchartData() {
    return request({
      url: '/home/getEchartData',
      method: 'get',
      mock: true
    })
  },
  getUserData(params) {
    return request({
      url: '/user/getUser',
      method: 'get',
      // 这个mock如果是true的话 用的就是线上fastmock的数据
      mock: false,
      data: params
    })
  },
  addUser(params) {
    return request({
      url: '/user/addUser',
      method: 'post',
      mock: false,
      data: params
    })
  },
  editUser(params) {
    return request({
      url: '/user/editUser',
      method: 'post',
      mock: false,
      data: params
    })
  },
  deleteUser(params) {
    return request({
      url: '/user/deleteUser',
      method: 'get',
      mock: false,
      data: params
    })
  }
}