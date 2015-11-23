var log4js = require('log4js');
var log4js_extend = require("log4js-extend");
log4js_extend(log4js, {
  path: __dirname,
  format: "at @name (@file:@line:@column)"
});
var logger = log4js.getLogger();

exports.logger = logger;