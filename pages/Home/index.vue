<template>
  <el-carousel height="150px">
    <el-carousel-item v-for="item in 4" :key="item">
      <h3 class="small justify-center" text="2xl">{{ item }}</h3>
    </el-carousel-item>
  </el-carousel>

  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>全部课程</span>
      </div>
    </template>
    <div class="course-item">
      <section v-for="item in tableData.list" :key="(item as any).id" class="course-section">
        <el-image style="width: 200px; height: 150px" :src="(item as any).cover" fit="contain" />
        <div class="course-info">
          <div>课程名称：{{ (item as any).title }}</div>
          <div>课程原价：<span class="course-price">¥{{ (item as any).price }}</span></div>
          <div>课程现价：<span style="color: green">¥{{ (item as any).tPrice }}</span></div>
        </div>
        <div class="right-button">
          <el-button type="primary" size="small" @click="addCard((item as any).id)">加入购物车</el-button>
        </div>
      </section>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus"
import { reactive } from "vue";

useHead({
  title: "首页"
})

const form = reactive({
  pageNo: 1,
  pageSize: 10
})

const tableData = reactive({
  list: [],
  total: 0
})
const handleGetPageList = async () => {
  let result: any = null
  try {
    result = await httpGet('/api/course/getCourseList', {
      params: {
        ...form
      }
    })
    tableData.list = result.data.list
    tableData.total = result.data.total
  } catch (err) {
    ElMessage.error(err as any)
    return
  }
}

// 加入购物车
const addCard = async (id: number) => {
  try {
    await httpPost("/api/order/addCard", { courseId: id })
    ElMessage.success("添加成功")
  } catch (e) {
    ElMessage.error(e as any)
  }
}

handleGetPageList()
</script>

<style scoped>
.demonstration {
  color: var(--el-text-color-secondary);
}

.course-price {
  text-decoration: line-through;
  color: red;
}

.course-item {
  display: flex;
}
.course-section {
  margin-right: 10px;
  padding: 15px 10px;
  border-radius: 20px;
  background: #EEEEEE;
  cursor: pointer;
}
.course-section:hover {
  position: relative;
  transform: scale(1.1);
  cursor: pointer;
}

.course-info {
  color: #475669;
  font-size: 14px;
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.right-button {
  margin-top: 10px;
  text-align: right;
}
</style>