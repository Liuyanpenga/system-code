import Mock from 'mockjs'
import homeApi from './mockData/home'
import userApi from './mockData/user'
// 拦截请求
Mock.mock('/home/getData', homeApi.getHomeData)

// 本地获取 user 的数据拦截
Mock.mock(/user\/getUser/, 'get', userApi.getUserList)
Mock.mock(/user\/addUser/, 'post', userApi.createUser)
Mock.mock(/user\/editUser/, 'post', userApi.updateUser)
Mock.mock(/user\/deleteUser/, 'get', userApi.deleteUser)