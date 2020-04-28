<template>
  <div class="page-view">
    <bannerManage v-if="crumbIndex==0" />
    <cinemaManage v-if="crumbIndex==1" />
    <movieManage v-if="crumbIndex==2" />
    <foodManage v-if="crumbIndex==3" />
  </div>
</template>

<script>
import bannerManage from './components/bannerManage';
import cinemaManage from './components/cinemaManage';
import movieManage from './components/movieManage';
import foodManage from './components/foodManage';
import { mapState } from 'vuex';
export default {
  name: 'contentManage',
  components: { bannerManage, cinemaManage, movieManage, foodManage },
  data () {
    return {
      pageStyle: false
    }
  },
  computed: {
    ...mapState(['crumbIndex'])
  },
  mounted () {},
  methods: {
    handleOver () {
      // this.$refs.thisContent.style.right = '50px';
    },
    handleLeave () {
      // this.$refs.thisContent.style.right = '-290px';
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../style";
.main {
  margin-top: 50px;
  .main_card {
    padding: 10px;
  }
}
</style>
