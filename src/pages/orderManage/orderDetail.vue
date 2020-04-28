<template>
  <div class="orderDetail">
    <div class="page-view">
      <h5 class="h5-title">
        <i></i>
        <span>订单详情</span>
      </h5>
      <ul class="order-list">
        <li>
          <span class="tit">订单编号:</span>
          <span class="num">{{orderData.orderNo==null?'暂无':orderData.orderNo}}</span>
        </li>
        <li>
          <span class="tit">支付时间:</span>
          <span class="num" v-if="orderData.payTime!=null">{{orderData.payTime|getTime}}</span>
          <span class="num" v-else>暂无</span>
        </li>
        <li>
          <span class="tit">订单状态:</span>
          <span class="num" v-if="type==0">{{orderData.orderStatus|getOrderFoodType}}</span>
          <span class="num" v-if="type==1">{{orderData.orderStatus|getOrderCinemaType}}</span>
          <span class="num" v-if="type==2">{{orderData.orderStatus|getOrderVipType}}</span>
        </li>
        <li>
          <span class="tit">下单时间:</span>
          <span class="num">{{orderData.generateOrderTime |getTime}}</span>
        </li>
        <li>
          <span class="tit">支付方式:</span>
          <span class="num">微信支付</span>
        </li>
        <li v-if="type==1&&orderData.takeTicketsStatus!=null">
          <span class="tit">出票情况:</span>
          <span class="num">{{orderData.takeTicketsStatus|getOrderIssued}}</span>
          <el-popover ref="popoverOne" placement="top" width="300" trigger="click" title="退款详情">
            <div class="pop-content">
              <p>
                <span>退款时间</span>
                <span>{{reason.createTime|getTime}}</span>
              </p>
              <p>
                <span>退款原因</span>
                <span>{{reason.refundReason}}</span>
              </p>
            </div>
          </el-popover>
          <el-button
            class="handle-clear"
            type="text"
            v-popover:popoverOne
            v-if="orderData.takeTicketsStatus==3"
          >详情</el-button>
        </li>
        <li class="max">
          <span class="tit">商品类型:</span>
          <span class="num">{{type|getOrderType}}</span>
        </li>
      </ul>
      <h5 class="h5-title">
        <i></i>
        <span>微信支付信息</span>
      </h5>
      <ul class="order-list">
        <li>
          <span class="tit">交易单号:</span>
          <span class="num">{{orderData.wxTransactionId==null?'暂无':orderData.wxTransactionId}}</span>
        </li>
        <li>
          <span class="tit">商户单号:</span>
          <span class="num">{{orderData.orderNo==null?'暂无':orderData.orderNo}}</span>
        </li>
      </ul>
      <h5 class="h5-title">
        <i></i>
        <span>买家信息</span>
      </h5>
      <ul class="order-list">
        <li>
          <span class="tit">买家昵称:</span>
          <el-avatar :size="50" src class="avatar">
            <img :src="orderData.headImage" />
          </el-avatar>
          <span class="num">{{orderData.nickName}}</span>
        </li>
        <li>
          <span class="tit">联系电话:</span>
          <span class="num">{{orderData.mobile}}</span>
        </li>
      </ul>
      <!-- 会员卡 -->
      <el-table :data="tableData" style="width: 100%" border v-if="type==2">
        <el-table-column prop="goodsName" label="商品名称">
          <template slot-scope="scope">
            <span>{{scope.row.goodsName}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="商品类型">
          <span>会员卡</span>
        </el-table-column>
        <el-table-column prop="totalFee" label="价格(元)"></el-table-column>
        <el-table-column prop="address" label="数量">
          <span>1</span>
        </el-table-column>
        <el-table-column prop="actualPay" label="实付(元)">
          <template slot-scope="scope">
            <span>{{scope.row.actualPay}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="periodValidity" label="有效期至">
          <template slot-scope="scope">
            <span>{{scope.row.periodValidity|getDateTime}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="vipCardNo" label="会员卡卡号">
          <template slot-scope="scope">
            <span>{{scope.row.vipCardNo}}</span>
          </template>
        </el-table-column>
      </el-table>
      <!-- 电影票已付款 -->
      <el-table :data="tableData" style="width: 100%" border v-if="type==1&&status==4">
        <el-table-column prop="goodsName" label="商品名称">
          <template slot-scope="scope">
            <span>{{scope.row.goodsName}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="商品类型">
          <span>电影票</span>
        </el-table-column>
        <el-table-column prop="totalFee" label="价格(元)"></el-table-column>
        <el-table-column prop="count" label="数量"></el-table-column>
        <el-table-column prop="actualPay" label="实付(元)"></el-table-column>
        <el-table-column prop="lowestPrice" label="最低保护价(元)">
          <template slot-scope="scope">
            <span>{{scope.row.lowestPrice}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="电影院">
          <span>小映盒</span>
        </el-table-column>
        <el-table-column prop="showDateTime" label="影片放映时间">
          <template slot-scope="scope">
            <span>{{scope.row.showDateTime}}</span>
          </template>
        </el-table-column>
      </el-table>
      <!-- 电影票另外四种支付状态 -->
      <el-table :data="tableData" style="width: 100%" border v-if="type==1&&status!=4">
        <el-table-column prop="goodsName" label="商品名称">
          <template slot-scope="scope">
            <span>{{scope.row.goodsName}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="totalFee" label="价格(元)"></el-table-column>
        <el-table-column prop="count" label="数量"></el-table-column>
        <el-table-column prop="actualPay" label="实付(元)"></el-table-column>
        <el-table-column prop="lowestPrice" label="最低保护价(元)">
          <template slot-scope="scope">
            <span>{{scope.row.lowestPrice}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="电影院">
          <span>小映盒</span>
        </el-table-column>
        <el-table-column prop="showDateTime" label="影片放映时间">
          <template slot-scope="scope">
            <span>{{scope.row.showDateTime}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="hallName" label="影片放映厅">
          <template slot-scope="scope">
            <span>{{scope.row.hallName}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="seatCodeListArray" label="座位">
          <template slot-scope="scope">
            <span class="seatNum" v-for="v in scope.row.seatCodeListArray" :key="v">
              {{v|getMovieSeat}}
              <i>,</i>
            </span>
          </template>
        </el-table-column>
      </el-table>
      <!-- 小食 -->
      <el-table :data="tableData" style="width: 100%" border v-if="type==0">
        <el-table-column prop="date" label="商品名称">
          <template slot-scope="scope">
            <span v-for="v in scope.row.goodsNames" :key="v">{{v}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="商品类型">
          <span>小食</span>
        </el-table-column>
        <el-table-column prop="price" label="价格(元)"></el-table-column>
        <el-table-column prop="count" label="数量"></el-table-column>
        <el-table-column prop="actualPay" label="实付(元)">
          <template slot-scope="scope">
            <span v-if="orderData.orderStatus==1">--</span>
            <span v-else>{{scope.row.actualPay}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="取餐方式">
          <template slot-scope="scope">
            <span v-if="orderData.orderStatus==1">--</span>
            <span v-else-if="scope.row.takeFoodVO.takeWayType==0">柜台自取</span>
            <p v-else>
              <span style="display:block">送至座位</span>
              <span class="grey">
                {{scope.row.takeFoodVO.hallName}}
                <span
                  v-for="v in scope.row.takeFoodVO.seatListArray"
                  :key="v"
                >{{v|getMovieSeat}}</span>
                <span>{{scope.row.takeFoodVO.sendFoodTime|getTime}}</span>
              </span>
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="取餐时间">
          <template slot-scope="scope">
            <span v-if="orderData.orderStatus==1">--</span>
            <el-button
              type="text"
              v-else-if="scope.row.deliveryTime==null"
              @click="handleSure(scope.row)"
            >确认送达</el-button>
            <span v-else>{{scope.row.deliveryTime|getTime}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import {
  vipDataDetail,
  foodDataDetail,
  cinemaDataDetail,
  deliveryFood,
  oneRefundReason
} from "@/config/getData";
export default {
  name: "orderDetail",
  components: {},
  data() {
    return {
      tableData: [],
      type: "", // 订单类型
      status: "", // 订单状态
      rowId: "", // 订单id
      orderData: {}, // 订单数据
      reason: {} // 退款原因
    };
  },
  watch: {},
  created() {},
  mounted() {
    this.type = this.$route.query.type;
    this.status = this.$route.query.status;
    this.rowId = this.$route.query.id;
    this.initData();
  },
  methods: {
    initData() {
      let requestObj;
      this.type = parseInt(this.type);
      if (this.type === 0) {
        // 小食
        requestObj = foodDataDetail;
      } else if (this.type === 1) {
        // 电影票
        requestObj = cinemaDataDetail;
      } else if (this.type === 2) {
        // 会员卡
        requestObj = vipDataDetail;
      }
      requestObj(this.rowId).then(res => {
        if (res.code === 200) {
          this.orderData = res.data;
          if (this.type === 0) {
            this.tableData = res.data.goodsOrderDetailList;
          } else if (this.type === 1) {
            this.tableData = res.data.cinemaOrderDetailList;
            this.getReason(res.data);
          } else if (this.type === 2) {
            this.tableData = res.data.vipOrderDetails;
          }
        }
      });
    },
    // 获取详情 退款原因
    getReason(data) {
      oneRefundReason(data.orderNo).then(res => {
        if (res.code === 200) {
          this.reason = res.data;
        }
      });
    },
    // 确认送达
    handleSure(row) {
      let param = [row.id];
      deliveryFood(param).then(res => {
        if (res.code === 200) {
          this.$success("商品已确认送达");
          this.initData();
        } else {
          this.$error("操作失败");
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../style.scss";
.orderDetail {
  .page-view {
    padding: 20px;
  }
  .seatNum {
    &:last-child {
      i {
        display: none;
      }
    }
  }
  .order-list {
    padding-left: $pad;
    width: 100%;
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
      min-width: 33.333%;
      max-width: 33.333%;
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
      }
    }
  }
}
</style>
