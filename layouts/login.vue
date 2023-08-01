
<template>
  <slot></slot>
</template>

<script lang="ts" setup>
import { useHead } from "nuxt/app";
useHead({
  title: '登录'
})

</script>
