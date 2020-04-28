<template>
  <div class="commodityManage page-view">
    <div class="card-title clearfix">
      <el-button type="primary" class="f_right" @click="go('/commodityDetail')">添加</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column prop="id" label="商品ID"></el-table-column>
      <el-table-column prop="name" label="主图">
        <template slot-scope="scope">
          <el-image
            style="width: 100px; height: 50px"
            :src="scope.row.imageUrl"
            :preview-src-list="[scope.row.imageUrl]"
            class="demo-image__error"
          >
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
        </template>
      </el-table-column>
      <el-table-column prop="tittle" label="名称"></el-table-column>
      <el-table-column prop="makingPrice" label="划线价格(元)"></el-table-column>
      <el-table-column prop="actualPrice" label="实际价格(元)"></el-table-column>
      <el-table-column prop="validityPeriod" label="有效期(天)"></el-table-column>
      <el-table-column prop="sales" label="总销量"></el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <span v-if="scope.row.status==0">下架</span>
          <span v-if="scope.row.status==1">上架</span>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <div class="flex-between">
            <el-button type="text" @click="go('/commodityDetail?id='+scope.row.id)">详情</el-button>
            <el-switch
              v-model="scope.row.status"
              @change="changeSwitch(scope.row)"
              :active-value="1"
              :inactive-value="0"
              active-color="#409EFF"
              inactive-color="#ccc"
            ></el-switch>
          </div>
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
import { getVipCard, changeVipState } from '@/config/getData';
export default {
  name: 'commodityManage',
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
    // 会员卡列表
    initData () {
      getVipCard(this.currentPage).then(res => {
        if (res.code === 200) {
          this.tableData = res.data.list
          this.currentPage = res.data.pageNum
          this.total = res.data.total
        }
      })
    },
    // 上架、下架
    changeSwitch (e) {
      let message
      let param = {}
      param.id = e.id
      if (e.status === 0) {
        message = '下架成功';
      } else if (e.status === 1) {
        message = '上架成功';
      }
      param.status = e.status
      changeVipState(param).then(res => {
        if (res.code === 200) {
          this.$success(message)
          this.initData()
        } else {
          this.$error('修改失败')
        }
      })
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
    },
    // 添加
    handleAdd () {}
  }
}
</script>

<style lang="scss" scoped>
@import "../style.scss";
.commodityManage {
  .flex-between {
    .el-button {
      margin-right: $pad;
    }
  }
}
</style>
