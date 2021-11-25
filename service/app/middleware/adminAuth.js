'use strict';

module.exports = () => {
  return async function adminAuth(ctx, next) {
    // console.log('ctx', ctx);
    console.log('ctx.session', ctx.session);
    // console.log('ctx.session.openId', ctx.session.openId);
    if (ctx.session.openId) {
      await next();
    } else {
      ctx.body = { data: '没有登录' };
    }
  };
};
