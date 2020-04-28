<template>
  <div class="question page-view">
    <div class="card-title clearfix">
      <el-button type="primary" class="f_right" @click="go('/questionDetail')">添加</el-button>
    </div>
    <el-row :gutter="24">
      <el-col :span="8" v-for="(o,index) in questionList" :key="o.id" class="col">
        <el-card :body-style="{ padding: '0px' }">
          <div class="panel-card">
            <p class="qa">Q{{index+1}}:{{o.question}}</p>
            <div class="ql-snow">
              <div class="ql-editor" v-html="o.answer"></div>
            </div>
            <div class="bottom clearfix">
              <!-- <el-button type="text" class="button">删除</el-button>
              <el-button type="text" class="button">编辑</el-button>-->
              <el-popover placement="top" width="160" v-model="o.state">
                <p style="line-height:50px">确定删除这个问题？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="o.state = false">取消</el-button>
                  <el-button type="primary" size="mini" @click="handleDelete(o.id)">确定</el-button>
                </div>
                <span class="el-icon-delete" slot="reference"></span>
              </el-popover>
              <span class="el-icon-edit" @click="go('/questionDetail?id='+o.id)"></span>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { QuestionList, deleteQuestionData } from '@/config/getData';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
export default {
  name: 'question',
  components: {},
  data () {
    return {
      questionList: [
        { id: 1, state: false },
        { id: 2, state: false },
        { id: 3, state: false },
        { id: 4, state: false }
      ]
    }
  },
  watch: {},
  created () {},
  mounted () {
    this.initData()
  },
  methods: {
    initData () {
      QuestionList().then(res => {
        if (res.code === 200) {
          this.questionList = res.data
        }
      })
    },
    // 确认删除
    handleDelete (e) {
      // this.questionList.splice(e, 1)
      deleteQuestionData(e).then(res => {
        if (res.code === 200) {
          this.$success('删除成功')
          this.initData()
        } else {
          this.$error(res.msg)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../style.scss";
.question {
  .ql-editor {
    padding: 0;
  }
  .col {
    margin-bottom: 24px;
  }
  .panel-card {
    padding: $pad;
    .qa {
      margin-bottom: $pad;
    }
    .content {
      @include sc(13px, #6a6a6a);
      line-height: 25px;
    }
    .bottom {
      margin-top: $pad;
      text-align: center;
      font-size: 20px;
      font-weight: bold;
      span {
        padding: 0 10px;
        cursor: pointer;
      }
    }
  }
}
</style>
