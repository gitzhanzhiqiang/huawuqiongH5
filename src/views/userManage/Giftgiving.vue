<template>
	<div class="login-container" :style="">
		<div class="toubu" :style="beijin">
				<p @click="registered">登 录</p>
		</div>
		<div class="logininputlist">
			<p class="logininputlist_li">现在注册~还有最高388元免息红包~</p>
			<ul>
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
			</ul>
			<el-button type="primary" class="submitbtn" @click="submitbtn" :loading="loading">立 即 获 取</el-button>
		</div>
		<p class="beian">浙ICP备 17054938号-1</p>
		<div class="serviceda">
			<div class="service">
				<p class="logininputlist_li">客户评价</p>
				<ul>
					<li>
						<img :src="tou1" />
						<span>177****6621<a>{{time}}</a></span>
						<b>感觉花无穷是真的好！！！</b>
					</li>
					<li>
						<img :src="tou2" />
						<span>138****4401<a>{{time}}</a></span>
						<b>填资料快，放款也超快，我的天啦，超乎想象！</b>
					</li>
					<li>
						<img :src="tou3" />
						<span>138****6620<a>{{time}}</a></span>
						<b>哈哈哈，这么快就借到钱了，开心</b>
					</li>
					<li>
						<img :src="tou4" />
						<span>159****3561<a>{{time}}</a></span>
						<b>超快的放款，天呀!!!</b>
					</li>
					<li>
						<img :src="tou5" />
						<span>139****5269<a>{{time}}</a></span>
						<b>填资料快！放款也超快!有钱花了</b>
					</li>
					<li>
						<img :src="tou6" />
						<span>138****7513<a>{{time}}</a></span>
						<b>在不怕没钱花了！！</b>
					</li>
				</ul>
			</div>
		</div>
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
			var ph = require("@res/img/img/phonehei.png");
			var suo = require("@res/img/img/suohei.png");
			var yan = require("@res/img/img/xinxihei.png");
			var yao = require("@res/img/img/yapq.png");
			var beijin = require("@res/img/img/bjjj.png");
			return {
				loading: false,
				alertForm: {
					phone: "", //手机号码
					password: "", //密码
					checkCode: '', //验证吗
					codeType:'1',
				},
				time: '',
				tou1: require("@res/img/tou/tou1.png"),
				tou2: require("@res/img/tou/tou2.png"),
				tou3: require("@res/img/tou/tou3.png"),
				tou4: require("@res/img/tou/tou4.png"),
				tou5: require("@res/img/tou/tou5.png"),
				tou6: require("@res/img/tou/tou6.png"),
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
				count: '',
				isshow: true,
			}
		},
		mounted() {},
		created() {
			let data = this.$route.query.data ? JSON.parse(this.$route.query.data) : '';
			console.log(data)
			this.alertForm.invitecode = data
			this.getNowDate()
		},
		computed: {},
		methods: {
			//时间
			getNowDate() {
				var d = new Date()
				if((d.getMonth() + 1) < 10) {
					var yue = ("0" + (d.getMonth() + 1))
				} else {
					var yue = (d.getMonth() + 1)
				}
				if((d.getDate()) < 10) {
					var ri = ("0" + (d.getDate()))
				} else {
					var ri = (d.getDate())
				}

				this.time = (d.getFullYear()) + '-' + yue + '-' + ri
			},
			registered() {
				this.$router.push({
					path: '/login'
				});
			},
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
						//this.dengru()
						Toast({
							message: "" + res.msg + "",
							position: 'bottom',
						});
						this.$router.push({
							path: '/login'
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
			dengru() {
				ajax({
					url: "tAppUser/login",
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
						localStorage.setItem('pwd', this.alertForm.pwd);
						localStorage.setItem('userId', res.data.userId);
						localStorage.setItem('inviteCode', res.data.inviteCode);
						// localStorage.setItem('accouncount', res.data.wyjrCount);
						this.$router.push({
							path: '/userManage/index'
						});
					} else {
						Toast({
							message: res.msg,
							position: 'bottom',
						});
					}
				}).catch(error => {
					console.log(error)
					this.$router.push({
						path: '/userManage/Getlost'
					});
				})

			},
		}
	}
</script>

<style rel="stylesheet/less" lang="less" scoped>
	.dengr {
		width: 1rem;
		float: right;
		margin: 0 auto;
		line-height: 0.8rem;
		color: white;
		font-size: 0.28rem;
	}
	
	.textthe {
		width: 100%;
		height: 0.5rem;
		line-height: 0.5rem;
		text-align: center;
		color: red;
		margin-top: 0.6rem;
		margin-bottom: 0.6rem;
		font-size: 0.32rem;
	}
	.beian{
		width: 100%;
		height: 0.25rem;
		line-height:0.25rem ;
		font-size: 0.2rem;
		color: #999999;
		text-align: center;
		margin-bottom: 0.24rem;
	}
	.mint-header {
		color: #000;
		background: none !important;
	}
	
	.login-container {
		position: relative;
		background-size: cover;
		background-repeat: no-repeat;
		height: 100%;
		overflow-y: auto;
	}
	
	.logininputlist {
		width: 7rem;
		height: 6.72rem;
		margin: 0 auto;
		box-shadow: 22px 9px 40px rgba(23, 67, 134, 0.08);
		border-radius: 0.6rem;
		margin-bottom: 0.21rem;
	}
	
	.logininputlist .logininputlist_li,
	.service .logininputlist_li {
		width: 100%;
		height: 1rem;
		background: #778088;
		border-top-left-radius: 0.6rem;
		border-top-right-radius: 0.6rem;
		color: white;
		font-size: 0.32rem;
		text-align: center;
		line-height: 1rem;
	}
	
	.logininputlist li {
		border-bottom: 1px solid #b9b9bb;
		margin: 0.36rem 0.36rem;
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
		width: 86%;
	}
	
	.submitbtn {
		border-bottom: 0px;
		color: white;
		background-color: #209DFC;
		border-radius: 1rem;
		height: 0.88rem;
		font-size: 0.28rem;
		width: 6.78rem;
		margin-top: 0.29rem;
		border: none;
		margin: 0 auto;
		display: block;
	}
	
	.logininputlist input {
		border: 0;
		color: #b9b9bb;
		background: none;
		margin: 0.26rem 0;
		text-align: left;
		width: 85%;
		font-size: 0.26rem;
		padding-left: 0.3rem;
	}
	
	.logininputlist input.inputcode {
		position: relative;
		background: none;
	}
	/*评价*/
	.serviceda{
		width: 7rem;
		height: 6.72rem;
		margin: 0 auto;
		box-shadow: 22px 9px 40px rgba(23, 67, 134, 0.08);
		margin-bottom: 0.34rem;
		border-radius: 0.6rem;
	}
	.service {
		width: 7rem;
		height: 6.72rem;
		margin: 0 auto;
		overflow-y: auto;
	}
	
	.service ul li {
		margin: 0.36rem 0.36rem;
		overflow: hidden;
		border-bottom: 1px solid #b9b9bb;
	}
	
	.service ul li img {
		width: 1.2rem;
		height: 1.2rem;
		display: inline-block;
		float: left;
		margin: 0.36rem 0rem;
	}
	
	.service ul li span {
		margin-top: 0.3rem;
		line-height: 0.6rem;
	}
	
	.service ul li span a {
		float: right;
	}
	
	.service ul li span,
	.service ul li b {
		display: block;
		width: 4.8rem;
		float: right;
	}
	
	.service ul li b {
		line-height: 0.4rem;
	}
	
	.getcode {
		cursor: pointer;
		position: absolute;
		right: 0.7rem;
		font-size: 0.26rem;
		color: #B9B9BB;
		margin-top: 0.2rem;
		color: #B9B9BB;
	}
	
	input::input-placeholder {
		color: #B9B9BB;
		background: none;
	}
	
	input::-webkit-input-placeholder {
		color: #B9B9BB;
		background: none;
	}
	
	input::-moz-input-placeholder {
		color: #B9B9BB;
		background: none;
	}
	
	.toubu {
		width: 100%;
		height: 5.93rem;
		background-size: 100% 100%;
		margin-top: 0.2rem;
	}
	.toubu p{
		float: right;
		color: #0586E8;
		width: 1rem;
		line-height: 0.8rem;
		font-size: 0.32rem;
	}
</style>