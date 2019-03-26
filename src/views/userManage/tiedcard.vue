<template>
	<div class="login-container" :style="">
		<mt-header title="绑定银行卡">
			<mt-button @click="fanhui" icon="back" slot="left"></mt-button>
		</mt-header>
		
		<ul class="logininputlist">
			<div class="ming">
				<p>身份信息</p>
				<div class="ming_m">
					
					<li>
						<span class="span">持卡人</span>
						<input type="text" placeholder="请输入持卡人" v-model="alertForm.username" maxlength="">
					</li>
					<li>
						<span class="span">证件类型</span>
						<b>身份证</b>
					</li>
					<li>
						<span class="span">证件号</span>
						<input type="text" placeholder="请输入身份证" v-model="alertForm.idcardno" maxlength="">
					</li>
				</div>
			</div>
			<div class="ming">
				<p>银行卡信息</p>
				<div class="ming_m">
					<li>
						<span class="span">卡号</span>
						<input type="text" placeholder="请输入卡信息" v-model="alertForm.cardno" maxlength="">
					</li>
			
					<li>
						<span class="span">手机号</span>
						<input type="text" placeholder="请输入手机号码" v-model="alertForm.phone" maxlength="11">
					</li>
					<li class="inputcode">
						<span class="span">验证码</span>
						<input style="padding-right: 1.5rem;" type="text" placeholder="请输入验证码" maxlength="6" v-model="validatecode">
						<span class="getcode" v-show="isshow" @click="getphonecodeId()">获取验证码</span>
						<span class="getcode" v-show="!isshow">{{count}} s倒计时</span>
					</li>
				</div>
			</div>
					
		</ul>
		<el-button type="primary" class="submitbtn" @click="submitbtn" :loading="loading">下一步</el-button>
	</div>
</template>

<script>
	import ajax from '@utils/config';
	import handleRouter from '@src/utils/handleRouter';
	import store from '@src/store';
	import Cookies from 'js-cookie';
	import { Toast,MessageBox } from 'mint-ui';

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
					cardno: "", //银行卡号
					idcardno: '', //身份证号码
					username: '', //用户姓名
				},
				validatecode:'',//验证码
				requestno:{
					
				},//返回值
				 radio2: 3,
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
		},
		computed: {},
		methods: {
			getphonecodeId() {
				if(!this.alertForm.username) {
					Toast({
						message: "用户姓名不能为空",
						position: 'bottom',
					});
					return
				}
				if(!this.alertForm.idcardno) {
					Toast({
						message: "身份证号码不能为空",
						position: 'bottom',
					});
					return
				}
				if(!this.alertForm.cardno) {
					Toast({
						message: "银行卡号不能为空",
						position: 'bottom',
					});
					return
				}
				if(!this.alertForm.phone) {
					Toast({
						message: "手机号码不能为空",
						position: 'bottom',
					});
					return
				}
				const TIME_COUNT = 90;
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
					url: "personal/addBankCard",
					optionParams: this.alertForm

					}).post().then(res => {
						console.log(res)
						if(res.code == 200) {
							this.requestno = res.data
						} else {
							Toast({
								message: "" + res.msg + "",
								position: 'bottom',
							});
							this.isshow = true;
							clearInterval(this.timer);
							this.timer = null;
						}
					})
					.catch(error => {
						console.log(error)
					})

			},
			submitbtn() {
				if(!this.validatecode) {
					Toast({
						message: "请输入验证码",
						position: 'bottom',
					});
					return
				}
				this.requestno.validatecode = this.validatecode
				console.log(this.requestno)
				this.loading = true
				ajax({
					url: "personal/addBankCard",
					optionParams:this.requestno
					}).post().then(res => {
						if(res.code == 200) {
							this.$router.push({
								path: '/userManage/bankcard'
							});
						} else {
							Toast({
								message: "" + res.msg + "",
								position: 'bottom',
							});
						}
						this.loading = false
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
		color: #000;
		background: white;
	}
	
	.login-container {
		background-size: cover;
		background-repeat: no-repeat;
		height: 100%;
		background-color: #F2F2F2;
		overflow-y: auto;
		position: relative;
	}
	
	.login_top {
		width: 92%;
		margin: 0px auto;
		vertical-align: middle;
		padding: 0.59rem 0 0rem;
	}
	.logininputlist{
		overflow-y: auto;
	}
	.logininputlist li span.span{
		width: 1.5rem;
		display: inline-block;
		float: left;
		line-height: 0.79rem;
		font-size: 0.24rem;
		color: #000000;
		text-align: left;
	}
	.logininputlist li b{
		width: 5.2rem;
		float: right;
		display: inline-block;
		line-height: 0.79rem;
		font-size: 0.24rem;
		color: #000000;
		text-align: right;
	}
	.logininputlist li {
		height: 0.79rem;
		margin: 0rem 0.36rem;
		line-height: 0.79rem;
		background: white;
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
		width: 86%;
	}
	
	.submitbtn {
		border-bottom: 0px;
		color: white;
		background-color: #209DFC;
		border-radius: 0.08rem;
		height: 0.68rem;
		font-size: 0.28rem;
		width: 6.78rem;
		margin: 0 auto;
		display: block;
		margin-bottom: 0.24rem;
		margin-top: 0.8rem;
	}
	
	.logininputlist input {
		width: 5.2rem;
		border: 0;
		color: #000000;
		background: none;
		margin: 0.20rem 0;
		text-align: left;
		font-size: 0.26rem;
		float: right;
		text-align: right;
	}
	
	.logininputlist input.inputcode {
		position: relative;
		background: none;
	}
	
	.getcode {
		cursor: pointer;
		position: absolute;
		right: 0.36rem;
		font-size: 0.26rem;
		color: #209DFC;
	}
	
	input::input-placeholder {
		color: #999999;
		background: none;
	}
	
	input::-webkit-input-placeholder {
		color: #999999;
		background: none;
	}
	
	input::-moz-input-placeholder {
		color: #999999;
		background: none;
	}
	
	.logininputlist .ming{
		width: 100%;
		overflow: hidden;
		background: #F2F2F2;
	}
	.logininputlist .ming p{
		height: 0.6rem;
		line-height: 0.6rem;
		margin: 0rem 0.36rem;
		font-size: 0.20rem;
		color: #209DFC;
	}
	.logininputlist .ming_m{
		width: 100%;
		background: white;
		float: left;
	}

	/*弹框*/
	.tangkuang{
		position: absolute;
		width: 6.78rem;
		height: 4rem;
		background: white;
		border-radius:0.08rem;
   		box-shadow:2px 10px 21px rgba(0,0,0,0.34);
   		left: 0.35rem;
   		top: 4rem;
   		z-index: 10;
	}
	
	.tangkuang .bott{
		position: absolute;
		width: 100%;
		bottom: 0;
	}
	.tangkuang input{
		display: block;
		width: 60%;
		height: 0.8rem;
		margin: 0 auto;
		margin-top: 0.5rem;
		border: 1px solid #999;
		padding-left: 0.1rem;
	}
	.tangkuang p{
		text-align: center;
		line-height: 1rem;
	}
	.tangkuang .bott button{
		float: right;
		margin: 0.2rem 0.2rem;
	}
	.maxk{
		position: absolute;
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,0.2);
		top: 0;
		z-index: 2;
	}
</style>