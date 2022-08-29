<template>
  <div class="common-layout">
    <el-container>
      <common-aside></common-aside>
      <el-container>
        <el-header>
          <common-header></common-header>
        </el-header>
        <common-tab></common-tab>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import CommonHeader from "../components/CommonHeader.vue";
import CommonAside from "../components/CommonAside.vue";
import CommonTab from "../components/CommonTab.vue";
export default defineComponent({
  name: "App",
  component: { CommonHeader, CommonAside,CommonTab},
});
</script>
<style lang="less" scoped>
.common-layout{
  height: 100%;
}
.common-layout{
  height: 100%;
    & > .el-container{
      height: 100%;
      & > .el-aside{
        height: 100%;
        background-color: #282d2f;
}
      
}
.el-header{
  background-color: #2f3638;;
}
}

</style>