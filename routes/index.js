/**
 * Created by litong on 15-12-30.
 */
'use strict';

const router = require('koa-router');

const indexRoute = router();
const errorHandle = require('./errorHandle');
const co = require('koa-convert');
const Velocity = require('velocityjs');
const path = require('path');
const fs = require("fs");
const config = require('../config');
const Errors = require('../error');
const nodemailer = require('nodemailer');
const _ = require('lodash');

indexRoute.get('/',co(function *(){
	 this.body=`
		<form action="/" method="post">
			<input type="hidden" value="test" name="name"/>
			<input type="hidden" value="233333" name="token"/>
			to : <input type="text" value="" name="to"/>
			subject : <input type="text" value="" name="subject"/>
			template : <input type="text" value="" name="template"/>
			data : <input type="text" value="" name="data"/>
			<input type="submit" />
		</form>
	 `;
}));

function isEmpty(val){
	if (val === '' || typeof(val) === 'undefined' || val === null)	return true;
}

//首页路由
indexRoute.post('/',co(function *(){
	try {
		// 1.白名单验证
		let name = this.request.body.name;
		let authInfo = config.auth[name];
		if (authInfo.token !== this.request.body.token){
			throw new Errors.tokenInvalidError();
		}
		// 2.参数验证
		if (isEmpty(this.request.body.to)){
			throw new Errors.paramRequiredError('to is empty');
		}
		if (isEmpty(this.request.body.subject)){
			throw new Errors.paramRequiredError('subject is empty');
		}
		if (isEmpty(this.request.body.data)){
			throw new Errors.paramRequiredError('data is empty');
		}
		let template = this.request.body.template;
		if (isEmpty(template)){
			throw new Errors.paramRequiredError('template is empty');
		}
		let currentModule = template.split('/')[0];
		let moduleList = authInfo.permission.split('|');
		if (moduleList[0] !== '*'){
			let findIndex = _.findIndex(moduleList,(item) => {
				if (item === currentModule)	return true;
			});
			if (findIndex === -1){
				throw new Errors.permissionDeniedError(`no ${currentModule} permission`);
			}
		}
		console.log('obj');
		// 3.渲染html
		// 4.发送邮件
		/*
		let temp = fs.readFileSync(path.join(__dirname,'..','mailTemplate',mailMap[index].template),"utf-8");
		this.body = Velocity.render(temp, mailContent);
		let mailMap = JSON.parse(fs.readFileSync(path.join(__dirname,'..','mailMap.json'),"utf-8"));
		yield this.render('index',{mailMap});
		*/
	}catch(e){
		console.error(e);
	}
	
}));

/**
 * 设置路由
 * @param app
 */
module.exports = (app) => {
    app.use(co(indexRoute.routes()));
    errorHandle(app);
};