<template>
  <div>
    <Crumb />
    <router-view class="content"></router-view>
  </div>
</template>

<script>
import Crumb from "./crumb";
export default {
  components: {
    Crumb
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.content {
  height: 100%;
  overflow: hidden;
}
</style>
