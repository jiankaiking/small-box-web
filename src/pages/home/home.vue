<template>
  <div class="main" :class="{navCollapsed:isSidebarNavCollapse}">
    <sidebarNav class="sidebar" />
    <mainContent class="main_card" />
  </div>
</template>

<script>
import sidebarNav from './component/sidebar-nav';
import mainContent from './component/main-content/index';
import { mapState } from 'vuex';
export default {
  data () {
    return {
      pageStyle: false
    }
  },
  computed: {
    ...mapState(['isSidebarNavCollapse'])
  },
  components: {
    sidebarNav,
    mainContent
  },
  methods: {
    handleOver () {
      this.$refs.thisContent.style.right = '50px';
    },
    handleLeave () {
      this.$refs.thisContent.style.right = '-290px';
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  margin-top: 50px;
  .main_card {
    padding: 10px;
  }
}
</style>
