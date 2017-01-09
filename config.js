/**
 * Created by litong on 15-12-29.
 */
'use strict';
/**
 * 应用配置文件--开发环境
 */
const develop = {
    //监听端口
    port : 8090,
    //cookie密钥
    cookieKeys : ['why i am ','a array?'],
    //认证白名单
    auth : {
    	test : {
    		token : '233333',
    		permission : '*'
    	},
    },
};
module.exports = develop;