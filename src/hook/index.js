//加密
import md5 from "js-md5"
import { ref } from "vue"
//加密信息
export default function (data) {
    let md5Data = ref(md5(data));
    return md5Data;
}

