<template>
  <el-aside :width="$store.state.isCollapse ? '190px' : '60px'" >
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo" background-color="#282d2f" text-color="#ffffff"
      :collapse="!$store.state.isCollapse"
      :collapse-transition="false"
    >
      <h3 v-show="$store.state.isCollapse">后台管理系统</h3>
      <h3 v-show="!$store.state.isCollapse">后台</h3>
      <!-- 没有子路由的 -->
      <el-menu-item
        :index="item.path"
        v-for="item in noChildren()"
        :key="item.path"
        @click="changeMenu(item)"
      >
        <!-- icon 固定写法 -->
        <component class="icons" :is="item.icon"></component>
        <span>{{item.label}}</span>
      </el-menu-item>
      <!-- 有子路由的 -->
      <el-sub-menu
        :index="item.label"
        v-for="item in hasChildren()"
        :key="item.path"
      >
        <template #title>
          <component class="icons" :is="item.icon"></component>
          <span>{{item.label}}</span>
        </template>
        <!-- 子路由部分 -->
        <el-menu-item-group>
          <el-menu-item
            :index="subItem.path"
            v-for="(subItem,subIndex) in item.children"
            :key="subIndex"
            @click="changeMenu(subItem)"
            > 
              <component class="icons" :is="subItem.icon"></component>
              <span>{{subItem.label}}</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
    </el-menu>
  </el-aside>
</template>

<script>
import {useRouter} from 'vue-router';
import { useStore } from 'vuex';
export default {
  name: "CommonAside",
  setup() {
    const store = useStore()
    const router = useRouter()
    const list = [
      {
        path: "/",
        name: "home",
        label: "首页",
        icon: "HomeFilled",
        url: "Home/Home",
      },
      {
        path: "/mall",
        name: "mall",
        label: "商品管理",
        icon: "ShoppingCart",
        url: "MallManage/MallManage",
      },
      {
        path: "/user",
        name: "user",
        label: "用户管理",
        icon: "user",
        url: "UserManage/UserManage",
      },
      {
        label: "其他",
        icon: "location",
        children: [
          {
            path: "/page1",
            name: "page1",
            label: "页面1",
            icon: "setting",
            url: "Other/PageOne",
          },
          {
            path: "/page2",
            name: "page2",
            label: "页面2",
            icon: "setting",
            url: "Other/PageTwo",
          },
        ],
      },
    ];
    // 过滤没有子路由的
    const noChildren = () => {
      return list.filter((item) => !item.children);
    };
    // 过滤有子路由的
    const hasChildren = () => {
      return list.filter((item) => item.children);
    };
    // 切换菜单功能
    function changeMenu(item){
      router.push({
        name:item.name
      }),
      // 调用 vuex 中的mutations
      store.commit('selectMenu',item)
    }
    return { noChildren, hasChildren,changeMenu };
  },
};
</script>

<style scoped>
h3{
  color: #fff;
  line-height: 64px;
  text-align: center;
}
.icons {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}
.el-menu{
  border-right: none;
}

</style>