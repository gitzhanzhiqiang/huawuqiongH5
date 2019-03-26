<template>
	<div class="app-container">
		<img :src="jiekuan_hou"/>	
		<p>页面迷路了，点击刷新一下</p>
		<el-button type="primary" @click='shuaxin' class="submitbtn">刷 新</el-button>
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
			return {
				jiekuan_hou: require("@res/img/img/milule.png"),
				
			}
		},
		computed: {},
		created() {},
		mounted() {},
		methods: {
			shuaxin(){
				this.$router.push({path: '/userManage/index'});
			},

		},
		filters: {}
	}
</script>
<style lang="less" scoped>
	.app-container img{
		display: block;
		width: 3rem;
		height: 3.78rem;
		margin: 0 auto;
		margin-top: 2.89rem;
	}
	.app-container p{
		text-align: center;
		color: #000000;
		font-size: 0.28rem;
		margin-top: 0.2rem;
	}
	.app-container .submitbtn{
		display: block;
		width: 6.78rem;
		height: 0.68rem;
		margin: 0 auto;
		margin-top: 0.68rem;
	}
</style>