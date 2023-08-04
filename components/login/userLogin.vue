<template>
  <section class="title">
    <h1>返回首页</h1>
    <div class="sign-in" @click="handleChangeTab">还未注册？</div>
  </section>

  <el-alert title="测试账号和密码都是test" type="success" show-icon />

  <el-form ref="loginRef" :model="form" :rules="rules" label-width="120px" label-position="left" style="margin-top: 20px;">
    <el-form-item label="用户名" prop="username">
      <el-input v-model="form.username" placeholder="请输入用户名" clearable />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input type="password" v-model="form.password" placeholder="请输入密码" clearable />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleLogin">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'
import { reactive, ref } from "vue";
import { useUserInfo } from "@/store/user"
import moment from 'moment';

const userInfo = useUserInfo()

interface EmitType {
  (event: 'updateTab', value: 'login' | 'signIn'): void
}
const emit = defineEmits<EmitType>()

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

const router = useRouter()
const route = useRoute()

// 登录
const handleLogin = async () => {
  if (!loginRef.value) return
  await loginRef.value.validate(async (valid) => {
    if (valid) {
      let result: any = null
      try {
        result = await httpPost("/api/user/login", form)
      } catch(err) {
        ElMessage.error(err as any)
        return
      }
      const token = useCookie('token')

      token.value = result.data.token
      result.data.createdAt = moment(result.data.createdAt).format("YYYY-MM-DD HH:mm:ss").valueOf()
      userInfo.userInfo = result.data

      ElMessage.success({
        message: "登录成功！",
        duration: 1000,
        onClose: () => {
          router.push({
            path: route.query?.callback as string || "/"
          })
        }
      })
    }
  })
}

const handleChangeTab = () => {
  emit('updateTab', "signIn")
}
</script>

<style scoped>
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.sign-in {
  color: rgb(8, 173, 8);
  font-size: 14px;
}
</style>