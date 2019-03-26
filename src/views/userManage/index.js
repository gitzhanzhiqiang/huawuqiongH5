import Template from '@src/template';

import index from './index';
import depositmanagement from './depositmanagement';
import cardidentification from './cardidentification';
import userstate from './userstate';
import userstatetail from './userstatetail';
import loanconsulting from './loanconsulting';//贷款咨询
import Personalcenter from './Personalcenter';//个人中心
import Commonproblems from './Commonproblems';//常见问题
import registered from './registered';//注册
import share from './share';//分享
import userstatetaillist from './userstatetaillist';//商城**  
import Forgotpassword from './Forgotpassword';//忘记密码 
import my from './my';
import Getlost from './Getlost';
import Giftgiving from './Giftgiving';
import withdrawal from './withdrawal';//提现
import tiedcard from './tiedcard';//绑卡  
import bankcard from './bankcard';//银行卡   
import registeres from './registeres';//注册跳转

module.exports = {
    path: '/userManage',
    component: Template,
    meta: {
        title: '我的'
    },
    children: [
        {
            path: 'userstate',
            name: 'userManage_userstate',
            component: userstate,
            meta: {
                title: '首页'
            }
        }, {
            path: 'index',
            name: 'userManage_drainageUser',
            component: index,
            meta: {
                title: '首页'
            }
        },
        {
            path: 'depositmanagement',
            name: 'userManage_depositmanagement',
            component: depositmanagement,
            meta: {
                title: '存管开户'
            }
        },
        {
            path: 'cardidentification',
            name: 'userManage_cardidentification',
            component: cardidentification,
            meta: {
                title: '身份证识别'
            }
        },
        {
            path: 'userstatetail',
            name: 'userManage_userstatetail',
            component: userstatetail,
            meta: {
                title: '详情'
            }
        },
        {
            path: 'userstatetaillist',
            name: 'userManage_userstatetaillist',
            component: userstatetaillist,
            meta: {
                title: '商城'
            }
        },
        {
            path: 'my',
            name: 'userManage_my',
            component: my,
            meta: {
                title: '个人中心'
            }
        },
        {
            path: 'loanconsulting',
            name: 'userManage_loanconsulting',
            component: loanconsulting,
            meta: {
                title: '贷款咨询'
            }
        },
        {
            path: 'Personalcenter',
            name: 'userManage_Personalcenter',
            component: Personalcenter,
            meta: {
                title: '个人中心'
            }
        },
         {
            path: 'Personal',
            name: 'userManage_Personal',
            component: Personal,
            meta: {
                title: '修改姓名'
            }
        },
        {
            path: 'Commonproblems',
            name: 'userManage_Commonproblems',
            component: Commonproblems,
            meta: {
                title: '常见问题'
            }
        },
        {
            path: 'registered',
            name: 'userManage_registered',
            component: registered,
            meta: {
                title: '注册'
            }
        },
         {
            path: 'Forgotpassword',
            name: 'userManage_Forgotpassword',
            component: Forgotpassword,
            meta: {
                title: '忘记密码'
            }
        },
        {
            path: 'share',
            name: 'userManage_share',
            component: share,
            meta: {
                title: '分享'
            }
        },
        {
            path: 'Getlost',
            name: 'userManage_Getlost',
            component: Getlost,
            meta: {
                title: '挂了'
            }
        },
        {
            path: 'Giftgiving',
            name: 'userManage_Giftgiving',
            component: Giftgiving,
            meta: {
                title: '注册送礼'
            }
        },
        {
            path: 'withdrawal',
            name: 'userManage_withdrawal',
            component: withdrawal,
            meta: {
                title: '提现'
            }
        },
         {
            path: 'tiedcard',
            name: 'userManage_tiedcard',
            component: tiedcard,
            meta: {
                title: '绑卡'
            }
        },
        {
            path: 'bankcard',
            name: 'userManage_bankcard',
            component: bankcard,
            meta: {
                title: '银行卡'
            }
        },
        {
            path: 'registeres',
            name: 'userManage_registeres',
            component: registeres,
            meta: {
                title: '银行卡'
            }
        },
    ]

}