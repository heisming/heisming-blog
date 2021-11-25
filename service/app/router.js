'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  require('./router/blog/blog')(app);
  require('./router/admin/admin')(app);
};
