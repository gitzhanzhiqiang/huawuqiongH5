<template>
 
  <div>
   <div class="contentBody">
       <header-nav></header-nav>
       <router-view></router-view>
    <!--<div class="mainContent" :class="{Collapse1:isCollapse}">-->

      <!--<div class="w-main">-->
        <!--<router-view></router-view>-->
      <!--</div>-->
    <!--</div>-->
   </div>
  </div>
</template>
<script>
import headerNav from './header.vue';
import { mapGetters } from 'vuex';
  export default {
  components: {
      headerNav
  },
  computed: {
      ...mapGetters([
          'isCollapse'
      ])
  },
  data(){
    return{
    }
  },
  created() {
  },
  methods: {
  }
}
</script>