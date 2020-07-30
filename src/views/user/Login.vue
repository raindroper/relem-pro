<template>
  <el-card class="login_wrapper">
    <el-tabs v-model="activeName">
      <el-tab-pane label="账号密码登录" name="passwordLogin">
        <el-alert
          class="login-alert"
          v-if="isLoginError"
          title="用户名或密码错误"
          show-icon
          :closable="false"
          type="error">
        </el-alert>
        <el-form ref="loginForm" :model="loginForm" :rules="rules">
          <el-form-item
            prop="username"
          >
            <el-input
              size="medium"
              prefix-icon="el-icon-user"
              placeholder="账户: admin"
              v-model="loginForm.username"
            ></el-input>
          </el-form-item>
          <el-form-item
            prop="password"
          >
            <el-input
              size="medium"
              prefix-icon="el-icon-lock"
              :show-password="true"
              placeholder="密码: admin"
              v-model="loginForm.password"
            >

            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button :loading="state.loginBtn" class="logon-button" type="primary" @click="onSubmit('loginForm')">立即登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>

import { mapActions } from 'vuex'
import md5 from 'md5'

const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ]
}

export default {
  name: 'Login',
  data () {
    return {
      rules,
      activeName: 'passwordLogin',
      loginForm: {
        username: '',
        password: ''
      },
      state: {
        loginBtn: false
      },
      isLoginError: false
    }
  },
  methods: {
    ...mapActions(['Login']),
    onSubmit (formName) {
      const { Login, loginForm, state } = this
      state.loginBtn = true
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const loginParams = { ...loginForm }
          loginParams.password = md5(loginForm.password)
          Login(loginParams)
            .then(res => {
              console.log(res)
              console.log('loginSuccess')
              this.loginSuccess(res)
            })
            .catch(error => {
              console.log('loginFailed', error)
              this.loginError(error)
            })
            .finally(() => {
              state.loginBtn = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    loginSuccess (res) {
      console.log(res)
      this.$router.push('/')
      this.isLoginError = false
    },
    loginError (error) {
      this.$notification.error({
        title: '错误',
        message: ((error.response || {}).data || {}).message || '请求出现错误，请稍后再试',
        duration: 4000
      })
      console.log(error)
      this.isLoginError = true
    }
  }
}
</script>

<style scoped lang="less">
  .login_wrapper {
    min-width: 260px;
    width: 368px;
    margin: 0 auto;

    .login-alert {
      margin-bottom: 22px;
    }

    .logon-button {
      width: 100%;
    }
  }
</style>
