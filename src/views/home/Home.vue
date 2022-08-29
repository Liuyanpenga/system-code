<template>
  <el-row class="home" :gutter="20">
    <el-col :span="8" style="margin-top:10px">
        <el-card shadow="hover">
            <div class="user">
              <img src="../../assets/images/user.png" alt="">
              <div class="user-info">
                <p class="name">张三</p>
                <p class="role">管理员</p>
              </div>
            </div>
            <div class="login-info">
              <p>上次登录时间：<span>xxx</span></p>
              <p>上次登录地点：<span>xxx</span></p>
            </div>
        </el-card>
        <el-card shadow="hover" style="margin-top:10px; height: 550px;" >
            <el-table :data="tableData" stripe >
              <el-table-column v-for="(val,key) in tableLabel" :key="key" :prop="key" :label="val"></el-table-column>
            </el-table>
        </el-card>
    </el-col>
    <el-col :span="16" style="margin-top:10px">
      <div class="num">
        <el-card class="elc" shadow="hover"
          :body-style="{ display: 'flex', padding: 0 }"
          v-for="item in countData"
          :key="item.name"
        >
          <component class="icons" :is="item.icon" :style="{ background: item.color }"></component>
          <div class="detail">
            <p class="val">￥{{ item.value }}</p>
            <p class="txt">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <el-card style="height:280px" shadow="hover" class="zhe">
        <div ref="orderEchart" style="height: 280px"></div>
      </el-card>
      <div class="graph">
        <el-card>
          <div ref="userEchart" style="height: 280px"></div>
        </el-card>
        <el-card>
          <div ref="videoEchart" style="height: 240px"></div>
        </el-card>
      </div>
    </el-col>
  </el-row>

</template>
<script>
import {getCurrentInstance, onMounted, ref,defineComponent, reactive} from 'vue';
import * as echarts from 'echarts'
// import axios from 'axios';
export default defineComponent({
  name:'Home',
  setup(){
    // proxy类似vue2中的this
    const { proxy } = getCurrentInstance()
    let tableData = ref([])
    let countData = ref([])
    const tableLabel = {
        name:'平台',
        todayBuy:'日销量',
        monthBuy:'月销量',
        totalBuy:'总销量'
    }
    // echart 相关数据
    let xOptions = reactive({
      //  title: {
      //   text: "上半年产品销量图"
      // },
      // 图例文字颜色
      textStyle: {
        color: "#333",
      },
      grid: {
        left: "20%",
      },
      // 提示框
      tooltip: {
        trigger: "axis",
      },
      xAxis: {
        type: "category", // 类目轴
        data: [],
        axisLine: {
          lineStyle: {
            color: "#17b3a3",
          },
        },
        axisLabel: {
          interval: 0,
          color: "#333",
        },
      },
      yAxis: [
        {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#17b3a3",
            },
          },
        },
      ],
      color: ["#2ec7c9", "#b6a2de", "#5ab1ef", "#ffb980", "#d87a80", "#8d98b3"],
      series: [],
    }
    )
    let pieOptions = reactive({
      tooltip: {
        trigger: "item",
      },
      color: [
        "#0f78f4",
        "#dd536b",
        "#9462e5",
        "#a6a6a6",
        "#e1bb22",
        "#39c362",
        "#3ed1cf",
      ],
      series: [],
    })
    let orderData = reactive({
      xData:[],
      series:[],
    })
    let userData = reactive({
      xData:[],
      series:[],
    })
    let videoData = reactive({
      series:[],
    })
    // Table 数据获取
    const getTableList = async () => {
      //#region 
      //mock 本地模拟
      // await axios.get('/home/getTableData').then((res) => {
      //mock 线上模拟
      // await axios.get('https://www.fastmock.site/mock/db4e84807fa3a23bbe2ca06959701064/api/home/getTableData').then((res) => {
      //   console.log(res);
      //   if(res.data.code === 200){
      //   tableData.value = res.data.data.tableData
      //   }
      // }) #endregion
       let res = await proxy.$api.getTableData();
      // console.log(res);
      tableData.value = res.tableData
    }

    // Count 数据获取
    const getCountData = async () => {
      let res = await proxy.$api.getCountData()
      // console.log(res);
      countData.value =res.countData
    }

    // Echart 数据获取api
    const getEchartData = async () => {
      let res = await proxy.$api.getEchartData()
      // console.log(res);
      // 将从mock拦截的数据重新赋值
      let orderRes = res.orderData
      let userRes = res.userData
      let videoRes = res.videoData
      // 折线图部分   X 轴
      orderData.xData = orderRes.date  
      // series 处理 
      const keyArray = Object.keys(orderRes.data[0])
      const series = []
      keyArray.forEach((key) => {
        series.push({
          name:key,
          data:orderRes.data.map((item) => item[key]),
          type:'line'
        })
      })
      orderData.series = series
      xOptions.xAxis.data = orderData.xData
      xOptions.series = orderData.series
      // 进行渲染
      let hEcharts = echarts.init(proxy.$refs["orderEchart"]);
      hEcharts.setOption(xOptions);   

      // 柱状图部分 X 轴
      userData.xData = userRes.map((item) => item.date)
      // series
      userData.series = [
       { 
        name:'新增用户',
        data:userRes.map((item) => item.new),
        type:'bar'
       },
       { 
        name:'活跃用户',
        data:userRes.map((item) => item.active),
        type:'bar'
       }
      ]
      // 配置
      xOptions.xAxis.data = userData.xData
      xOptions.series = userData.series
      let uEcharts = echarts.init(proxy.$refs['userEchart'])
      uEcharts.setOption(xOptions)
      // 饼状图部分
      videoData.series = [
        {
          data: videoRes,
          type: "pie",
        }
      ]
      pieOptions.series = videoData.series
      let vEcharts = echarts.init(proxy.$refs['videoEchart'])
      vEcharts.setOption(pieOptions)
    }


    onMounted(() => {
      getTableList()
      getCountData()
      getEchartData()
    })
    return{tableData,tableLabel,countData}
  },
})
</script>
<style scoped>
.user{
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  margin-left: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #ccc;
}

  img{
    width: 140px;
    height: 140px;
    border-radius: 50%;
  }
  p{
    color: gray;
    line-height: 24px;
    margin-left: 20px;
  }
  span{
    margin-left: 20px;
  }
  .num {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .elc {
      width: 32%;
      margin-bottom: 20px;
    }
    .icons {
      width: 64px;
      height: 64px;
      color: #FFF;
    }
    .detail {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .val{
      font-size: 16px;
    }
      .txt {
        font-size: 18px;
        text-align: center;
        color: #999;
      }
      .zhe{
        margin-top: 8px;
      }
      .graph{
        display: flex;
        justify-content: space-between;
        margin-top: 32px;
        height: 338px;
      }
      .graph > .el-card{
        width: 49%;
      }
</style>