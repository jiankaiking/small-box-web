<template>
  <div class="questionDetail page-view">
    <div class="bannerForm">
      <el-form
        :model="formInline"
        ref="formInline"
        :rules="rules"
        class="demo-form-inline form"
        size="medium"
        label-width="120px"
      >
        <el-form-item class="base_long" label="问题描述" prop="question">
          <el-input v-model="formInline.question" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item class="el_editor" label="问题回答" prop="answer">
          <QuillEditor
            id="quill"
            class="editor_content"
            v-model="formInline.answer"
            :value="formInline.answer"
            @onEditorChange="onEditorChange"
            @fnUploadRequest="fnUploadRequest"
          />
        </el-form-item>
        <el-form-item>
          <el-button @click="submit('formInline')">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {
  addQuestionData,
  editQuestionData,
  getQuestionData
} from '@/config/getData';
import QuillEditor from '@/components/editor';
// eslint-disable-next-line camelcase
import { url_str } from '@/config/env';
export default {
  name: 'questionDetail',
  components: {
    QuillEditor
  },
  data () {
    const checkLongitude = (rule, value, callback) => {
      let text = value.replace(/<[^>]+>/g, '')
      let imgReg = /<img.*?(?:>|\/>)/gi
      if (value.match(imgReg) === null && text.match(/^\s*$/) !== null) {
        return callback(new Error('请输入问题回答'))
      } else {
        callback()
      }
    }
    return {
      formInline: {
        question: '',
        answer: ''
      },
      rules: {
        question: [
          { required: true, message: '请输入问题描述', trigger: 'change' }
        ],
        answer: [
          { required: true, validator: checkLongitude, trigger: 'change' }
        ]
      },
      baseUrl: '',
      subLoading: false,
      rowId: '',
      disabled: false,
      isEdit: false, // 是否为编辑
      editorText: '' // 判断文本是否为空
    }
  },
  watch: {},
  created () {},
  mounted () {
    // eslint-disable-next-line camelcase
    this.baseUrl = url_str
    if (this.$route.query.id) {
      this.$route.meta.title = '编辑问题';
      this.isEdit = true
      this.initData()
    } else {
      this.$route.meta.title = '添加问题';
      this.isEdit = false
    }
  },
  methods: {
    initData () {
      getQuestionData(this.$route.query.id).then(res => {
        if (res.code === 200) {
          this.formInline = res.data
        }
      })
    },
    handleUploadImg (state) {
      let fileInput = document.getElementById('imgInput')
      fileInput.click() // 加一个触发事件
    },
    // 返回
    backSubmit () {
      this.$router.go(-1)
    },
    // 图文详情change事件
    onEditorChange (editor) {
      this.formInline.answer = editor.html
      this.editorText = editor.html
      this.$refs.formInline.validateField('answer')
    },
    // 自定义上传图片(富文本)
    fnUploadRequest (option) {
      let _this = this
      _this.subLoading = true
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
          _this.formInline.answer = _this.formInline.answer + str
        } else {
          _this.$error('上传失败')
        }
        _this.subLoading = false
        loading.close()
      };
    },
    // 提交表单
    submit (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.subState = true
          if (this.isEdit) {
            // 编辑
            this.formInline.id = this.$route.query.id
            editQuestionData(this.formInline).then(res => {
              if (res.code === 200) {
                this.$success('编辑成功')
                setTimeout(() => this.go('/question'), 1000)
              } else {
                this.$error('编辑失败')
                this.subState = false
              }
            })
          } else {
            addQuestionData(this.formInline).then(res => {
              if (res.code === 200) {
                this.$success('添加成功')
                setTimeout(() => this.go('/question'), 1000)
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
.questionDetail {
  .bannerForm {
    width: 60%;
  }
  .el_editor {
    margin-bottom: 30px;
  }
  #quill {
    height: 320px;
  }
  .base_long {
    position: relative;
    .number_compute {
      position: absolute;
      right: 20px;
      top: 0px;
    }
  }
}
</style>
