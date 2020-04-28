<template>
  <div class="movieManage">
    <div class="card-title clearfix">
      <el-button type="primary" class="f_right" @click="handleFresh" title="每天十二点自动更新">更新</el-button>
    </div>
    <div class="page_view">
      <el-table :data="tableData" tooltip-effect="dark" style="width: 100%" border>
        <el-table-column prop="goodsCode" label="小食编码" width="120"></el-table-column>
        <el-table-column prop="goodsName" label="小食名称"></el-table-column>
        <el-table-column prop="standardPrice" label="标准价(元)"></el-table-column>
        <el-table-column label="封面(180*200)">
          <template slot-scope="scope">
            <div class="flex-box">
              <el-image
                style="width: 100px; height: 80px;margin-right:10px"
                :src="scope.row.imageUrl"
                :preview-src-list="[scope.row.imageUrl]"
                v-if="scope.row.imageUrl"
              ></el-image>
              <el-upload
                class="upload-demo"
                accept="image/*"
                :show-file-list="false"
                :action="baseUrl"
                :data="scope.row"
                :http-request="fnUploadRequest"
                :before-upload="beforeAvatarUpload"
                :disabled="goodsCode==scope.row.goodsCode?subState:false"
              >
                <el-button
                  type="default"
                  v-if="scope.row.imageUrl"
                  :loading="goodsCode==scope.row.goodsCode?subState:false"
                >修改</el-button>
                <el-button
                  type="default"
                  v-else
                  :loading="goodsCode==scope.row.goodsCode?subState:false"
                >上传</el-button>
              </el-upload>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!-- <p class="grey text-right padT">图片尺寸:250*400</p> -->
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
import { getFoodList, refreshFoodList, updateFoodImg } from '@/config/getData';
// eslint-disable-next-line camelcase
import { url_str } from '@/config/env';
export default {
  name: 'movieManage',
  components: {},
  data () {
    return {
      baseUrl: '',
      tableData: [],
      currentPage: 1,
      size: 10,
      total: 400,
      subState: false,
      goodsCode: null
    }
  },
  mounted () {
    this.initData()
    // eslint-disable-next-line camelcase
    this.baseUrl = url_str
  },
  methods: {
    // 更新
    handleFresh () {
      refreshFoodList().then(res => {
        if (res.code === 200) {
          this.$success('更新成功')
          this.initData()
        } else {
          this.$error('更新失败')
        }
      })
    },
    // 获取列表
    initData () {
      getFoodList(this.currentPage).then(res => {
        if (res.code === 200) {
          this.tableData = res.data.list
          this.total = res.data.total
        }
      })
    },
    // 分页
    handleSizeChange (val) {
      this.size = val
      this.initData()
    },
    // 分页
    handleCurrentChange (val) {
      this.currentPage = val
      this.initData()
    },
    // 文件上传之前调用做一些拦截限制
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg';
      const isPNG = file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 5
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 5M!')
      } else if (!isJPG && !isPNG) {
        this.$message.error('上传图片必须是JPG/PNG 格式!')
      }
      return (isJPG || isPNG) && isLt2M
    },
    // 自定义上传更换图片
    fnUploadRequest (option) {
      let _this = this
      let formData = new FormData()
      formData.append('file', option.file)
      _this.goodsCode = option.data.goodsCode
      _this.subState = true
      var requestObj = new XMLHttpRequest()
      requestObj.open('POST', this.baseUrl + '/admin/uploadImg')
      requestObj.setRequestHeader(
        'Authorization',
        _this.$store.state.UserToken
      )
      requestObj.send(formData)
      requestObj.onload = e => {
        let res = JSON.parse(e.target.response)
        if (res.code === 200) {
          _this.$success('上传成功')
          let param = {}
          param.goodsCode = option.data.goodsCode
          param.imageUrl = res.data
          // 上传
          updateFoodImg(param).then(res => {
            if (res.code === 200) {
              _this.initData()
            }
          })
          _this.subState = false
        } else {
          _this.$error('上传失败')
        }
      }
    },
    // 生成预览图
    reads (file, data) {
      // var _this = this // 定义一个文件阅读器
      var reader = new FileReader() // 文件装载后将其显示在图片预览里
      reader.onload = function (e) {
        // 将bade64位图片保存至数组里供上面图片显示
        data.img = reader.result
      };
      reader.readAsDataURL(file)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style.scss";
</style>
