<template>
  <div class="login">
    <div class="login-con">
      <ul class="menu-tab">
        <h2
          type="primary"
          v-for="v in MenuData"
          :class="{ current: v.current }"
          :key="v.type"
          @click="changeMenu(v)"
        >
          {{ v.text }}
        </h2>
      </ul>
      <br />
      <!-- 表单部分 -->
      <div class="login-tab">
        <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          status-icon
          :rules="rules"
          class="demo-ruleForm"
          label-position="top"
        >
          <el-form-item label="账号" prop="username">
            <el-input v-model="ruleForm.username" autocomplete="off" />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              v-model="ruleForm.password"
              type="password"
              autocomplete="off"
              maxlength="10"
              show-word-limit
            />
          </el-form-item>
          <el-form-item
            label="重复密码"
            prop="re_password"
            v-show="model === 'register'"
          >
            <el-input
              v-model="ruleForm.re_password"
              maxlength="10"
              show-word-limit
              type="password"
            />
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="submitForm(ruleFormRef)"
              :disabled="btnbool"
              >{{ model === "login" ? "登录" : "注册" }}</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>


<script lang="ts" setup>
//引入提示框
import { ElMessage } from "element-plus";
//创建复杂数据类型
import { reactive, ref, onMounted, watch } from "vue";
//表单校验
import type { FormInstance } from "element-plus";
// 引用表单校验函数
import * as check from "@/tools/verfifcation.js";
//引入 获取json-server中的数据
import link from "@/api/Link.js";

//引用加密函数
import useMd5 from "@/hook/index.js";
//引用url
import url from "@/api/url.js";
// const url = require("@/api/url.js");
//登录表单数据
const MenuData = reactive([
  { text: "登录", current: true, type: "login" },
  { text: "注册", current: false, type: "register" },
]);
//单机注册登录按钮事件
let model = ref("login");
let changeMenu = (item: any) => {
  MenuData.forEach((element) => {
    element.current = false;
  });
  item.current = true;
  model.value = item.type;
};

//表单校验

const ruleFormRef = ref<FormInstance>();
//校验邮箱
const checEmail = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error("邮箱非空，请重新输入邮箱！"));
  } else if (!check.checkEmail(value)) {
    return callback(new Error("对不起，邮箱格式不正确！"));
  } else {
    callback();
  }
};
//校验密码
const checPassword = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("密码不为空"));
  } else {
    if (!check.checkPassword(value)) {
      callback(new Error("密码格式为6-10位的数字+字母！"));
    }
    callback();
  }
};
//校验重复密码
const checRepassword = (rule: any, value: any, callback: any) => {
  if (!(model.value === "login")) {
    if (value === "") {
      callback(new Error("Please input the password again"));
    } else if (value !== ruleForm.password) {
      callback(new Error("Two inputs don't match!"));
    } else {
      callback();
    }
  } else {
    callback();
  }
};

//配置表格相关
const ruleForm = reactive({
  username: "",
  password: "",
  re_password: "",
});
//这里是设置，已某种方式触发表单验证，失去焦点验证
//trigger blur是失去焦点 change是改变
const rules = reactive({
  username: [{ validator: checEmail, trigger: "blur" }],
  password: [{ validator: checPassword, trigger: "blur" }],
  re_password: [{ validator: checRepassword, trigger: "blur" }],
});
//提交表单
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      let data = {
        name: ruleForm.username,
        pwd: useMd5(ruleForm.password).value,
      };
      //判断登录和注册
      if (model.value === "login") {
        //登录
        console.log("登录");
        //登录请求
        link(url.register, "get", {}, data).then((ok: any) => {
          console.log(ok);
          if (Object.keys(ok.data).length !== 0) {
            console.log("登录成功！");
            //弹窗不显示 有问题
            alert("登录成功！");
          } else {
            console.log("登录失败！");
            alert("登录失败请检查账号密码是否正确！");
            ElMessage.error("Oops, this is a error message.");
          }
        });
      } else {
        //  注册
        //注册请求 类型为post
        //加密注册的密码
        link(url.register, "POST", data).then((ok: any) => {
          console.log(ok);
          if (Object.keys(ok.data).length !== 0) {
            console.log("注册成功！");
            //弹窗不显示 有问题
            ElMessage("this is a message.");
            //切换模式到注册页面
            model.value = "login";
            MenuData.forEach((V) => {
              V.current = false;
            });
            MenuData[0].current = true;
          } else {
            console.log("注册失败！");
            ElMessage.error("Oops, this is a error message.");
          }
        });
      }
    } else {
      console.log("error submit!");
      return false;
    }
  });
};

onMounted(() => {
  console.log(process.env.VUE_APP_API);
});

//配置登录/注册按钮是否可用
let btnbool = ref(true);
//添加登录按钮监听
watch(ruleForm, (newval, oldval) => {
  if (model.value === "login") {
    if (newval.username != "" && newval.password != "") {
      btnbool.value = false;
    } else {
      btnbool.value = true;
    }
  } else {
    if (
      newval.username != "" &&
      newval.password != "" &&
      newval.re_password != ""
    ) {
      btnbool.value = false;
    } else {
      btnbool.value = true;
    }
  }
});

//重置选项 暂时未用
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script> 

<style lang="scss">
.login {
  background-color: #9191a6;
  height: 100%;
}
html,
body,
#app {
  height: 100%;
}

.menu-tab {
  text-align: center;
  height: 36px;
  margin-left: 30%;
  margin-right: 30%;
  h2 {
    display: block;
    line-height: 36px;
    font-size: 20px;
    color: red;
    border-radius: 2px;
    cursor: pointer;
    float: left;
    width: 50%;
  }
  .current {
    background-color: #fff;
  }
}
.login-tab {
  color: #000;
}

.demo-ruleForm {
  margin: 50px auto;
  width: 40%;
  label {
    display: block;
    margin-bottom: 3px;
    font-size: 14px;
    color: #fff;
  }
  button {
    margin-right: 30%;
    margin-left: 30%;
    width: 40%;
  }
}
</style>