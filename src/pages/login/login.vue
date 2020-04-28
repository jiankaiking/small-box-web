<template>
  <div class="clearfix" id="login_wrap">
    <div class="login_content">
      <img :src="require('@/assets/img/common/box.jpg')" alt />
    </div>
    <div class="f_right">
      <!-- <h4 class="large_title" style="color:#fff">
        <img src="static/img/logo.png" class="logo_icon" alt="logo" style="width:300px;" />
      </h4>-->
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width
        class="demo-ruleForm"
      >
        <h5 class="small_title">账号密码登录</h5>
        <el-form-item prop="pass" class="icon_content">
          <img class="icon_item" :src="require('@/assets/img/shouji.png')" alt />
          <el-input
            class="content_indent"
            type="text"
            v-model="ruleForm.pass"
            placeholder="请输入账号"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item prop="checkPass" class="icon_content">
          <img class="icon_item" :src="require('@/assets/img/mima.png')" alt />
          <el-input
            class="content_indent"
            type="password"
            v-model="ruleForm.checkPass"
            placeholder="请输入密码"
            autocomplete="off"
            @keyup.enter.native="submitForm('ruleForm')"
          ></el-input>
        </el-form-item>
        <el-form-item class="icon_content clearFix">
          <el-checkbox class="f_left" v-model="ruleForm.checked">记住密码</el-checkbox>
        </el-form-item>
        <el-form-item class="icon_content login_margin">
          <el-button class="login_button" type="primary" @click="submitForm('ruleForm')">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { accountLogin } from '@/config/getData';
export default {
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入账号'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      captchaCodeImg: '',
      ruleForm: {
        pass: '',
        checkPass: '',
        checked: true
      },
      rules: {
        pass: [{ validator: validatePass, trigger: 'blur' }],
        checkPass: [{ validator: validatePass2, trigger: 'blur' }]
      }
    }
  },
  mounted () {
    // this.getCaptchaCode();
    this.getCookie()
  },
  methods: {
    // 登录表单
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          accountLogin(this.ruleForm.pass, this.ruleForm.checkPass).then(
            res => {
              if (res.code === 200) {
                let token = res.data
                this.$store.commit('LOGIN_IN', token)
                this.$router.push('/contentManage')
                this.$success('登录成功')
              } else {
                this.$error('登录失败')
              }
            }
          )
          if (this.ruleForm.checked) {
            // 记住密码
            this.setCookie(this.ruleForm.pass, this.ruleForm.checkPass, 30) // 保存期限为30天
          } else {
            this.clearCookie() // 清空 Cookie
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 设置Cookie
    setCookie (username, password, exdays) {
      // 用户名, 密码, 保存天数
      let exdate = new Date() // 获取时间
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays)
      // 字符串拼接cookie
      window.document.cookie =
        'userName=' + username + ';path=/;expires=' + exdate.toGMTString()
      window.document.cookie =
        'userPwd=' + password + ';path=/;expires=' + exdate.toGMTString()
    },
    // 读取Cookie
    getCookie () {
      if (document.cookie.length > 0) {
        let arr = document.cookie.split('; ') // 这里显示的格式需要切割一下自己可输出看下
        for (let i = 0; i < arr.length; i++) {
          let arr2 = arr[i].split('=') // 再次切割
          // 判断查找相对应的值
          if (arr2[0] === 'userName') {
            this.ruleForm.pass = arr2[1] // 保存到保存数据的地方
          } else if (arr2[0] === 'userPwd') {
            this.ruleForm.checkPass = arr2[1]
          }
        }
      }
    },
    // 清除Cookie
    clearCookie () {
      this.setCookie('', '', -1) // 修改2值都为空，天数为负1天就好了
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    goAsh (e) {
      this.$router.push(e)
    }
  }
}
</script>
<style scoped lang="scss">
@import "./log";
</style>
