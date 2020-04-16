<template>
  <div class="login-container">

    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
      <div class="login-logo">
        <img :src="loginsrc" alt="">
      </div>
      <div class="title-container">
        <h3 class="title">Log into my Cathaya</h3>
      </div>

      <label for="" class="login-input-title">Username or email address <span style="color:red;">*</span></label>
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="8-50 Characters/email address"
          name="username"
          type="text"
          tabindex="1"
          maxlength="50"
          minlength="8"
          auto-complete="on"
        />
      </el-form-item>

      <label for="" class="login-input-title">Password<span style="color:red;"> *</span></label>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="8-20 Characters"
          name="password"
          tabindex="2"
          maxlength="20"
          minlength="8"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;background-color: #3B7394;" @click.native.prevent="handleLogin">Login</el-button>

<!--      <div class="tips">-->
<!--        <span style="margin-right:20px;">username: admin</span>-->
<!--        <span> password: any</span>-->
<!--      </div>-->
      <div class="login-footer">

        <span><router-link :to="{path:'forgot-password'}" style="color:#6A6A6A;">Forgot password？</router-link></span>
        <span><router-link :to="{path:'register'}" style="color:#3B7394">Register</router-link></span>

      </div>

    </el-form>

  </div>
</template>

<script>
import { validateEmail } from '@/utils/validate'
// import { login } from '@/api/user'

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validateEmail(value)) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {

      loginsrc: require('@/assets/logo.png'),
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      // login(this.loginForm).then(response => {
      //   console.log(response.data)
      // })
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then(() => {

            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#2D3E48;
$cursor: #2D3E48;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 1px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }

  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background:rgba(255,255,255,1);
    border-radius: 5px;
    color: #2D3E48;
    border:1px solid rgba(216,216,216,1);
  }

  .el-form-item:hover{
    border:1px solid rgba(59,115,148,1);
  }

}
</style>

<style lang="scss" scoped>
$bg:#F9F9FB;
$dark_gray:#889aa4;
$light_gray:#393939;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 16px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }

  }

  .login-logo{
    text-align: center;
    margin-bottom: 15px;
  }
  .login-logo img{
    width: 180px;
    height: auto;
  }
  .login-input-title{
    display: block;
    color: #6A6A6A;
    font-size: 12px;
    margin-bottom: 10px;
  }

  .login-footer{
    font-size: 14px;
    text-align: center;
  }

  .show-pwd {
    position: absolute;
    right: 10px; .login-logo{
    text-align: center;
  }
    .login-logo img{
      width: 180px;
      height: auto;
    }
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
