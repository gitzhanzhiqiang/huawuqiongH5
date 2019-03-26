<template>
	<div class="login-container" :style="beijin">
		<mt-header title="">
			<mt-button @click="fanhui" icon="back" slot="left"></mt-button>
		</mt-header>
		<div class="login_top">
			<div class="logintopimg_div">账号登录
				<span style="color: white;font-size: 0.24rem;float: right;margin-top: 0.3rem;" @click="yuangong">众人富员工登录</span>
			</div>
		</div>
		<ul class="logininputlist">
			<li>
				<i :style="ph"></i>
				<input type="text" placeholder="请输入手机号码" v-model="alertForm.phone" maxlength="11">
				<b :style=""></b>
			</li>
			<li>
				<i :style="suo"></i>
				<input type="password" placeholder="请输入密码" v-model="alertForm.password" maxlength="25" v-show="xiana">
				<input type="text" placeholder="请输入密码" v-model="alertForm.password" maxlength="25" v-show="xian">
				<b :style="yan" @click="mimi"></b>
			</li>

			<li class="submititem">
				<el-button type="primary" class="submitbtn" @click="submitbtn" :loading="loading">登 录</el-button>
				<p style="width: 6rem;"><span style="float: left;color: #FFFFFF;font-size: 0.26rem;" @click="registered">注册</span><span style="float: right;font-size: 0.26rem;color: #92A1AC;margin-right: 0.2rem;" @click="Forgotpassword">忘记密码?</span></p>
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
			var yan = require("@res/img/img/eyes.png");
			var beijin = require("@res/img/img/bja.png");
			return {
				xian: false,
				xiana: true,
				loading: false,
				alertForm: {
					phone: "",
					password: "",
				},
				beijin: {
					backgroundImage: "url(" + beijin + ")",
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
				logintopimg: require("@res/img/new/login_top_logo.png"),
				count: '',
				isshow: true,
				num: true,
			}
		},
		mounted() {},
		created() {
			//this.getaccount();
		},
		computed: {},
		methods: {
//			getaccount() {
//				var token = localStorage.getItem("token")
//				var phone = localStorage.getItem("phone")
//				var pwd = localStorage.getItem("pwd")
//				if(token == null) {
//						console.log(1)
//				} else {
//					this.alertForm.phone = phone
//					this.alertForm.pwd = pwd
//				}
//
//			},
			submitbtn() {

				//this.$router.push({ path: '/userManage/index' });
				if(!this.alertForm.phone) {
					Toast({
						message: "手机号码不能为空",
						position: 'bottom',
					});
					return
				}
				if(!this.alertForm.password) {
					Toast({
						message: "验证码不能为空",
						position: 'bottom',
					});
					return
				}
				this.loading = true
				ajax({
					url: "login/userLogin",
					optionParams: this.alertForm

				}).post().then(res => {
					console.log(res)
					if(res.code == 200) {
						Toast({
							message: res.msg,
							position: 'bottom',
						});
						localStorage.setItem('token', res.data.token);
						localStorage.setItem('name', res.data.name);
						localStorage.setItem('phone', this.alertForm.phone);
						localStorage.setItem('pwd', this.alertForm.password);
						localStorage.setItem('userId', res.data.userId);
						localStorage.setItem('inviteCode', res.data.inviteCode);
						localStorage.setItem('zrfStaff', 0);
						this.$router.push({
							path: '/userManage/index'
						});
					}else if(res.code == 201){
						window.location.href='https://cyq.zhaogu168.com/registerview/android.html'
					} else {
						Toast({
							message: res.msg,
							position: 'bottom',
						});
					}
					this.loading = false
				}).catch(error => {
					console.log(error)
					this.$router.push({path: '/userManage/Getlost'});
				})

			},
			registered() {
				this.$router.push({
					path: '/userManage/registered'
				});
			},
			fanhui() {
				this.$router.push({
					path: '/userManage/index'
				});
			},
			Forgotpassword() {
				this.$router.push({
					path: '/userManage/Forgotpassword'
				});
			},
			//众人富员工
			yuangong(){
				this.$router.push({
					path: '/logina'
				});
			},
			//显示密码
			mimi() {
				console.log(this.num)
				if(this.num == true) {
					this.xian = true;
					this.xiana = false;
					this.num = false
				} else if(this.num == false) {
					this.xian = false;
					this.xiana = true;
					this.num = true
				}
			}
		}
	}
</script>

<style rel="stylesheet/less" lang="less" scoped>
	.mint-header {
		color: white;
		background: none !important;
	}
	
	.login-container {
		background-size: cover;
		background-repeat: no-repeat;
		height: 100%;
		overflow-y:auto ;
	}
	
	.login_top {
		width: 80%;
		margin: 0px auto;
		vertical-align: middle;
		padding: 1.13rem 0 0rem;
	}
	
	.logininputlist {
		text-align: center;
		margin-top: 0.98rem;
	}
	
	.logininputlist li {
		border-bottom: 1px solid rgba(255,255,255,0.4);
		margin: 0.36rem 0.8rem;
		line-height: 0.36rem;
	}
	
	.logininputlist li i {
		width: 0.31rem;
		height: 0.42rem;
		float: left;
		background-size: 100% 100%;
		margin-top: 0.2rem;
	}
	
	.logininputlist li b {
		width: 0.36rem;
		height: 0.22rem;
		float: right;
		background-size: 100% 100%;
		margin-top: 0.3rem;
	}
	
	.logininputlist li.submititem {
		border-bottom: none;
		border-bottom: 0px;
		font-size: 0.28rem;
		position: fixed;
		width: 78%;
	}
	
	.submitbtn {
		border-bottom: 0px;
		color: white;
		background-color: #209DFC;
		border-radius: 0.08rem;
		height: 0.8rem;
		font-size: 0.28rem;
		width: 5.8rem;
		margin-bottom: 0.24rem;
	}
	
	.logininputlist input {
		border: 0;
		color: rgba(255,255,255,1);
		background: none;
		margin: 0.26rem 0;
		padding-left: 0.31rem;
		text-align: left;
		width: 85%;
		font-size: 0.26rem;
	}
	
	.logininputlist input.inputcode {
		position: relative;
		background: none;
	}
	
	input::input-placeholder {
		color: white;
		background: none;
	}
	
	input::-webkit-input-placeholder {
		color: white;
		background: none;
	}
	
	input::-moz-input-placeholder {
		color: white;
		background: none;
	}
	
	.logintopimg_div {
		color: white;
		font-size: 0.44rem;
	}
</style>