// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@element-plus/nuxt", [
    "@pinia/nuxt",
      {
        autoImports: [
          // 自动引入 `defineStore(), storeToRefs()`
          "defineStore",
          "storeToRefs"
        ],
      }
  ]],
  app: {
    head: {
      title: "nuxt-front",
      meta: [
        { name: "description", content: "这一个nuxt的学习项目中的描述部分" }
      ]
    }
  },
})
