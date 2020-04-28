<template>
  <div class="opinionManage">
    <opinionDetail
      :bShowPreview.sync="bShowPreview"
      @onEditorChange="changeFollowStatus"
      :menuData="menuData"
    />
    <div class="card-title">
      <el-form
        :inline="true"
        :model="formInline"
        ref="formInline"
        class="demo-form-inline form"
        size="medium"
      >
        <el-form-item label="用户昵称" prop="nickName">
          <el-input v-model="formInline.nickName" placeholder="请输入用户昵称"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="formInline.phone" placeholder="请输入手机号"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button @click="searchInfo" type="primary">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="resetForm('formInline')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="page-view">
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column prop="date" label="用户头像">
          <template slot-scope="scope">
            <el-avatar :size="50" :src="scope.row.headImage">
              <img src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
            </el-avatar>
          </template>
        </el-table-column>
        <el-table-column prop="nickName" label="提交人"></el-table-column>
        <el-table-column prop="mobile" label="手机号"></el-table-column>
        <el-table-column prop="submitTime" label="提交时间"></el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="handleShow(scope.row)">详情</el-button>
            <el-button
              type="text"
              v-if="scope.row.followStatus==0"
              @click="changeFollowStatus(scope.row)"
            >跟进</el-button>
            <el-button type="text" v-else disabled>已跟进</el-button>
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
  </div>
</template>
<script>
import opinionDetail from './opinionManageDetail';
import { feedBackList, changeFollowStatus } from '@/config/getData';
export default {
  name: 'opinionManage',
  components: { opinionDetail },
  data () {
    return {
      formInline: {
        nickName: '',
        phone: ''
      },
      tableData: [],
      bShowPreview: false,
      currentPage: 1,
      size: 10,
      total: 400,
      menuData: {}
    }
  },
  watch: {},
  created () {},
  mounted () {
    this.initData()
  },
  methods: {
    // 初始化表单数据
    initData () {
      let param = {}
      param.pageNum = this.currentPage
      param.nickName = this.formInline.nickName
      param.mobile = this.formInline.phone
      feedBackList(param).then(res => {
        if (res.code === 200) {
          console.log(res)
          this.tableData = res.data.list
          this.total = res.data.total
          this.currentPage = res.data.pageNum
        }
      })
    },
    // 跟进状态事件
    changeFollowStatus (e) {
      let param = {}
      param.id = e.id
      changeFollowStatus(param).then(res => {
        if (res.code === 200) {
          this.$success('已跟进')
          setTimeout(() => this.initData(), 1000)
          this.bShowPreview = false
        } else {
          this.$error(res.msg)
        }
      })
    },
    // 详情
    handleShow (row) {
      this.menuData = row
      this.bShowPreview = true
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
    // 搜索
    searchInfo () {
      this.initData()
    },
    // 重置
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.initData()
    },
    // 单个订单确认送达
    handleSure () {}
  }
}
</script>

<style lang="scss" scoped>
@import "../style.scss";
.opinionManage {
  .flex-between {
    .el-button {
    }
  }
}
</style>
