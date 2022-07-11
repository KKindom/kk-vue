<template>
  <div>
    <!-- 切片列表 -->
    <!-- 计算当前显示页数 -->
    <el-table
      :data="
        tableData.listdata.slice(
          (currentPage4 - 1) * pageSize4,
          currentPage4 * pageSize4
        )
      "
      stripe
      :table-layout="tableLayout"
      style="width: 100%"
    >
      <el-table-column prop="id" label="户主编号" />
      <el-table-column prop="title" label="公寓楼名" />
      <el-table-column prop="type" label="楼房类型" />
      <el-table-column prop="num" label="房间号" />
      <el-table-column prop="hometype" label="房屋类型" />
      <el-table-column prop="name" label="户主名称" />

      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
            >修改</el-button
          >
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      v-model:currentPage="currentPage4"
      v-model:page-size="pageSize4"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableData.listdata.length"
      :current-page="currentPage4"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <!-- 修改的弹窗函数 -->
    <UpdateDialog />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, reactive } from "vue";
import link from "@/api/Link.js";
import { ok } from "assert";
import apiurl from "@/api/url.js";
//引用弹出窗口
import UpdateDialog from "@/components/UpdateDialog.vue";
import { useStore } from "vuex";
// 页面相关
const currentPage4 = ref(1);
const pageSize4 = ref(10);
const tableLayout = ref("auto");
// 当前页数显示
const handleSizeChange = (val: number) => {
  pageSize4.value = val;
};
const handleCurrentChange = (val: number) => {
  currentPage4.value = val;
};
//请求表格数据
let tableData = reactive({
  listdata: [],
});
onMounted(() => {
  link(apiurl.userlist).then((ok: any) => {
    console.log(ok);
    tableData.listdata = ok.data;
  });
});
//请求修改数据
let store = useStore();
interface User {
  date: string;
  name: string;
  address: string;
}
const handleEdit = (index: number, row: User) => {
  console.log(index, row);
  store.commit("SET_DIALOG");
};
const handleDelete = (index: number, row: User) => {
  console.log(index, row);
};
</script>
<style scoped>
.demo-pagination-block + .demo-pagination-block {
  margin-top: 10px;
}
.demo-pagination-block .demonstration {
  margin-bottom: 16px;
}
</style>
