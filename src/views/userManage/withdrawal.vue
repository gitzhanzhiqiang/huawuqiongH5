<template>
	<div class="app-container" :style="" v-loading="listLoading">
		<mt-header title="提现">
			<mt-button @click="fanhui" icon="back" slot="left"></mt-button>
		</mt-header>
		<div class="zuida">
			<div class="Product_information">
				<div class="Product_ul">
					<ul>
						<li>
							<span>账户余额（元）</span>
							<p>{{requestdata.balance}}</p>
						</li>
						<li>
							<span>累计收益（元）</span>
							<p>{{requestdata.accbalance}}</p>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="Lending_guidelines">
			
			<p @click="kaxuan">
				<span class="yinhang"><a v-show="kaxuana">请选择银行卡</a>{{rowData.bankName}} {{rowData.bankCardNo}}</span>
				<i class="el-icon-arrow-right"></i>
			</p>
			<p>
				<span>提现金额：</span>
				<input type="number" placeholder="￥请输入提现的金额" v-model="alertForm.money" maxlength="">
			</p>
			<b><i>*</i>提现额度需大于等于100元</b>
			<b><i>*</i>每人每日仅限提现一次</b>
			<b><i>*</i>提现需扣20%所得税</b>
		</div>

		<el-button type="primary" :loading="loading" style='margin-top: 0.7rem;margin-bottom: 0.7rem;' class="aniu" @click='shenqing()'>{{wenan}}</el-button>
	</div>
</template>
<script>
	import ajax from '@utils/config';
	import { pickerOptions } from '@constants/index';
	import { praseMoney, parseTime, loanStatusFilter } from '@src/filters';
	// import {validatPhone} from '@src/utils/validate';
	import store from '@src/store';
	import Cookies from 'js-cookie';
	import { Toast, Popup } from 'mint-ui';

	export default {

		data() {
			var login = require("@res/img/new/login_bg.jpg");
			return {
				alertForm: {
					money: "", //钱
					cardId:'',//卡的ID
					batchNo:'',
				},
				kaxuana:true,
				loading: false,
				listLoading: false, //列表加载状态
				logins: {
					backgroundImage: "url(" + login + ")",
				},
				fanhuiRight: require("@res/img/new/fanhui-right.png"),
				jiekuan_hou: require("@res/img/img/db_shouye_hui.png"),
				wode_h: require("@res/img/img/db_shangcheng.png"),
				wode_x: require("@res/img/img/db_wode_hui.png"),
				rowData: '', //传过来的数据
				imgSrcBase: 'https://img.zhaogu168.com/',
				UvCount: '',
				requestdata:'',
				wenan:'提现',
				
			}
		},
		computed: {},
		created() {
			let data = this.$route.query.data ? JSON.parse(this.$route.query.data) : '';
			this.rowData = data
			this.alertForm.cardId = data.id
			console.log(data)
			this.getaccount();
		},
		mounted() {},
		methods: {
			 getaccount() {
			 	this.listLoading = true
			 	if(this.rowData != ""){
			 		this.kaxuana =false
			 	}
            	 ajax({
                    url: "personal/balance",
                    optionParams: {
                    	
                    }
                }).post().then(res => {
                    if (res.code == 200) {
                    	console.log(res)
                    	this.requestdata = res.data.perInfoVo ? res.data.perInfoVo:'';
						this.alertForm.batchNo = res.data.batchNo
                    }else if(res.code == 999){
                    		//this.$router.push({path: '/login'});
                    }else{
                       Toast({
		                   message: ""+res.msg+"",
		                   position: 'bottom',
		                  });
                    }
                  this.listLoading = false
                }).catch(error => {
					console.log(error)
					//this.$router.push({path: '/userManage/Getlost'});
				})
                
            },
			//选择银行卡
			kaxuan(){
				this.$router.push({
					path: '/userManage/bankcard',
					query: {
						data: JSON.stringify(this.rowData)
					}
				});
			},
			gourl() {
				this.$router.push({
					path: '/userManage/index'
				});
			},
			gourl1() {
				this.$router.push({
					path: '/userManage/userstate'
				});
			},
			fanhui() {
				this.$router.push({path: '/userManage/my'});
			},
			godeposit() {
				this.$router.push({
					path: '/userManage/openaccount'
				});
				// this.$router.push({ path: '/userManage/depositmanagement' });
			},
			gocardident() {
				this.$router.push({
					path: '/userManage/cardidentification'
				});
			}, // 不能点击有提示信息显示
			//申请产品
			shenqing(row) {
				if(this.rowData == ""){
					Toast({
						message: "选择银行卡",
						position: 'bottom',
					});
					return false
				}
				if(this.alertForm.amount < 99) {
					Toast({
						message: "提现额度需大于100元",
						position: 'bottom',
					});
					return false
				}
				this.loading = true
				ajax({
					url: "personal/carryMoney",
					optionParams:this.alertForm
				}).post().then(res => {
					if(res.code == 200) {
						console.log(res)
						this.wenan = res.msg
						this.alertForm.amount = ''
						Toast({
							message: res.msg,
							position: 'bottom',
						});
						this.$router.push({path: '/userManage/my'});
					} else {
						Toast({
							message: res.msg,
							position: 'bottom',
						});
					}
					this.loading = false
				})
			}

		},
		filters: {}
	}
</script>
<style lang="less" scoped>
	.header {
		color: #008FFC;
		border-bottom: 1px solid #E6E6E6;
		font-size: 1.5rem;
		text-align: center;
		vertical-align: middle;
		line-height: 4.5rem;
	}
	
	.mint-header {
		color: #000;
		font-size: 0.32rem;
		border: 1px solid #E6E6E6;
	}
	
	.app-container {
		background-color: white;
		background-size: cover;
		background-repeat: no-repeat;
		height: 100%;
		font-family: Hisense;
	}
	
	.Lending_guidelines,
	.aniu {
		width: 7.1rem;
		overflow: hidden;
		display: block;
		margin: 0 auto;
	}
	
	.Lending_guidelines b {
		display: block;
		font-size: 0.20rem;
		color: #999999;
		margin-left: 0.2rem;
		margin-top: 0.1rem;
	}
	
	.Lending_guidelines b i {
		color: #FF0000;
	}
	
	.Lending_guidelines p {	
		width: 6.78rem;
		height: 0.70rem;
		margin: 0 auto;
		border-bottom: 1px solid #E6E6E6;
		margin-top: 0.4rem;
	}
	.Lending_guidelines p .yinhang{
		display: inline-block;
		width: 6.2rem;
		 overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.Lending_guidelines p .el-icon-arrow-right{
		float: right;
		margin-top: 0.15rem;
	}
	.Lending_guidelines p span {
		font-size: 0.28rem;
		color: #000000;
		line-height: 0.50rem;
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
	
	.Lending_guidelines input {
		float: right;
		width: 5.2rem;
		font-size: 0.28rem;
		color: #000000;
		line-height: 0.50rem;
	}
	
	
	.zuida {
		width: 100%;
		height: 3.71rem;
		background-color: #F2F2F2;
		float: left;
	}
	
	.Product_information {
		width: 100%;
		height: 3.31rem;
		background-color: white;
		float: left;
		margin-top: 0.2rem;
	}
	
	.Product_information .Product_ul {
		width: 6.80rem;
		height: 2.43rem;
		margin: 0.44rem auto;
		border-radius: 0.08rem;
		background: linear-gradient(-38deg, rgba(0, 115, 233, 1) 0%, rgba(82, 125, 249, 1) 100%);
		box-shadow: 2px 10px 21px rgba(0, 0, 0, 0.34);
	}
	
	.Product_information .Product_ul ul li {
		width: 3.40rem;
		height: 100%;
		float: left;
	}
	
	.Product_information .Product_ul ul li p {
		width: 2.92rem;
		float: right;
		color: white;
		font-size: 0.40rem;
		line-height: 0.94rem;
	}
	
	.Product_information .Product_ul ul li span {
		width: 2.92rem;
		display: block;
		float: right;
		color: white;
		font-size: 0.28rem;
		margin-top: 0.67rem;
	}
</style>