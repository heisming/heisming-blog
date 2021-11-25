const dev = true
const baseUrl = dev ? 'http://127.0.0.1:7001/admin/' : 'www.heisming.com'

const serivePath = {
  // 登录接口
  login: baseUrl + 'login',
  // 获得文章类别
  getTypeInfo: baseUrl + 'getTypeInfo',
  // 添加文章
  addArticle: baseUrl + 'addArticle',
  // 修改文章
  updateArticle: baseUrl + 'updateArticle',
  // 获得文章列表
  getArticleList: baseUrl + 'getArticleList',
  // 删除文章
  deleteArtcle: baseUrl + 'deleteArtcle/',
  // 根据文章ID得到文章详情，用于修改文章
  getArticleById: baseUrl + 'getArticleById/'
}

export default serivePath