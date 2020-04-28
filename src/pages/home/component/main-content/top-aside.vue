<template>
  <div>
    <aside class="aside__top">
      <div class="aside__top--right">
        <div class="quit-system">
          <div class="head">
            <span class="el-icon-user-solid icon"></span>
            <span class="user">{{userInfo.name}}</span>
            <span class="el-icon-caret-bottom icon"></span>
          </div>
          <div class="user_item">
            <div class="user_edit">
              <!-- <span @click="changePassWord">
                <img src="@/assets/img/tuichudenglu.png" alt />修改密码
              </span>-->
              <span @click="loginOut">
                <img src="@/assets/img/zhuye.png" alt />退出登录
              </span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  </div>
</template>

<script>
// import { mapState } from 'vuex';
export default {
  data () {
    return {
      userData: '',
      userHead: '',
      userInfo: { name: 'admin' }
    }
  },
  // computed: {
  //   ...mapState(['isSidebarNavCollapse', 'crumbList'])
  // },
  mounted () {
    // this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
  },
  methods: {
    toggleNavCollapse () {
      this.$store.commit('toggleNavCollapse')
    },
    // 退出登录
    loginOut () {
      this.$store.commit('LOGIN_OUT')
      this.$router.push('/Login')
      /* 防止切换角色时addRoutes重复添加路由导致出现警告 */
      // window.location.reload();
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../../assets/css/_mixin";
.aside__top .aside__top--right > div.quit-system:hover .user_item {
  display: block;
}
.aside__top {
  border-bottom: 1px solid #e5e5e5;
  height: 50px;
  line-height: 50px;
  position: fixed;
  left: 160px;
  top: 0;
  right: 0;
  background: #fff;
  z-index: 1000;
  transition: left 0.25s;
  @include fj();
  .toggleNavCollapse {
    display: inline-block;
    margin-left: 8px;
    padding: 0 10px;
    @include sc(26px, #ccc);
    vertical-align: middle;
    cursor: pointer;
    transition: all 0.5s;
    &.active {
      transform: rotate(90deg);
    }
  }
  .el-breadcrumb {
    flex: 1;
    line-height: 50px;
  }
  .aside__top--left {
    @include wh(160px, 50px);
    background-color: $blue;
    text-align: center;
    color: #fff;
    img {
      width: 35px;
      vertical-align: middle;
    }
  }
  .aside__top--right {
    position: absolute;
    right: 10px;
    top: -1px;
    bottom: 0px;
    @include sc(14px, $fc);
    > div {
      position: relative;
      display: inline-block;
      text-align: center;
      vertical-align: middle;
      margin-left: 10px;
      padding: 0 15px;
      cursor: pointer;
      &:hover::after {
        transform-origin: 0 0;
        transform: scaleX(1);
      }
      &:first-child:before {
        border: none;
      }
      &::after {
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 2px;
        background: $blue;
        transform: scaleX(0);
        transform-origin: right 0;
        transition: transform 0.5s;
      }
      &::before {
        content: "";
        position: absolute;
        height: 20px;
        top: 50%;
        left: -8px;
        margin-top: -10px;
        border-left: 1px solid #ccc;
      }
      &.email {
        position: relative;
        i {
          position: absolute;
          right: 2px;
          top: 2px;
          border-radius: 20px;
          background: red;
          color: #fff;
          text-align: center;
          font-size: 12px;
          line-height: 1.5;
          min-width: 20px;
          min-height: 20px;
        }
      }
      &.quit-system {
        position: relative;
        margin-right: 20px;
        .head {
          height: 50px;
          vertical-align: middle;
          display: flex;
          align-items: center;
          min-width: 140px;
          span {
            display: inline-block;
            &.user {
              white-space: nowrap;
              text-overflow: ellipsis;
              flex: 1;
              margin: 0 10px;
            }
          }
          .icon {
            color: $blue;
            font-size: 20px;
          }
        }
        .user_item {
          display: none;
          min-width: 140px;
          transition: all 0.25s;
          @include allcover;
          background: $bg;
          line-height: 40px;
          width: 100%;
          top: 48px;
          padding: 10px 0;
          border: 1px solid #ebebeb;
          box-shadow: 0 2px 15px 0 #eceef0;
          @include borderRadius(3px);
          .head_img {
            display: block;
            margin: 8px auto;
            width: 40px;
            height: 40px;
          }
          .user_name {
            color: $mainColor;
            padding-bottom: 20px;
          }
          .user_edit {
            span {
              display: block;
              @include hl(40px, 40px);
              text-align: left;
              font-size: 12px;
              margin: 0 10px;
              padding: 0 5px;
              &:hover {
                background: #f1f7ff;
              }
              img {
                width: 13px;
                vertical-align: middle;
                display: inline-block;
                margin-right: 5px;
                margin-bottom: 3px;
              }
            }
          }
        }
      }
      &.user-msg {
        .user-img {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          vertical-align: middle;
        }
        .user-name {
          color: #758eb5;
          padding: 0 4px;
        }
      }
      .iconfont {
        position: relative;
        font-size: 24px;
        color: #758eb5;
      }
    }
  }
}
.breadcrumb-enter,
.breadcrumb-leave-active {
  opacity: 0;
  transform: translateX(20px);
}

.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all 0.6s;
}

.breadcrumb-leave-active {
  position: absolute;
}
.navCollapsed .aside__top {
  left: 64px !important;
}
</style>
