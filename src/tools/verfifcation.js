//验证函数

export function checkEmail(data) {
    let reg = /^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/;

    return reg.test(data) ? true : false;
}
export function checkPassword(data) {
    let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,10}$/; //验证密码 为数字+字母

    return reg.test(data) ? true : false;
}