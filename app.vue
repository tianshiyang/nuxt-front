<template>
  <NuxtLayout :name="layout">
    <NuxtPage></NuxtPage>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { ElMessage } from "element-plus"
const route = useRoute()
const layout = ref('default')

import { useUserInfo } from "@/store/user"

const userInfo = useUserInfo()

const getUserInfo = async () => {
  try {
    const result = await httpGet('/api/user/getUserInfo')
    userInfo.userInfo = result.data
  } catch(err) {
    ElMessage.error(err as string)
  }
}


watch(() => route.path, () => {
  if (route.path === '/login') {
    layout.value = 'login'
  } else if (route.path === "/userCenter") {
    layout.value = 'user-center'
  } else {
    layout.value = "default"
  }
}, {
  immediate: true
})


getUserInfo()

</script>

<style scoped>
body {
  padding: 0;
  margin: 0;
}
</style>
