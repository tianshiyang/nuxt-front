<template>
  <el-row>
    <el-col :span="4">
      <h1>XXX官网</h1>
    </el-col>
    <el-col :span="2">
      <el-button text bg size="large" @click="handleNavigate('/index')">首页</el-button>
    </el-col>
    <el-col :span="2">
      <el-button text bg size="large" @click="handleNavigate('/column')">专栏</el-button>
    </el-col>
    <el-col :span="2">
      <el-button text bg size="large" @click="handleNavigate('/course')">课程</el-button>
    </el-col>
    <el-col :span="12"></el-col>
    <el-col :span="2">
      <el-button type="primary" size="large" @click="handleNavigate('/login')">登录</el-button>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
const router = useRouter()

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