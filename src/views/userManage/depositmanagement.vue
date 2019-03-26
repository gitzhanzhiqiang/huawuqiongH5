<template>
    <div class="app-container"  :style="logins">
       
    </div>
</template>
<script>
    import ajax from '@utils/config';
    import {pickerOptions} from '@constants/index';
    import {praseMoney,parseTime, loanStatusFilter} from '@src/filters';
    import {validatPhone} from '@src/utils/validate';
    export default {
        data() {
            var login = require("@res/img/new/login_bg.jpg");
            return {
               
            }
        },
        computed: {

        },
        created() {
            // this.getApplyList();
        },
        mounted() {
        },
        methods: {
          
        },
        filters: {

        }
    }
</script>
<style lang="less" scoped>
  
</style>





