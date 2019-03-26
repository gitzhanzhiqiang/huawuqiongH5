let base = require('./base');
var argument = process.argv.splice(2);

if (argument[0] === 'testServer') {
    base('http://10.1.11.47:80/');
} else if (argument[0] === 'devServer'){
    base('http://10.1.11.48:80/')
} else if (argument[0] === 'production'){
    base('http://120.55.51.117:8010/')
}


// export function baseURL() {
    /* development */
    
    // return '/kxd-admin/' // 王美昕
    // return '/kxd-admin/' // 张永平
    // return '/kxd-admin/' // 俊哥
    // return '/kxd-admin/' // 测试服务器
    // return '/kxd-admin-server/' // 开发服务器

// ------------------------------------------------- //
    /* production */

    // return 'http://10.1.11.43:8080/' // 测试服务器
    // return 'https://hxj.51kaledai.com/admin/' // 线上
// }


