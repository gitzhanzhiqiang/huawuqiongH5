 <template>  
  <div class="breadcrumb">  <!--顶部导航栏 -->
    <span href="#/" style="font-size:12px;">
    当前位置：
    </span>
    <span :key="item.path" v-for="(item, index) in list" style="font-size:12px;">{{item.title}}
      <span v-if="index !== (list.length - 1)">></span>
    </span>
    <span class="w-btnRefresh w-btnGreen w-right">  
      <i class="icon-refresh"></i> 
    </span>
  </div>
</template>

<script>
export default {
  computed: {
    list() {
      let result = [];

      for (var index = 0; index < this.$route.matched.length; index++) {//根据路由获取
        var item = this.$route.matched[index];
        result.push({
          title: item.meta.title,
          path: item.path,
        });
      }

      return result;
    }
  }
}
</script>
