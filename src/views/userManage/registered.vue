<template>
	<div class="login-container" :style="beijin">
		<mt-header title="">
			<mt-button @click="fanhui" icon="back" slot="left"></mt-button>
		</mt-header>
		<div class="login_top">
			<div class="logintopimg_div">注册</div>
		</div>
		<ul class="logininputlist">
			<li>
				<i :style="ph"></i>
				<input type="text" placeholder="请输入手机号码" v-model="alertForm.phone" maxlength="11">
			</li>
			<li>
				<i :style="suo"></i>
				<input type="password" placeholder="请输入密码" v-model="alertForm.password" maxlength="">
			</li>
			<li class="inputcode">
				<i :style="yan"></i>
				<input type="text" placeholder="请输入验证码" maxlength="6" v-model="alertForm.checkCode">
				<span class="getcode" v-show="isshow" @click="getphonecodeId()">获取验证码</span>
				<span class="getcode" v-show="!isshow">{{count}} s倒计时</span>
			</li>
			<li>
				<i :style="yao"></i>
				<input type="text" placeholder="请输入邀请码" v-model="alertForm.inviteCode" maxlength="">
			</li>
			<li class="submititem">
				<el-button type="primary" class="submitbtn" @click="submitbtn" :loading="loading">注册</el-button>
				<p style="font-size: 0.26rem;width: 6.78rem;"><span style="float: left;color: #209DFC;" @click="registered">登录</span><span style="float: right;color: #92A1AC;margin-right: 1rem;" @click="Forgotpassword">忘记密码?</span></p>
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
			var beijin = require("@res/img/img/bjj.png");
			return {
				loading: false,
				alertForm: {
					phone: "", //手机号码
					password: "", //密码
					checkCode: '', //验证吗
					inviteCode: '', //邀请码
					codeType:'',
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
				yao: {
					backgroundImage: "url(" + yao + ")",
				},
				logintopimg: require("@res/img/new/login_top_logo.png"),
				count: '',
				isshow: true,
			}
		},
		mounted() {},
		created() {
			let data = this.$route.query.data ? JSON.parse(this.$route.query.data) : '';
			console.log(data)
			if(data == ''){
				this.alertForm.codeType = '1'
			}else{
				this.alertForm.inviteCode = data.inviteCode
				this.alertForm.codeType = data.codeType
			}
		},
		computed: {},
		methods: {
			getphonecodeId() {
				if(!this.alertForm.phone) {
					Toast({
						message: "手机号码不能为空",
						position: 'bottom',
					});
					return
				}
				const TIME_COUNT = 60;
				if(!this.timer) {
					this.count = TIME_COUNT;
					this.isshow = false;
					this.timer = setInterval(() => {
						if(this.count > 0 && this.count <= TIME_COUNT) {
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
						optionParams: {
							phone: this.alertForm.phone
						},
					}).post().then(res => {
						console.log(res);
						if(res.code == 200) {
							Toast({
								message: "" + res.msg + "",
								position: 'bottom',
							});
						} else if(res.code == 999) {
							this.$router.push({
								path: '/login'
							});
						} else {
							Toast({
								message: "" + res.msg + "",
								position: 'bottom',
							});

						}
					})
					.catch(error => {
						console.log(error)
					})

			},
			submitbtn() {
				if(!this.alertForm.phone) {
					Toast({
						message: "手机号码不能为空",
						position: 'bottom',
					});
					return
				}
				if(!this.alertForm.password) {
					Toast({
						message: "密码不能为空",
						position: 'bottom',
					});
				}
				if(!this.alertForm.checkCode) {
					Toast({
						message: "验证码不能为空",
						position: 'bottom',
					});
				}

				this.loading = true
				ajax({
					url: "login/register",
					optionParams: this.alertForm

				}).post().then(res => {
					console.log(res)
					if(res.code == 200) {
						Toast({
							message: "" + res.msg + "",
							position: 'bottom',
						});
						this.dengrl()
						// this.$router.push({
						// 	path: '/login'
						// });
					} else {
						Toast({
							message: "" + res.msg + "",
							position: 'bottom',
						});
					}
					this.loading = false
				})

			},
			dengrl(){
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
				})


			},
			registered() {
				this.$router.push({
					path: '/login'
				});
			},
			fanhui() {
				this.$router.go(-1);
			},
			Forgotpassword() {
				this.$router.push({
					path: '/userManage/Forgotpassword'
				});
			},
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
		background-color: white;
		overflow-y: auto;
	}
	
	.login_top {
		width: 80%;
		margin: 0px auto;
		vertical-align: middle;
		padding: 1.13rem 0 0rem;
	}
	
	.logininputlist {
		text-align: center;
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
	
	.getcode {
		cursor: pointer;
		position: absolute;
		right: 0.8rem;
		font-size: 0.26rem;
		margin-top: 0.2rem;
		color: white;
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
		font-size: 0.55rem;
	}
</style>