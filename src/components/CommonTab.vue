<template>
  <div class="tags">
    <el-tag
      v-for="(tag,index) in tags"
      :key="index"
      :closable="tag.name !== 'home'"
      :disable-transitions="false"
      :effect="$route.name === tag.name ? 'dark' : 'plain'"
      @click="changeTag(tag)"
      @close="deleteTag(tag,index)"
    >
    {{tag.label}}
    </el-tag>
  </div>
</template>

<script>
import { useRouter,useRoute } from 'vue-router';
import { useStore } from "vuex";
export default {
  name: "CommonTab",
  setup() {
    const store = useStore();
    const router = useRouter()
    const route = useRoute()
    // vex 获取数据
    const tags = store.state.tagsList;
    // 切换 tag
    const changeTag = (tag)=>{
      router.push({name:tag.name})
    }
    // 删除tag
    const deleteTag = (tag,index) => {
      let length = tags.length - 1
      // 调用 vuex 中的mutations
      store.commit('closeTag',tag)
      if(tag.name !== route.name){
        // console.log(tag.name,route.name);
        return;
      }
      if(index === length){
        router.push({name:tags[index - 1].name})
      }else{
        router.push({name:tags[index].name})
      }
    }
    return { tags,changeTag,deleteTag };
  },
};
</script>

<style scoped>
.tags{
  margin: 10px 5px 0px 30px;
  cursor: pointer;
}
.el-tag{
  margin-right:10px;
}
</style>