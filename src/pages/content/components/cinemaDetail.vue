<template>
  <div class="cinemaDetail page-view">
    <!-- <el-button class="backSubmit" @click="goBack">返回</el-button> -->
    <el-form ref="form" :model="form" :rules="rules" label-width="120px" class="form">
      <el-form-item label="影院名称" prop="cinemaName">
        <el-input v-model="form.cinemaName" placeholder="请输入影院名称" readonly></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="mobile">
        <el-input v-model="form.mobile" :readonly="subState" placeholder="请输入电话"></el-input>
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-input v-model="form.address" :readonly="subState" placeholder="请输入地址"></el-input>
      </el-form-item>
      <el-form-item label="位置(腾讯地图)">
        <el-row :gutter="24" type="flex" justify="space-between">
          <el-col :span="11">
            <el-form-item prop="longitude">
              <el-input v-model="form.longitude" :readonly="subState" placeholder="请输入经度"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="2">
            <el-form-item prop="latitude">
              <el-input v-model="form.latitude" :readonly="subState" placeholder="请输入纬度"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="交通" prop="traffic">
        <el-input v-model="form.traffic" :readonly="subState" placeholder="请输入交通方式"></el-input>
      </el-form-item>
      <el-form-item label="特色信息" prop="cinemaFeatureLabels">
        <el-row
          :gutter="24"
          type="flex"
          v-for="(v,index) in form.cinemaFeatureLabels"
          :key="index"
          class="row-list"
        >
          <el-col :span="6">
            <el-input v-model="v.name" :readonly="subState" placeholder="请输入标签"></el-input>
          </el-col>
          <el-col :span="12" :offset="1">
            <el-input v-model="v.description" :readonly="subState" placeholder="描述"></el-input>
          </el-col>
          <el-col :span="5" class="edit">
            <el-button
              type="text"
              :disabled="type=='check'"
              class="el-icon-delete-solid"
              @click="handleDelete(index)"
              v-if="index!==0"
            ></el-button>
            <el-button
              type="text"
              :disabled="type=='check'"
              class="el-icon-circle-plus"
              @click="handleAdd"
              v-if="form.cinemaFeatureLabels.length===index+1"
            ></el-button>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="影院介绍" prop="introduce">
        <el-input
          v-model="form.introduce"
          type="textarea"
          :autosize="{minRows: 6}"
          placeholder="请输入影院介绍"
          :readonly="subState"
        ></el-input>
      </el-form-item>
      <el-form-item v-if="type=='edit'">
        <el-button type="primary" @click="onSubmit('form')" :loading="subState">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { editCinemaData, cinemaInfoData } from '@/config/getData';
export default {
  name: 'cinemaDetail',
  components: {},
  data () {
    const checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号不能为空'))
      } else {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
        if (reg.test(value)) {
          callback()
        } else {
          return callback(new Error('请输入正确的手机号'))
        }
      }
    }
    const checkLatitude = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入纬度'))
      } else {
        const reg = /^-?((0|[1-8]?[0-9]?)(([.][0-9]{1,8})?)|90(([.][0]{1,8})?))$/
        if (reg.test(value)) {
          callback()
        } else {
          return callback(new Error('请输入正确的纬度'))
        }
      }
    }
    const checkLongitude = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入经度'))
      } else {
        const reg = /^-?((0|1?[0-7]?[0-9]?)(([.][0-9]{1,8})?)|180(([.][0]{1,8})?))$/
        if (reg.test(value)) {
          callback()
        } else {
          return callback(new Error('请输入正确的经度'))
        }
      }
    }
    const checkLabel = (rule, value, callback) => {
      let state = value.map(item => {
        if (!item.name.match(/^[ ]*$/) && !item.description.match(/^[ ]*$/)) {
          return true
        } else {
          return false
        }
      })
      if (!this.equals(state)) {
        callback(new Error('不能为空'))
      } else if (
        value[0].description.match(/^[ ]*$/) ||
        value[0].name.match(/^[ ]*$/)
      ) {
        return callback(new Error('请至少完成一个标签'))
      } else {
        callback()
      }
    }
    return {
      form: {
        cinemaName: '',
        mobile: '',
        address: '',
        latitude: '',
        longitude: '',
        traffic: '',
        cinemaFeatureLabels: [{ name: '', description: '' }],
        introduce: ''
      },
      rules: {
        address: [{ required: true, message: '请输入地址', trigger: 'change' }],
        mobile: [{ required: true, validator: checkPhone, trigger: 'change' }],
        latitude: [
          { required: true, validator: checkLatitude, trigger: 'change' }
        ],
        longitude: [
          { required: true, validator: checkLongitude, trigger: 'change' }
        ],
        traffic: [
          { required: true, message: '请输入交通方式', trigger: 'change' }
        ],
        introduce: [
          { required: true, message: '请输入影院介绍', trigger: 'change' }
        ],
        cinemaFeatureLabels: [
          { required: true, validator: checkLabel, trigger: 'change' }
        ]
      },
      subState: false,
      batchId: 888,
      type: ''
    }
  },
  watch: {},
  created () {},
  mounted () {
    this.type = this.$route.query.type
    if (this.type === 'check') {
      this.subState = true
    }
    this.form.cinemaName = JSON.parse(localStorage.getItem('cinemaName'))
    this.initData(this.$route.query.id)
  },
  methods: {
    // 获取影院信息
    initData (id) {
      cinemaInfoData(id).then(res => {
        if (res.code === 200) {
          if (res.data.cinemaFeatureLabels.length === 0) {
            res.data.cinemaFeatureLabels = [{ name: '', description: '' }]
          }
          this.form = res.data
        }
      })
    },
    // 提交表单
    onSubmit (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.form.cinemaLinkId = this.$route.query.id
          this.form.latitude = Number(this.form.latitude)
          this.form.longitude = Number(this.form.longitude)
          editCinemaData(this.form).then(res => {
            if (res.code === 200) {
              this.$success('保存成功')
              setTimeout(() => {
                this.go('/contentManage')
              }, 1000)
            } else {
              this.$error('保存失败')
            }
          })
        }
      })
    },
    // 删除标签
    handleDelete (e) {
      this.form.cinemaFeatureLabels.splice(e, 1)
      this.$refs.form.validateField('cinemaFeatureLabels')
    },
    // 添加标签
    handleAdd () {
      this.batchId++
      this.form.cinemaFeatureLabels.push({ name: '', description: '' })
    },
    // 数组值判断
    equals (arr) {
      var bool = true
      for (var i = 1, len = arr.length; i < len; i++) {
        if (arr[i] !== true) {
          bool = false
        } else {
          bool = true
        }
      }
      return bool
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style.scss";
$size: 30px;
.cinemaDetail {
  .form {
    margin-top: $size;
    margin-left: $size;
    width: 600px;
    .row-list {
      margin-bottom: $pad;
    }
    .edit {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .el-button {
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
  .el-button.is-disabled.el-button--text {
    color: #999;
    cursor: not-allowed;
    pointer-events: none;
  }
}
</style>
