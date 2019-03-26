<template>
    <div class="app-container" :style="" v-loading="listLoading">
    	<img :src="logo"/>
       	<div class="tou">
       		<p><span style="font-size: 0.56rem;font-weight: 500;margin-right: 0.2rem;">贷款超市</span><span style="font-size: 0.28rem;">专业便捷的网贷平台</span></p>
       	</div>
       	<div class="tou_x" :style="loginin">
       		<img :src="fanhuiRight"/>
       		<p style="margin-top: 0.3rem;">
       			{{name}}
       		</p>
       		<p>
       			邀请码：{{inviteCode}}
       		</p>
       	</div>
       	 <div class="product" @scroll="woListScroll($event)">
           <ul>
               <li @click="details(itm)" v-for="itm in productlist">
               	<img :src="imgSrcBase + itm.logo"/>
               		<p>
						<span style="font-size:0.28rem;">{{itm.name}}</span>
						<span style="font-size:0.28rem ;"><b style="float: left;font-size: 0.2rem;">最高额度</b><span id="qian">{{itm.maxAmount}}<i style="font-size: 0.2rem;">元</i></span></span>
						<span style="font-size:0.2rem;"><b style="float: left;font-size: 0.2rem;">放款时间</b><i style="font-size: 0.2rem;float: right;margin-right: 0.1rem;">小时</i><a style="float: right;">{{itm.minLendingTime}}</a></span>
					</p>
               </li>
              
           </ul>
       </div>
       	
         <div class="bottomnav" style="text-align: center;">
            <span>
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
    import {pickerOptions} from '@constants/index';
    import {praseMoney, parseTime, loanStatusFilter} from '@src/filters';
    // import {validatPhone} from '@src/utils/validate';
    import store from '@src/store';
    import Cookies from 'js-cookie';
    import {Toast} from 'mint-ui';

    export default {

        data() {
            var login = require("@res/img/new/login_bg.jpg");
            var loginin = require("@res/img/img/bj.png");
            return {
            	alertForm:{
            		dateFrom:'',//开始时间
            		dateTo:'',//结束时间
            		maxAmount:'',//最大额度
            		maxPeriod	:'',//最大期限
            		minAmount:'',//最小额度
            		minPeriod:'',//	最小期限
            		pageIndex:'1',//第几页
            		pageSize:'10',//多少条
            		type:'',
            	},
            	 logo:require("@res/img/img/logoa.png"),
            	imgSrcBase: 'https://img.zhaogu168.com/',
                listLoading: true, //列表加载状态
                logins: {
                    backgroundImage: "url(" + login + ")",
                },
                loginin: {
                    backgroundImage: "url(" + loginin + ")",
                },
                 fanhuiRight: require("@res/img/img/touxiaong.png"),
                jiekuan_houa:require("@res/img/new/fanhui-right.png"),
                jiekuan_hou: require("@res/img/img/db_shouye_hui.png"),
                wode_h: require("@res/img/img/db_shangcheng.png"),
                 wode_x: require("@res/img/img/db_wode_hui.png"),
              productlist:[],
              prod:'',
              userId:'',
              inviteCode:'',
              headUrl:'',
			   name:'',
            }
        },
        computed: {},
        created() {
        	let data = this.$route.query.data ? JSON.parse(this.$route.query.data) : '';
			console.log(data.headUrl)
        	this.userId = data.userId
			if(data.name == 'null'){
				this.name = ''
			}else{
				this.name = data.name
			}
        	this.inviteCode = data.inviteCode
        	if(data.headUrl == null || data.headUrl == ""){
			
        	}else{
				
				this.fanhuiRight =this.imgSrcBase + data.headUrl
			}
        	// this.getApplyLista();
            this.getApplyList();
           
        },
        mounted() {
        },
        methods: {
            woListScroll(event) {
			    if (event.srcElement.scrollHeight - (event.srcElement.scrollTop + event.srcElement.clientHeight) == 0) {
			     	this.alertForm.pageSize = (Number(this.alertForm.pageSize) + 10) 
			     	this.getApplyList();
			    }
			    if (event.srcElement.scrollHeight - (event.srcElement.scrollTop + event.srcElement.clientHeight) == 1) {
			     	this.alertForm.pageSize = (Number(this.alertForm.pageSize) + 10) 
			     	this.getApplyList();
			    }
			  },

            getApplyList() {
            	this.listLoading = true
            	ajax({
                    url: "product/getLoanMarket",
                    optionParams: this.alertForm
                }).post().then(res => {
                    if (res.code == 200 ) {
                       console.log(res)
                       this.productlist = res.data.loanMarket ? res.data.loanMarket : [];
                    }else{
                    	Toast({
	                        message: res.msg,
	                        position: 'bottom',
	                    });
                    }
                    this.listLoading = false
                }).catch(error => {
					console.log(error)
					this.$router.push({path: '/userManage/Getlost'});
				})
            	
             },
			
			//  getApplyLista() {
            // 	ajax({
            //         url: "tAppUser/InviteUserDetail",
            //         optionParams: {
            //         	userId:this.userId
            //         }
            //     }).post().then(res => {
            //         if (res.code == 200 ) {
            //            console.log(res)
            //            this.jiekuan_houa = this.imgSrcBase + res.data.headUrl
            //            this.prod = res.data ? res.data : [];
            //         }else{
            //         	Toast({
	        //                 message: res.msg,
	        //                 position: 'bottom',
	        //             });
            //         }
            //     }).catch(error => {
			// 		console.log(error)
			// 		this.$router.push({path: '/userManage/Getlost'});
			// 	})
            	
            //  },
			
           
             gourl3() {
				 var str = {
					 inviteCode:this.inviteCode,
					 codeType:'1',
				 }
                this.$router.push({
            		path: '/userManage/registered',
            		query: {
						data: JSON.stringify(str)
					}
            	});
            },
            godeposit() {
                this.$router.push({path: '/userManage/openaccount'});
                // this.$router.push({ path: '/userManage/depositmanagement' });
            },
            gocardident() {
                this.$router.push({path: '/userManage/cardidentification'});
            },// 不能点击有提示信息显示
           
            xuanze(){
            	$(".down").slideDown()
            },
			
			 details(itm){
			 	ajax({
                    url: "product/getProductDetail",
                    optionParams: {
                    	productId: itm.id,
						clickType: '2',
                    }
                }).post().then(res => {
                    if (res.code == 200 ) {
                       console.log(res)
                      this.$router.push({
							path: '/userManage/userstatetail',
							query: {
								data: JSON.stringify(itm)
							}
						})
                    } else if(res.code == 300){
						Toast({
							message: res.msg,
							position: 'bottom',
						});
					}else{
                    	Toast({
	                        message: res.msg,
	                        position: 'bottom',
	                    });
						this.gourl3() 
                    }
                })
			 	
			 	//this.$router.push({path: '/userManage/registered'});
			 }
        },
        filters: {}
    }
</script>
<style lang="less" scoped>
	.tou{
		width: 92%;
		margin: 0.3rem auto;
	}
	.tou_x{
		width: 92%;
		height: 2rem;
		margin: 0 auto;
		background-size: 100% 100%;
		margin-top: 0.1rem;
	}
   .tou_x img{
   	float: left;
   	width: 0.94rem;
   	height: 0.94rem;
   	border-radius: 50%;
   	margin-left: 0.57rem;
   	margin-top: 0.53rem;
   }
	.tou_x p{
		float: right;
		width: 69%;
		line-height: 0.6rem;
		color: white;
		font-size: 0.32rem;
	}
    .app-container {
        background-size: cover;
        background-repeat: no-repeat;
        float: left;
    }
.app-container>img{
		width: 2rem;
		height: 0.5rem;
		display: block;
		margin: 0.45rem auto;
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
		border-top:1px solid #bfbfbf ;
	}
	
	.bottomnav span {
		width: 33%;
	}
	.bottomnav span img{
		margin-top: 0.1rem;
	}

    
	.down{
		width: 100%;
		background: white;
		overflow: hidden;
		 position: fixed;
		 display: none;
	}
	.down ul{
		width: 85%;
		margin: 0 auto;
		
	}
	.down ul li{
		width: 100%;
		line-height: 3rem;
		border-bottom: 1px solid #E6E6E6;
	}
	.str{
		color: #008FFC;
	}
	.product{
		 width: 100%;
		 height: 6.5rem;
		margin-top: 0.5rem;
		overflow: hidden;
		float: left;
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
		line-height: 0.46rem;
		text-align: left;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.product ul li p span a{
		width: 0.6rem;
		float: left;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.product ul li p span#qian{
		width: 1.3rem;
		float: right;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.product ul li p span b {
		width: 0.9rem;
		float: right;
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