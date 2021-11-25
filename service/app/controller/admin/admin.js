'use strict';
/**
 * @author HEISMING
 * @description 博客中台路由配置
 * @time 2021-11-13
 */

const Controller = require('egg').Controller;

class AdminController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'api admin';
  }

  // 登录方法
  // 判断用户名密码是否正确
  async checkLogin() {
    const username = this.ctx.request.body.username;
    const password = this.ctx.request.body.password;
    // SQL注入问题
    const sql = " SELECT username FROM admin_user WHERE username = '" + username +
                "' AND password = '" + password + "'";
    const res = await this.app.mysql.query(sql);
    if (res.length > 0) {
      // 登录成功,进行session缓存
      const openId = new Date().getTime();
      this.ctx.session.openId = { openId };
      console.log('this.ctx.session.openId', this.ctx.session.openId);
      this.ctx.body = { data: '登录成功', openId };
    } else {
      this.ctx.body = { data: '登录失败' };
    }
  }

  // 获取类型
  async getTypeInfo() {
    const resType = await this.app.mysql.select('type');
    this.ctx.body = { data: resType };
  }

  // 添加文章
  async addArticle() {
    const tmpArticle = this.ctx.request.body;
    const result = await this.app.mysql.insert('article', tmpArticle);
    const insertSuccess = result.affectedRows === 1;
    const insertId = result.insertId;
    this.ctx.body = {
      insertSuccess,
      insertId,
    };
  }

  // 修改文章
  async updateArticle() {
    const tmpArticle = this.ctx.request.body;
    const result = await this.app.mysql.update('article', tmpArticle);
    const updateSuccess = result.affectedRows === 1;
    this.ctx.body = {
      updateSuccess,
    };
  }

  // 获取文章列表
  async getArticleList() {
    const sql = 'SELECT article.id as id,' +
                'article.title as title,' +
                'article.introduce as introduce,' +
                'article.view_count as view_count,' +
                "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime," +
                'type.typeName as typeName ' +
                'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
                // 倒序排列
                'ORDER BY article.id DESC ';
    const resList = await this.app.mysql.query(sql);
    this.ctx.body = { list: resList };
  }

  // 删除文章
  async deleteArtcle() {
    const id = this.ctx.params.id;
    const result = await this.app.mysql.delete('article', { id });
    this.ctx.body = { data: result };
  }
  // 根据文章ID得到文章详情，用于修改文章
  async getArticleById() {
    const id = this.ctx.params.id;

    const sql = 'SELECT article.id as id,' +
    'article.title as title,' +
    'article.introduce as introduce,' +
    'article.article_content as article_content,' +
    "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime," +
    'article.view_count as view_count ,' +
    'type.typeName as typeName ,' +
    'type.id as typeId ' +
    'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
    'WHERE article.id=' + id;
    const result = await this.app.mysql.query(sql);
    this.ctx.body = { data: result };
  }

}

module.exports = AdminController;
