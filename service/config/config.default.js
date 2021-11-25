/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1636593950249_4362';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  // 数据库配置
  config.mysql = {
    client: {
      host: 'localhost',
      port: '3306',
      user: 'root',
      password: 'L!N!m9snoa',
      database: 'blog',
    },
    app: true,
    agent: false,
  };
  // egg安全策略
  config.security = {
    csrf: {
      enable: false,
    },
    domainWhiteList: [ '*' ],
  };
  // 修改为JWT鉴权
  // 跨域
  config.cors = {
    origin: 'http://localhost:3000',
    // origin: '*',
    credentials: true, // 允许cookie可以跨域（及其不安全的做法）
    allowMethods: 'GET, HEAD, PUT, POST, DELETE, PATCH, OPTIONS',
  };

  return {
    ...config,
    ...userConfig,
  };
};
