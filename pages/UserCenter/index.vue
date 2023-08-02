
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
        <el-image :src="form.avator"></el-image>
      </el-form-item>
      <el-form-item label="创建时间">
        {{ userInfo.createdAt }}
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleCommitUserInfo">提交</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card title="账号信息"></el-card>
</template>

<script lang="ts" setup>
import { useHead } from "nuxt/app";
import { useUserInfo } from "@/store/user"
import { storeToRefs } from "pinia";
import { cloneDeep } from "lodash";
import { reactive } from "vue";
import { httpPost, httpGet } from "@/composables/request";
import { ElMessage } from "element-plus";
import moment from "moment";

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
    ElMessage.error(err)
    return
  }
  ElMessage.success("更新成功！")
  getUserInfo()
}

const newUserInfo = useUserInfo()

const getUserInfo = async () => {
  try {
    const result = await httpGet('/api/user/getUserInfo')
    result.data.createdAt = moment(result.data.createdAt).format("YYYY-MM-DD HH:mm:ss").valueOf()
    newUserInfo.userInfo = result.data
  } catch(err) {
    ElMessage.error(err as string)
  }
}
</script>