<template>
	<div class="app-container" :style="" v-loading="listLoading">
		<mt-navbar class='header'>
			<mt-tab-item id="1">
				<p style="line-height: 0.5rem;color:rgba(102,102,102,1);width: 2.2rem;">贷款金额</p>
				<span :class="{'touzi':minga}" @click="xuanzea" id="xina" style="font-size: 0.24rem;" v-for="item in namea" v-text="item.name" v-if="item.status"></span>
				<i class="el-icon-arrow-down" style="margin-left: 2px;"></i>
			</mt-tab-item>
			<mt-tab-item id="2">
				<p style="line-height: 0.5rem;color:rgba(102,102,102,1);width: 2.2rem;">贷款期限</p>
				<span :class="{'touzi':mingb}" id="xinb" @click="xuanzeb" style="font-size: 0.24rem;" v-for="item in nameb" v-text="item.name" v-if="item.status"></span>
				<i class="el-icon-arrow-down" style="margin-left: 2px;"></i>
			</mt-tab-item>
			<mt-tab-item id="3">
				<p style="line-height: 0.5rem;color:rgba(102,102,102,1);width: 2.2rem;">排序</p>
				<span :class="{'touzi':ming}" @click="xuanze" id="xinc" style="font-size: 0.24rem;" v-for="item in name" v-text="item.name" v-if="item.status"></span>
				<i class="el-icon-arrow-down" style="margin-left: 2px;"></i>
			</mt-tab-item>
		</mt-navbar>
		<div class="down" v-show="isShow">
			<ul>
				<li v-for="item in name" ref="rollul" @click="problem1('name', item)" :class="{'str': item.status}">{{item.name}}<i class="el-icon-check" style="float: right;margin-top: 0.2rem;"></i></li>
				<!--<li ref="rollul" @click="problem1" data-b = "1">可待额度<i class="el-icon-check" style="float: right;margin-top: 0.2rem;"></i></li>
       			<li ref="rollul" @click="problem1" data-b = "2">借款利息<i class="el-icon-check" style="float: right;margin-top: 0.2rem;"></i></li>
       			<li ref="rollul" @click="problem1" data-b = "3">放款时间<i class="el-icon-check" style="float: right;margin-top: 0.2rem;"></i></li>
       			<li ref="rollul" @click="problem1" data-b = "4">最新口子<i class="el-icon-check" style="float: right;margin-top: 0.2rem;"></i></li>
       			<li ref="rollul" @click="problem1" data-b = "5">芝麻分贷<i class="el-icon-check" style="float: right;margin-top: 0.2rem;"></i></li>-->
			</ul>
		</div>
		<div class="downa" v-show="isShowa">
			<ul>
				<li v-for="item in namea" @click="problem1a('namea', item)" :class="{'str': item.status}">{{item.name}}<i class="el-icon-check" style="float: right;margin-top: 0.2rem;"></i></li>
				<!--<li @click="problem1a" data-a = "5000" data-b = "5000">5000以下<i class="el-icon-check" style="float: right;margin-top: 0.2rem;"></i></li>
       			<li @click="problem1a" data-a = "5000" data-b = "10000">5000-1000万<i class="el-icon-check" style="float: right;margin-top: 0.2rem;"></i></li>
       			<li @click="problem1a" data-a = "10000" data-b = "20000">1万-2万<i class="el-icon-check" style="float: right;margin-top: 0.2rem;"></i></li>
       			<li @click="problem1a" data-a = "20000" data-b = "20000">2万以上<i class="el-icon-check" style="float: right;margin-top: 0.2rem;"></i></li>-->
			</ul>
		</div>
		<div class="downb" v-show="isShowb">
			<ul>
				<li v-for="item in nameb" @click="problem1b('nameb', item)" :class="{'str': item.status}">{{item.name}}<i class="el-icon-check" style="float: right;margin-top: 0.2rem;"></i></li>
				<!--<li @click="problem1b" data-a = "1" data-b = "1">1个月以下<i class="el-icon-check" style="float: right;margin-top: 0.2rem;"></i></li>
       			<li @click="problem1b" data-a = "1" data-b = "6">1-6个月<i class="el-icon-check" style="float: right;margin-top: 0.2rem;"></i></li>
       			<li @click="problem1b" data-a = "6" data-b = "12">6-12个月<i class="el-icon-check" style="float: right;margin-top: 0.2rem;"></i></li>
       			<li @click="problem1b" data-a = "12" data-b = "12">12个月以上<i class="el-icon-check" style="float: right;margin-top: 0.2rem;"></i></li>-->
			</ul>
		</div>
		<div class="product" id="gun" @scroll="woListScroll($event)">
			<ul>
				<li @click="details(itm)" v-for="itm in productlist">
					<img :src="imgSrcBase + itm.logo"/>
					<p>
						<span style="font-size:0.28rem;margin-bottom: 0.15rem;margin-top: 0.1rem;line-height: 0.4rem;">{{itm.name}}</span>
						<span style="font-size:0.2rem ;"><b style="float: left;font-size: 0.2rem;">最高额度</b><span id="qian">{{itm.maxAmount}}<i style="font-size: 0.2rem;">元</i></span></span>
						<span style="font-size:0.2rem;"><b style="float: left;font-size: 0.2rem;">放款时间</b><a style="float: left;">{{itm.minLendingTime}}</a><i style="font-size: 0.2rem;float: left;margin-right: 0.1rem;">小时</i></span>
					</p>
				</li>
				
			</ul>
		</div>

		<div class="bottomnav" style="text-align: center;">
			<span @click="gourl">
                <img style="width: 0.47rem;height: 0.74rem;" :src="jiekuan_hou" alt="">
            </span>
			<span>
                <img style="width: 0.78rem;height: 0.75rem;" :src="wode_h" alt="">
            </span>
			<span @click="gourl3">
                <img style="width: 0.48rem;height: 0.75rem;" :src="wode_x" alt="">
            </span>
		</div>
	</div>
</template>
<script>
	import ajax from '@utils/config';
	import { pickerOptions } from '@constants/index';
	import { praseMoney, parseTime, loanStatusFilter } from '@src/filters';
	// import {validatPhone} from '@src/utils/validate';
	import store from '@src/store';
	import Cookies from 'js-cookie';
	import { Toast } from 'mint-ui';

	export default {

		data() {
			var login = require("@res/img/new/login_bg.jpg");
			return {
				alertForm: {
					dateFrom: '', //开始时间
					dateTo: '', //结束时间
					maxAmount: '', //最大额度
					maxPeriod: '', //最大期限
					minAmount: '', //最小额度
					minPeriod: '', //	最小期限
					pageIndex: '1', //第几页
					pageSize: '12', //多少条
					type: '',
				},
				imgSrcBase: 'https://img.zhaogu168.com/',
				listLoading: true, //列表加载状态
				logins: {
					backgroundImage: "url(" + login + ")",
				},
				ming:true,
				minga:false,
				mingb:false,
				hide:true,
				hidea:true,
				hideb:true,
				fanhuiRight: require("@res/img/new/fanhui-right.png"),
				jiekuan_hou: require("@res/img/img/db_shouye_hui.png"),
				wode_h: require("@res/img/img/db_shangcheng.png"),
				wode_x: require("@res/img/img/db_wode_hui.png"),
				productlist: '',
				types: '',
				isShow: false,
				isShowa: false,
				isShowb: false,
				name: [{
						name: '无',
						status: true,
						first: ''
					},
					{
						name: '可贷额度',
						status: false,
						first: '1'
					},
					{
						name: '借款利息',
						status: false,
						first: '2'
					},
					{
						name: '放款时间',
						status: false,
						first: '3'
					},
					{
						name: '最新口子',
						status: false,
						first: '4'
					},
					{
						name: '芝麻分贷',
						status: false,
						first: '5'
					},
					{
						name: '身份证贷 ',
						status: false,
						first: '6'
					},
					{
						name: '不电回访',
						status: false,
						first: '7'
					},
					{
						name: '不上征信',
						status: false,
						first: '8'
					},
				],
				namea: [{
						name: '额度不限',
						status: true,
						first: '',
						two: ''
					},
					{
						name: '5000以下',
						status: false,
						first: '',
						two: '5000'
					},
					{
						name: '5000-10000',
						status: false,
						first: '5000',
						two: '10000'
					},
					{
						name: '1万-2万',
						status: false,
						first: '10000',
						two: '20000'
					},
					{
						name: '2万以上',
						status: false,
						first: '20000',
						two: ''
					},
				],
				nameb: [{
						name: '期限不限',
						status: true,
						first: '',
						two: ''
					},
					{
						name: '7天以下',
						status: false,
						first: '',
						two: '7'
					},
					{
						name: '8-15天',
						status: false,
						first: '8',
						two: '15'
					},
					{
						name: '15-30天',
						status: false,
						first: '15',
						two: '30'
					},
					{
						name: '30天以上',
						status: false,
						first: '31',
						two: ''
					},
				]
			}
		},
		computed: {},
		created() {
			let data = this.$route.query.data ? JSON.parse(this.$route.query.data) : '';
			this.types = data
			this.fa()
			this.getApplyList();			
		},
		mounted() {},
		methods: {
			 woListScroll(event) {
			    if (event.srcElement.scrollHeight - (event.srcElement.scrollTop + event.srcElement.clientHeight) == 0) {
			     	this.alertForm.pageSize = (Number(this.alertForm.pageSize) + 12) 
			     	this.getApplyList();
			    }
			    if (event.srcElement.scrollHeight - (event.srcElement.scrollTop + event.srcElement.clientHeight) == 1) {
			     	this.alertForm.pageSize = (Number(this.alertForm.pageSize) + 12) 
			     	this.getApplyList();
			    }
			  },
			getApplyList() {
				this.listLoading = true
				ajax({
					url: "product/getLoanMarket",
					optionParams: this.alertForm
				}).post().then(res => {
					if(res.code == 200) {
						console.log(res)
						this.productlist = res.data.loanMarket ? res.data.loanMarket : [];
					} else {
						Toast({
							message: res.message,
							position: 'bottom',
						});
						
					}
					this.listLoading = false
				}).catch(error => {
					console.log(error)
					//this.$router.push({path: '/userManage/Getlost'});
				})
			},
			fa() {
				this.name.map((item) => {
					if(item.first == this.types) {
						console.log(item)
						item.status = true
						this.alertForm.type = this.types
						this.getApplyList();
					} else {
						item.status = false
					}

				})				
			},
			gourl() {
				this.$router.push({
					path: '/userManage/index'
				});
			},
			gourl3() {
				this.$router.push({
					path: '/userManage/my'
				});
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
			goshowtoast() {
				Toast({
					message: "请完善上一步操作",
					position: 'bottom',
				});
			},
			xuanze(e) {
				this.ming = true
				this.minga = false
				this.mingb = false
				this.hide = !this.hide
				if(this.hide){
					//列表
					this.isShow = false;   //隐藏
					this.isShowa = false;
					this.isShowb = false;
				}else{
					//列表
					this.isShow = true;
					this.isShowa = false; //显示
					this.isShowb = false;
				}
			},
			xuanzea(e) {
				this.ming = false
				this.minga = true
				this.mingb = false
				
				this.hidea = !this.hidea
				if(this.hidea){
					this.isShowa = false;
					this.isShow = false;
					this.isShowb = false;
				}else{
					this.isShowa = true;
					this.isShow = false;
					this.isShowb = false;
				}
				
			},
			xuanzeb() {
				this.ming = false
				this.minga = false
				this.mingb = true
				
				this.hideb = !this.hideb
				if(this.hideb){
					this.isShowb = false;
					this.isShowa = false;
					this.isShow = false;
				}else{
					this.isShowa = false;
					this.isShow = false;
					this.isShowb = true;
				}
				
			},
			problem1(name, item) {
				this[name].map((item) => {
					console.log(item.status)
					item.status = false;
				})
				item.status = true;
				this.alertForm.type = item.first;
				this.threename = item.name;
				this.isShow = false;
				this.getApplyList();
			},
			problem1a(namea, item) {

				this[namea].map((item) => {
					console.log(item)
					item.status = false;
				})
				item.status = true;
				this.alertForm.maxAmount = item.two;
				this.alertForm.minAmount = item.first;
				this.isShowa = false;
				//			 	console.log(e.target)
				//			 	e.target.className = 'str' 
				//			 	$(e.target).siblings().removeClass("str")
				//			 	var dd = e.target.getAttribute('data-b')
				//			 	var aa = e.target.getAttribute('data-a')
				//			 	$(".mint-tab-item-label #xina").html(e.target.innerText)
				//			 	$(".downa").slideUp(300)
				//			 	console.log(dd)
				//			 	this.alertForm.maxAmount = dd
				//			 	this.alertForm.minAmount = aa
				this.getApplyList();
			},
			problem1b(nameb, item) {
				this[nameb].map((item) => {
					console.log(item)
					item.status = false;

				})
				item.status = true;
				this.alertForm.maxPeriod = item.two;
				this.alertForm.minPeriod = item.first;
				this.isShowb = false;

				//			 	console.log(e.target)
				//			 	e.target.className = 'str' 
				//			 	$(e.target).siblings().removeClass("str")
				//			 	var dd = e.target.getAttribute('data-b')
				//			 	var aa = e.target.getAttribute('data-a')
				//			 	$(".mint-tab-item-label #xinb").html(e.target.innerText)
				//			 	$(".downb").slideUp(300)
				//			 	console.log(dd)
				//			 	this.alertForm.maxPeriod = dd
				//			 	this.alertForm.minPeriod = aa
				this.getApplyList();
			},
			
			details(itm) {
				ajax({
					url: "product/getProductDetail",
					optionParams: {
						productId: itm.id,
						clickType: '3',
					}
				}).post().then(res => {
					if(res.code == 200) {
						console.log(res)
						this.$router.push({
							path: '/userManage/userstatetail',
							query: {
								data: JSON.stringify(itm)
							}
						})
					}else if(res.code == 250){
						Toast({
							message: res.msg,
							position: 'bottom',
						});
						this.$router.push({
							path: '/login'
						});
					} else{
						Toast({
							message: res.msg,
							position: 'bottom',
						});
					}
				})
				//this.$router.push({path: '/userManage/userstatetail',JSON.stringify(itm)});
			}

		},
		filters: {}
	}
</script>
<style lang="less" scoped>
	.touzi{
		color: #008FFC;
	}
	
	.header {
		color: white;
		border-bottom: 1px solid #E6E6E6;
		font-size: 1.5rem;
		text-align: center;
		vertical-align: middle;
		line-height: 4.5rem;
	}
	
	.app-container {
		background-size: cover;
		background-repeat: no-repeat;
		height: 100%;
		background-color: white;
	}
	.mint-navbar .mint-tab-item {
		font-weight: 600;
		padding: 0px 0px;
	}
	.userstatelist {
		color: white;
		padding-top: 10.0rem;
	}
	
	.userstatelist li {
		border-bottom: 1px solid #fff;
		margin: 0px 5%;
		padding: 1.0rem 0;
		font-size: 1.2rem;
	}
	
	.userstatelist li.secondauth {
		margin-top: 3.0rem;
	}
	
	.userstatelist li:last-child {
		border-bottom: 0;
	}
	
	.authstate {
		vertical-align: middle;
	}
	
	.authstate img {
		width: 1.0rem;
		/*padding: 5px ;*/
		margin: 0 0.5rem;
		vertical-align: middle;
	}
	
	.not_perfect {
		color: #f6ff00;
	}
	
	.userstatebtn {
		background-color: white;
		border-radius: 2.0rem;
		color: #e43d3d;
		text-align: center;
		padding: 0.8rem 0;
		margin-top: 7.0rem;
		font-size: 1.4rem;
	}
	
	.bottomnav {
		width: 100%;
		height: 0.96rem;
		background: #f6fdff;
		position: fixed;
		bottom: 0px;
		display: flex;
		text-align: center;
		border-top: 1px solid #bfbfbf;
	}
	
	.bottomnav span {
		width: 33%;
	}
	
	.bottomnav span img {
		margin-top: 0.1rem;
	}
	
	.fontsize1-4 {
		font-size: 1.4rem;
	}
	
	.down,
	.downa,
	.downb {
		width: 100%;
		background: white;
		overflow: hidden;
		position: fixed;
		margin-top:0.85rem;
	}
	.down {
		height: 3.62rem;
		overflow-y:auto;
	}
	.down ul,
	.downa ul,
	.downb ul {
		width: 85%;
		margin: 0 auto;
	}
	
	.down ul li,
	.downa ul li,
	.downb ul li {
		width: 100%;
		line-height: 0.8rem;
		border-bottom: 1px solid #E6E6E6;
		font-size: 0.24rem;
		font-weight: 600;
	}
	
	.down .str,
	.downa .str,
	.downb .str {
		color: #008FFC;
	}
	
	.product {
		width: 100%;
		height: 10.5rem;
		overflow: hidden;
		float: left;
		margin-top: 1.3rem;
		overflow-y: auto;
	}
	
	.product ul li {
		width: 3.44rem;
		height: 1.60rem;
		border: 1px solid #D9D9D9;
		border-radius: 0.08rem;
		margin-bottom: 0.25rem;
		box-shadow:6px 7px 6px rgba(4,0,0,0.05)
	}
	
	.product ul li img {
		height: 0.72rem;
		width: 0.80rem;
		float: left;
		margin-top: 0.48rem;
		margin-left: 0.18rem;
	}
	
	.product ul li p {
		width: 2.22rem;
		float: right;
		margin-top: 0.1rem;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	
	.product ul li p span {
		display: block;
		width: 100%;
		line-height: 0.3rem;
		text-align: left;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	
	.product ul li p span a {
		font-size: 0.28rem;
		line-height: 0.3rem;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.product ul li p span#qian{
		width: 1.1rem;
		line-height: 0.3rem;
		float: left;
		font-size: 0.28rem;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.product ul li p span b {
		line-height: 0.3rem;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	
	.product ul li:nth-child(odd) {
		float: left;
		margin-left: 0.19rem;
	}
	
	.product ul li:nth-child(even) {
		float: right;
		margin-right: 0.19rem;
	}
</style>