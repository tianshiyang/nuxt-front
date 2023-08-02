import { merge } from 'lodash'
type FetchType = typeof $fetch
type ReqType = Parameters<FetchType>[0]
type FetchOptions = Parameters<FetchType>[1]
import { ElMessage } from 'element-plus'
export function httpRequest<T = any>(
  method: 'get' | "GET" | 'post' | "POST",
  url: ReqType,
  body?: any,
  opts?: FetchOptions,
) {
  const token = useCookie('token')
  const router = useRouter()
  const route = useRoute()

  let baseUrl = ""
  if (process.env.NODE_ENV === 'development') {
    baseUrl = 'http://127.0.0.1:7001'
  }
  url = baseUrl + url

  const defaultOpts = {
    method,
    // baseURL: '/api',
    headers: { token: token.value } as any,
    body,
    onRequestError() {
      ElMessage.error('请求出错，请重试！')
    },
    onResponse({ response }) {
      if (response._data.isSuccess === false) {
        return Promise.reject(response._data.message)
      }
      return Promise.resolve(response._data.data)
    },
    onResponseError({ response }) {
      switch (response.status) {
        case 204:
          break;
        case 400:
          ElMessage.error('参数错误')
          break
        case 401:
          ElMessage.error('没有访问权限')
          router.push(`/login?callback=${route.path}`)
          break
        case 403:
          ElMessage.error('服务器拒绝访问')
          break
        case 404:
          ElMessage.error('请求地址错误')
          break
        case 500:
          ElMessage.error('服务器故障')
          break
        default:
          ElMessage.error('网络连接故障')
          break
      }
    },
  } as FetchOptions

  return $fetch<T>(url, merge(defaultOpts, opts))
}

export function httpPost<T = unknown>(
  request: ReqType,
  body?: any,
  opts?: FetchOptions,
) {
  return httpRequest<T>('post', request, body, opts)
}

export function httpGet<T = any>(
  request: ReqType,
  opts?: FetchOptions,
) {
  return httpRequest<T>('get', request, null, opts)
}