
<template>
  <el-container>
    <el-header>
      <MyHeader />
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo">
          <el-menu-item index="1" @click="navigateTo('/manageCourse')">
            <span>课程管理</span>
          </el-menu-item>
          <el-menu-item index="2">
            <span>用户管理</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main style="min-height: 75vh;">
        <slot></slot>
      </el-main>
    </el-container>
    <el-footer>
      <MyFooter />
    </el-footer>
  </el-container>
</template>

<script lang="ts" setup>
import { useHead } from "nuxt/app";
useHead({
  title: "管理中心"
})

const router = useRouter()

const navigateTo = (path: string) => {
  router.push({
    path
  })
}
</script>