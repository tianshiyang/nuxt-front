<template>
  <el-container>
    <el-header>
      <MyHeader />
    </el-header>
    <el-main>
      <slot></slot>
    </el-main>
    <el-footer>
      <MyFooter />
    </el-footer>
  </el-container>
</template>

<script lang="ts" setup>
</script>

<style scoped lang="scss">

</style>