<template>
  <el-form inline>
    <el-form-item label="课程标题">
      <el-input v-model="form.title" placeholder="请输入课程标题" clearable />
    </el-form-item>
    <el-form-item label="课程现价">
      <el-input v-model="form.price" placeholder="请输入课程标题" clearable />
    </el-form-item>
    <el-form-item label="课程原价">
      <el-input v-model="form.tPrice" placeholder="请输入课程标题" clearable />
    </el-form-item>
    <el-form-item label="是否推荐">
      <el-select v-model="form.isRecommend" placeholder="请选择是否推荐" clearable>
        <el-option label="否" :value="0" />
        <el-option label="是" :value="1" />
      </el-select>
    </el-form-item>
    <el-form-item label="是否在栏目">
      <el-select v-model="form.isColumn" placeholder="请选择是否在栏目" clearable>
        <el-option label="否" :value="0" />
        <el-option label="是" :value="1" />
      </el-select>
    </el-form-item>
    <el-form-item label="创建时间">
      <el-date-picker
        v-model="form.createdAt"
        type="datetimerange"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        :default-time="defaultTime"
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary">搜索</el-button>
      <el-button type="primary" @click="handleCreateCourse">新建课程</el-button>
    </el-form-item>
  </el-form>

  <el-table :data="tableData.list" border>
    <el-table-column prop="id" label="课程ID" />
    <el-table-column prop="title" label="课程标题" />
    <el-table-column prop="price" label="课程现价" />
    <el-table-column prop="tPrice" label="课程原价" />
    <el-table-column label="是否推荐">
      <template #default="{ row }">
        {{ row.isRecommend ? "是" : "否" }}
      </template>
    </el-table-column>
    <el-table-column label="是否在栏目">
      <template #default="{ row }">
        {{ row.isColumn ? "是" : "否" }}
      </template>
    </el-table-column>
    <el-table-column prop="createdAt" label="创建时间" />
  </el-table>

  <el-pagination
    v-model:current-page="form.pageNo"
    v-model:page-size="form.pageSize"
    :page-sizes="[2, 5, 10, 20]"
    layout="total, sizes, prev, pager, next, jumper"
    :total="tableData.total"
    @size-change="handleSearch"
    @current-change="handleGetPageList" />

  <CourseUpdateCourse v-if="courseForm.visible" />
</template>

<script lang="ts" setup>

const defaultTime: [Date, Date] = [
  new Date(new Date().getFullYear(), 1, 1, 0, 0, 0),
  new Date(new Date().getFullYear(), 2, 1, 23, 59, 59),
]
const form = reactive({
  title: "",
  price: "",
  tPrice: "",
  isRecommend: "",
  isColumn: "",
  createdAt: "",
  pageSize: 2,
  pageNo: 1
})

const tableData = reactive({
  list: [],
  total: 0
})

const handleSearch = () => {
  form.pageNo = 1
  handleGetPageList()
}

const handleGetPageList = async () => {
  let result = null
  try {
    result = await httpGet('/api/course/getCourseList', {
      params: form
    })
  } catch (err) {
    ElMessage.error(err as any)
    return
  }
  tableData.list = result.list
}

handleGetPageList()



// 新建课程
const courseForm = reactive({
  visible: false
})
const handleCreateCourse = () => {
  courseForm.visible = true
}
</script>