<template>
	<div>
		<mt-header title="个人信息">
			<mt-button @click="router.go(-1)" icon="back" slot="left"></mt-button>
			<!--<mt-button icon="more" slot="right"></mt-button>-->
		</mt-header>
	</div>
</template>

<script>
import Cookies from 'js-cookie';
import loginout from '@src/utils/loginout';
import { Header } from 'mint-ui';
	export default {
		data() {
			return {
				home_log: require("@res/img/home-log.png"),
				logname: ''
			}
		},
        components() {
            Header
		},
		created() {
			this.logname = Cookies.get('user');
		},
		methods: {
			clickHandler() {
				// alert(Date.now())
			},
			quit() {
				//localStorage.setItem("logname", "");
				// this.$router.push({
				// 	path: '/login'
				// });
				//window.location.reload();
				loginout()
			}
		}
	}
</script>