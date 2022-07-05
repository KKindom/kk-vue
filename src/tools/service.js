//axios 拦截器
import axios from "axios";
//切换模式
let axiosurl = ""
if (process.env.NODE_ENV === "development") {
    axiosurl = process.env.VUE_APP_API;
}
else {
    axiosurl = process.env.VUE_APP_API;
}
//创建实例
const service = axios.create(
    {
        baseURL:axiosurl
    }
);
// 添加请求拦截器
service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});
//导出拦截器 
export default service;