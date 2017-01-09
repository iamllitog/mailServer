/**
 * Created by litong on 15-11-11.
 */
'use strict';

const co = require('koa-convert');

module.exports = (app) => {

    //404页面
    app.use(co(function *() {
        this.status = 404;
        this.body='2333';
    }));

};