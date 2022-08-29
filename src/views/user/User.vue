<template>
  <!-- 搜索部分 -->
  <div class="user-search">
    <el-button type="primary" @click="handleAdd">新增用户</el-button>
    <el-form :inline="true" :model="formInline">
      <el-form-item>
        <el-input v-model="formInline.keyword" placeholder="请输入" />
      </el-form-item>
      <el-form-item>
       <el-button type="primary" @click="handleSearch">搜素</el-button>
      </el-form-item>
    </el-form>
  </div>

  <!-- table部分 -->
  <div class="table">
    <el-table :data="list" style="width: 100%">
      <el-table-column
        v-for="item in tableLabel"
        :key="item.prop"
        :label="item.label"
        :prop="item.prop"
        :width="item.width ? item.width : 125"
      />
      <el-table-column fixed="right" label="操作" min-width="180">
        <template #default = "scoped">
          <el-button size="small" @click="handleEdit(scoped.row)">编辑</el-button>
          <el-button type="danger" @click.prevent="handleDelete(scoped.row)" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页部分 -->
    <el-pagination background layout="prev, pager, next" :total="config.total" @current-change="changePage" :page-size="10"/>
  </div>

  <!-- 新增用户部分 -->
   <el-dialog v-model="dialogVisible" :title=" action === 'add' ? '新增用户' : '编辑用户' " width="36%">
    <el-form :model="formUser" :inline="true" ref="userForm" :rules="rules">
      <el-row>
        <el-col :span="12">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="formUser.name"  placeholder="请输入姓名"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="年龄" prop="age">
            <el-input v-model="formUser.age"  placeholder="请输入年龄"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="性别" prop="sex" >
            <el-select v-model="formUser.sex" placeholder="请选择" style="width:192px">
              <el-option label="男" value="0" />
              <el-option label="女" value="1" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="生日" prop="birth">
            <el-date-picker
              v-model="formUser.birth"
              value-format="YYYY-MM-DD"
              type="date"
              placeholder="出生日期"
              style="width:192px"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="地址" prop="addr">
        <el-input v-model="formUser.addr"  placeholder="请输入地址"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { getCurrentInstance,reactive,onMounted, ref } from "vue";
export default {
  name: "User",
  setup() {
    const { proxy } = getCurrentInstance();
    const list = ref([])
    const tableLabel = reactive([
      {
        prop: "name",
        label: "姓名",
      },
      {
        prop: "age",
        label: "年龄",
      },
      {
        prop: "sexLabel",
        label: "性别",
      },
      {
        prop: "birth",
        label: "出生日期",
        width: 200,
      },
      {
        prop: "addr",
        label: "地址",
        width: 320,
      },
    ]);
    // 分页数据
    const config = reactive({
      total:0,
      page:1,
      name:'' //搜索框 name
    })
    // 获取userData数据
    const getUserData = async (config) => {
      let res = await proxy.$api.getUserData(config);
      list.value = res.list
      list.value.map(item  => {
        item.sexLabel = item.sex === 1 ? '男' : '女'
        return item
      })
      // 获取分页数据总数
      config.total = res.count
    };
    // 切换页
    const changePage = (page) => {
      config.page = page
      getUserData(config)
    }
    // 编辑用户
    const handleEdit = (row) => {
      dialogVisible.value = true
      action.value = 'edit'
      row.sex == 1 ? (row.sex = "男") : (row.sex ="女")
      proxy.$nextTick(() => {
        // 浅拷贝
        Object.assign(formUser,row)
      })
    }
    // 删除用户
    const handleDelete = (row) => {
      ElMessageBox.confirm("确定要删除吗？")
        .then(async () => {
          await proxy.$api.deleteUser({
            id:row.id
          })
          ElMessage({
            type: 'success',
            message: '删除成功',
      });
      getUserData(config)
        })
    }
    // user 搜索
    const formInline = reactive({
      keyword:''
    })
    const handleSearch = () => {
      config.name = formInline.keyword
      getUserData(config)
    }
    // 新增用户
    const dialogVisible = ref(false)
    const action = ref("add")
    const formUser = reactive({
      name:"",
      age:"",
      sex:"",
      birth:"",
      addr:""
    })
    // 新增用户按钮
    const handleAdd = () => {
      dialogVisible.value = true
    }
    // 确定按钮
    const handleSubmit = () => {
      // validate 表单项被校验后触发
      proxy.$refs.userForm.validate(async (valid) => {
        if(valid){
        // 新增页确定功能
          if(action.value == 'add'){
            let res = await proxy.$api.addUser(formUser)
            if(res){
              dialogVisible.value = !dialogVisible.value
              proxy.$refs.userForm.resetFields()
              getUserData(config)
            }
          }else{
        // 编辑页确定功能 调用编辑接口
            let res = await proxy.$api.editUser(formUser)
            if(res){
              dialogVisible.value = !dialogVisible.value
              proxy.$refs.userForm.resetFields()
              getUserData(config)
            }
          }
        }else{
          ElMessage({
            showClose: true,
            message: '请填写完整！',
            type: 'warning',
          })
        }
      })
    }
    // 表单校验规则
    const rules = reactive({
     name:[{ required: true, message: '必填项'}],
     age:[{ required: true, message: '必填项'}],
     sex:[{ required: true, message: '必填项'}],
     birth:[{ required: true, message: '必填项'}],
     addr:[{ required: true, message: '必填项'}],
    })
    // 取消功能
    const handleCancel = () => {
      dialogVisible.value = !dialogVisible.value
      proxy.$refs.userForm.resetFields()
    }

    onMounted(() => {
      getUserData(config)
    })

    return { tableLabel,list,config,changePage,handleDelete,formInline,handleSearch,dialogVisible,formUser,handleSubmit,rules,handleCancel,action,handleAdd,handleEdit};
  },

};
</script>

<style scoped>
.user-search{
  display: flex;
  justify-content: space-between;
  height: 40px;
}
.el-form{
  right: 0;
}
.table{
  position: relative;
}
.el-pagination{
 position: fixed;
 bottom: 80px;
 right: 0;
}
</style>