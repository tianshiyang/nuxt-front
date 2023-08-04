<template>
  <NuxtLayout :name="layout">
    <NuxtPage></NuxtPage>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { ElMessage } from "element-plus"
import { useUserInfo } from "@/store/user"
import moment from "moment"

const route = useRoute()
const layout = ref('default')

const userInfo = useUserInfo()

const getUserInfo = async () => {
  try {
    const result = await httpGet('/api/user/getUserInfo')
    result.data.createdAt = moment(result.data.createdAt).format("YYYY-MM-DD HH:mm:ss").valueOf()
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
  } else if (route.path.startsWith('/manage')) {
    layout.value = "manage"
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
