import axios from 'axios'
import {showFailToast} from 'vant';
import 'vant/es/toast/style'

const request = axios.create({
    baseURL: import.meta.env.PROD ? 'http://localhost:8080/api' : 'http://localhost:8080/api',
    withCredentials: true,
})

// 添加请求拦截器
request.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    console.log(`do request url = ${config.url}`)
    return config
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
})

// 添加响应拦截器
request.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    if (response.status !== 200) {
        return response
    }
    const res = response.data
    if (res.code !== 0) {
        showFailToast(res.message)
    }
    if (res.code === 40100) {
        const redirectURL = window.location.href
        window.location.href = `/user/login?redirectURL=${redirectURL}`
    }
    return res
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error)
})

export default request
