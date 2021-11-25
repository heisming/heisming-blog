'use strict';

/**
 * @param {Egg.Application} app - egg application
 * @author HEISMING
 * @description 博客前台路由
 * @time 2021-11-13
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/blog/index', controller.blog.home.index);
  router.get('/blog/getArticleList', controller.blog.home.getArticleList);
  router.get('/blog/getArticleById/:id', controller.blog.home.getArticleById);
  router.get('/blog/getTypeInfo', controller.blog.home.getTypeInfo);
  router.get('/blog/getArticleListById/:id', controller.blog.home.getArticleListById);
};
