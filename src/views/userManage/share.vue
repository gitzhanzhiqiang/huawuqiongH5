<template>
    <div class="app-container" :style="logins">
        <mt-header title="">
            <mt-button @click="fanhui" icon="back" slot="left"></mt-button>
        </mt-header>
        <img :src="logo" />
        <div class="fenxiang">
          	 <div id="qrcode"></div>
             <p>长按扫码，立即申请</p>
        </div>
        

    </div>
</template>
<script>
    import QRCode from 'qrcodejs2';
    import ajax from '@utils/config';
    import { pickerOptions } from '@constants/index';
    import { praseMoney, parseTime, loanStatusFilter } from '@src/filters';
    // import {validatPhone} from '@src/utils/validate';
    import store from '@src/store';
    import Cookies from 'js-cookie';
    import { Toast, MessageBox } from 'mint-ui';
    import baseURL from '$lib/utils/baseURL';
    export default {
        data() {
            var login = require("@res/img/img/fen.jpg");
            return {
                listLoading: true, //列表加载状态
                logins: {
                    backgroundImage: "url(" + login + ")",
                },
                logo: require("@res/img/img/logo.png"),
                fanhuiRight: require("@res/img/new/fanhui-right.png"),
                jiekuan_hou: require("@res/img/img/db_shouye_hui.png"),
                wode_h: require("@res/img/img/db_shangcheng.png"),
                wode_x: require("@res/img/img/db_wode_hui.png"),
            }
        },
        computed: {},
        created() { 
            this.$nextTick(() => {
                this.qrcode()
            })
            this.open7()
        },
        mounted() {
        },
        methods: {

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
                this.$router.push({ path: '/login' });
            },
            gourl() {
                this.$router.push({ path: '/userManage/index' });
            },
            gourl1() {
                this.$router.push({ path: '/userManage/userstate' });
            },
            fanhui() {
                this.$router.push({ path: '/userManage/my' });
            },
            godeposit() {
                this.$router.push({ path: '/userManage/openaccount' });
                // this.$router.push({ path: '/userManage/depositmanagement' });
            },
            gocardident() {
                this.$router.push({ path: '/userManage/cardidentification' });
            },// 不能点击有提示信息显示

            xuanze() {
                $(".down").slideDown()
            },

            xiao() {
                $(".down").slideUp()
            },

            open7() {
               
            	var token = localStorage.getItem("token")
                var MessageBoxs = localStorage.getItem("MessageBoxs")
            	if(token == null){
            		this.$router.push({path: '/login'});
            	}else{
                    if(MessageBoxs == 1){
                        console.log(1)
                    }else{
                        MessageBox.alert('分享的图片会生成专属与你的二维码，其注册带来的返佣会直接进入您的账户。', '分享链接').then(action => {
                            localStorage.setItem('MessageBoxs',1);
                        });
                    }
            		 
            	}
               
            },
            qrcode() {
            	var userId = localStorage.getItem("userId")
            	var inviteCode = localStorage.getItem("inviteCode")
            	var headUrl = localStorage.getItem("headUrl")
                var name = localStorage.getItem("name")
            	console.log(inviteCode)
            	var str ={
            		userId:userId,
            		inviteCode:inviteCode,
            		headUrl:headUrl,
                    name:name,
            	}
            	console.log(str)
         	    // this.$router.push({
				// 	path: '/userManage/userstatetaillist',
				// 	query: {
				// 		data: JSON.stringify(str)
				// 	}
				// })
                let qrcode = new QRCode('qrcode', {
                    width: 124,
                    height: 125, // 高度
                    text: 'https://www.zhaogu168.com/wxH5html/#/userManage/userstatetaillist?data='+JSON.stringify(str) // 二维码内容
                    // // render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
                    // // background: '#f0f'
                    // // foreground: '#ff0'
                })//http://192.168.1.78:8099/
               // https://www.zhaogu168.com/wxH5html/
                console.log(qrcode)
            }


        },
        filters: {}
    }
</script>
<style lang="less" scoped>
.app-container{
    position: relative;
}
 #qrcode{
     width: 2.30rem;
     height:2.30rem;
     margin:0 auto;
      border: 1px solid #CCCCCC;
    }
    .mint-header{
    	background: none!important;
        
    }
    
    .app-container {
        background-size: cover;
        background-repeat: no-repeat;
        height: 12.98rem;
    }
	.app-container>img{
		width: 3rem;
		height: 1rem;
		display: block;
		margin-left: 1.5rem;
		margin-top: 0.4rem;
	}
	.fenxiang{
		width: 100%;
		position: absolute;
		bottom: 0.17rem;
	
	}
	.fenxiang img{
		display: block;
		width: 2.30rem;
	    height: 2.30rem;
	    margin: 0 auto;
	}
    .fenxiang p{
    	text-align: center;
    	line-height: 1.12rem;
    }
	.product,.Lending_guidelines{
		 width: 92%;
		 display: block;
        margin: 0 auto;
	}
	.product h1{
		color: #333333;
		font-size: 1.3rem;
		line-height: 2rem;
	}
	.product p{
		color: #333333;
		font-size: 1.2rem;
		line-height: 3rem;
		text-indent: 2em;
		margin-bottom: 2rem;
	}
   
   
</style>