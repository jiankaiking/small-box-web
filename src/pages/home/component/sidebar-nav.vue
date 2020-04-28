<template>
  <el-menu
    :collapse="isSidebarNavCollapse"
    :default-active="currentMenu"
    :unique-opened="true"
    @select="handleSeclect"
    :router="true"
  >
    <div class="nav__top" @click="toggleNav">
      <img :src="require('@/assets/img/basicprofile.png')" alt />
      <span v-if="!isSidebarNavCollapse">小映盒管理后台</span>
    </div> 
    <template v-for="(v,index) in sidebarMenu">
      <el-submenu :index="v.name" v-if="v.isTitle" :key="index">
        <template slot="title">
          <i :class="v.meta.icon"></i>
          <span>{{v.meta.title}}</span>
        </template>
        <el-menu-item-group v-for="(it,index) in v.children" :key="index">
          <el-menu-item :key="it.path" :index="it.path" v-if="it.meta.requireAuth">
            <span slot="title">{{v.meta.title}}</span>
          </el-menu-item>
        </el-menu-item-group> 
      </el-submenu>
      <el-menu-item @click="findPage(v.name)" :key="index" :index="v.name" v-else>
        <i :class="v.meta.icon"></i>
        <span slot="title">{{v.meta.title}}</span>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
// import DynamicMenu from '@/components/dynamic-menu';
export default {
  components: {},
  data () {
    return {
      isCollapse: true,
      screenWidth: document.body.clientWidth,
      menuList: []
    }
  },
  computed: {
    ...mapState(['isSidebarNavCollapse']),
    ...mapState('permission', ['sidebarMenu', 'currentMenu'])
  },
  beforeMount () {
    // this.sidebarMenu.splice(0,1)
  },
  mounted () {
    const that = this
    // 監聽側邊欄
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth
        that.screenWidth = window.screenWidth
      })()
    };
    if (that.screenWidth < 1000) {
      that.$store.commit('onlyCollapse', true)
    } else { 
      that.$store.commit('onlyCollapse', false)
    }
  },
  watch: {
    currentMenu (val) {
      // console.log(val)
    },
    screenWidth (val) {
      // 为了避免频繁触发resize函数导致页面卡顿，使用定时器
      if (!this.timer) {
        // 一旦监听到的screenWidth值改变，就将其重新赋给data里的screenWidth
        this.screenWidth = val
        this.timer = true
        let that = this
        setTimeout(function () {
          // 打印screenWidth变化的值
          if (that.screenWidth < 1000) {
            that.$store.commit('onlyCollapse', true)
          } else {
            that.$store.commit('onlyCollapse', false)
          }
          that.timer = false
        }, 400)
      }
    }
  },
  methods: {
    ...mapMutations(['clearParam']),
    toggleNav () {
      this.$store.commit('toggleNavCollapse')
    }, // 切換側邊欄
    handleSeclect (e) {},
    // 页面跳转
    findPage (e) {
      // console.log(e)
      // this.$store.commit('permission/SET_CURRENT_MENU', e)
      this.clearParam()
    }
  }
}
</script>
<style scoped lang="scss">
@import "../../../assets/css/_mixin";
.toggle {
  @include wh(160px, 40px);
  background: #f1f7ff;
  line-height: 40px;
  text-align: center;
  color: $blue;
  font-size: 20px;
}
.nav__top {
  width: 160px;
  height: 50px;
  line-height: 50px;
  background-color: $blue;
  text-align: center;
  color: #fff;
  transition: all 300ms;
  font-size: 15px;
  img {
    width: 25px;
    height: 25px;
    display: inline-block;
    vertical-align: middle;
    border-radius: 100%;
  }
}
</style>
