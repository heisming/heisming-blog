'use strict';
/**
 * @author HEISMING
 * @description 博客中台路由
 * @time 2021-11-13
 */

module.exports = app => {
  const { router, controller } = app;
  // 校验中间件
  // const adminAuth = app.middleware.adminAuth();
  router.post('/admin/login', controller.admin.admin.checkLogin);
  router.get('/admin/index', controller.admin.admin.index);
  // router.get('/admin/getTypeInfo', adminAuth, controller.admin.admin.getTypeInfo);
  // 都要进行校验
  router.get('/admin/getTypeInfo', controller.admin.admin.getTypeInfo);
  router.post('/admin/addArticle', controller.admin.admin.addArticle);
  router.post('/admin/updateArticle', controller.admin.admin.updateArticle);
  router.get('/admin/getArticleList', controller.admin.admin.getArticleList);
  router.get('/admin/deleteArtcle/:id', controller.admin.admin.deleteArtcle);
  router.get('/admin/getArticleById/:id', controller.admin.admin.getArticleById);
};
