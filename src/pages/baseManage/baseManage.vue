<template>
  <div class="baseManage">
    <div class="page-view">
      <!-- <div class="flex-start">
        <span class="tit">退款原因</span>
        <el-tag
          :key="tag.id"
          v-for="tag in dynamicTags"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)"
        >{{tag.refundReason}}</el-tag>
        <el-input
          class="input-new-tag"
          v-if="inputVisible"
          v-model="inputValue"
          ref="saveTagInput"
          size="small"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
        ></el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput">添加</el-button>
      </div>-->

      <el-form ref="form" :model="form" label-width="120px" class="form" style="width:80%">
        <el-form-item label="退款原因">
          <el-tag
            :key="tag.id"
            v-for="tag in dynamicTags"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)"
          >{{tag.refundReason}}</el-tag>
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
          ></el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput">添加</el-button>
        </el-form-item>
        <el-form-item label="退改签须知" prop="changeRefundNotice">
          <el-input
            v-model="form.changeRefundNotice"
            type="textarea"
            :autosize="{minRows: 6}"
            placeholder="请输入退改签须知"
          ></el-input>
          <el-button size="small" @click="saveNotice('1')">保存</el-button>
        </el-form-item>
        <el-form-item label="会员卡使用说明" prop="instructions">
          <el-input
            v-model="form.instructions"
            type="textarea"
            :autosize="{minRows: 6}"
            placeholder="请输入使用说明"
          ></el-input>
          <el-button size="small" @click="saveNotice('2')">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import {
  getFundReason,
  addFundReason,
  deleteFundReason,
  getNotice,
  editNotice
} from '@/config/getData';
export default {
  name: 'baseManage',
  components: {},
  data () {
    return {
      dynamicTags: ['买错了', '有事情', '不要了'],
      inputVisible: false,
      inputValue: '',
      content: '', // 退改签须知
      form: {
        changeRefundNotice: '',
        instructions: ''
      }
    }
  },
  watch: {},
  created () {},
  mounted () {
    this.initData()
  },
  methods: {
    // 初始化数据
    async initData () {
      await getFundReason().then(res => {
        if (res.code === 200) {
          this.dynamicTags = res.data
        }
      })
      await getNotice().then(res => {
        if (res.code === 200) {
          this.form = res.data
        }
      })
    },
    // 删除
    handleClose (tag) {
      deleteFundReason(tag.id).then(res => {
        if (res.code === 200) {
          this.$success('删除成功')
          this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
        } else {
          this.$error(res.msg)
        }
      })
    },
    // 添加
    showInput () {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    // 保存
    handleInputConfirm () {
      let inputValue = this.inputValue
      if (!inputValue || inputValue.match(/^[ ]*$/)) {
        this.inputVisible = false
        this.inputValue = '';
      } else {
        addFundReason(inputValue).then(res => {
          if (res.code === 200) {
            this.$success('添加成功')
            this.inputVisible = false
            this.inputValue = '';
            this.initData()
          } else {
            this.$error(res.msg)
          }
        })
      }
    },
    // 保存退改签须知
    saveNotice (e) {
      let param = {}
      if (e === '1') {
        param.changeRefundNotice = this.form.changeRefundNotice
      } else {
        param.instructions = this.form.instructions
      }
      if (this.form.changeRefundNotice === '') {
        this.$warning('请输入退改签须知')
      } else if (this.form.instructions === '') {
        this.$warning('请输入会员卡使用说明')
      } else {
        editNotice(param).then(res => {
          if (res.code === 200) {
            this.$success('保存成功')
            setTimeout(() => {
              this.initData()
            }, 1000)
          } else {
            this.$error(res.msg)
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../style.scss";
.baseManage {
  .page-view {
    .tit {
      padding: 0 20px 0 40px;
      color: #666;
      font-size: 14px;
    }
  }
  .el-tag + .el-tag {
    margin-left: 10px;
    margin-bottom: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
  }
}
</style>
