<template>
	<div class="login-container" :style="beijin">
		<el-button type="primary" class="submitbtn" @click="submitbtn" :loading="loading">注 册</el-button>
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
			var beijin = require("@res/img/img/zhuce.jpg");
			return {
				xian: false,
				xiana: true,
				loading: false,
				
				beijin: {
					backgroundImage: "url(" + beijin + ")",
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
				this.loading = true
				ajax({
					url: "tChangeJump/jumpDetail",
					optionParams: {}
				}).post().then(res => {
					console.log(res)
					if(res.code == 200) {
						window.location.href=""+res.data.url+""
						this.loading = false
					} else {
						Toast({
								message: "" + res.message + "",
								position: 'bottom',
							});
					}
				}).catch(error => {
					console.log(error)
				})

			},
		}
	}
</script>

<style rel="stylesheet/less" lang="less" scoped>
	
	
	.login-container {
		background-size: cover;
		background-repeat: no-repeat;
		height: 100%;
		overflow-y:auto;
		position: relative;
	}
	
	.submitbtn {
		width: 4.80rem;
		height: 0.8rem;
		position: absolute;
		overflow: auto;  
	  	margin: auto;  
	  	top: 0; left: 0; bottom: 0; right: 0; 
		color: white;
		background-color: #3346D7;
		border: none;
		border-radius: 1rem;
		font-size: 0.33rem;
	}
	
</style>