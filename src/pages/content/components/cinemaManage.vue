<template>
  <div class="cinemaManage">
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column prop="cinemaName" label="影院名称" width="180"></el-table-column>
      <el-table-column prop="mobile" label="电话" width="180"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="goAsh(scope.row,'edit')">编辑</el-button>
          <el-button type="text" @click="goAsh(scope.row,'check')">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagiNation">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { getAllCinema } from '@/config/getData';
export default {
  name: 'cinemaManage',
  components: {},
  data () {
    return {
      tableData: [],
      currentPage: 1,
      size: 10,
      total: 400
    }
  },
  watch: {},
  created () {},
  mounted () {
    this.initData()
  },
  methods: {
    initData () {
      getAllCinema(this.currentPage).then(res => {
        if (res.code === 200) {
          this.tableData = res.data.list
          this.currentPage = res.data.pageNum
          this.total = res.data.total
        }
      })
    },
    // 影院详情
    goAsh (row, type) {
      this.$router.push(
        '/cinemaDetail?type=' + `${type}` + '&id=' + `${row.cinemaLinkId}`
      )
      localStorage.setItem('cinemaName', JSON.stringify(row.cinemaName))
    },
    // 分页
    handleSizeChange (val) {
      this.size = val
      this.initData()
    },
    // 分页
    handleCurrentChange (val) {
      this.currentPage = val
      this.initData()
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style.scss";
.cinemaManage {
}
</style>
