export const useUserInfo = defineStore("user", {
  state: () => ({
    userInfo: {
      username: "",
      avatar: "",
      nickname: "",
      sex: "",
      role: 0,
      createdAt: ""
    }
  })
});