<template>
	<div class="app-container">
		<mt-header title="详情">
			<mt-button @click="" icon="back" slot="left"></mt-button>
		</mt-header>
		
		<div class="conm" @scroll="woListScroll($event)">
			
		</div>
		<div class="bottomnav" style="text-align: center;">
            <span @click="">
                <img style="width: 0.47rem;height: 0.74rem;" :src="jiekuan_hou" alt="">
            </span>
            <span @click="">
                <img style="width: 0.78rem;height: 0.75rem;" :src="wode_h" alt="">
            </span>
             <span>
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
	import { DatetimePicker, Toast, InfiniteScroll } from 'mint-ui';
	import { dateFilter } from '@filters/index';
	export default {
		data() {
			// var login = require("@res/img/new/login_bg.jpg");
			return {
				loading: false,
				list: [],
				 fanhuiRight: require("@res/img/img/touxiaong.png"),
                jiekuan_hou: require("@res/img/img/db_shouye_hui.png"),
                wode_h: require("@res/img/img/db_shangcheng_hui.png"),
                 wode_x: require("@res/img/img/db_wode.png"),
                 imgSrcBase: 'https://img.zhaogu168.com',
                 jiekuan_houa: require("@res/img/img/db_wode.png"),
			}
		},
		computed: {},
		created() {},
		mounted() {},
		methods: {
			woListScroll(event) {
				console.log(event.srcElement.scrollHeight)
				if(event.srcElement.scrollHeight - (event.srcElement.scrollTop + event.srcElement.clientHeight) == 0) {
					
				}
				if(event.srcElement.scrollHeight - (event.srcElement.scrollTop + event.srcElement.clientHeight) == 1) {
					
				}
			},

		},
		filters: {}
	}
</script>
<style lang="less" scoped>
	.app-container {
		height: 100%;
	}
	
	.mint-header {
		color: #000000;
	}
	.conm {
		width: 100%;
		height: 100%;
		overflow-y: auto;
	}
	.conm p{
		line-height: 3rem;
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
	
</style>