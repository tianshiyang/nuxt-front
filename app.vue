<template>
  <NuxtLayout :name="layout">
    <NuxtPage></NuxtPage>
  </NuxtLayout>
</template>

<script lang="ts" setup>
const route = useRoute()
const layout = ref('default')

watch(() => route.path, () => {
  if (route.path === '/login') {
    layout.value = 'login'
  } else {
    layout.value = 'default'
  }
}, {
  immediate: true
})
</script>

<style scoped>
body {
  padding: 0;
  margin: 0;
}
</style>
