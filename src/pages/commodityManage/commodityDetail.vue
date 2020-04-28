<template>
  <div class="commodityDetail page-view">
    <!-- <el-button class="backSubmit" @click="goBack">返回</el-button> -->
    <el-form ref="form" :model="form" :rules="rules" label-width="120px" class="form">
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title" placeholder="请输入会员卡名称"></el-input>
      </el-form-item>
      <el-form-item label="主图" prop="imageUrl">
        <el-image
          v-if="form.imageUrl"
          style="width: 300px; height: 150px"
          :src="form.imageUrl"
          :preview-src-list="[form.imageUrl]"
        ></el-image>
        <el-upload
          class="upload-demo add_upload-demo"
          accept="image/*"
          :show-file-list="false"
          :action="baseUrl"
          :http-request="fnUploadRequest"
          :before-upload="beforeAvatarUpload"
          :disabled="subLoading"
        >
          <el-button type="default" :loading="subLoading">上传图片</el-button>
          <span class="grey">图片尺寸: 300*150</span>
        </el-upload>
      </el-form-item>
      <el-form-item label="划线价格(元)" prop="makingPrice">
        <el-input v-model="form.makingPrice" placeholder="请输入划线价格"></el-input>
      </el-form-item>
      <el-form-item label="实际价格(元)" prop="actualPrice">
        <el-input v-model="form.actualPrice" placeholder="请输入实际价格"></el-input>
      </el-form-item>
      <el-form-item label="有效期(天)" prop="validityPeriod">
        <el-input v-model="form.validityPeriod" placeholder="请输入有效期"></el-input>
      </el-form-item>
      <el-form-item label="会员权益" prop="vipInterests">
        <QuillEditor
          id="quill"
          class="editor_content"
          v-model="form.vipInterests"
          :value="form.vipInterests"
          @onEditorChange="onEditorChange"
          @fnUploadRequest="fnUploadQuill"
        />
      </el-form-item>
      <el-form-item label="适用影城" prop="availableCinemaLinkId">
        <el-select
          v-model="form.availableCinemaLinkId"
          @change="changSelectMovie"
          filterable
          multiple
          placeholder="请选择"
          style="width:100%;"
        >
          <el-option
            v-for="item in options"
            :key="item.cinemaLinkId"
            :label="item.cinemaName"
            :value="item.cinemaLinkId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="会员卡协议" prop="agreement">
        <el-input
          v-model="form.agreement"
          type="textarea"
          :autosize="{minRows: 6}"
          placeholder="请输入会员卡协议"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="default" @click="bShowPreview = true">预览</el-button>
        <el-button type="primary" @click="onSubmit('form')" :loading="subState">保存</el-button>
      </el-form-item>
    </el-form>
    <preview :bShowPreview.sync="bShowPreview" :menuData="form" />
  </div>
</template>

<script>
import preview from '@/components/preview';
import QuillEditor from '@/components/editor';
import {
  addVipCard,
  cinemaListData,
  vipCardInfo,
  editVipCard
} from '@/config/getData';
// eslint-disable-next-line camelcase
import { url_str } from '@/config/env';
export default {
  name: 'commodityDetail',
  components: { preview, QuillEditor },
  data () {
    var validateNum = (rule, value, callback) => {
      let reg = /^\d*\.?\d+$/
      if (!value) {
        callback(new Error('不能为空'))
      } else {
        if (!reg.test(value)) {
          callback(new Error('请输入数字且不能为负'))
        } else if (value <= 0) {
          callback(new Error('不低于0元'))
        } else {
          callback()
        }
      }
    }
    return {
      form: {
        title: '',
        imageUrl: '',
        makingPrice: '',
        actualPrice: '',
        validityPeriod: '',
        vipInterests: '',
        availableCinemaLinkId: '',
        agreement: ''
      },
      rules: {
        title: [
          { required: true, message: '请输入会员卡名称', trigger: 'change' }
        ],
        imageUrl: [
          { required: true, message: '请上传图片', trigger: 'change' }
        ],
        actualPrice: [
          { required: true, validator: validateNum, trigger: 'change' }
        ],
        validityPeriod: [
          { required: true, validator: validateNum, trigger: 'change' }
        ],
        availableCinemaLinkId: [
          { required: true, message: '请选择适用影城', trigger: 'blur' }
        ],
        vipInterests: [
          { required: true, message: '请输入会员卡权益', trigger: 'change' }
        ],
        agreement: [
          { required: true, message: '请输入会员卡协议', trigger: 'change' }
        ]
      },
      options: [],
      subState: false,
      subLoading: false,
      isEdit: false, // 是否为编辑
      baseUrl: '',
      bShowPreview: false
    }
  },
  watch: {},
  created () {},
  mounted () {
    this.initCinemaList()
    // eslint-disable-next-line camelcase
    this.baseUrl = url_str
    if (this.$route.query.id) {
      this.$route.meta.title = '会员详情';
      this.isEdit = true
      this.initCardInfo(this.$route.query.id)
    } else {
      this.isEdit = false
      this.$route.meta.title = '添加会员';
    }
  },
  methods: {
    // 获取卡片信息
    initCardInfo (id) {
      vipCardInfo(id).then(res => {
        if (res.code === 200) {
          res.data.title = res.data.tittle
          // this.editorContentValue = res.data.vipInterests
          this.form = res.data
          this.changSelectMovie(res.data.availableCinemaLinkId)
        }
      })
    },
    // 影城列表
    initCinemaList () {
      cinemaListData().then(res => {
        if (res.code === 200) {
          this.options = res.data
        }
      })
    },
    // 图文详情change事件
    onEditorChange (editor) {
      this.form.vipInterests = editor.html
      this.$refs.form.validateField('vipInterests')
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
          _this.form.imageUrl = res.data
          _this.$refs.form.validateField('imageUrl')
        } else {
          _this.$error('上传失败')
        }
        _this.subLoading = false
      };
    },
    // 自定义上传图片(富文本)
    fnUploadQuill (option) {
      let _this = this
      let quill = document.querySelector('#quill')
      const loading = this.$loading({
        target: quill,
        fullscreen: false,
        lock: true,
        background: 'rgba(255, 255, 255, 0.6)'
      })
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
          _this.$success('加载完成')
          let str = '<img src=' + res.data + ' />';
          _this.form.vipInterests = _this.form.vipInterests + str
        } else {
          _this.$error('上传失败')
        }
        loading.close()
      };
    },
    // 适用影城选择
    changSelectMovie (e) {
      let arr = []
      this.options.map(item => {
        for (let i = 0; i < e.length; i++) {
          if (item.cinemaLinkId === e[i]) {
            arr.push(item)
          }
        }
      })
      this.form.movieSelect = arr
    },
    // 提交表单
    onSubmit (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.form.tittle = this.form.title
          this.subState = true
          if (this.isEdit) {
            // 编辑
            this.form.id = this.$route.query.id
            editVipCard(this.form).then(res => {
              if (res.code === 200) {
                this.$success('编辑成功')
                setTimeout(() => this.go('/commodityManage'), 1000)
              } else {
                this.$error('编辑失败')
                this.subState = false
              }
            })
          } else {
            addVipCard(this.form).then(res => {
              if (res.code === 200) {
                this.$success('添加成功')
                setTimeout(() => this.go('/commodityManage'), 1000)
              } else {
                this.$error('添加失败')
                this.subState = false
              }
            })
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../style.scss";
$size: 30px;
.commodityDetail {
  .form {
    margin-top: $size;
    margin-left: $size;
    width: 600px;
    .row-list {
      margin-bottom: $pad;
    }
    .editor_content {
      height: 320px;
    }
    .edit {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      span {
        color: #6a6a6a;
        font-size: 20px;
        margin-left: $pad;
        cursor: pointer;
        &:hover {
          opacity: 0.8;
        }
      }
    }
  }
}
</style>
