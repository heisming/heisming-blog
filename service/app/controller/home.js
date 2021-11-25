'use strict';
/**
 * @description 系统自带路由
 */

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }

  async list() {
    const { ctx } = this;
    ctx.body = '<h1>this is list</h1>';
  }
}

module.exports = HomeController;
