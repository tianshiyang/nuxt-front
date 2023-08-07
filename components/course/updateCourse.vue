<template>
  <el-dialog v-model="form.visible" :title="props.useType === 0 ? '新增课程' : '编辑课程'" @close="handleClose">
    <el-form :model="form" :rules="rules" :inline="false" ref="CreateCourseForm">
      <el-form-item prop="title" label="课程标题">
        <el-input v-model="form.title" placeholder="请输入课程标题" clearable />
      </el-form-item>
      <el-form-item prop="cover" label="课程封面">
        <el-input v-model="form.cover" placeholder="请输入课程封面" clearable />
      </el-form-item>
      <el-form-item prop="price" label="课程原价">
      <el-input v-model="form.price" placeholder="请输入课程原价" clearable />
      </el-form-item>
      <el-form-item prop="tPrice" label="课程现价">
        <el-input v-model="form.tPrice" placeholder="请输入课程现价" clearable />
      </el-form-item>
      <el-form-item prop="desc" label="课程描述">
        <el-input v-model="form.desc" placeholder="请输入课程描述" clearable />
      </el-form-item>
      <el-form-item prop="detail" label="课程简介">
        <el-input v-model="form.detail" type="textarea" placeholder="请输入课程简介" clearable />
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
      <el-form-item>
        <el-button type="primary" @click="handleClick">确定</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script lang="ts" setup>
import { PropType } from "vue"
import type { FormInstance } from 'element-plus'

const props = defineProps({
  useType: {
    type: Number as PropType<0 | 1>, // 0：创建，1编辑
    default: 0
  },
  courseId: Number
})

const CreateCourseForm = ref<FormInstance>()

const emit = defineEmits<{
  (event: "update"): void
  (event: "close"): void
}>()

const form = reactive({
  visible: true,
  courseId: "",
  title: "",
  cover: "",
  price: "",
  tPrice: "",
  isRecommend: "",
  isColumn: "",
  desc: "",
  detail: ""
})

const rules = {
  title: [
    { required: true, message: '请输入课程标题', trigger: 'blur' },
  ],
  price: [
    { required: true, message: '请输入课程原价', trigger: 'blur' },
  ],
  tPrice: [
    { required: true, message: '请输入课程现价', trigger: 'blur' },
  ],
  desc: [
    { required: true, message: '请输入课程描述', trigger: 'blur' },
  ],
  detail: [
    { required: true, message: '请输入课程简介', trigger: 'blur' },
  ],
}

const getUpdateCourseDetail = async () => {
  let result = null
  try {
    result = await httpGet("/api/course/getCourseDetail", {
      params: {
        courseId: props.courseId 
      }
    })
  } catch (err) {
    ElMessage.error(err as any)
    return
  }
  form.title = (result as any).data.detail.title
  form.cover = (result as any).data.detail.cover
  form.price = (result as any).data.detail.price
  form.tPrice = (result as any).data.detail.tPrice
  form.isRecommend = (result as any).data.detail.isRecommend
  form.isColumn = (result as any).data.detail.isColumn
  form.desc = (result as any).data.detail.desc
  form.detail = (result as any).data.detail.detail
}

const handleClick = async () => {
  await CreateCourseForm.value?.validate((valid) => {
    if (valid) {
      if (props.useType === 1) {
        // 更新
        handleUpdateCourse()
      } else {
        // 创建
        handleCreateCourse()
      }
    }
  })
}

const handleCreateCourse = async () => {
  try {
    await httpPost('/api/course/createCourse', form)
    ElMessage.success("创建成功")
    emit("update")
  } catch (err) {
    ElMessage.error(err as any)
    return
  }
}

// 更新
const handleUpdateCourse = async () => {
  try {
    await httpPost("/api/course/updateCourse")
    ElMessage.success("更新成功")
    emit("update")
  } catch(err) {
    ElMessage.error(err as any)
    return
  }
}

// 关闭
const handleClose = () => {
  emit('close')
}

if (props.useType === 1) {
  getUpdateCourseDetail()
}
</script>