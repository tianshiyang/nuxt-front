<template>
  <el-table :data="tableData.list" border>
    <el-table-column prop="id" label="订单ID" />
    <el-table-column prop="courseId" label="课程ID" />
    <el-table-column prop="title" label="课程名称" />
    <el-table-column prop="createdAt" label="加入时间" />
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
    ElMessage.error(e)
    return
  }
  tableData.list = result.data.list
  tableData.total = result.data.total 
  ElMessage.success('查询成功')
}

const handleSearch = () => {
  form.pageNo = 1
  handleGetOrderList()
}

handleGetOrderList()
</script>