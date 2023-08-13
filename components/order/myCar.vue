<template>
  <el-table :data="tableData.list" border>
    <el-table-column prop="id" label="订单ID" />
    <el-table-column prop="courseId" label="课程ID" />
    <el-table-column prop="title" label="课程名称" />
    <el-table-column prop="createdAt" label="加入时间" />
    <el-table-column label="操作">
      <template #default="{ row }">
        <el-button type="primary" link @click="handleRemoveCourse(row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-pagination
    v-model:current-page="form.pageNo"
    v-model:page-size="form.pageSize"
    :page-sizes="[2, 5, 10, 20]"
    layout="total, sizes, prev, pager, next, jumper"
    :total="tableData.total"
    @size-change="handleSearch"
    @current-change="handleGetOrderList" />
</template>

<script lang="ts" setup>
import { ElMessageBox, ElMessage } from "element-plus"
const form = reactive({
  pageNo: 1,
  pageSize: 10
})
const tableData = reactive({
  list: [],
  total: 0
})

const handleGetOrderList = async () => {
  let result: any = null
  try {
    result = await httpGet('/api/order/getCarList', {
      params: {
        ...form
      }
    })
  } catch (e) {
    ElMessage.error(e as any)
    return
  }
  tableData.list = result.data.list
  tableData.total = result.data.total 
  ElMessage.success('查询成功')
}

// 删除课程
const handleRemoveCourse = (id: number) => {
  ElMessageBox.confirm('确认删除?','Warning', {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning',
    }
  )
    .then(async () => {
      try {
        const result = await httpPost("/api/order/deleteCarCourse", { id })
        if (result) {
          ElMessage.success("删除成功")
          handleSearch()
        }
      } catch (e) {
        ElMessage.error(e as string)
      }
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '已取消',
      })
    })
}

const handleSearch = () => {
  form.pageNo = 1
  handleGetOrderList()
}

handleGetOrderList()
</script>