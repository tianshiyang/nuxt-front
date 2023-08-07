
<template>
  <el-card title="基本信息">
    <template #header>
      <h1>基本信息</h1>
    </template>
    <el-form label-width="120px" label-position="left">
      <el-form-item label="账号信息">
        {{ userInfo.username }}
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="form.nickname" clearable placeholder="请输入昵称" />
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="form.sex" clearable placeholder="请选择性别">
          <el-option label="男" :value="1" />
          <el-option label="女" :value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="头像">
        <el-image :src="form.avatar"></el-image>
      </el-form-item>
      <el-form-item label="创建时间">
        {{ userInfo.createdAt }}
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleCommitUserInfo">提交</el-button>
      </el-form-item>
    </el-form>
  </el-card>

  <el-card style="margin-top: 20px;">
    <template #header>
      <h1>更改密码</h1>
    </template>
    <el-form label-width="120px" :model="passwordForm" ref="passwordFormRef" :rules="rules">
      <el-form-item prop="oldPassword" label="请输入旧密码">
        <el-input type="password" v-model="passwordForm.oldPassword" clearable placeholder="请输入旧密码" />
      </el-form-item>
      <el-form-item prop="newPassword" label="请输入新密码">
        <el-input type="password" v-model="passwordForm.newPassword" clearable placeholder="请输入新密码" />
      </el-form-item>
      <el-form-item prop="rePassword" label="请确认新密码">
        <el-input type="password" v-model="passwordForm.rePassword" clearable placeholder="请确认新密码" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleResetPassword">提交</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script lang="ts" setup>
import { useCookie, useHead } from "nuxt/app";
import { useUserInfo } from "@/store/user"
import { storeToRefs } from "pinia";
import { cloneDeep } from "lodash";
import { reactive, ref } from "vue";
import { httpPost, httpGet } from "@/composables/request";
import { ElMessage } from "element-plus";
import type { FormInstance } from 'element-plus'

useHead({
  title: "用户中心"
})
const { userInfo } = storeToRefs(useUserInfo())

const form = reactive({
  ...cloneDeep(userInfo.value)
})

const handleCommitUserInfo = async () => {
  try {
    await httpPost('/api/user/updateUserInfo', form)
  } catch(err) {
    ElMessage.error(err as any)
    return
  }
  ElMessage.success("更新成功！")
  getUserInfo()
}

const newUserInfo = useUserInfo()

const getUserInfo = async () => {
  try {
    const result = await httpGet('/api/user/getUserInfo')
    result.data.createdAt = result.data.createdAt
    newUserInfo.userInfo = result.data
  } catch(err) {
    ElMessage.error(err as string)
  }
}

const passwordFormRef = ref<FormInstance>()

const passwordForm = reactive({
  oldPassword: "",
  newPassword: "",
  rePassword: ""
})

const rules = ref({
  oldPassword: [
    { required: true, message: '请输入旧密码', target: "blur" }
  ],
  newPassword: [
    { required: true, message: '请输入新密码', target: "blur" }
  ],
  rePassword: [
    { required: true, message: '请确认新密码', target: "blur" }
  ]
})

const handleResetPassword = async () => {
  await passwordFormRef.value?.validate((valid) => {
    if (valid) {
      if (passwordForm.newPassword !== passwordForm.rePassword) {
        ElMessage.error('两次输入不一致')
        return
      }
      handleUpdatePassword()
    }
  })
}

const handleUpdatePassword = async () => {
  let result: any = null
  try {
    result = await httpPost("/api/user/updateUserPassword", passwordForm)
  } catch(err) {
    ElMessage.error(err as any)
    return
  }
  ElMessage.success('更新密码成功')
  passwordFormRef.value?.resetFields()
  const token = useCookie('token')
  if (result) {
    token.value = result.data.token
  }
}
</script>