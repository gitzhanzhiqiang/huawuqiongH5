<template>
    <div class="app-container" :style="">
       	<mt-header title="银行卡">
            <mt-button @click="fanhui" icon="back" slot="left"></mt-button>
        </mt-header>
         <div class="tianka" @click="tiedcard">
         	<p >
         		<img :src="jia"/>
         		添加银行卡
         	</p>
         </div>
       	<div class="zuida">
       		<ul>
       			<li v-for="itm in productlist" @click="xuanze(itm)" :class="itm.bankCode">
       				<p>{{itm.bankName}}</p>
       				
       				<b>{{itm.bankCardNo}}</b>
       				<!--<i class="el-icon-check" v-show="itm.mingzixuan"></i>-->
       			</li>
       		</ul>
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
            return {
            	loading:false,
                listLoading: true, //列表加载状态
                logins: {
                    backgroundImage: "url(" + login + ")",
                },
                fanhuiRight: require("@res/img/new/fanhui-right.png"),
                jiekuan_hou: require("@res/img/img/db_shouye_hui.png"),
                wode_h: require("@res/img/img/db_shangcheng.png"),
                 jia: require("@res/img/img/jiahaom.png"),
                 wode_x: require("@res/img/img/db_wode_hui.png"),
                rowData:'',//传过来的数据
                productlist:[],
                imgSrcBase: 'https://img.zhaogu168.com/',
                UvCount:'',
            }
        },
        computed: {},
        created() {
        	let data = this.$route.query.data ? JSON.parse(this.$route.query.data) : '';
			this.rowData = data
			console.log(data)
            this.getaccount();
            
        },
        mounted() {
        },
        methods: {
        	// fa() {
			// 	this.productlist.map((item) => {
			// 		if(item.bankCode == this.rowData.bankCode) {
			// 			this.$set(item, 'mingzixuan', true)
			// 		} else {
			// 			this.$set(item, 'mingzixuan', false)
			// 		}

			// 	})				
			// },
            getaccount() {
                ajax({
                    url: "personal/getBankCard",
                    optionParams: {
                    	
                    }
                }).post().then(res => {
                    if (res.code == 200 ) {
                       console.log(res)
                       this.productlist = res.data ? res.data : [];
                    //    this.productlist.map((itm)=>{
					// 		var arr = itm.bankName.split('·');
					// 		var suffix = arr[arr.length-1]
					// 		this.$set(itm, 'suffix', suffix)
					// 		var str = itm.bankName.substr(0, itm.bankName.indexOf('·'));
					// 		this.$set(itm, 'suffixa', str)
					// 	})
                       //this.fa()
                    }else if(res.code == 999){
                    	//this.$router.push({path: '/login'});
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
            tiedcard() {
                this.$router.push({path: '/userManage/tiedcard'});
            },
            
            fanhui(){
            	this.$router.push({path: '/userManage/my'});
            },
            //选择银行卡
           xuanze(itm){
	           this.$router.push({
	           	path: '/userManage/withdrawal',
	           	query: {
						data: JSON.stringify(itm)
					}
	           	
	           });
           },
           
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
        border: 1px solid #E6E6E6;
    }
    .app-container {
    	background-color: white;
        background-size: cover;
        background-repeat: no-repeat;
        height: 100%;
        font-family: Hisense;
    }
	.tianjia {
		position: absolute;
		top :0;
		color: #007EFF;
		font-size: 0.40rem;
		right: 0;
		height: 40px;
		width: 40px;
		line-height: 40px;
		text-align: center;
	}
	.zuida ul li{
		width: 6.78rem;
		height: 2.15rem;
		background:linear-gradient(-29deg,rgba(253,109,99,1) 0%,rgba(243,73,62,1) 100%);
		margin: 0.35rem auto;
		border-radius:0.1rem;
		color: red;
		box-shadow:2px 10px 21px rgba(0,0,0,0.34);
		position: relative;
	}
	.zuida ul li i{
		position: absolute;
		right: 0.2rem;
		top: 0.6rem;
	}
	.zuida ul li p{
		width: 6.37rem;
		font-size: 0.32rem;
		line-height: 0.5rem;
		float: right;
		color: white;
		margin-top: 0.39rem;
	}
	.zuida ul li span{
		display: block;
		width: 6.37rem;
		font-size: 0.24rem;
		line-height: 0.5rem;
		float: right;
		color: white;
		
	}
	.zuida ul li b{
		width: 100%;
		width: 6.37rem;
		line-height: 0.5rem;
		float: left;
		display: block;
		text-align: right;
		font-size: 0.32rem;
		color: white;
		margin-top: 0.1rem;
	}
	.zuida ul li.CCB{
		background:linear-gradient(-29deg,rgba(99,148,194,1) 0%,rgba(59,145,194,1) 100%);
	}
	.zuida ul li.CMBC{
		background:linear-gradient(-29deg,rgba(253,109,99,1) 0%,rgba(243,73,62,1) 100%);
	}
	.zuida ul li.ABC{
		background:linear-gradient(-29deg,rgba(79,207,190,1) 0%,rgba(0,151,130,1) 100%);
	}
	.zuida ul li.ICBC{
		background:linear-gradient(-29deg,rgba(99,148,194,1) 0%,rgba(59,145,194,1) 100%);
	}
	.tianka{
		width: 100%;
		height: 1.02rem;
		background: #F0F0F0;
		padding: 0.23rem 0;
	}
	.tianka p{
		width: 3rem;
		height:0.6rem;
		border: 1px solid #999999;
		border-radius:0.5rem;
		font-size: 0.28rem;
		color: #999999;
		line-height: 0.6rem;
		margin: 0 auto;
	}
	.tianka p img{
		width: 0.33rem;
		height: 0.33rem;
		float: left;
		margin-left: 0.55rem;
		margin-top: 0.13rem;
		margin-right: 0.23rem;
	}
</style>