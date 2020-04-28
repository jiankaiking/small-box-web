const mixin = {
  methods: {
    go (path) {
      this.$router.push(path)
    },
    goBack () {
      this.$router.go(-1)
    },
    $error (message) {
      this.$message({
        showClose: true,
        message: message,
        type: 'error'
      })
    },
    $warning (message) {
      this.$message({
        showClose: true,
        message: message,
        type: 'warning'
      })
    },
    $success (message) {
      this.$message({
        showClose: true,
        message: message,
        type: 'success'
      })
    }
  }
}
export default mixin
