/**
 * Created by litong on 15-12-28.
 */
'use strict';

const koa = require('koa');
const path = require('path');
const favicon = require('koa-favicon');
const logger = require('koa-logger');
const koaBody = require('koa-body');
const gzip = require('koa-compress');
const co = require('koa-convert');

const config = require('./config');
const routes = require('./routes');

const app = new koa();

//设置cookie签名密钥
app.keys = config.cookieKeys;
//gizp压缩,要放在第一的位置
app.use(gzip());
//日志
app.use(co(logger()));
//请求解析器
app.use(co(koaBody()));
//路由设置+异常处理
routes(app);

module.exports = app;