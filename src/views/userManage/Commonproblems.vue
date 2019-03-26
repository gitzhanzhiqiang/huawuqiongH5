<template>
    <div class="app-container" :style="">
       	<mt-header title="常见问题">
            <mt-button @click="fanhui" icon="back" slot="left"></mt-button>
        </mt-header>
       	
       	 <div class="product">
           <h1>贷款额度批多少，跟哪些情况有关？</h1>
           <p>有网友曾遇到这样的情况，明明申请了5000元的额度，批下来却只有3000额度。很多朋友都很不解这是怎么一回事。其实，额度的高低与你提供给放款机构的信息是息息相关的。那么，哪些资料会到底额度降低？</p>
          <p>贷款额度批多少，跟这些有关！</p>
          <p>1、信用状况想获贷，放款方必定要考察借款人的信用状况。有个好信用，才能放心放款不是？如果你的征信中有一两次逾期记录，那么你申请借款成功了，额度是比原先申请的要低一些的。有些贷款产品是不看征信的，但会查看借款人的淘宝、京东账号等。你消费越高，自然获取的额度也越高。当然，是在没有逾期的前提下。除此之外，有些放款机构也会参考芝麻信用，分数高，说明你信用好，额度自然也越高。</p>
          <p>2、还贷能力个人收入直接影响到你的还贷能力，收入越高，还贷能力越强，额度当然也高啦。不过，如果放款机构认为你职业不稳定的话，即使你收入再高，也有可能获得的额度不高。</p>
          <p>3、违约成本提交申请后，会默认放款机构可以读取你的通讯录信息。如果你通讯录里面有一些欠款不还的，正在被追债的，或者有犯罪前科的，可能这也会影响你的贷款审批及放款额度。除此之外，你的好友质量也会影响到你的授信额度。如果你身边的好友质量很好，这也会增加借款机构对你的好感度，这就好比添加芝麻分高的好友有助于提升个人芝麻分，办信用卡时填写信用等级高的联系人，批卡就更容易是一个道理。</p>
       </div>
       	
    </div>
</template>
<script>
    import ajax from '@utils/config';
    import {pickerOptions} from '@constants/index';
    import {praseMoney, parseTime, loanStatusFilter} from '@src/filters';
    // import {validatPhone} from '@src/utils/validate';
    import store from '@src/store';
    import Cookies from 'js-cookie';
    import {Toast} from 'mint-ui';

    export default {
        data() {
            var login = require("@res/img/new/login_bg.jpg");
            return {
                listLoading: true, //列表加载状态
                logins: {
                    backgroundImage: "url(" + login + ")",
                },
                fanhuiRight: require("@res/img/new/fanhui-right.png"),
                jiekuan_hou: require("@res/img/img/db_shouye_hui.png"),
                wode_h: require("@res/img/img/db_shangcheng.png"),
                 wode_x: require("@res/img/img/db_wode_hui.png"),
                
            }
        },
        computed: {},
        created() {
            this.getApplyList();
        },
        mounted() {
        },
        methods: {
            getaccount() {
                
            },

            getApplyList() {
                
            },

            gologin() {
                Toast({
                    message: "退出登录",
                    position: 'bottom',
                });
                Cookies.set('phone', '');
                Cookies.set('userid', '');
                Cookies.set('wyjrpwdtype', '');
                Cookies.set('accountype', '');
                Cookies.set('accouncount', '');

                // localStorage.setItem('isopenaccount', 0);

                localStorage.setItem('phone', '');
                localStorage.setItem('userid', '');
                localStorage.setItem('wyjrpwdtype', '');
                localStorage.setItem('accountype', '');
                localStorage.setItem('accouncount', '');
                this.$router.push({path: '/login'});
            },
            gourl() {
                this.$router.push({path: '/userManage/index'});
            },
            gourl1() {
                this.$router.push({path: '/userManage/userstate'});
            },
            fanhui(){
            	this.$router.push({path: '/userManage/my'});
            },
            godeposit() {
                this.$router.push({path: '/userManage/openaccount'});
                // this.$router.push({ path: '/userManage/depositmanagement' });
            },
            gocardident() {
                this.$router.push({path: '/userManage/cardidentification'});
            },// 不能点击有提示信息显示
            
            xuanze(){
            	$(".down").slideDown()
            },
			
			 xiao(){
			 	$(".down").slideUp()
			 },
        },
        filters: {}
    }
</script>
<style lang="less" scoped>
   
    .mint-header{
        color: #000;
        font-size: 0.32rem;
    }
    .app-container {
        background-size: cover;
        background-repeat: no-repeat;
        height: 100%;
    }



    
	.product,.Lending_guidelines{
		 width: 92%;
		 display: block;
        margin: 0 auto;
	}
	.product h1{
		color: #333333;
		font-size: 0.32rem;
		line-height: 0.5rem;
	}
	.product p{
		color: #333333;
		font-size: 0.24rem;
		line-height: 0.5rem;
		text-indent: 2em;
		margin-bottom: 0.1rem;
	}
   
   
</style>