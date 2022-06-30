<template>
  <div class="login">
    <el-button type="primary">Primary</el-button>
    <el-button type="success">Success</el-button>
    <el-button type="info">Info</el-button>
    <ul>
      <li v-for="v in MenuData" :key="v.type">
        {{ v.txt }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
const MenuData = reactive([
  { txt: "登录", current: true, type: "login" },
  { txt: "注册", current: true, type: "regin" },
]);
</script> 

<style lang="scss">
</style>