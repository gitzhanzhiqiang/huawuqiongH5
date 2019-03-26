import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';
 import QRcode from 'qrcodejs2'
import 'element-ui/lib/theme-default/index.css';
import * as filters from './filters/index.js'
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})
import store from '@src/store';
import App from './index.vue';

import login from './login.vue';//用户登入
import logina from './logina.vue';//众员工登入
import index from '@views/userManage/index.vue';  //首页
import userstate from '@views/userManage/userstate.vue'; //我的页面
import userstatetail from '@views/userManage/userstatetail.vue'; //详情
import my from '@views/userManage/my.vue'; //详情
import depositmanagement from '@views/userManage/depositmanagement.vue';//存管开户
import cardidentification from '@views/userManage/cardidentification.vue'; //身份认证
import openaccount from '@views/userManage/openaccount.vue'; //存管开户提交
import loanconsulting from '@views/userManage/loanconsulting.vue'; //贷款咨询
import Personalcenter from '@views/userManage/Personalcenter.vue';//个人中心
import Personal from '@views/userManage/Personal.vue';//修改姓名
import Commonproblems from '@views/userManage/Commonproblems.vue';//常见问题
import registered from '@views/userManage/registered.vue';//注册
import Forgotpassword from '@views/userManage/Forgotpassword.vue';//忘记密码
import share from '@views/userManage/share.vue';//分享
import userstatetaillist from '@views/userManage/userstatetaillist.vue';//
import Getlost from '@views/userManage/Getlost.vue';//
import Giftgiving from '@views/userManage/Giftgiving.vue';//注册2
import withdrawal from '@views/userManage/withdrawal.vue';//提现   
import tiedcard from '@views/userManage/tiedcard.vue';//绑卡   
import bankcard from '@views/userManage/bankcard.vue';//银行卡  
import registeres from '@views/userManage/registeres.vue';//注册跳转


import NProgress from 'nprogress'; // Progress 进度条
import 'nprogress/nprogress.css';// Progress 进度条 样式
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'
import Cookies from 'js-cookie';
import ajax from '@utils/config';
import handleRouter from '@src/utils/handleRouter';

Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(Mint);
Vue.use(ElementUI);

const defaultRoute = {
    path: '/',
    component: App,
    meta: {
        id: '100000',
    },
    children: []
};
const routes = [
    {
        path: '/login',
        name: '用户登录',
        hidden: true,
        component: login
    },
    {
        path: '/logina',
        name: '众人富员工登录',
        hidden: true,
        component: logina
    },
    {
        path: '/', redirect: '/userManage/index'
    },
    {
        path: '/userManage/index',
        name: '首页',
        hidden: true,
        component: index
    },
    {
        path: '/userManage/userstate',
        name: '我的',
        hidden: true,
        component: userstate
    },
    {
        path: '/userManage/userstatetail',
        name: '详情',
        hidden: true,
        component: userstatetail
    },
    {
        path: '/userManage/depositmanagement',
        name: '存管开户',
        hidden: true,
        component: depositmanagement
    },
    {
        path: '/userManage/cardidentification',
        name: '身份认证',
        hidden: true,
        component: cardidentification
    },
    {
        path: '/userManage/openaccount',
        name: '存管开户开通',
        hidden: true,
        component: openaccount
    },
    {
        path: '/userManage/my',
        name: '个人中心',
        hidden: true,
        component: my
    },
    
     {
        path: '/userManage/loanconsulting',
        name: '贷款咨询',
        hidden: true,
        component: loanconsulting
    },
     {
        path: '/userManage/Personalcenter',
        name: '个人中心详情',
        hidden: true,
        component: Personalcenter
    },
     {
        path: '/userManage/Personal',
        name: '修改名字',
        hidden: true,
        component: Personal
    },
	{
        path: '/userManage/Commonproblems',
        name: '常见问题',
        hidden: true,
        component: Commonproblems
    },
    {
        path: '/userManage/registered',
        name: '注册',
        hidden: true,
        component: registered
    },
    {
        path: '/userManage/Forgotpassword',
        name: '忘记密码',
        hidden: true,
        component: Forgotpassword
    },
     {
        path: '/userManage/share',
        name: '分享',
        hidden: true,
        component: share
    },
    {
        path: '/userManage/userstatetaillist',
        name: '商城分享',
        hidden: true,
        component: userstatetaillist
    },
     {
        path: '/userManage/Getlost',
        name: '挂了',
        hidden: true,
        component: Getlost
    },
    {
        path: '/userManage/Giftgiving',
        name: '注册送礼',
        hidden: true,
        component: Giftgiving
    },
    {
        path: '/userManage/withdrawal',
        name: '提现',
        hidden: true,
        component: withdrawal
    },
     {
        path: '/userManage/tiedcard',
        name: '绑卡',
        hidden: true,
        component: tiedcard
    },
    {
        path: '/userManage/bankcard',
        name: '银行卡',
        hidden: true,
        component: bankcard
    },
    {
        path: '/userManage/registeres',
        name: '注册跳转',
        hidden: true,
        component: registeres
    },
    
    defaultRoute,
];

export default routes;

const router = new VueRouter({
    scrollBehavior: () => ({y: 0}),
    routes
})

let toHome = false;

//全局钩子作用于所有路由，里面的参数to表示即将要进入的路由对象，from表示即将要离开的路由对象 路由进入之前
router.beforeEach((to, from, next) => {
    // 开启Progress
    NProgress.start();
    //重定向到login时
    if (from.path === '/' && to.path === '/login') {
        if (store.getters.token && !store.getters.user) {
            toHome = true;
        }

    }
    //登录且有用户信息

    // console.log('localStorage.getItem(\'userid\')')
    // console.log(localStorage.getItem('userid'));

    // if (store.getters.userid) {
    //     if (!to.name) {
    //         // 404
    //         console.log(11112);
    //     }
    //     if (to.path === '/login') {
    //         console.log(11111);
    //         next();

    //     } else {
    //         // headerSelected(to, vm);
    //         // detailLink(to);
    //         console.log(11113);
    //         next();
    //     }
    // } else if (!store.getters.userid && localStorage.getItem('userid')) {
    //     // 登录且没有用户信息
    //     console.log(11114);
    //     next();
    // } else if (to.path === '/login') {
    //     console.log(11115);
    //     // 未登录
    //     next();
    // } else {
    //     next('/login');
    //     console.log(11116);
    // }
    next();
    NProgress.done();
});
// //路由进入之后
router.afterEach((to, from) => {
    NProgress.done(); // 结束Progress
});
new Vue({
    el: '#app',
    store,
    router,
    template: '<App />',
    components: {App},
    mounted() {

    }
});
