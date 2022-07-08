<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="auto">
        <LeftMenu />
      </el-aside>
      <el-container>
        <el-header>
          <RightTop />
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import LeftMenu from "@/components/LefMenu.vue";
import RightTop from "@/components/RightTop.vue";
</script>

<style lang="scss">
.el-aside {
  background-color: #fff;
}

.el-main {
  background-color: pink;
}

.el-header {
  background-color: yellowgreen;
}

.el-footer {
  background-color: aqua;
}

//设置自适应行高
.el-container,
.el-aside,
.common-layout,
#app,
body,
html {
  height: 100%;
}
</style>
