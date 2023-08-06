import * as ElementPlus from "element-plus"
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
export default defineNuxtPlugin(nuxtApp => {
  // now available on `nuxtApp.$injected`
  nuxtApp.vueApp.use(ElementPlus, {
    locale: zhCn
  })
})