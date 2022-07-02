// 封装相关的数据请求
import service from '@/tools/service.js'


let link = (url, methods="get", data, params) => {
    return new Promise((resolve, reject) => {
        service.request(
            {
                //es6键值对省略 可直接匹配
                url,
                methods,
                data,
                params
            }).then((ok) => {
                resolve(ok);
            }).catch((err) => {
                reject(err)
            })
    })
}

export default link;