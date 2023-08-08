<template>
  <el-row>
    <el-col :span="4">
      <h1>XXX官网</h1>
    </el-col>
    <el-col :span="2">
      <el-button text bg size="large" @click="handleNavigate('/home')">首页</el-button>
    </el-col>
    <el-col :span="2">
      <el-button text bg size="large" @click="handleNavigate('/column')">专栏</el-button>
    </el-col>
    <el-col :span="2">
      <el-button text bg size="large" v-if="userInfo.userInfo.role === 1" @click="handleNavigate('/manage')">管理</el-button>
    </el-col>
    <el-col :span="12"></el-col>
    <el-col :span="2">
      <el-button type="primary" v-if="!userInfo.userInfo?.username" size="large" @click="handleNavigate('/login')">登录</el-button>
      <el-popover placement="bottom" trigger="click" v-else>
        <template #reference>
          <el-avatar :size="50" :src="circleUrl" />
        </template>
        <p><el-button type="primary" text bg style="width: 100%;" @click="handleNavigate('/userCenter')">个人中心</el-button></p>
        <p><el-button type="primary" text bg style="width: 100%;">退出</el-button></p>
      </el-popover>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
const router = useRouter()
import { useUserInfo } from "@/store/user"

const userInfo = useUserInfo()

const circleUrl = computed(() => {
  return userInfo.userInfo.avatar || 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
})

const handleNavigate = (path: string) => {
  router.push({
    path
  })
}
</script>

<style scoped>
.el-row {
  align-items: center;
}
</style>