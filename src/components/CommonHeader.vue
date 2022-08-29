<template>
  <div class="header">
    <div class="l-content">
      <!-- 头部开关aside按钮 -->
      <el-button size="small" @click="handleCollapse">
        <el-icon :size="20">
          <Menu />
        </el-icon>
      </el-button>
      <!-- 头部面包屑 -->
      <el-breadcrumb separator="/" class="bread">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="current.path" v-if="current">{{current.label}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <!-- 右侧功能栏 -->
      <el-dropdown>
        <el-icon size="32px" style="margin:5px 8px 5px 20px" color="#ccc"><Star /></el-icon>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>关注</el-dropdown-item>
            <el-dropdown-item>收藏</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <el-dropdown>
        <el-icon size="32px" style="margin:5px 28px 5px 20px" color="#ccc"><BellFilled /></el-icon>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>@我的</el-dropdown-item>
            <el-dropdown-item>系统消息</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <el-dropdown>
        <span class="el-dropdown-link">
          <img :src="getImageUrl('user')">
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item>设置</el-dropdown-item>
            <el-dropdown-item>退出账号</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core';
import { useStore } from 'vuex'

export default {
  name: "CommonHeader",
  setup() {
    const store = useStore()
    // const imgSrc = require("../assets/images/user.png")     webpack 支持
    //vite 静态资源处理 通过字符串模板支持动态 URL 死记硬背！
    const getImageUrl = (user) => {
      return new URL(`../assets/images/${user}.png`, import.meta.url).href;
    };
    // 开头aside功能
    function handleCollapse(){
      // 调用vuex中的mutation
      store.commit('updateIsCollapse')
    };
    const current = computed(() => {
      return store.state.currentMenu
    })
    return { getImageUrl, handleCollapse,current};
  },
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}
.l-content{
  display: flex;
  align-items: center;
  
}
h3{
  color: #fff;
  margin-left: 10px;
  
}
img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.bread{
  margin-left: 10px;
}
/* .bread /deep/ span{
  color: #fff !important;
} */
:deep(.bread span){
  color: #fff !important;
  cursor: pointer !important;
}
</style>