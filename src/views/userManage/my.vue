<template>
    <div class="app-container" :style="" v-loading="listLoading">
    <div class="tuobu" :style="loginbei">
       	<div class="herda" v-show='xian'>
       		<p><span @click="denglu">登录</span>/<span @click="zhuce">注册</span></p>
       	</div>
       	
       	<div class="herd" v-show="xiana">
       		<p><img :src="fanhuiRight"/><span style="float: left;">{{mtel}}</span></p>
       		<span class="yaoqimgma">邀请码：{{inviteCode}}</span>
       	</div>
     </div> 
     <div class="jine">
     	<ul>
     		<li @click="zhanhuyue" style="background:linear-gradient(0deg,rgba(0,115,233,1) 0%,rgba(35,134,246,1) 100%);margin-left: 0.14rem;">
     			<span>账户余额（元）</span>
     			<p>{{requestdata.balance}}</p>
     		</li>
     		<li style="background: #FF5A4E;margin-left: 0.17rem;">
     			<span>一级推广（人）</span>
     			<p>{{requestdata.oneCount}}</p>
     		</li>
     		<li style="background:linear-gradient(0deg,rgba(255,195,78,1) 0%,rgba(255,195,78,1) 99%);margin-left: 0.22rem;">
     			<span>二级推广（人）</span>
     			<p style="border: none;">{{requestdata.twoCount}}</p>
     		</li>
     	</ul>
     </div>
       	 <div class="product">
           <ul>
               <li @click="Personalcenter">
               		个人中心<i class="el-icon-arrow-right"></i>
               </li>
			   <li @click="share">
               		推广有礼<i class="el-icon-arrow-right"></i>
               </li>
           		 <li @click="loanconsulting">
               		贷款咨询<i class="el-icon-arrow-right"></i>
               </li>
               <li @click="bankcard">
               		绑定银行卡<i class="el-icon-arrow-right"></i>
               </li>
           		 <li @click="Commonproblems">
               		常见问题<i class="el-icon-arrow-right"></i>
               </li>
           </ul>
       </div>
       	
         <div class="bottomnav" style="text-align: center;">
            <span @click="gourl">
                <img style="width: 0.47rem;height: 0.74rem;" :src="jiekuan_hou" alt="">
            </span>
            <span @click="gourl2">
                <img style="width: 0.78rem;height: 0.75rem;" :src="wode_h" alt="">
            </span>
             <span>
                <img style="width: 0.48rem;height: 0.75rem;" :src="wode_x" alt="">
            </span>
        </div>
    </div>
</template>
<script>
    import ajax from '@utils/config';
    import {pickerOptions} from '@constants/index';
    import {praseMoney, parseTime, loanStatusFilter} from '@src/filters';
    import store from '@src/store';
    import Cookies from 'js-cookie';
    import {Toast} from 'mint-ui';
    export default {
        data() {
            var login = require("@res/img/new/login_bg.jpg");
            var loginbei = require("@res/img/img/toubenjin.png");
            return {
                listLoading: true, //列表加载状态
                logins: {
                    backgroundImage: "url(" + login + ")",
                },
                loginbei: {
                    backgroundImage: "url(" + loginbei + ")",
                },
                fanhuiRight: require("@res/img/img/touxiaong.png"),
                jiekuan_hou: require("@res/img/img/db_shouye_hui.png"),
                wode_h: require("@res/img/img/db_shangcheng_hui.png"),
                 wode_x: require("@res/img/img/db_wode.png"),
                 imgSrcBase: 'https://img.zhaogu168.com',
                 jiekuan_houa: require("@res/img/img/db_wode.png"),
                 xian:false,
                 xiana:false,
                 mtel:'',
                 inviteCode:'',//邀请码
                 requestdata:'',
            }
        },
        computed: {},
        created() {
        	this.getaccount();
        },
        mounted() {
        },
        methods: {
			 getaccount() {
			 	var token = localStorage.getItem('token');
			 	var phone = localStorage.getItem('phone');
				 var name = localStorage.getItem('name');
			 	this.inviteCode = localStorage.getItem('inviteCode');
            	if(token == null || token == ""){
            		this.xian = true
                	this.xiana = false
                	this.listLoading = false
                	this.$router.push({path: '/login'});
            	}else{
            		this.xian = false
                	this.xiana = true
                	this.listLoading = false   
            	} 
				if(phone != 1){
					this.mtel = phone.substr(0, 3) + '****' + phone.substr(7);
				}else{
					this.mtel = name
				}
    			
            	 ajax({
                    url: "personal/perInfo",
                    optionParams: {
                    	
                    }
                }).post().then(res => {
                    if (res.code == 200) {
                    	console.log(res)
                    	this.requestdata = res.data ? res.data:'';
                    	if(res.data.headUrl != null){
                    		this.fanhuiRight = this.imgSrcBase + res.data.headUrl
                    		localStorage.setItem('headUrl', res.data.headUrl);
                    	}
                    }else{
                       Toast({
		                   message: ""+res.msg+"",
		                   position: 'bottom',
		                  });
						  this.$router.push({path: '/login'});
                    }
                  this.listLoading = false
                }).catch(error => {
					console.log(error)
					this.$router.push({path: '/userManage/Getlost'});
				})
                
            },
            //隐藏号码中间四位
            yin(phoen){
            	console.log(phoen)
            },
            gourl() {
                this.$router.push({path: '/userManage/index'});
            },
             gourl2() {
                this.$router.push({path: '/userManage/userstate'});
            },
            loanconsulting(){
            	this.$router.push({path: '/userManage/loanconsulting'});
            },
             Personalcenter(){
            	this.$router.push({path: '/userManage/Personalcenter'});
            },
            //绑卡
            bankcard(){
            	this.$router.push({path: '/userManage/bankcard'});
            },
            Commonproblems(){
            	this.$router.push({path: '/userManage/Commonproblems'});
            },
            share(){
            	this.$router.push({path: '/userManage/share'});
            },
           	denglu(){
           		this.$router.push({path: '/login'});
           	},
           	zhuce(){
           		this.$router.push({path: '/userManage/registered'});
           	},
           	//账户余额页
           	zhanhuyue(){
           		this.$router.push({path: '/userManage/withdrawal'});
           	},
        },
        filters: {}
    }
</script>
<style lang="less" scoped>
.tuobu{
	width: 100%;
	height: 2.99rem;
	background-size: 100% 100%;
}
	 .herd {
    	height: 0.94rem;
    	width: 100%;
    	 float: left;
        color: white;
        text-align: center;
        vertical-align: middle;
        margin-top: 1.16rem;
        position: relative;
    }
    .herd .yaoqimgma {
    	position: absolute;
    	width: 2.30rem;
    	height: 0.48rem;
    	line-height: 0.48rem;
    	background: white;
    	display: block;
    	border-top-left-radius: 0.3rem;
    	border-bottom-left-radius: 0.3rem;
    	right: 0;
    	top: 0.46rem;
    	color: #0060FF;
    	font-size: 0.2rem;
    }
	.herd p{
		width: 84%;
		margin: 0 auto;
		 font-size: 0.32rem;
		 line-height: 1.4rem;
	}
	.herd p img{
		width: 0.94rem;
		height: 0.94rem;
		float: left;
		border-radius: 50%;
		margin-right: 0.47rem;
	}
	.herd p i{
		margin-top: 0.57rem;
		float: right;
	}

    .herda {
    	width: 100%;
    	 float: left;
    	height: 1.5rem;
        color: white;
        text-align: center;
        vertical-align: middle;
    }
	.herda p{
		font-size: 0.4rem;
		 margin-top: 1.83rem;
	}
	
    .app-container {
        background-size: cover;
        background-repeat: no-repeat;
        height: 100%;
        background-color: white;
    }
.bottomnav {
		width: 100%;
		height: 0.96rem;
		background: #f6fdff;
		position: fixed;
		bottom: 0px;
		display: flex;
		text-align: center;
		border-top:1px solid #bfbfbf ;
	}
	
	.bottomnav span {
		width: 33%;
	}
	.bottomnav span img{
		margin-top: 0.1rem;
	}

   
	
	.str{
		color: #008FFC;
	}
	.product{
		 width: 7rem;
		 height: 5.22rem;
        background: white;
        border-radius:12px;
        margin: 0 auto;
        box-shadow:0px 0px 20px 0px rgba(0,0,0,0.1);
	}
	.product ul{
		width: 6.39rem;
		margin: 0 auto;
	}
   	.product ul li{
   		width: 100%;
   		height: 0.98rem;
   		line-height: 0.99rem;
   		border-bottom: 1px solid #E6E6E6;
   		font-size: 0.30rem;
   	}
   	.product ul li i{
   		float: right;
   		margin-top: 0.3rem;
   	}
   	.jine {
   		 width: 100%;
		 height: 1.83rem;
        background: white;
   	}
   	.jine ul li{
   		width: 2.22rem;
   		height: 1.16rem;
   		float: left;
   		border-radius:0.1rem;
		box-shadow:0px 0px 20px 0px rgba(0,0,0,0.1);
		margin-top: 0.34rem;
   	}
   	.jine ul li span{
   		display: block;
   		width: 2.05rem;
   		color: #FFFFFF;
   		font-size: 0.20rem;
   		text-align: left;
   		float: right;
   		line-height: 0.46rem;
   		margin-top: 0.1rem;
   	}
   	.jine ul li p{
   		color: #FFFFFF;
   		width: 2.05rem;
   		line-height: 0.5rem;
   		font-size: 0.32rem;
   		text-align: left;
   		float: right;
   	}
</style>