<template>
    <div class="app-container">
        <mt-header title="修改登录密码">
            <mt-button @click="goBack" icon="back" slot="left"></mt-button>
            <!--<mt-button icon="more" slot="right"></mt-button>-->
        </mt-header>
        <div class="cardidentification">

        </div>
        <ul class="datalist">
           
            <li class="cardname">
                <span class="cardnametitle">原密码</span>
                <input type="password"  v-model="alertForm.oldPwd" placeholder="请输入原密码">
            </li>
            <li class="cardname cardIDname">
                <span class="cardnametitle">新密码</span>
                <input type="password"  v-model="alertForm.newPwd" placeholder="请输入新密码">
            </li>
             <li class="cardname cardIDname">
                <span class="cardnametitle">确认密码</span>
                <input type="password" :value="newPwda" v-model="newPwda" placeholder="请输入确认密码">
            </li>
             <li style="color: #999999;border: none;">
             	请使用6-16位数字、字母、特殊符号组合
            </li>
            <li style="border: none;margin-top: 1rem;">
            	<el-button type="primary" class="bottombtn" @click="submitcard" :loading="loading"> 确认修改</el-button>
                <!--<div class="bottombtn" @click="submitcard">
                    确认修改
                </div>-->
            </li>
        </ul>
       
    </div>
</template>
<script>
    import ajax from '@utils/config';
    import {pickerOptions} from '@constants/index';
    import {praseMoney, parseTime, loanStatusFilter} from '@src/filters';
    import {validatPhone} from '@src/utils/validate';
    import axios from 'axios';
    import baseURL from '@utils/baseURL';
    import Cookies from 'js-cookie';
    import { Toast } from 'mint-ui';
    import {Common} from '@src/common/common';

    export default {
        data() {
            return {
            	alertForm:{
			      	 oldPwd: "",//原密码
			        newPwd: "",//新密码
			        token:'',
			      },
			      newPwda:'',//确认密码
			      loading:false,
                listLoading: true, //列表加载状态
                showpopup: false, //列表加载状态
                isshowupdate: false, //列表加载状态
                newupdateimg: false, //列表加载状态
                shenfenz: require("@res/img/new/shenfenz.png"),
                shenfenzfan: require("@res/img/new/shenfenzfan.png"),
                phone:localStorage.getItem('phone'),
            }
        },
        computed: {},
        created() {
     
        },
        mounted() {
        },
        methods: {
           
            // 提交数据
            submitcard() {
            	this.alertForm.token  = localStorage.getItem('token');
            	if(this.newPwda != this.alertForm.newPwd ){
            		Toast({
                            message: '两次密码不一致',
                            position: 'bottom',
                        });
                        return false
            	}
            	 ajax({
                    url: "personal/updatePwd",
                    optionParams: this.alertForm
                }).post().then(res => {
                    if (res.code == 200) {
                       Toast({
		                   message: ""+res.msg+"",
		                   position: 'bottom',
		                  });
		                  localStorage.setItem('inviteCode', '');
			                localStorage.setItem('phone', '');
			                localStorage.setItem('pwd', '');
			                localStorage.setItem('token', '');
			                localStorage.setItem('userId', '');
		                 this.$router.push({ path: '/login' });
                    }else{
                       Toast({
		                   message: ""+res.msg+"",
		                   position: 'bottom',
		                  });
                    }
                })
            },
           
            goBack() {
                this.$router.go(-1)
            },
        },
        filters: {}
    }
</script>
<style lang="less" scoped>
    .header {
        color: white;
        font-size:0.32rem;
        font-weight: bold;
        text-align: center;
        background-color: #E03C3C;
        vertical-align: middle;
        line-height: 4.5rem;
    }
    .app-container{
    	background-color: white;
    }
	.mint-header{
		color: #000000;
		 font-size:0.32rem;
		 border-bottom: 0.01rem solid #E6E6E6;
	}
    .datalist {
    	width: 85%;
    	margin: 0 auto;
    }

    .datalist li.showcard {
        display: flex;
    }


    .datalist li.showcard .card_title {
        flex: 1;
        text-align: left;
        vertical-align: middle;
        /*justify-content: center;*/
        align-items: center;
        display: flex;
        font-size: 1.4rem;
    }

    .datalist li.showcard .img {
        /*width: 100rem;*/
        flex: 1;
        margin-left: 1rem;
    }


    .datalist li.cardname {
        display: flex;
        padding: 0.3rem 0;
    }

    .datalist li.cardname span {
        flex: 1;
    }

    .datalist li.cardname input {
    	width: 76%;
        font-size: 0.32rem;
        text-align: left;
    }

   

    .datalist li.cardname .cardnametitle {
        text-align: left;
        vertical-align: middle;
        /*justify-content: center;*/
        align-items: center;
        display: flex;
        font-size:0.30rem;
        color: #333333;
    }

    .datalist li {
    	font-size: 0.28rem;
        border-bottom: 0.01rem solid #F6F6F6;
    }
    .bottombtn {
		 border-bottom: 0px;
    color: white;
    background-color: #209DFC;
    border-radius: 0.08rem;
		height: 0.68rem;
    font-size: 0.28rem;
    width: 100%;
    margin-bottom: 0.24rem;
	}

   

    .coverlayer {
        position: absolute;
        z-index: 999;
        background-color: rgba(0, 0, 0, 0.4);
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        /*display: none;*/
    }

    .popupcontext {
        position: absolute;
        background-color: white;
        width: 90%;
        top: 0;
        bottom: 0;
        height: 16.0rem;
        /* vertical-align: middle; */
        margin: auto;
        border-radius: 0.5rem;
        left: 0;
        right: 0;
        z-index: 9999;
    }

    .popuplayer .popuptitle {
        text-align: center;
        padding: 1.0rem 0;
        font-size: 1.4rem;
    }

    .popuplayer .submitbtn {
        background-color: #e43d3d;
        border-radius: 2.0rem;
        color: white;
        text-align: center;
        padding: 0.8rem 0;
        /* margin-top: 80rem; */
        font-size: 1.4rem;
        width: 80%;
        margin: 2.6rem auto 0rem;
    }

    .popuplayer .popupinput {

        text-align: center;
        border-bottom: 0.1rem solid #eee;
        padding: 0.5rem 0;
        margin: 1.0rem 15%;
        width: 70%;
    }

    .popuplayer .popupinput input {
        text-align: center;
    }
</style>





