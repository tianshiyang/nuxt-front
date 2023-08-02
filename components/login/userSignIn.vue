<template>
  <section>
    <h1>注册</h1>
  </section>

  <el-form ref="signInRef" :model="form" :rules="rules" label-width="120px" label-position="left" style="margin-top: 20px;">
    <el-form-item label="用户名" prop="username">
      <el-input v-model="form.username" placeholder="请输入用户名" clearable />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input type="password" v-model="form.password" placeholder="请输入密码" clearable />
    </el-form-item>
    <el-form-item label="再次输入密码" prop="rePassword">
      <el-input type="password" v-model="form.rePassword" placeholder="请再次输入密码" clearable />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleSignIn">注册</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'
import { reactive, ref } from "vue";
import { useUserInfo } from "@/store/user"

const userInfo = useUserInfo()

const router = useRouter()
const form = reactive({
  username: '',
  password: '',
  rePassword: "",
})
const signInRef = ref<FormInstance>()
const rules = reactive<FormRules<Record<string, any>>>({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
  ],
  rePassword: [
    { required: true, message: "请再次输入密码", trigger: "blur" }
  ]
})

const handleSignIn = async () => {
  if (!signInRef.value) return
  await signInRef.value.validate(async (valid) => {
    if (valid) {
      if (form.password !== form.rePassword) {
        ElMessage.error("两次输入不一致")
        return
      }
      try {
        const result = await httpPost("/api/user/signin", form)
        const token = useCookie('token')
        token.value = result.data.token

        userInfo.userInfo = result.data

        ElMessage.success({
          message: "注册成功！",
          duration: 1000,
          onClose: () => {
            router.push({
              path: "/"
            })
          }
        })
        
      } catch(err) {
        ElMessage.error(err)
      }
    }
  })
}
</script>

<style scoped>

</style>