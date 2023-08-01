<template>
  <el-card class="card-style">
    <section class="title">
      <h1>返回首页</h1>
      <div class="sign-in">还未注册？</div>
    </section>
    <el-alert title="测试账号和密码都是test" type="success" show-icon />

    <el-form ref="loginRef" :model="form" :rules="rules" style="margin-top: 20px;">
      <el-form-item label="账号" prop="username">
        <el-input v-model="form.username" placeholder="请输入用户名" clearable />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="form.password" placeholder="请输入密码" clearable />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleLogin">登录</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'
import { reactive, ref } from "vue";
const form = reactive({
  username: '',
  password: ''
})
const loginRef = ref<FormInstance>()
const rules = reactive<FormRules<Record<string, any>>>({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
  ],
})

// 登录
const handleLogin = async () => {
  if (!loginRef.value) return
  await loginRef.value.validate(async (valid) => {
    if (valid) {
      const result = await httpPost("/api/user/login", form)
      console.log(result)
    }
  })
}
</script>

<style scoped>
.card-style {
  position: absolute;
  top: 30%;
  left: 50%;
  width: 40%;
  transform: translate(-50%, -50%);
}
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.sign-in {
  color: rgb(8, 173, 8);
}
</style>