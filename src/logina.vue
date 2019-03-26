<template>
	<div class="login-container" :style="beijin">
		<mt-header title="">
			<mt-button @click="fanhui" icon="back" slot="left"></mt-button>
		</mt-header>
		<div class="login_top">
			<div class="logintopimg_div">众人富员工登录<span @click="yuangong">账号登录</span></div>
		</div>
		<!--<div class="welcometext">欢迎登录咕咕贷</div>-->
		<ul class="logininputlist">
			<li>
				<i :style="ph"></i>
				<input type="text" placeholder="请输入工号" v-model="alertForm.inviteCode" maxlength="11">
				<b :style=""></b>
			</li>
			
			<li class="submititem">
				<el-button type="primary" class="submitbtn" @click="submitbtn" :loading="loading">登 录</el-button>
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
			var ph = require("@res/img/img/ghao.png");
			var suo = require("@res/img/img/password.png");
			var yan = require("@res/img/img/eyes.png");
			var beijin = require("@res/img/img/bja.png");
			return {
				xian: false,
				xiana: true,
				loading: false,
				alertForm: {
					inviteCode: "",
					zrfStaff: "1",
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
		},
		computed: {},
		methods: {
			
			submitbtn() {

				//this.$router.push({ path: '/userManage/index' });
				if(!this.alertForm.inviteCode) {
					Toast({
						message: "工号不能为空",
						position: 'bottom',
					});
					return
				}
				
				this.loading = true
				ajax({
					url: "login/zrfLogin",
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
						localStorage.setItem('phone', 1);
						localStorage.setItem('pwd', this.alertForm.password);
						localStorage.setItem('userId', res.data.userId);
						localStorage.setItem('inviteCode', res.data.inviteCode);
						localStorage.setItem('zrfStaff', res.data.zrfStaff);
						//                 localStorage.setItem('accouncount', res.data.wyjrCount);
						this.$router.push({
							path: '/userManage/index'
						});
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
				this.$router.go(-1);
			},
			Forgotpassword() {
				this.$router.push({
					path: '/userManage/Forgotpassword'
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
			},
			//账号登录
			yuangong(){
				this.$router.push({
					path: '/login'
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
	.logintopimg_div span {
		color: white;
		font-size: 0.24rem;
		float: right;
		margin-top: 0.3rem;
	}
</style>