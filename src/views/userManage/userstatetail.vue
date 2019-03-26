<template>
    <div class="app-container" :style="">
       	<mt-header :title="productlist.name">
            <mt-button @click="fanhui" icon="back" slot="left"></mt-button>
        </mt-header>
       	
       	 <!--<div class="product">
           <ul>
               <li>
               		<img :src="imgSrcBase + productlist.logo"/>
               		<p>
               			<span style="font-size:0.32rem;font-weight: 600;">{{productlist.name}}</span>
               			<span style="font-size:0.28rem;"><b style="color: #6EC0FF;">{{UvCount}}</b>&nbsp;&nbsp;&nbsp;人已申请</span>
               		</p>
               </li>
           </ul>
       </div>-->
       	<div class="Product_information">
       		<h1>产品信息</h1>
       		<div class="Product_ul">
       			<ul>
       			<li style="display: block;width: 100%;">
       				<p style="width:100%;margin: 0 auto;margin-top: 0.2rem;text-align: center;">金额</p>
       				<h3 style="width:100%;margin: 0 auto;border: none;text-align: center;">{{rowData.minAmount}}-{{rowData.maxAmount}}<span>元</span></h3>
       			</li>
       			<li>
       				<p>
       					<span v-if="rowData.rateType == 0">利率</span>
       					<span v-if="rowData.rateType == 1">天利率</span>
       					<span v-if="rowData.rateType == 2">周利率</span>
       					<span v-if="rowData.rateType == 3">月利率</span>
       					<span v-if="rowData.rateType == 4">年利率</span>
       				</p>
       				<h3>
       					{{rowData.rate}}%
       					<span v-if="rowData.rateType == 0"></span>
       					<span v-if="rowData.rateType == 1">/天</span>
       					<span v-if="rowData.rateType == 2">/周</span>
       					<span v-if="rowData.rateType == 3">/月</span>
       					<span v-if="rowData.rateType == 4">/年</span>
       					
       				</h3>
       				
       			</li>
       			<li>
       				<p>放款时间</p>
       				<h3>{{rowData.minLendingTime}}-{{rowData.maxLendingTime}}<span>小时</span></h3>
       			</li>
       			<li>
       				<p>期限</p>
       				<h3 style="border: none;">{{rowData.minPeriod}}-{{rowData.maxPeriod}}<span>天</span></h3>
       			</li>
       			
       			
       		</ul>
       		</div>
       		<h1 style="padding: 0.49rem 0 0.20rem 0;">贷款须知</h1>
       	</div>
       	<div class="Lending_guidelines">
       		<p>
       			<span style="font-weight: 800;margin-bottom: 0rem;">申请条件</span>
       			<span v-if='rowData.hasCondition == 1' style="font-size: 0.24rem;">{{rowData.conditionDetail}}</span>
       		</p>
       		<p>
       			<span style="font-weight: 800;margin-bottom: 0rem;">所需材料</span>
       			<span v-if='rowData.hasData == 1' style="font-size: 0.24rem;">{{rowData.dataDetail}}</span>
       		</p>
       		<p style="border: none;">
       			<span style="font-weight: 800;margin-bottom: 0rem;">产品详情</span>
       			<span v-if='rowData.hasDescribe == 1' style="font-size: 0.24rem;">{{rowData.describeDetail}}</span>
       		</p>
       		
       	</div>
    	<el-button type="primary" :loading="loading" style='margin-top: 0.7rem;margin-bottom: 0.7rem;' class="aniu" @click='shenqing(rowData.id)'>立即申请</el-button>
    </div>
</template>
<script>
    import ajax from '@utils/config';
    import {pickerOptions} from '@constants/index';
    import {praseMoney, parseTime, loanStatusFilter} from '@src/filters';
    // import {validatPhone} from '@src/utils/validate';
    import store from '@src/store';
    import Cookies from 'js-cookie';
    import {Toast} from 'mint-ui';

    export default {

        data() {
            var login = require("@res/img/new/login_bg.jpg");
            return {
            	loading:false,
                listLoading: true, //列表加载状态
                logins: {
                    backgroundImage: "url(" + login + ")",
                },
                fanhuiRight: require("@res/img/new/fanhui-right.png"),
                jiekuan_hou: require("@res/img/img/db_shouye_hui.png"),
                wode_h: require("@res/img/img/db_shangcheng.png"),
                 wode_x: require("@res/img/img/db_wode_hui.png"),
                rowData:'',//传过来的数据
                productlist:'',
                imgSrcBase: 'https://img.zhaogu168.com/',
                UvCount:'',
            }
        },
        computed: {},
        created() {
        	let data = this.$route.query.data ? JSON.parse(this.$route.query.data) : '';
        	this.rowData = data
        	console.log(data)
         //   this.getaccount();
        },
        mounted() {
        },
        methods: {
            getaccount() {
                ajax({
                    url: "tProduct/detail",
                    optionParams: {
                    	productId:this.rowData.id
                    }
                }).post().then(res => {
                    if (res.code == 200 ) {
                       console.log(res)
                       this.productlist = res.data.ProductDetail ? res.data.ProductDetail : '';
                       this.UvCount = res.data.UvCount;
                    }else if(res.code == 999){
                    	this.$router.push({path: '/login'});
                    }else{
                    	Toast({
	                        message: res.msg,
	                        position: 'bottom',
	                    });
                    }
                }).catch(error => {
					console.log(error)
					//this.$router.push({path: '/userManage/Getlost'});
				})
            },


            gourl() {
                this.$router.push({path: '/userManage/index'});
            },
            gourl1() {
                this.$router.push({path: '/userManage/userstate'});
            },
            fanhui(){
            	this.$router.go(-1);
            },
            godeposit() {
                this.$router.push({path: '/userManage/openaccount'});
                // this.$router.push({ path: '/userManage/depositmanagement' });
            },
            gocardident() {
                this.$router.push({path: '/userManage/cardidentification'});
            },// 不能点击有提示信息显示
            //申请产品
            shenqing(row){
            	this.loading = true 
				console.log(row)
            	ajax({
                    url: "product/clickProduct",
                    optionParams: {
                    	productId:row
                    }
                }).post().then(res => {
                    if (res.code == 200 ) {
                       console.log(res)   
					    window.location.href= ""+res.data.url+""                  
                      
                    }else{
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
    .mint-header{
        color: #000;
        font-size: 0.32rem;
        margin-bottom: 0.2rem;
        border: 1px solid #E6E6E6;
    }
    .app-container {
    	background-color: white;
        background-size: cover;
        background-repeat: no-repeat;
        height: 100%;
        font-family: Hisense;
    }
	.product,.Lending_guidelines,.aniu{
		 width: 7.1rem;
		 overflow: hidden;
		 display: block;
        margin: 0 auto;
	}
   	.product ul li{
   		width: 100%;
   		height: 1.72rem;
   	}
   	.product ul li img{
   		height: 1.50rem;
   		width: 1.50rem;
   		float: left;
   	}
   	.product ul li p{
   		width:5.32rem;
   		float: right;
   		margin-top: 0.15rem;
   	}
   	.product ul li p span{
   		display: block;
   		width: 100%;
   		line-height: 0.6rem;
   		text-align: left;
   	}
   	.Product_information{
		width: 100%;
		height: 3.91rem;
		background-color: white;
	}
   	.Product_information h1,.Lending_guidelines h1{
   		 width: 7.1rem;
   		 margin: 0 auto;
   		font-size: 0.2rem;
   		padding: 0.22rem 0 0.20rem 0;
   		color: #999999;
   	}
   	
   	.Product_information .Product_ul{
   		width: 6.80rem;
		height: 2.43rem;
   		margin: 0 auto;
   		border-radius:0.08rem;
   		background:linear-gradient(-38deg,rgba(0,115,233,1) 0%,rgba(82,125,249,1) 100%);
   		box-shadow:2px 10px 21px rgba(0,0,0,0.34);
   	}
   	.Product_information .Product_ul ul li{
   		width: 2.21rem;
   		float: left;
   		margin-bottom: 0.38rem;
   	}
   	.Product_information .Product_ul ul li h3{
   		width: 1.7rem;
   		height: 0.40rem;
   		font-size: 0.36rem;
   		font-weight: 500;
   		color: white;
   		float: right;
   		text-align: left;
   		border-right:2px solid #CCCCCC;
   	}
   	.Product_information .Product_ul ul li h3 span{
   		font-size: 0.28rem;
   		font-weight: 550;
   		color: #CCCCCC;
   	}
   	
   	.Product_information .Product_ul ul li p{
   		color: #CCCCCC;
   		width: 1.7rem;
   		font-size: 0.24rem;
   		margin: 0 auto;
   		float: right;
   		text-align: left;
   	}
   	.Lending_guidelines p{
   		font-size: 0.28rem;
   		width: 6.15rem;
   		margin: 0 auto;
   		margin-top: 0.20rem;
   		border-bottom: 1px solid #F2F2F2;
   	}
   	.Lending_guidelines span{
   		display: block;
   		width: 6.15rem;
   		margin: 0 auto;
   		line-height: 0.5rem;
   		margin-bottom: 0.2rem;
   	}
</style>