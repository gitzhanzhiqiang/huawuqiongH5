<template>
  <div class="login-container" :style="">
  		<mt-header title="忘记密码">
            <mt-button @click="fanhui" icon="back" slot="left"></mt-button>
       </mt-header>
    <!--<div class="welcometext">欢迎登录咕咕贷</div>-->
    <ul class="logininputlist">
      <li>
      	<i :style="ph"></i>
        <input type="text" placeholder="请输入手机号码" v-model="alertForm.phone" maxlength="11">
      </li>
      
      <li class="inputcode">
      	<i :style="yan"></i>
        <input type="text" placeholder="请输入验证码" maxlength="6" v-model="alertForm.checkCode">
        <span class="getcode" v-show="isshow"  @click="getphonecodeId()">获取验证码</span>
        <span class="getcode" v-show="!isshow" >{{count}} s倒计时</span>
      </li>
      <li>
      	<i :style="suo"></i>
        <input type="password" placeholder="请输入登录密码" v-model="alertForm.password" maxlength="">
      </li>
      <li class="submititem">
      	<el-button type="primary" class="submitbtn" @click="submitbtn" :loading="loading">确认修改</el-button>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>

import ajax from '@utils/config';
import handleRouter from '@src/utils/handleRouter';
import store from '@src/store';
import Cookies from 'js-cookie';
import { Toast } from 'mint-ui';

export default {
  name: 'login',
  data() {
      var login = require("@res/img/new/login_bg.jpg");
      var ph = require("@res/img/img/phone.png");
      var suo = require("@res/img/img/password.png");
    var yan = require("@res/img/img/validation.png");
    var yao = require("@res/img/img/yapq.png");
    return {
      loading: false,
        alertForm:{
	      	 phone: "",//手机号码
	        password: "",//密码
	        checkCode:'',//验证吗
      },
        logins: {
          backgroundImage: "url(" + login + ")",
      	},
      	ph: {
          backgroundImage: "url(" + ph + ")",
      	},
      	suo: {
          backgroundImage: "url(" + suo + ")",
      	},
      	yan: {
          backgroundImage: "url(" + yan + ")",
      	},
      	yao: {
          backgroundImage: "url(" + yao + ")",
      	},
        logintopimg:require("@res/img/new/login_top_logo.png"),
        count:'',
        isshow: true,
    }
  },
  mounted() {
  },
  computed: {
  },
  methods: {
      getphonecodeId() {
             if (!this.alertForm.phone) {
                 Toast({
                     message: "手机号码不能为空",
                     position: 'bottom',
                 });
                 return
             }
             const TIME_COUNT = 60;
             if (!this.timer) {
                 this.count = TIME_COUNT;
                 this.isshow = false;
                 this.timer = setInterval(() => {
                     if (this.count > 0 && this.count <= TIME_COUNT) {
                         this.count--;
                     } else {
                         this.isshow = true;
                         clearInterval(this.timer);
                         this.timer = null;
                     }
                 }, 1000)
             }
           ajax({
               url: "login/sendcheckcode",
               optionParams: {phone:this.alertForm.phone},
           }).post().then(res => {
               console.log(res);
               if (res.code == 200) {
									 Toast({
                   message: ""+res.msg+"",
                   position: 'bottom',
              	});
               }else{
               	 Toast({
                   message: ""+res.msg+"",
                   position: 'bottom',
              	});
               }
          })
          .catch(error => {
                console.log(error)
            })

      },
      submitbtn(){
          if (!this.alertForm.phone) {
              Toast({
                   message: "手机号码不能为空",
                   position: 'bottom',
              });
              return
           }
           if(!this.alertForm.password){
             Toast({
                  message: "密码不能为空",
                   position: 'bottom',
              });
          }
           if(!this.alertForm.checkCode){
             Toast({
                  message: "验证码不能为空",
                   position: 'bottom',
              });
          }
           this.loading = true
          ajax({
               url: "login/forgetPwd",
              optionParams: this.alertForm

           }).post().then(res => {
           	console.log(res)
              if (res.code == 200) {
                   Toast({
                   message: ""+res.msg+"",
                   position: 'bottom',
              	});
//                 this.$store.dispatch('SETPHONE',{phone: res.data.phone});
//                 this.$store.dispatch('SETUSERID',{userid: res.data.id});
//                 this.$store.dispatch('SETWYJRPWDTYPE',{wyjrpwdtype: res.data.wyjrPassStatus});//是否设置交易密码
//                this.$store.dispatch('SETACCOUNTTYPE',{accountype: res.data.wyjrStatus});//开户状态 0未开户 1已开户 2禁止开户
//                 this.$store.dispatch('SETACCOUNTCOUNT',{accouncount: res.data.wyjrCount});//开户次数
//
//                    Cookies.set('phone', res.data.phone);
//                    Cookies.set('userid', res.data.id);
//                    Cookies.set('wyjrpwdtype', res.data.wyjrPassStatus);
//                    Cookies.set('accountype', res.data.wyjrStatus);
//                    Cookies.set('accouncount', res.data.wyjrCount);
//                   localStorage.setItem('isopenaccount', 0);
//                 localStorage.setItem('phone', res.data.phone);
//                 localStorage.setItem('userid', res.data.id);
//                 localStorage.setItem('wyjrpwdtype', res.data.wyjrPassStatus);
//                 localStorage.setItem('accountype', res.data.wyjrStatus);
//                 localStorage.setItem('accouncount', res.data.wyjrCount);
                  this.$router.push({ path: '/login' });
               }else{
                  Toast({
                   message: ""+res.msg+"",
                   position: 'bottom',
              	});
               }
               this.loading = false
           })

      },
       registered(){
      	this.$router.push({ path: '/login' });
      },
       fanhui(){
       	this.$router.go(-1)
            },
             Forgotpassword(){
         	this.$router.push({ path: '/userManage/Forgotpassword' });
         },
  }
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
 .mint-header{
        color: white;
        background: none !important;
    }
  .login-container{
    background-size: cover;
    background-repeat: no-repeat;
    height: 100%;
     background:linear-gradient(0deg,rgba(0,115,233,1),rgba(35,134,246,1));
     overflow-y:auto ;
  }
  .login_top{
  	width: 92%;
    margin: 0px auto;
    vertical-align: middle;
    padding: 1.59rem 0 0rem;
  }
  .login_top img{
    width: 5rem;
  }

  .logininputlist{
    text-align: center;
    margin-top: 1.01rem;
  }
  .logininputlist li{
    border-bottom: 1px solid #cde1f0;
    margin: 0.36rem 0.36rem;
    line-height: 0.36rem;
  }
  .logininputlist li i{
  	width: 0.31rem;
  	height: 0.42rem;
  	float: left;
  	background-size: 100% 100%;
  	margin-top: 0.2rem;
  }
  .logininputlist li.submititem{
   	border-bottom: none;
   	 border-bottom: 0px;
    font-size: 0.28rem;
    position: fixed;
    width: 86%;
  }
	.submitbtn {
		 border-bottom: 0px;
    color: #0075F6;
    background-color: white;
    border-radius: 0.08rem;
		height: 0.68rem;
    font-size: 0.28rem;
    width: 6.78rem;
    margin-bottom: 0.24rem;
	}
  .logininputlist input{
    border: 0;
    color: #000;
    background: none;
    margin: 0.26rem 0;
    text-align: left;
    width: 85%;
    font-size: 0.26rem;
  }
  .logininputlist input.inputcode{
    position: relative;
     background: none;
  }
  .getcode{
    cursor: pointer;
    position: absolute;
    right: 0.36rem;
    font-size: 0.26rem;
    color: #3393EE;
		margin-top:0.2rem ;
		color: #cde1f0;
  }
  input::input-placeholder{
     color: #cde1f0;
      background: none;
  }
  input::-webkit-input-placeholder{
     color: #cde1f0;
      background: none;
  }
  input::-moz-input-placeholder{
     color: #cde1f0;
      background: none;
  }
  .logintopimg_div{
    color: #000000;
    font-size: 0.55rem;
  }
</style>

