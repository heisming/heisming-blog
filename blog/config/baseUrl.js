const dev = true
const baseUrl = dev ? 'http://127.0.0.1:7002/blog' : 'www.heisming.com'

const serivePath = {
  // 首页接口
  getArticleList: baseUrl + '/getArticleList',
  // 详细页接口
  getArticleById: baseUrl + '/getArticleById/',
  // 类别
  getTypeInfo: baseUrl + '/getTypeInfo',
  // 根据类别ID获得文章列表
  getArticleListById: baseUrl + '/getArticleListById/'
}

export default serivePath