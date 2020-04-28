<template>
  <div class="userManageDetail">
    <header class="card-title">
      <el-avatar :size="60" :src="detailData.headImage" class="avatar">
        <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
      </el-avatar>
      <ul class="order-list">
        <li>
          <span class="tit">昵称:</span>
          <span class="num">{{detailData.nickName}}</span>
        </li>
        <li>
          <span class="tit">用户类型:</span>
          <span class="num">{{orderData.type|getUserType}}</span>
        </li>
        <li>
          <span class="tit">首次成为会员:</span>
          <span class="num">{{detailData.firstBuyVipTime | getDateTime}}</span>
        </li>
        <li>
          <span class="tit">充值总额(元):</span>
          <span class="num">{{detailData.rechargeTotalFee}}</span>
        </li>
        <li>
          <span class="tit">手机号:</span>
          <span class="num">{{detailData.mobile}}</span>
        </li>
        <li>
          <span class="tit">会员状态:</span>
          <span class="num">{{detailData.vipStatus | getVipStatus}}</span>
        </li>
        <li>
          <span class="tit">当前会员到期日:</span>
          <span class="num">{{detailData.currentVipExpiringDate | getDateTime}}</span>
        </li>
        <li>
          <span class="tit">观影金额(元):</span>
          <span class="num">{{detailData.cinemaTotalFee}}</span>
        </li>
        <li>
          <span class="tit">会员:</span>
          <span class="num">{{detailData.isVip | getIsVip}}</span>
        </li>
        <li>
          <span class="tit">消费金额(元):</span>
          <span class="num">{{detailData.consumeTotalFee}}</span>
        </li>
        <li>
          <span class="tit">累计时长(天):</span>
          <span class="num">{{orderData.cumulativeDay}}</span>
        </li>
        <li>
          <span class="tit">剩余时长(天):</span>
          <span class="num">{{orderData.remainingDays}}</span>
        </li>
      </ul>
    </header>
    <div class="page-view">
      <el-radio-group v-model="tabPosition" class="tab-group" @change="changeTab">
        <el-radio-button label="1">登录明细</el-radio-button>
        <el-radio-button label="2">观影明细</el-radio-button>
        <el-radio-button label="3">激活明细</el-radio-button>
        <el-radio-button label="4">用户评价</el-radio-button>
      </el-radio-group>
      <!-- 登录明细 -->
      <el-table :data="tableData" style="width: 50%;margin:0 auto" border v-show="tabPosition==1">
        <el-table-column prop="loginTime" label="登录时间" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.loginTime | getTime}}</span>
          </template>
        </el-table-column>
      </el-table>
      <!-- 观影明细 -->
      <el-table :data="tableData" style="width: 100%" border v-show="tabPosition==2">
        <el-table-column prop="filmName" label="影片名称"></el-table-column>
        <el-table-column prop="duration" label="影片时长(分钟)"></el-table-column>
        <el-table-column prop="language" label="影片语言"></el-table-column>
        <el-table-column prop="dimensional" label="影片视觉"></el-table-column>
        <el-table-column prop="price" label="影片票价(元)"></el-table-column>
        <el-table-column prop="showDateTime" label="放映时间">
          <template slot-scope="scope">
            <span>{{scope.row.showDateTime | getDateTime}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="id" label="评价">
          <template slot-scope="scope">
            <span v-if="scope.row.id">已评价</span>
            <span v-else>未评价</span>
          </template>
        </el-table-column>
      </el-table>
      <!-- 激活明细 -->
      <el-table :data="tableData" style="width: 100%" border v-show="tabPosition==3">
        <el-table-column prop="tittle" label="会员卡名称"></el-table-column>
        <el-table-column prop="vipCardNo" label="会员卡卡号"></el-table-column>
        <el-table-column prop="address" label="激活时间">
          <template slot-scope="scope">
            <span>{{scope.row.activeTime | getDateTime}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="有效期">
          <template slot-scope="scope">
            <span>{{scope.row.periodValidity | getDateTime}}</span>
          </template>
        </el-table-column>
      </el-table>
      <!-- 用户评价 -->
      <el-table :data="tableData" style="width: 100%" border v-show="tabPosition==4">
        <el-table-column prop="comments" label="评价内容"></el-table-column>
        <el-table-column prop="name" label="评价时间">
          <template slot-scope="scope">
            <span>{{scope.row.evaluationTime | getTime}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-popover ref="popoverOne" placement="top" width="300" trigger="click" title="评价详情">
              <div class="pop-content">
                <p>
                  <span>评价时间</span>
                  <span>{{scope.row.evaluationTime | getTime }}</span>
                </p>
                <p>
                  <span>星级评价</span>
                  <el-rate
                    v-model="scope.row.score"
                    disabled
                    show-score
                    text-color="#ff9900"
                    score-template="{value}"
                  ></el-rate>
                </p>
                <p>
                  <span>文字评价</span>
                  <span>{{scope.row.comments}}</span>
                </p>
              </div>
            </el-popover>
            <el-button class="handle-clear" type="text" v-popover:popoverOne>查看</el-button>
            <!-- <span v-else>暂无评价</span> -->
          </template>
        </el-table-column>
      </el-table>

      <div class="pagiNation">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5]"
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
  userDataDetail,
  userLoginDetail,
  userCimenaDetail,
  userActiveDetail,
  userEvaluationDetail
} from '@/config/getData';
export default {
  name: 'userManageDetail',
  components: {},
  data () {
    return {
      tableData: [],
      type: '', // 订单类型
      status: '', // 订单状态
      header: '',
      jsonData: {}, // 请求数据
      detailData: {}, // 全部数据
      rateStar: 3.7,
      tabPosition: '1',
      currentPage: 1,
      size: 5,
      total: 400,
      orderData: {}, // 用于展示剩余时长
      isPage: false // 分页刷新
    }
  },
  watch: {},
  created () {},
  mounted () {
    let param = JSON.parse(localStorage.getItem('detailParam'))
    this.type = param.type
    this.status = param.status
    this.orderData = param
    this.initData(param)
    this.jsonData.pageNum = this.currentPage
    this.jsonData.userId = param.userId
    this.changeTab(this.tabPosition)
  },
  methods: {
    // 初始化数据
    initData (param) {
      userDataDetail(param).then(res => {
        if (res.code === 200) {
          this.detailData = res.data
          this.detailData.cinemaTotalFee = param.cinemaTotalFee
        }
      })
    },
    // 观影明细
    // initTableOne (jsonData) {
    //   userLoginDetail(jsonData).then(res => {
    //     if (res.code === 200) {
    //       console.log(res)
    //     }
    //   })
    // },
    // 切换列表
    changeTab (e) {
      let num = Number(e)
      let requestObj
      switch (num) {
        case 1:
          requestObj = userLoginDetail
          // eslint-disable-next-line semi
          break;
        case 2:
          requestObj = userCimenaDetail
          // eslint-disable-next-line semi
          break;
        case 3:
          requestObj = userActiveDetail
          // eslint-disable-next-line semi
          break;
        case 4:
          requestObj = userEvaluationDetail
          // eslint-disable-next-line semi
          break;
        default:
          break
      }
      if (this.isPage) {
        this.jsonData.pageNum = 1
      }
      requestObj(this.jsonData).then(res => {
        if (res.code === 200) {
          // console.log(res);
          this.total = res.data.total
          this.currentPage = res.data.pageNum
          //this.size = res.data.pageSize;
          this.tableData = res.data.list
          this.isPage = true
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
      this.isPage = false
      this.jsonData.pageNum = val
      this.changeTab(this.tabPosition)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../style.scss";
.userManageDetail {
  header {
    display: flex;
    align-items: center;
    .avatar {
      margin: 0 $pad;
    }
  }
  .tab-group {
    margin: 25px auto;
    width: 400px;
    display: block;
  }
  .order-list {
    padding-left: $pad;
    width: 80%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;
    li {
      font-size: 14px;
      display: flex;
      align-items: center;
      flex: 1;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      min-width: 33%;
      max-width: 33%;
      margin: 10px 0;
      &.max {
        min-width: 100%;
      }
      .handle-clear {
        padding-left: 5px;
      }
      .avatar {
        margin: 0 5px;
      }
      .tit {
        font-family: "Times New Roman", Times, serif;
        padding-right: 10px;
      }
      .num {
        font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
          "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
        color: #6a6a6a;
      }
    }
  }
}
</style>
