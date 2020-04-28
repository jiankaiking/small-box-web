<template>
  <div class="flutter">
    <el-page-header
      @back="goBack"
      class="card-panel"
      :class="$route.meta.isTitle==true?'dispear':''"
    >
      <template slot="title">
        <div class="title">
          <span>返回</span>
          <span class="img">
            <img src="@/assets/img/xuxian.png" alt />
          </span>
        </div>
      </template>
      <template slot="content">
        <div class="flex-box">
          <span v-for="item in crumbList" :key="item.name">
            <span class="text">{{item.meta.title}}</span>
          </span>
          <span class="img" v-if="$route.meta.isTitle">
            <img src="@/assets/img/xuxian.png" alt />
          </span>
        </div>
      </template>
    </el-page-header>
    <div class="main" v-if="$route.name=='contentManage'">
      <section
        v-for="item in dataList"
        :key="item.id"
        @click="changeTab(item.id)"
        :class="crumbIndex==item.id?'active':''"
      >
        <span>{{item.name}}</span>
      </section>
    </div>
    <div class="main" v-if="$route.name=='commodityManage'">
      <section v-for="item in comList" :key="item.id" class="active">
        <span>{{item.name}}</span>
      </section>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
export default {
  components: {},
  data () {
    return {
      crumbName: '',
      dataList: [
        { name: '轮播图', id: '0' },
        { name: '影院信息', id: '1' },
        { name: '影片信息', id: '2' },
        { name: '小食信息', id: '3' }
      ],
      comList: [{ name: '会员卡', id: '0' }]
    }
  },
  computed: {
    ...mapState(['crumbList', 'crumbIndex'])
  },
  watch: {},
  mounted () {},
  methods: {
    ...mapMutations(['setCrumbIndex']),
    changeTab (e) {
      this.setCrumbIndex(e)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../../assets/css/_mixin";
.flutter {
  background: #fff;
  padding: 15px 20px;
  border-radius: 3px;
  margin-bottom: 10px;
  position: relative;
  display: flex;
  align-items: center;
  &::before {
    content: "";
    @include wh(100%, 5px);
    @include allcover();
    display: block;
    background: $blue;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
  }
  .card-panel {
    display: flex;
    align-items: center;
    .flex-box,
    .title {
      @extend .card-panel;
    }
    .text {
      font-size: 15px;
      display: block;
      margin-right: 30px;
    }
    .img {
      display: inline-block;
      transform: rotate(90deg);
      width: 50px;
      height: 50px;
      img {
        width: 100%;
      }
    }
  }
  .main {
    display: flex;
    align-items: center;
    margin-left: 50px;
    section {
      width: 100px;
      text-align: center;
      position: relative;
      padding: 15px 0;
      transition: all 0.3s;
      font-size: 15px;
      &.active {
        &::before {
          content: "";
          @include wh(80%, 3px);
          background: $blue;
          display: block;
          position: absolute;
          bottom: 0;
          left: 10%;
        }
      }
      span {
        cursor: pointer;
      }
    }
  }
}
</style>
