<template>
  <div>
    <el-dialog
      :visible.sync="dialogVisible"
      @close="$emit('update:bShowPreview', false)"
      :bShowPreview="bShowPreview"
      center
      width="800px;"
    >
      <div class="page_preview">
        <el-row :gutter="24">
          <el-col :span="4" :offset="2">
            <span class="tit">用户昵称</span>
          </el-col>
          <el-col :span="6">
            <span class="name">{{menuData.nickName}}</span>
          </el-col>
          <el-col :span="4">
            <span class="name">提交时间</span>
          </el-col>
          <el-col :span="6">
            <span class="name">{{menuData.submitTime}}</span>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="4" :offset="2">
            <span class="tit">手机号</span>
          </el-col>
          <el-col :span="6">
            <span class="name">{{menuData.mobile}}</span>
          </el-col>
          <el-col :span="4">
            <span class="name">跟进时间</span>
          </el-col>
          <el-col :span="6">
            <span class="name" v-if="menuData.followStatus==1">{{menuData.followTime}}</span>
            <span v-else>--</span>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="4" :offset="2">
            <span class="tit">意见描述</span>
          </el-col>
          <el-col :span="18">
            <span class="grey">{{menuData.suggestion}}</span>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="4" :offset="2">
            <span class="tit">&nbsp;</span>
          </el-col>
          <el-col :span="18" class="col">
            <div v-for="(v,index) in menuData.imgUrls" :key="index">
              <el-image class="image" :src="v" :preview-src-list="[v]"></el-image>
            </div>
          </el-col>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" v-if="menuData.followStatus!=1" @click="followState(menuData)">跟进</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'opinionManageDetail',
  data () {
    return {
      dialogVisible: false,
      content: ''
    }
  },
  props: {
    bShowPreview: {
      type: Boolean
    },
    dialogtitle: {
      type: String
    },
    menuData: {
      type: Object
    }
  },
  mounted () {},
  watch: {
    bShowPreview (newVal) {
      this.dialogVisible = newVal
    }
  },
  methods: {
    onSubmit () {
      console.log(this.formInline)
    },
    // 跟进
    followState (data) {
      this.$emit('onEditorChange', data)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/css/_mixin";
$row: 10px;
.page_preview {
  .el-row {
    margin: 10px 0;
    .tit {
      color: #222;
    }
    .grey {
      @include sc(14px, #6a6a6a);
      line-height: 25px;
    }
    .col {
      display: flex;
      .image {
        border: 1px solid #e6e6e6;
        border-radius: 3px;
        padding: 3px;
        width: 120px;
        height: 100px;
        margin-right: $pad;
      }
    }
  }

  .opinion {
    display: flex;
  }
}
</style>
