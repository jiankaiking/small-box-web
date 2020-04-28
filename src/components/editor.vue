<template>
  <div>
    <quill-editor
      ref="myTextEditor"
      v-model="contentValue"
      :options="editorOption"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @change="onEditorChange($event)"
      class="cfpa-quill-editor"
      :style="{ height: quillEditorHeight + 'px' }"
    >
      <div id="toolbar" slot="toolbar">
        <!-- Add a bold button -->
        <button class="ql-bold" title="加粗">Bold</button>
        <button class="ql-italic" title="斜体">Italic</button>
        <button class="ql-underline" title="下划线">underline</button>
        <button class="ql-strike" title="删除线">strike</button>
        <button class="ql-blockquote" title="引用"></button>
        <button class="ql-code-block" title="代码"></button>
        <button class="ql-header" value="1" title="标题1"></button>
        <button class="ql-header" value="2" title="标题2"></button>
        <!--Add list -->
        <button class="ql-list" value="ordered" title="有序列表"></button>
        <button class="ql-list" value="bullet" title="无序列表"></button>
        <!-- Add font size dropdown -->
        <select class="ql-header" title="段落格式">
          <option selected>段落</option>
          <option value="1">标题1</option>
          <option value="2">标题2</option>
          <option value="3">标题3</option>
          <option value="4">标题4</option>
          <option value="5">标题5</option>
          <option value="6">标题6</option>
        </select>
        <select class="ql-size" title="字体大小">
          <option value="10px">10px</option>
          <option value="12px">12px</option>
          <option value="14px">14px</option>
          <option value="16px" selected>16px</option>
          <option value="18px">18px</option>
          <option value="20px">20px</option>
        </select>
        <select class="ql-font" title="字体">
          <option value="SimSun" selected="selected"></option>
          <option value="SimHei"></option>
          <option value="Microsoft-YaHei"></option>
          <option value="KaiTi"></option>
          <option value="FangSong"></option>
          <option value="Arial"></option>
          <!-- <option value="Times-New-Roman"></option>
          <option value="sans-serif"></option>-->
        </select>

        <!-- Add subscript and superscript buttons -->
        <select class="ql-color" value="color" title="字体颜色"></select>
        <select class="ql-background" value="background" title="背景颜色"></select>
        <select class="ql-align" value="align" title="对齐"></select>
        <button class="ql-clean" title="还原"></button>
        <button class="ql-link" title="超链接"></button>
        <!-- You can also add your own -->
        <button class="ql-image" title="图片"></button>
        <button class="ql-video" title="视频"></button>
      </div>
    </quill-editor>
    <el-upload
      class="upload-demo add_upload-demo"
      accept="image/*"
      :show-file-list="false"
      :action="baseUrl"
      :http-request="fnUploadRequest"
      :before-upload="beforeAvatarUpload"
    >
      <el-button type="default" id="imgInput">上传图片</el-button>
    </el-upload>
    <!-- <div :style="wordCount" v-if="wordCount" class="cfpa-quill-wordCount">
      <div class="cfpa-quill-warn-text">友情提示：支持微信第三方编辑器的内容复制</div>
      <div class="cfpa-quill-wordCount-text">当前已经输入<span >{{contentLength}}</span>个字符，您还可以输入{{allContentLength}}个字符</div>
    </div>-->
  </div>
</template>

<script>
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import { Quill, quillEditor } from 'vue-quill-editor';

// 自定义字体大小
let Size = Quill.import('attributors/style/size')
Size.whitelist = ['10px', '12px', '14px', '16px', '18px', '20px']
Quill.register(Size, true)

// 自定义字体类型
var fonts = [
  'SimSun',
  'SimHei',
  'Microsoft-YaHei',
  'KaiTi',
  'FangSong',
  'Arial',
  'Times-New-Roman',
  'sans-serif'
]
var Font = Quill.import('formats/font')
Font.whitelist = fonts // 将字体加入到白名单
Quill.register(Font, true)

export default {
  name: 'editor',
  components: {
    quillEditor
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    editorHeight: {
      type: Number,
      default: 355
    },
    editorWordCount: {
      type: Number,
      default: 0
    },
    ossMethod: {
      type: Object
    }
  },
  data () {
    return {
      baseUrl: '',
      contentValue: '',
      preContent: '',
      editorOption: {
        modules: {
          toolbar: {
            container: '#toolbar',
            handlers: {
              image: function (value) {
                if (value) {
                  document.querySelector('#imgInput').click()
                } else {
                  this.quill.format('image', false)
                }
              }
            }
          },
          history: {
            delay: 1000,
            maxStack: 50,
            userOnly: false
          }
        },
        placeholder: '请编写内容...'
      },
      allContentLength: 100000,
      contentLength: 0,
      wordCount: '',
      quillEditorHeight: 250
    }
  },
  computed: {
    editor () {
      return this.$refs.myTextEditor.quill
    }
  },
  methods: {
    // 自定义上传
    fnUploadRequest (options) {
      this.$emit('fnUploadRequest', options)
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
    /**
     * @description [onEditorBlur 失去焦点]
     * @param {Object} editor 返回的quill对象
     * @return   {null}   [没有返回]
     */
    onEditorBlur (editor) {
      this.$emit('editorBlur')
    },
    /**
     * @description [onEditorFocus 获取焦点]
     * @param {Object} editor 返回的quill对象
     * @return   {null}   [没有返回]
     */
    onEditorFocus (editor) {
      this.$emit('editorFocus')
    },
    /**
     * @description [onEditorChange 输入文本改变事件]
     * @param {Object} editor 返回的编辑对象{html, text, quill}
     * @return   {null}   [没有返回]
     */
    onEditorChange (editor) {
      this.$emit('onEditorChange', editor)
      let html = editor.html
      this.preContent = html
      this.$emit('input', html)
      this.contentLength = editor.text.length - 1
      this.allContentLength = this.allContentLength - this.contentLength
    }
  },
  created () {
    this.contentValue = this.value
    this.contentLength = this.editorWordCount || 0
  },
  mounted () {
    let toolbar = document.querySelector('.ql-toolbar.ql-snow')
    if (toolbar) {
      let toolbarHeight = toolbar.offsetHeight
      this.wordCount = {
        top: `${toolbarHeight}px`
      }
    }
    this.wordCount = {
      top: '42px'
    }
  },
  watch: {
    // Watch content change
    value (newVal, oldVal) {
      if (newVal && newVal !== this.preContent) {
        this.preContent = newVal
        this.contentValue = newVal
      } else if (!newVal) {
        this.contentValue = '';
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./_editor";
.add_upload-demo {
  display: none;
}
</style>
