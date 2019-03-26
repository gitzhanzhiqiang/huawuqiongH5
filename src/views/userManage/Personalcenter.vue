<template>
    <div class="app-container" :style="">
      <mt-header title="个人中心">
            <mt-button @click="fanhui" icon="back" slot="left"></mt-button>
        </mt-header>
       	<div class="herd" @click="handleBtnClick()">
       		<p><span style="float: left;">头像</span><i class="el-icon-arrow-right"></i><img :src="fanhuiRight"/><input type="file" id="file" @click="handleTextClick" @change='onUpload' style="display: none"></p>
       	</div>
       	 <div class="product">
           <ul>
               <div class="product_li">
					<li @click="xiugai">
               		姓名<i class="el-icon-arrow-right"></i><span v-show="xian1">{{alertForm.userName}}</span>
	               </li>
	                <li @click="change" style="border: none;" v-if='zrfStaff != 1'>
	               		密码设置<i class="el-icon-arrow-right"></i>
	               </li>               	
               </div>
               <div class="product_lis">
           		 <li style="border: none;"  v-if='zrfStaff != 1'>
               		手机号<span>{{alertForm.phone}}</span>
              	 </li>
                </div>
                <div class="product_lis">
           		 <li style="border: none;">
               		邀请码<span>{{alertForm.inviteCode}}</span>
               	</li>
              </div>
           </ul>
       </div>
       	<mt-button type="primary" style='height: 0.87rem;' @click='tuichu' class="aniu">退出登录</mt-button>
       
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
     import baseURL from '@utils/baseURL';
    //import axios from 'axios';
     import {Common} from '@src/common/common';
	import OSS from "ali-oss";

    export default {

        data() {
            var login = require("@res/img/new/login_bg.jpg");
            return {
            	alertForm:{
            		inviteCode:"",
            		phone:"",
            		name:"",
            	},
            	names:'',
                listLoading: true, //列表加载状态
                logins: {
                    backgroundImage: "url(" + login + ")",
                },
                fanhuiRight: require("@res/img/img/touxiaong.png"),
                jiekuan_hou: require("@res/img/img/db_shouye_hui.png"),
                wode_h: require("@res/img/img/db_shangcheng_hui.png"),
                 wode_x: require("@res/img/img/db_wode.png"),
              	xian:false,
              	xian1:false,
              	imgSrcBase: 'https://img.zhaogu168.com',
                listdata:"",
                xiugaia:true,
				 zrfStaff:'',
            }
        },
        computed: {},
        created() {
            this.getaccount();
        },
        mounted() {
        },
        methods: {
            getaccount() {
            	 this.alertForm.inviteCode  = localStorage.getItem('inviteCode');
				 this.zrfStaff = localStorage.getItem('zrfStaff');
            	 var phone = localStorage.getItem('phone');
            	 if(phone != 1){
            	 	this.alertForm.phone  = localStorage.getItem('phone');
            	 }else{
					 this.alertForm.phone = ''
				 }
                
            	 ajax({
                    url: "personal/perInfo",
                    optionParams: {
                    	
                    }
                }).post().then(res => {
                    if (res.code == 200) {
                    	console.log(res)
                    	if(res.data.userName == null){
                    		this.xian = true
                			this.xian1 = false
                    	}else{
		                	this.xian = false  
		                	this.xian1 = true
		                	this.alertForm.userName = res.data.userName
		                }
                    	if(res.data.headUrl !=null){
                    		this.fanhuiRight = this.imgSrcBase + res.data.headUrl
                    	}
                    }else if(res.code == 999){
                    		//this.$router.push({path: '/login'});
                    }else{
                       Toast({
		                   message: ""+res.message+"",
		                   position: 'bottom',
		                  });
		                  this.$router.push({path: '/login'});
                    }
                }).catch(error => {
					console.log(error)
					this.$router.push({path: '/userManage/Getlost'});
				})
                
            },
			
           fanhui(){
           			this.$router.push({path: '/userManage/my'});
           },
           change(){
           	this.$router.push({path: '/userManage/cardidentification'});
           },
			 tuichu(){			
                localStorage.setItem('MessageBoxs', '');
                localStorage.setItem('inviteCode', '');
                localStorage.setItem('name', '');
				localStorage.setItem('phone', '');
                localStorage.setItem('pwd', '');

				localStorage.setItem('token', '');
				localStorage.setItem('userId', '');
				localStorage.setItem('headUrl', '');

				localStorage.setItem('zrfStaff', '');
			 	this.$router.push({path: '/login'});
			 },
			 //上传
			  handleBtnClick(val) {
                document.getElementById("file").click();
            },
            handleTextClick() {
                console.log('input 被点击')
            },
             onUpload(e) {
                let file = e.target.files[0];
                var val = document.getElementById("file").value;
				var arr = val.split('.');
				console.log(arr)
				var suffix = arr[arr.length-1]
				console.log(suffix)
				var storeAs = '/hwq' + "/infoimg/" + this.getNowDate() +"/" + this.timestamp() +"."+ suffix; //命名空间
				console.log(storeAs)
				
				var client = new OSS.Wrapper({
					region: 'oss-cn-shanghai',
					accessKeyId: 'LTAIR632dUFd2DhQ',
					accessKeySecret: 'vBysGq1EM3Ti3vjmY5dyJmtKaACoDn',
					bucket: 'ygg168'
				});
				
//				client.options.endpoint.protocol= "https:";
//				client.options.timeout = 120000;
//
//				 client.list({
//						'max-keys': 10
//					}).then(function(result) {
//						console.log(result);
//					}).catch(function(err) {
//						console.log(err);
//					});
				client.multipartUpload(storeAs, file).then(function(result) {
						console.log('---------');
						console.log(result);
						console.log(result.res);
						console.log(result.res.status);
						console.log('------cc---');
						if(result.res.status == 200){
							ajax({
			                    url: "personal/updateUrlOrName",
			                    optionParams: {
			                    	name:'',
			                    	headUrl:storeAs
			                    }
			                }).post().then(res => {
			                    if (res.code == 200) {
			                    	console.log(res)
			                    	window.location.reload()
			                    }else{
			                       Toast({
					                   message: ""+res.message+"",
					                   position: 'bottom',
					                  });
			                    }
			                })
						}
						
					}).catch(function(err) {
						console.log(err);
					});
				
				
            },
           
           timestamp() {
				var time = new Date();
				var y = time.getFullYear();
				var m = time.getMonth() + 1;
				var d = time.getDate();
				var h = time.getHours();
				var mm = time.getMinutes();
				var s = time.getSeconds();
				return "" + y + this.add0(m) + this.add0(d) + this.add0(h) + this.add0(mm) + this.add0(s);
			},

			add0(m) {
				return m < 10 ? '0' + m : m;
			},
           getNowDate(){
				 var d = new Date()
				 	if((d.getMonth() + 1)<10){
				 		var yue = ("0"+(d.getMonth() + 1))
				 	}else{
				 		var yue = (d.getMonth() + 1)
				 	}
				 	if((d.getDate())<10){
				 		var ri = ("0"+(d.getDate()))
				 	}else{
				 		var ri = (d.getDate())
				 	}
				 	
				 	var dateTmp = (d.getFullYear()) + yue + ri
					return dateTmp;
			},	
			//修改名字
            xiugai(){
				this.$router.push({path: '/userManage/Personal'});
            }
        },
        filters: {}
    }
</script>
<style lang="less" scoped>
	.aniu{
		 width: 100%;
		 background-color:white ;
		 display: block;
        margin: 0 auto;
        font-size: 0.28rem;
        color: #000000;
	}
	.mint-header{
		color: #000000;
		font-size: 0.32rem;
		height: 0.88rem;
	}
    .herd {
    	height: 1.56rem;
        color: #000000;
        background-color: white;
        border-bottom: 1px solid #E6E6E6;
        text-align: center;
        vertical-align: middle;
        margin-top: 0.23rem;
    }
	.herd p{
		width: 79%;
		height: 1.56rem;
		margin: 0 auto;
		 font-size: 0.30rem;
		 line-height: 1.8rem;
		 color: #333333;
	}
	.herd p img{
		width: 1rem;
		height: 1rem;
		float: right;
		border-radius: 50%;
		margin-right: 0.5rem;
		margin-top: 0.3rem;
	}
	.herd p i{
		margin-top: 0.74rem;
		float: right;
	}
	
    .app-container {
        background-size: cover;
        background-repeat: no-repeat;
        background-color: #f2f2f2 ;
        height: 100%;
    }

  
    .bottomnav {
        width: 100%;
    	 height: 4.5rem;
    	background: white;
        position: fixed;
        bottom: 0px;
        display: flex;
        text-align: center;
    }

    .bottomnav span {
        width: 33%;
    }

    .bottomnav span img {
        /*width: 45px;*/
        height: 4rem;
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
        margin: 0 auto;
        margin-top: 0.5rem;
	}
	.product .product_li{
		width: 100%;
		background-color: white;
		margin-bottom: 0.24rem;
	}
	.product .product_lis{
		width:100% ;
		background-color: white;
		margin-bottom: 0.24rem;
	}
   .product ul li{
   		width: 80%;
   		height: 1rem;
   		margin: 0 auto;
   		line-height: 1rem;
   		border-bottom: 1px solid #E6E6E6;
   		font-size: 0.30rem;
		   position: relative;
   	}
   		.product ul li input{
			   width: 3rem;
   			height: 0.8rem;
   			line-height: 0.8rem;
   			text-align: right;
			   position: absolute;
			   top: 0.1rem;
			   background: none;
   		}
   	.product ul li span{
   		float: right;
   		margin-right: 0.3rem;
   		font-size: 0.24rem;
   	}
   .product ul li i{
   		float: right;
   		margin-top: 0.3rem;
   	}
</style>