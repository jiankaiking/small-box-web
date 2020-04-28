<template>
  <div>
    <el-dialog
      class="edit_dialog_preview"
      title="预览"
      :visible.sync="dialogVisible"
      @close="$emit('update:bShowPreview', false)"
    >
      <div class="page_preview">
        <img class="iphone_view" :src="require('@/assets/img/common/iphone.png')" alt />
        <h5>小映盒</h5>
        <div class="preview_content">
          <header>
            <img :src="menuData.imageUrl" class="vip-card" alt />
            <div class="header-content">
              <div class="flex-between">
                <p class="bottom-left">
                  <img :src="require('@/assets/img/white-mark.png')" alt />
                  <span class="white">使用说明</span>
                </p>
                <p class="limit">不可储值，不可退换</p>
              </div>
              <span class="title">{{menuData.title}}</span>
              <p class="bottom">
                <span class="desc grey">￥{{menuData.makingPrice}}</span>
                <span class="origin">￥{{menuData.actualPrice}}</span>
              </p>
            </div>
          </header>
          <span class="h4-tit">会员权益</span>
          <article>
            <div class="ql-snow">
              <div class="ql-editor" v-html="menuData.vipInterests"></div>
            </div>
          </article>
          <article class="art-line">
            <span class="h4-tit">适用影城</span>
            <ul>
              <li v-for="v in menuData.movieSelect" :key="v.cinemaLinkId">
                <p class="black">{{v.cinemaName}}</p>
                <p class="grey">{{v.address}}</p>
              </li>
            </ul>
          </article>
        </div>
        <div class="send-bar">
          <div class="price">
            <div class="top">
              <span class="grey">售价</span>
              <span class="white">￥{{menuData.actualPrice}}</span>
            </div>
            <div class="bottom">
              <span class="grey">开通代表我同意</span>
              <span class="blue">《会员卡协议》</span>
            </div>
          </div>
          <div class="button">立即开通</div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
export default {
  name: 'preview',
  data () {
    return {
      dialogVisible: false,
      content: ''
    }
  },
  props: {
    bShowPreview: {
      type: Boolean,
      default: false
    },
    dialogtitle: {
      type: String
    },
    menuData: {
      type: Object
    }
  },
  mounted () {},
  watch: {
    bShowPreview (newVal) {
      this.dialogVisible = this.bShowPreview
    }
  },

  methods: {
    onSubmit () {
      console.log(this.formInline)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/css/_mixin";
$row: 10px;
.ql-editor {
  padding-left: 0;
}
.page_preview {
  position: relative;
  .iphone_view {
    margin: 0 auto;
    display: block;
  }
  h5 {
    @include cl;
    top: 90px;
    color: #fff;
  }
  .flex-between {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .h4-tit {
    text-align: center;
    padding: 15px 0;
    position: relative;
    font-size: 15px;
    display: block;
    border-bottom: 1px solid #e6e6e6;
    margin: 0 -15px;
  }
  .h4-tit::after,
  .h4-tit::before {
    content: "";
    position: absolute;
    display: block;
    top: 50%;
    transform: translateY(-50%);
    width: 8%;
    height: 2px;
    background: #e6e6e6;
  }
  .h4-tit::before {
    left: 25%;
  }
  .h4-tit::after {
    right: 25%;
  }
  .send-bar {
    width: 280px;
    background: #555;
    padding: $row;
    text-align: center;
    @include cl;
    bottom: 90px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .price {
      text-align: left;
      .grey {
        color: #999;
        font-size: 12px;
      }
      .white {
        font-size: 13px;
        color: #fff;
      }
      .blue {
        color: #00b2bb;
      }
    }
    .button {
      background: #00b2bb;
      color: #fff;
      text-align: center;
      margin: -10px;
      padding: 0 10px;
      height: 60px;
      line-height: 60px;
    }
  }
  .preview_content {
    @include cl;
    top: 120px;
    width: 280px;
    padding: 0 $pad 60px $pad;
    text-align: center;
    height: 460px;
    overflow-y: auto;
    header {
      display: inline-block;
      //background-image: linear-gradient(-90deg, #4f4f5b 0%, #2a2a2d 100%);
      box-shadow: 0 2px 15px 0 #adb0b2;
      border-radius: 5px;
      width: 100%;
      position: relative;
      min-height: 100px;
      margin-top: $row;
      padding: $row;
      .vip-card {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        z-index: -1;
      }
      .title {
        color: #fff;
        display: block;
        text-align: center;
        white-space: nowrap;
        width: 100%;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
      .bottom-left {
        font-size: 12px;
        img {
          width: 15px;
          height: 15px;
          display: inline-block;
          vertical-align: middle;
          margin-right: 2px;
        }
        .white {
          color: #fff;
          display: inline-block;
          vertical-align: middle;
        }
      }
      .limit {
        color: #fff;
        opacity: 0.6;
        font-size: 12px;
      }
      .bottom {
        text-align: right;
        color: #f7f7f7;
        position: absolute;
        bottom: 10%;
        right: 5%;

        .desc {
          text-decoration: line-through;
          font-size: 12px;
        }
      }
    }
    article {
      padding: $row 0;
      margin: $row 0;
      &.art-line {
        border: 0;
        border-top: 15px solid #f7f7f7;
        margin: 0 -15px;
      }
      ul {
        padding-top: $row;

        padding-left: 5%;
        li {
          .black {
            color: #222;
            font-size: 14px;
          }
          text-align: left;
          line-height: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
