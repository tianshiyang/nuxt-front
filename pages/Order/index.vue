<template>
  <el-tabs v-model="form.activeName" class="demo-tabs" @tab-click="handleClick">
    <el-tab-pane label="我的购物车" name="car">
      <OrderMyCar></OrderMyCar>
    </el-tab-pane>
    <el-tab-pane label="我的订单" name="order">Config</el-tab-pane>
  </el-tabs>
</template>

<script lang="ts" setup>
const form = reactive({
  activeName: 'car'
})

const handleClick = () => {}
</script>