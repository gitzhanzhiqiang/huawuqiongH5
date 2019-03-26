<template>
	<div class="app-container" :style="" v-loading="listLoading">
		<div class="swiperlayer userstatelist" @mouseleave="swiperOver">
			<swiper :options="swiperOption" ref="mySwiper">
				<!-- 这部分放你要渲染的那些内容 -->
				<swiper-slide v-for="itm in banner" :key="itm.banner" @click.native="doSome(itm)">
					<img :src="imgSrcBase + itm.banner">
				</swiper-slide>
				<!-- 这是轮播的小圆点 -->
			</swiper>
		</div>
		 <div class="vueBox">
		    <div class="marquee">
		        <div class="marquee_box">
		        	<img :src="ling" />
		            <ul class="marquee_list" :class="{marquee_top:animate}">
		                <li v-for="(item, index) in marqueeList">
		                    <span>{{item.name}}</span>
		                </li>
		            </ul>
		        </div>
		    </div>
		</div>
		<div class="btm" style="text-align:center;">
			<mt-button class="btm_x" style="float: left;" @click='zuixin'>最新口子</mt-button>
			<mt-button class="btm_d" type="primary" @click='zuixina'>大额速贷</mt-button>
			<mt-button class="btm_z" style="float: right;" type="primary" @click='zuixinb'>芝麻分贷</mt-button>
		</div>
		<div class="product" @scroll="woListScroll($event)">
			<ul>
				<li v-for="itm in productlist" id="prod" @click="details(itm)">
					<img :src="imgSrcBase + itm.logo" />
					<p>
						<span style="font-size:0.28rem;">{{itm.name}}</span>
						<span style="font-size:0.28rem;">{{itm.minAmount}}-{{itm.maxAmount}}<i style="font-size: 0.2rem;">元</i></span>
						<span style="font-size:0.2rem ;line-height: 0.2rem;">可贷款额度</span>
					</p>
				</li>
			</ul>
		</div>
		<div class="bottomnav" style="text-align: center;">
			<span>
                <img style="width: 0.47rem;height: 0.74rem;" :src="jiekuan_hou" alt="">
            </span>
			<span @click="gourl">
                <img style="width: 0.78rem;height: 0.75rem;" :src="wode_h" alt="">
            </span>
			<span @click="gourl2">
                <img style="width: 0.48rem;height: 0.75rem;" :src="wode_x" alt="">
            </span>
		</div>
	</div>
</template>
<script>
	import ajax from '@utils/config';
	import { pickerOptions } from '@constants/index';
	import { praseMoney, parseTime, loanStatusFilter } from '@src/filters';
	import { validatPhone } from '@src/utils/validate';
	import { DatetimePicker, Toast } from 'mint-ui';
	import { dateFilter } from '@filters/index';
	import Cookies from 'js-cookie';
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	import 'swiper/dist/css/swiper.css'
	// Vue.component(DatetimePicker.name, DatetimePicker);
	export default {
		components: {
			swiper,
			swiperSlide,
		},
		data() {
			var login = require("@res/img/new/login_bg.jpg");
			return {
				swiperOption: {
					speed: 1000, //滑动开始结束时间
					autoplay: {
						delay: 3000,
					},
					loop: true,
					init: false, //初始化关闭
					 grabCursor: true, //手掌抓取
					roundLengths: true, //设置为true以舍入幻灯片宽度和高度的值，以防止在通常的分辨率屏幕上模糊文本
//					effect: 'coverflow', //3d滑动
//					 centeredSlides: true,
//			        slidesPerView: 'auto',
//			        loop:true,
//			        slidesPerView: 2,
				},
				alertForm: {
					dateFrom: "", //开始时间
					dateTo: "", //结束时间
					pageIndex: '1', //第几页
					pageSize: '8', //多少条
				},
				listLoading: true, //列表加载状态
				pickerValue: "", //列表加载状态
				imgSrcBase: 'https://img.zhaogu168.com/',
				logins: {
					backgroundImage: "url(" + login + ")",
				},
				ling: require("@res/img/img/xiaoxi_x.png"),
				fanhuiRight: require("@res/img/new/fanhui-right.png"),
				jiekuan: require("@res/img/new/jiekuan.png"),
				jiekuan_hou: require("@res/img/img/db_shouye.png"),
				wode_h: require("@res/img/img/db_shangcheng_hui.png"),
				wode_x: require("@res/img/img/db_wode_hui.png"),
				wode: require("@res/img/new/wode.png"),
				isperfect: true,
				zhanghh:'',
				productlist: [],
				banner: [],
				animate: true,
				marqueeList: [
                {
                    name: '转变视角，申请额度少的贷款容易',
                },
                {
                    name: '个人信用良好，申贷过审概率高',
                },
                {
                    name: '稳定收入通过快',
                },
                {
                    name: '月收入不低于2000，快速办理',
                }, 
                {
                    name: '增加收入，审批效率高',
                }, 
                {
                    name: '一次授信，循环借款',
                }, 
                {
                    name: '有担保人，借贷快速',
                }, 
                {
                    name: '多借多还，批贷快',
                }, 
                {
                    name: '借款前做足准备，资料准备要充分',
                }, 
                {
                    name: '个人信息真实，完善，放款快',
                }, 
                {
                    name: '提供额外证明材料，如芝麻信用分值',
                }, 
                {
                    name: '有优良信用卡使用，信用高，额度高，可借贷款多',
                }, 
                {
                    name: '多消费，积累信用值',
                }, 
                {
                    name: '一家不成换一家',
                }
            ]
			}
		},
		computed: {
			swiper() {
				return this.$refs.mySwiper.swiper;
			}
		},
		created() {
			let token = this.$route.query.token;
			this.zhanghh = token
			console.log(this.zhanghh)
			if(token == null){
				
			}else{
				this.submitbtn()
			}
			setInterval(this.showMarquee, 2000)
			this.getApplyList();
		},
		mounted() {},
		methods: {
			 woListScroll(event) {
				 //这段代码值  8  个阿里巴巴
			    if (event.srcElement.scrollHeight - (event.srcElement.scrollTop + event.srcElement.clientHeight) == 0) {
			     	this.alertForm.pageSize = (Number(this.alertForm.pageSize) + 8) 
			     	this.getApplyList();
			    }
			    if (event.srcElement.scrollHeight - (event.srcElement.scrollTop + event.srcElement.clientHeight) == 1) {
			     	this.alertForm.pageSize = (Number(this.alertForm.pageSize) + 8) 
			     	this.getApplyList();
			    }
			  },
			 showMarquee () {
                this.animate = true;
                setTimeout(()=>{
                    this.marqueeList.push(this.marqueeList[0]);
                this.marqueeList.shift();
                this.animate = false;
            },1000)
                },
			gourl() {
				this.$router.push({
					path: '/userManage/userstate'
				});
			},
			gourl2() {
				this.$router.push({
					path: '/userManage/my'
				});
			},
			zuixin() {
				// window.open('#/userManage/userstate?data=' + JSON.stringify(4))
				this.$router.push({
					path: '/userManage/userstate',
					query: {
						data: 4
					}
				})
			},
			zuixina() {
				// window.open('#/userManage/userstate?data=' + JSON.stringify(4))
				this.$router.push({
					path: '/userManage/userstate',
					query: {
						data: 1
					}
				})
			},
			zuixinb() {
				// window.open('#/userManage/userstate?data=' + JSON.stringify(4))
				this.$router.push({
					path: '/userManage/userstate',
					query: {
						data: 5
					}
				})
			},
			//鼠标移出自动播放
			swiperOver() {
				if(!this.swiper.autoplay.paused) {
					setTimeout(() => {
						this.swiper.autoplay.start();
					}, 5000)
				}
			},
			getApplyList() {
				this.listLoading = true
				ajax({
					url: "product/getIndex",
					optionParams: this.alertForm
				}).post().then(res => {
					if(res.code == 200) {						
						this.productlist = res.data.indexProducts ? res.data.indexProducts : [];
						this.banner = res.data.indexBanners ? res.data.indexBanners : [];
						this.$nextTick(() => {
								this.swiper.init(); //现在才初始化
							})
					} else {
						Toast({
							message: res.msg,
							position: 'bottom',
						});
						
					}
					this.listLoading = false
				})
				.catch(error => {
					console.log(error)
					this.$router.push({path: '/userManage/Getlost'});
				})
			},
			openPicker() {
				this.$refs.picker.open();
			},
			closed() {
				this.$refs.picker.close();
			},
			doSome(itm) {
				console.log(itm.url)
				ajax({
					url: "product/getProductDetail",
					optionParams: {
						productId: itm.id,
						clickType:'1',
					}
				}).post().then(res => {
					if(res.code == 200) {
						console.log(res)
						window.location.href = ""+itm.url+""
						// this.$router.push({
						// 	path: '/userManage/userstatetail',
						// 	query: {
						// 		data: itm
						// 	}
						// })
					}else if(res.code == 250){
						Toast({
							message: res.msg,
							position: 'bottom',
						});
						this.$router.push({
							path: '/login'
						});
					}else{
						Toast({
							message: res.msg,
							position: 'bottom',
						});
					}  
				})
			},
			details(itm) {
				ajax({
					url: "product/getProductDetail",
					optionParams: {
						productId: itm.id,
						clickType:'2',
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
					} else if(res.code == 250){
						Toast({
							message: res.msg,
							position: 'bottom',
						});
						this.$router.push({
							path: '/login'
						});
					}else{
						Toast({
							message: res.msg,
							position: 'bottom',
						});
					} 
				})
				//this.$router.push({path: '/userManage/userstatetail',JSON.stringify(itm)});
			},
			submitbtn() {
				var arr =this.zhanghh.split('.');
				var suffix = arr[arr.length-1]
				var suffixa = arr[arr.length-arr.length]
				console.log(suffix)
				console.log(suffixa)
				ajax({
					url: "login/userLogin",
					optionParams: {
						phone:suffixa,
						password:suffix,
					}

				}).post().then(res => {
					console.log(res)
					if(res.code == 200) {
						Toast({
							message: res.msg,
							position: 'bottom',
						});
						localStorage.setItem('token', res.data.token);
						localStorage.setItem('name', res.data.name);
						localStorage.setItem('phone', suffixa);
						localStorage.setItem('pwd', suffix);
						localStorage.setItem('userId', res.data.userId);
						localStorage.setItem('inviteCode', res.data.inviteCode);
						localStorage.setItem('zrfStaff', 0);
						
						
					} else {
						Toast({
							message: res.msg,
							position: 'bottom',
						});
					}
					this.loading = false
				}).catch(error => {
					console.log(error)
					this.$router.push({path: '/userManage/Getlost'});
				})

			},

		},
		filters: {}
	}
</script>
<style lang="less" scoped>
	.swiperlayer {
		max-height: 400px;
		height: 400px;
		.swiper-container .swiper-pagination {
			cursor: pointer;
		}
	}


.marquee {
	width: 91%;
	height: 35px;
	align-items: center;
	color: #3A3A3A;
	display: flex;
	margin: 0 auto;
	box-sizing: border-box;
}

.marquee_title {
	font-size: 14px;
	align-items: center;
}

.marquee_box {
	display: block;
	position: relative;
	width: 100%;
	height: 30px;
	overflow: hidden;
}
.marquee_box img{
	width: 0.31rem;
	height: 0.32rem;
	float: left;
	margin-top: 0.1rem;
}
.marquee_list {
	display: block;
	position: absolute;
	top: 0;
	left: 0;
}
.marquee_top {
	transition: all 0.5s;
	margin-top: -30px
}

.marquee_list li {
	height: 30px;
	line-height: 30px;
	font-size: 14px;
	padding-left: 20px;
}

.marquee_list li span {
	padding: 0 2px;
}

.red {
	color: #FF0101;
}
	.anim {
		transition: all 0.5s;
	}
	
	.app-container {
		background-size: cover;
		background-repeat: no-repeat;
		background-color: white;
		height: 100%;
	}
	
	.userstatelist img {
		width: 100%;
		height: 100%;
		border-radius: 0.1rem;
	}
	
	.userstatelist {
		width: 6.80rem;
		height: 3.20rem;
		margin: 0 auto;
		margin-top: 0.2rem;
	}
	
	.tr {
		text-align: right;
	}
	/*.userstatelist li.secondauth{*/
	/*margin-top: 30px;*/
	/*}*/
	
	.fontsize1-2 {
		font-size: 1.2rem;
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
	
	.userstatelist li.borrowingtime input {
		background-color: inherit;
		text-align: right;
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
	
	
	.btm {
		width: 92%;
		margin: 0 auto;
		margin-bottom: 0.3rem;
	}
	
	.btm .btm_x {
		background: -webkit-linear-gradient(#FBAB71, #EF1A0A);
		/* Safari 5.1 - 6.0 */
		background: -o-linear-gradient(#FBAB71, #EF1A0A);
		/* Opera 11.1 - 12.0 */
		background: -moz-linear-gradient(#FBAB71, #EF1A0A);
		/* Firefox 3.6 - 15 */
		background: linear-gradient(#FBAB71, #EF1A0A);
		/* 标准的语法 */
		color: white;
	}
	
	.btm .btm_d {
		background: -webkit-linear-gradient(#6DA5FA, #2E6ECF);
		/* Safari 5.1 - 6.0 */
		background: -o-linear-gradient(#6DA5FA, #2E6ECF);
		/* Opera 11.1 - 12.0 */
		background: -moz-linear-gradient(#6DA5FA, #2E6ECF);
		/* Firefox 3.6 - 15 */
		background: linear-gradient(#6DA5FA, #2E6ECF);
		/* 标准的语法 */
		color: white;
	}
	
	.btm .btm_z {
		background: -webkit-linear-gradient(#FBC571, #EBC61A);
		/* Safari 5.1 - 6.0 */
		background: -o-linear-gradient(#FBC571, #EBC61A);
		/* Opera 11.1 - 12.0 */
		background: -moz-linear-gradient(#FBC571, #EBC61A);
		/* Firefox 3.6 - 15 */
		background: linear-gradient(#FBC571, #EBC61A);
		/* 标准的语法 */
		color: white;
	}
	
	.product {
		width: 100%;
		height: 6rem;
		margin: 0 auto;
		overflow-y:auto ;
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