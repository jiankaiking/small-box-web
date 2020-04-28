<template>
  <div class="bannerManage">
    <div class="card-list">
      <el-row :gutter="24" class="flex-box list" v-for="(v,index) in dataList" :key="v.id">
        <el-col :span="16" :offset="2" class="card-back flex-box">
          <el-col :span="10" class="flex-box">
            <span class="wrap">图片</span>
            <p class="make-img">
              <el-image
                v-if="v.imageUrl"
                style="width: 100px; height: 80px"
                :src="v.imageUrl"
                :preview-src-list="[v.imageUrl]"
              ></el-image>
              <el-upload
                class="upload-demo add_upload-demo"
                accept="image/*"
                :show-file-list="false"
                :action="baseUrl"
                :data="{index}"
                :http-request="fnUploadRequest"
                :before-upload="beforeAvatarUpload"
                :disabled="columnIndex==index?subLoading:false"
                list-type="picture"
              >
                <el-button
                  type="default"
                  :loading="columnIndex==index?subLoading:false"
                  @click="columnIndex=index"
                >上传图片</el-button>
              </el-upload>
              <!-- <span class="grey">尺寸: 300*200</span> -->
            </p>
          </el-col>
          <el-col :span="10" class="flex-box">
            <span class="wrap">跳转至</span>
            <el-input placeholder="请输入正确的网址" v-model="v.webUrl"></el-input>
          </el-col>
          <el-col :span="4" class="pix-height">
            <img
              class="icon-edit"
              @click="saveImg(index)"
              :src="require('@/assets/img/svg/save.svg')"
              alt="保存"
              title="保存"
            />
            <el-popover placement="top" width="160" v-model="v.state" v-if="index!==0">
              <p>确定删除这个轮播图？</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="v.state = false">取消</el-button>
                <el-button type="primary" size="mini" @click="handleDelete(index)">确定</el-button>
              </div>
              <img
                class="icon-edit"
                slot="reference"
                :src="require('@/assets/img/svg/delete.svg')"
                v-if="v.id"
                alt="删除"
                title="删除"
              />
              <img
                class="icon-edit"
                slot="reference"
                v-else
                @click="handleDeleteImmedia(index)"
                :src="require('@/assets/img/svg/delete.svg')"
                alt="删除"
                title="删除"
              />
            </el-popover>
          </el-col>
        </el-col>
        <el-col :span="4" v-if="dataList.length===index+1">
          <el-button type="primary" @click="handleAdd">添加轮播图</el-button>
        </el-col>
      </el-row>
    </div>
    <el-row :gutter="24">
      <el-col :offset="2">
        <p class="grey">图片尺寸:300*100</p>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getAllBanner, saveBannerImg, deleteBannerImg } from '@/config/getData';
import { url_str } from '@/config/env';
export default {
  name: 'bannerManage',
  components: {},
  data () {
    return {
      baseUrl: '',
      dataList: [{ id: 1 }],
      batchId: 888,
      bShowDelete: false,
      subLoading: false,
      columnIndex: 0
    }
  },
  mounted () {
    // eslint-disable-next-line camelcase
    this.baseUrl = url_str
    this.initData()
  },
  methods: {
    // 获取banner数据
    initData () {
      getAllBanner().then(res => {
        this.dataList = res.data
      })
    },
    // 添加轮播图
    saveImg (index) {
      let param = {}
      param.imageUrl = this.dataList[index].imageUrl
      param.webUrl = this.dataList[index].webUrl
      let message
      if (this.dataList[index].id) {
        // 编辑
        message = '编辑成功';
        param.id = this.dataList[index].id
      } else {
        message = '添加成功';
      }
      saveBannerImg(param).then(res => {
        if (res.code === 200) {
          this.$success(message)
          setTimeout(() => {
            this.initData()
          }, 1000)
        } else {
          this.$error(res.msg)
        }
      })
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
      _this.subLoading = true
      let index = option.data.index
      let formData = new FormData()
      formData.append('file', option.file)
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
          _this.dataList[index].imageUrl = res.data
        } else {
          _this.$error('上传失败')
        }
        _this.subLoading = false
      };
    },
    // 生成预览图
    reads (file, index) {
      var _this = this // 定义一个文件阅读器
      var reader = new FileReader() // 文件装载后将其显示在图片预览里
      reader.onload = function (e) {
        // 将bade64位图片保存至数组里供上面图片显示
        _this.dataList[index].img = reader.result
      };
      reader.readAsDataURL(file)
    },
    // 删除
    handleDelete (e) {
      deleteBannerImg(this.dataList[e].id).then(res => {
        if (res.code === 200) {
          this.$success('删除成功')
          this.initData()
        } else {
          this.$error('删除失败')
        }
      })
    },
    // 无id立即删除
    handleDeleteImmedia (e) {
      this.dataList.splice(e, 1)
    },
    // 添加轮播图
    handleAdd (e) {
      this.dataList.push({
        imageUrl: '',
        webUrl: '',
        state: false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style.scss";
.bannerManage {
  .card-list {
    .list {
      margin-bottom: $pad;
    }
    .card-back {
      background: #f7f7f7;
      padding: $pad;
      border-radius: 5px;
    }
    .make-img {
      img {
        @include wh(100px, 100px);
        display: block;
        margin-bottom: $pad;
      }
      .grey {
        font-size: 12px;
      }
    }
    .icon-edit {
      @include wh(20px, 20px);
      vertical-align: middle;
      display: inline-block;
      margin-right: 10px;
      cursor: pointer;
    }
    .pix-height {
      line-height: 40px;
    }
    .wrap {
      white-space: nowrap;
      padding-right: $pad;
    }
  }
}
</style>
