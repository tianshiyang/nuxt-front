<template>
  <el-card class="card-style">
    <el-tabs v-model="activeName" class="demo-tabs">
      <el-tab-pane label="登录" name="login">
        <LoginUserLogin @updateTab="handleClick" />
      </el-tab-pane>
      <el-tab-pane label="注册" name="signIn">
        <LoginUserSignIn />
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script lang="ts" setup>
useHead({
  title: "登录"
})
const activeName = ref('login')

const handleClick = (value: any) => {
  activeName.value = value
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
</style>