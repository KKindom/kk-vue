<template>
  <div>
    <el-icon @click="click_button">
      <CaretRight v-if="$store.state.HomeModule.navBool" />
      <CaretLeft v-else />
    </el-icon>
    <h3>男生之家</h3>
  </div>
</template>

  components: { svgIcon },
<script lang="ts" setup>
import { CaretLeft, CaretRight } from "@element-plus/icons-vue";
import { useStore } from "vuex";
let store = useStore();
let click_button = () => {
  store.commit("SET_NAV_BOOL");
};
</script>


<style lang="scss">
.el-header {
  line-height: 60px;
  .el-icon {
    font-size: 20px;
  }
}
</style>