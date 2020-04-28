<template>
  <div class="userManage">
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
        <el-form-item label="用户类型" class="middle" prop="type">
          <el-select v-model="formInline.type" placeholder="请选择">
            <el-option
              v-for="(item,index) in classItem"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="formInline.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="开通月卡会员时间" prop="dateTime">
          <el-date-picker
            v-model="formInline.dateTime"
            type="daterange"
            value-format="yyyy-MM-dd HH:mm:ss"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>

        <el-form-item>
          <el-button @click="resetForm('formInline')">重置</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="searchInfo" type="primary">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleDownloadExcel">导出数据</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="page-view">
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column prop="nickName" label="用户昵称"></el-table-column>
        <el-table-column prop="mobile" label="手机号"></el-table-column>
        <el-table-column prop="type" label="用户类型">
          <template slot-scope="scope">
            <span>{{scope.row.type|getUserType}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="cumulativeDay" label="累计时长(天)"></el-table-column>
        <el-table-column prop="remainingDays" label="剩余时长(天)"></el-table-column>
        <el-table-column prop="cinemaTotalFee" label="观影金额(元)"></el-table-column>
        <el-table-column prop="rechargeTotalFee" label="充值总额(元)"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span>{{scope.row.status | getVipStatus}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="goAsh(scope.row)">详情</el-button>
            <el-button type="text" @click="handleMark(scope.row)">{{scope.row.type==2?'取消':'标记'}}</el-button>
            <el-button type="text" @click="handleSure(scope.row)">{{scope.row.status==1?'禁用':'取消'}}</el-button>
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
import {
  userDataList,
  userDisabled,
  userMarkStaff,
  exportExcelOfUser
} from '@/config/getData';
import { openDownloadDialog, sheet2blob } from '@/config/downDialog';
import XLSX from 'xlsx';
import { mapState, mapMutations } from 'vuex';
export default {
  name: 'userManage',
  components: {},
  data () {
    return {
      formInline: {
        nickName: '',
        type: '',
        mobile: '',
        dateTime: ''
      },
      classItem: [
        { label: '普通用户', value: 0 },
        { label: '会员用户', value: 1 },
        { label: '员工', value: 2 }
      ],
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
  computed: {
    ...mapState(['getParam'])
  },
  methods: {
    ...mapMutations(['setParam', 'clearParam']),
    // 初始化数据
    async initData () {
      let param = {}
      if (this.getParam === null) {
        // 为空时默认展示
        param = this.formInline
        param.pageNum = this.currentPage
      } else {
        // 记录查询数据并回显
        param = this.getParam
        this.formInline = param
      }
      if (this.formInline.dateTime) {
        param.openTimeStart = this.formInline.dateTime[0]
        param.openTimeEnd = this.formInline.dateTime[1]
      }
      this.setParam(param)
      await userDataList(param).then(res => {
        if (res.code === 200) {
          this.tableData = res.data.list
          this.total = res.data.total
          this.currentPage = res.data.pageNum
          this.size = res.data.pageSize
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
      let param = this.getParam
      param.pageNum = val
      this.setParam(param)
      this.initData()
    },
    // 搜索
    searchInfo () {
      this.clearParam()
      this.initData()
    },
    // 重置
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.initData()
      this.clearParam()
    },
    // 详情
    goAsh (row) {
      let param = {}
      param.userId = row.id
      param.type = row.type
      param.status = row.status
      param.cinemaTotalFee = row.cinemaTotalFee
      param.rechargeTotalFee = row.rechargeTotalFee
      param.cumulativeDay = row.cumulativeDay
      param.remainingDays = row.remainingDays

      localStorage.setItem('detailParam', JSON.stringify(param))
      this.go('/userManageDetail')
    },
    // 导出数据
    handleDownloadExcel () {
      let param = this.formInline
      if (this.formInline.dateTime) {
        param.openTimeStart = this.formInline.dateTime[0]
        param.openTimeEnd = this.formInline.dateTime[1]
      }
      exportExcelOfUser(param).then(res => {
        var sheet = XLSX.utils.aoa_to_sheet(res.data)
        openDownloadDialog(sheet2blob(sheet), '用户管理' + '.xlsx')
      })
    },
    // 是否标记为员工
    handleMark (row) {
      let param = {}
      param.userId = row.id
      let message
      if (row.type !== 2) {
        param.type = 2
        message = '已标记为员工';
      } else {
        param.type = 0
        message = '已标记为普通用户';
      }
      userMarkStaff(param).then(res => {
        if (res.code === 200) {
          this.$success(message)
          this.initData()
        } else {
          this.$error('操作失败')
        }
      })
    },
    // 禁用
    handleSure (row) {
      let param = {}
      param.userId = row.id
      let message
      if (row.status === 1) {
        param.status = 0
        message = '禁用成功';
      } else {
        param.status = 1
        message = '已取消禁用';
      }
      userDisabled(param).then(res => {
        if (res.code === 200) {
          this.$success(message)
          this.initData()
        } else {
          this.$error('操作失败')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../style.scss";
.userManage {
  .flex-between {
    .el-button {
    }
  }
}
</style>
