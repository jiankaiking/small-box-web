<template>
  <div class="orderManage">
    <div class="card-title flex-box">
      <h5 class="h5-title">销售额统计</h5>
      <div class="con-list">
        <div class="con-box">
          <!-- <img :src="require('@/assets/img/order_1.png')" alt /> -->
          <span class="el-icon-tickets con-icon"></span>
          <div class="con-title">
            <span class="text">今日</span>
            <span class="text-bold">{{orderCount.totalFeeOfToday}}</span>
            <span>元</span>
          </div>
        </div>
        <div class="con-box">
          <!-- <img :src="require('@/assets/img/order_2.png')" alt /> -->
          <span class="el-icon-tickets con-icon"></span>
          <div class="con-title">
            <span class="text">近7日</span>
            <span class="text-bold">{{orderCount.totalFeeOf7Day}}</span>
            <span>元</span>
          </div>
        </div>
        <div class="con-box">
          <!-- <img :src="require('@/assets/img/order_3.png')" alt /> -->
          <span class="el-icon-tickets con-icon"></span>
          <div class="con-title">
            <span class="text">近30日</span>
            <span class="text-bold">{{orderCount.totalFeeOf30Day}}</span>
            <span>元</span>
          </div>
        </div>
      </div>
    </div>
    <div class="card-title">
      <el-form
        :inline="true"
        :model="formInline"
        ref="formInline"
        class="demo-form-inline form"
        size="medium"
      >
        <el-form-item label="买家昵称" prop="nickName">
          <el-input v-model="formInline.nickName" placeholder="请输入买家昵称"></el-input>
        </el-form-item>
        <el-form-item label="订单状态" class="middle" prop="orderStatus">
          <el-select v-model="formInline.orderStatus" placeholder="请选择">
            <el-option
              v-for="(item,index) in orderStatusData"
              :key="index"
              :label="item.name"
              :value="item.code"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="下单时间" prop="dateTime">
          <el-date-picker
            v-model="formInline.dateTime"
            type="daterange"
            value-format="yyyy-MM-dd HH:mm:ss"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="商品名称" prop="goodsName">
          <el-input v-model="formInline.goodsName" placeholder="请输入商品名称"></el-input>
        </el-form-item>
        <el-form-item label="商品类型" class="middle">
          <el-select
            v-model="formInline.commodityType"
            @change="changeCommodityType"
            placeholder="请选择"
          >
            <el-option
              v-for="(item,index) in classItem"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button @click="resetForm('formInline')">重置</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="searchInfo" type="primary">搜索</el-button>
        </el-form-item>
        <el-form-item class="addNew">
          <el-button type="primary" @click="handleDownloadExcel">导出数据</el-button>
        </el-form-item>
        <el-form-item class="addNew">
          <el-button
            type="primary"
            @click="handleBatchSend"
            :disabled="multilSelection.length<=0"
          >批量送达</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="page-view">
      <el-table
        :data="tableData"
        style="width: 100%"
        border
        @selection-change="handleSelectionChange"
        v-show="formInline.commodityType!=1"
      >
        <el-table-column type="selection" width="55" v-if="formInline.commodityType==0"></el-table-column>
        <el-table-column prop="orderNo" label="订单编号" width="200"></el-table-column>
        <el-table-column prop="goodsName" label="商品名称">
          <template slot-scope="scope">
            <span v-if="formInline.commodityType==0">{{scope.row.goodsName}}</span>
            <span v-if="formInline.commodityType==1">{{scope.row.cinemaGoodsName}}</span>
            <span v-if="formInline.commodityType==2">{{scope.row.tittle}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="totalFee" label="价格(元)"></el-table-column>
        <el-table-column prop="actualPay" label="实付(元)"></el-table-column>
        <el-table-column prop="goodsType" label="商品类型">
          <template>
            <span v-if="formInline.commodityType==0">小食</span>
            <span v-if="formInline.commodityType==1">电影票</span>
            <span v-if="formInline.commodityType==2">会员卡</span>
          </template>
        </el-table-column>
        <el-table-column prop="nickName" label="买家昵称"></el-table-column>
        <el-table-column prop="generateOrderTime" label="下单时间">
          <template slot-scope="scope">
            <span>{{scope.row.generateOrderTime|getTime}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="shop" label="消费门店">
          <template>
            <span>小映盒</span>
          </template>
        </el-table-column>
        <el-table-column prop="orderStatus" label="订单状态">
          <template slot-scope="scope">
            <span v-if="formInline.commodityType==0">{{scope.row.orderStatus|getOrderFoodType}}</span>
            <span v-if="formInline.commodityType==1">{{scope.row.orderStatus|getOrderCinemaType}}</span>
            <span v-if="formInline.commodityType==2">{{scope.row.orderStatus|getOrderVipType}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button
              type="text"
              @click="go('/orderDetail?id='+scope.row.id+'&type='+formInline.commodityType+'&status='+scope.row.orderStatus)"
            >详情</el-button>
            <div v-if="formInline.commodityType==0&&scope.row.orderStatus!=1">
              <el-popover
                placement="top"
                width="160"
                v-if="scope.row.isDelivery==0"
                v-model="scope.row.state"
              >
                <p style="padding-bottom:10px">确认送达该商品？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="scope.row.state=false">取消</el-button>
                  <el-button type="primary" size="mini" @click="handleSure(scope.row)">确定</el-button>
                </div>
                <el-button slot="reference" type="text">确认送达</el-button>
              </el-popover>
              <el-button v-else type="text" :disabled="true">确认送达</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!-- 电影票 -->
      <el-table :data="tableData" style="width: 100%" border v-show="formInline.commodityType==1">
        <el-table-column prop="orderNo" label="订单编号" width="200"></el-table-column>
        <el-table-column prop="goodsName" label="商品名称">
          <template slot-scope="scope">
            <span>{{scope.row.cinemaGoodsName}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="totalFee" label="价格(元)"></el-table-column>
        <el-table-column prop="actualPay" label="实付(元)"></el-table-column>
        <el-table-column prop="lowestPrice" label="最低保护价(元)">
          <template slot-scope="scope">
            <span>{{scope.row.lowestPrice}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="goodsType" label="商品类型">
          <template>
            <span>电影票</span>
          </template>
        </el-table-column>
        <el-table-column prop="nickName" label="买家昵称"></el-table-column>
        <el-table-column prop="generateOrderTime" label="下单时间">
          <template slot-scope="scope">
            <span>{{scope.row.generateOrderTime|getTime}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="shop" label="消费门店">
          <template>
            <span>小映盒</span>
          </template>
        </el-table-column>
        <el-table-column prop="orderStatus" label="订单状态">
          <template slot-scope="scope">
            <span>{{scope.row.orderStatus|getOrderCinemaType}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button
              type="text"
              @click="go('/orderDetail?id='+scope.row.id+'&type='+formInline.commodityType+'&status='+scope.row.orderStatus)"
            >详情</el-button>
            <div v-if="formInline.commodityType==0&&scope.row.orderStatus!=1">
              <el-popover
                placement="top"
                width="160"
                v-if="scope.row.isDelivery==0"
                v-model="scope.row.state"
              >
                <p style="padding-bottom:10px">确认送达该商品？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="scope.row.state=false">取消</el-button>
                  <el-button type="primary" size="mini" @click="handleSure(scope.row)">确定</el-button>
                </div>
                <el-button slot="reference" type="text">确认送达</el-button>
              </el-popover>
              <el-button v-else type="text" :disabled="true">确认送达</el-button>
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
  </div>
</template>

<script>
import {
  orderDataCount,
  orderFoodList,
  orderCinemaList,
  orderVipList,
  deliveryFood,
  exportOrderList
} from "@/config/getData";
import { openDownloadDialog, sheet2blob } from "@/config/downDialog";
import XLSX from "xlsx";
import { constant } from "@/filters/filters";
import { mapState, mapMutations } from "vuex";
export default {
  name: "orderManage",
  components: {},
  data() {
    return {
      formInline: {
        nickName: "",
        orderStatus: "",
        goodsName: "",
        commodityType: 0, // 0为小食订单 1为电影订单 2为会员卡订单
        dateTime: ""
      },
      classItem: [
        { label: "小食", value: 0 },
        { label: "电影票", value: 1 },
        { label: "会员卡", value: 2 }
      ],
      orderStatusData: [],
      tableData: [],
      orderCount: "",
      multilSelection: [],
      currentPage: 1,
      size: 10,
      total: 400
    };
  },
  watch: {},
  created() {},
  computed: {
    ...mapState(["getParam"])
  },
  mounted() {
    this.initOrderCount();
    this.initTableData();
  },
  methods: {
    ...mapMutations(["setParam", "clearParam"]),
    // 订单统计
    initOrderCount() {
      orderDataCount().then(res => {
        if (res.code === 200) {
          this.orderCount = res.data;
        }
      });
    },
    // 订单状态值
    orderState() {
      switch (this.formInline.commodityType) {
        case 0:
          this.orderStatusData = [
            {
              code: 1,
              name: "待付款",
              state: true
            },
            {
              code: 3,
              name: "已付款",
              state: false
            }
          ];
          // eslint-disable-next-line semi
          break;
        case 1:
          this.orderStatusData = constant.vipCinema;
          // eslint-disable-next-line semi
          break;
        case 2:
          this.orderStatusData = constant.vipCard;
          // eslint-disable-next-line semi
          break;
        default:
          break;
      }
    },
    // 订单分类
    orderType() {
      switch (this.formInline.commodityType) {
        case 0:
          return orderFoodList;
        case 1:
          return orderCinemaList;
        case 2:
          return orderVipList;
        default:
          break;
      }
    },
    // 初始化表单数据
    initTableData() {
      let requestObj;
      let param = {};
      if (this.getParam === null) {
        // 为空时默认展示
        param = this.formInline;
        param.pageNum = this.currentPage;
      } else {
        // 记录查询数据并回显
        param = this.getParam;
        this.formInline = param;
        this.formInline.commodityType = param.commodityType;
      }
      // 订单分类
      requestObj = this.orderType();
      // console.log(param)
      this.setParam(param);
      this.orderState(); // 筛选字典
      requestObj(param).then(res => {
        // console.log(res)
        if (res.code === 200) {
          this.tableData = res.data.list;
          this.currentPage = res.data.pageNum;
          this.total = res.data.total;
        }
      });
    },
    // 切换商品类型
    changeCommodityType() {
      this.currentPage = 1;
      this.resetForm("formInline");
      this.clearParam();
      this.initTableData();
      this.orderState();
    },
    // 分页
    handleSizeChange(val) {
      this.size = val;
      this.initTableData();
    },
    // 分页
    handleCurrentChange(val) {
      this.currentPage = val;
      let param = this.getParam;
      param.pageNum = val;
      this.setParam(param);
      this.initTableData();
    },
    // 搜索
    searchInfo() {
      if (this.formInline.dateTime) {
        this.formInline.generateOrderTimeStart = this.formInline.dateTime[0];
        this.formInline.generateOrderTimeEnd = this.formInline.dateTime[1];
      }
      this.clearParam();
      this.initTableData();
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.initTableData();
      this.clearParam();
    },
    // 导出数据
    handleDownloadExcel() {
      let param = this.formInline;
      param.goodsType = param.commodityType;
      let message;
      if (param.commodityType === 0) {
        // eslint-disable-next-line semi
        message = "小食订单";
      } else if (param.commodityType === 1) {
        // eslint-disable-next-line semi
        message = "电影订单";
      } else if (param.commodityType === 2) {
        // eslint-disable-next-line semi
        message = "会员卡订单";
      }
      // delete param.commodityType
      // delete param.dateTime
      exportOrderList(param).then(res => {
        var sheet = XLSX.utils.aoa_to_sheet(res.data);
        openDownloadDialog(sheet2blob(sheet), message + ".xlsx");
      });
    },
    // 禁用非小食订单
    selectable(row, index) {
      if (row.state === true) {
        return true;
      } else {
        return false;
      }
    },
    // 选择
    handleSelectionChange(e) {
      this.multilSelection = e;
    },
    // 批量送达
    handleBatchSend() {
      let param = [];
      this.multilSelection.map(item => {
        param.push(item.id);
      });
      deliveryFood(param).then(res => {
        if (res.code === 200) {
          this.$success("商品已确认送达");
          this.initTableData();
          this.multilSelection = [];
        } else {
          this.$error("操作失败");
          this.multilSelection = [];
        }
      });
    },
    // 单个订单确认送达
    handleSure(row) {
      this.multilSelection = [row];
      this.handleBatchSend();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../style.scss";
.orderManage {
  .h5-title {
    font-size: 15px;
    padding-left: 35px;
  }
  .con-list {
    display: flex;
    align-items: center;
    color: #fff;
    width: 80%;
    margin: 15px auto;
    .con-box {
      flex: 1;
      border-radius: 5px;
      padding: 10px 20px;
      display: flex;
      align-items: center;
      margin-right: 20px;
      &:nth-child(1) {
        background: #2593fc;
      }
      &:nth-child(2) {
        background: #3dc369;
      }
      &:nth-child(3) {
        background: #fb8367;
      }
      .con-icon {
        font-size: 32px;
        color: #fff;
        font-weight: bold;
      }
      img {
        width: 30px;
      }
      .con-title {
        margin-left: 10px;
        .text {
          display: block;
        }
        .text-bold {
          font-size: 22px;
        }
      }
    }
  }
}
</style>
