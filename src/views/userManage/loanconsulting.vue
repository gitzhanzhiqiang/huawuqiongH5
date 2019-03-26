<template>
    <div class="app-container" :style="">
       	<mt-header title="贷款咨询">
            <mt-button @click="fanhui" icon="back" slot="left"></mt-button>
        </mt-header>
       	
       	 <div class="product">
           <h1>关注官方微信公众号</h1>
           <p>新口子、新活动，独家秘笈</p>
           <img :src="fanhuiRight"/>
           <p>长按图片保存打开微信扫一扫</p>
       </div>
       	<div class="Product_information">
       		<p>
       			<span style="font-weight: 800;font-size: 0.32rem;">官方QQ群</span>
       			<input type="text" id="cpLink" readonly="readonly" v-model="link" />
       			<mt-button type="primary" @click='fuzhi' class="aniu">复制QQ群</mt-button>
       		</p>
       		<p style="border: none;">
       			<span style="font-weight: 800;font-size: 0.32rem;">客服微信号</span>
       			<input type="text" id="cpLinka" readonly="readonly" v-model="linka" />
       			<mt-button type="primary" @click='fuzhia' class="aniu">复制微信号</mt-button>
       		</p>
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
                fanhuiRight: require("@res/img/img/erweima.jpg"),
                jiekuan_hou: require("@res/img/img/db_shouye_hui.png"),
                wode_h: require("@res/img/img/db_shangcheng.png"),
                 wode_x: require("@res/img/img/db_wode_hui.png"),
                 link:'859364649',
                  linka:'huahua_lukouzi',
            }
        },
        computed: {},
        created() {
        },
        mounted() {
        },
        methods: {
           fuzhi(){
           	var url = document.getElementById("cpLink");
		    url.select();
		    document.execCommand("copy");
		    Toast({
                 message: "复制成功！",
                 position: 'bottom',
             });
             return
           },
           fuzhia(){
           	var url = document.getElementById("cpLinka");
		    url.select();
		    document.execCommand("copy");
		    Toast({
                 message: "复制成功！",
                 position: 'bottom',
             });
             return
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
        border: 1px solid #E6E6E6;
    }
    .app-container {
        background-size: cover;
        background-repeat: no-repeat;
        height: 100%;
        background-color: white;
    }



    .fontsize1-4 {
        font-size: 1.4rem;
    }
	.product,.Lending_guidelines{
		 width: 92%;
		 display: block;
        margin: 0 auto;
	}
	.product h1{
		color: #333333;
		font-size: 0.36rem;
		text-align: center;
		margin-top: 1rem;
		line-height: 0.5rem;
	}
	.product p{
		color: #333333;
		font-size: 0.28rem;
		text-align: center;
		line-height: 0.5rem;
		margin-bottom: 0.81rem;
	}
   	.product img{
   		display: block;
   		margin: 0 auto;
   		width: 3.6rem;
   		height: 3.6rem;
   		margin-bottom: 0.23rem;
   		border: 1px solid #CCCCCC;
   	}
   	
   .Product_information{
   		width: 7rem;
   		margin: 0 auto;
   		height: 2.98rem;
   		box-shadow:0px 0px 9px rgba(0,0,0,0.21);
   		border-radius: 0.1rem;
   }
   .Product_information p{
   		width: 90%;
   		height: 1.48rem;
		 display: block;
        margin: 0 auto;
        line-height: 1.48rem;
        border-bottom: 1px solid #E6E6E6;
   }
   .Product_information p input{
   		width: 2.5rem;
   		display: inline-block;
   		line-height: 1.48rem;
   		font-size: 0.32rem;
   		outline: none;
   		background: none;
   }
   .Product_information .aniu{
   	width: 2rem;
   	height: 0.68rem;
   		float: right;
   		margin-top: 0.4rem;
   		font-size: 0.28rem;
   		color: white;
   	}
   	
</style>