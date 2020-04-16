<template>
  <div class="register-container">

    <el-form ref="registerForm" :model="registerForm" :rules="registerRules" class="register-form" auto-complete="on" label-position="left">
      <div class="register-logo">
        <img :src="registersrc" alt="">
      </div>

      <label class="register-input-title">Username or email address</label>
      <el-form-item prop="username" >
          <el-input
              v-model="registerForm.username"
              ref="username"
              placeholder="8-50 Characters/email address"
              name="username"
              type="email"
              tabindex="1"
              maxlength="50"
              minlength="8"
              auto-complete="on"
            />
      </el-form-item>


    <label  class="register-input-title">Contact Name<span style="color:red;"></span></label>
      <el-form-item prop="contact_name">
          <el-input
            v-model="registerForm.contact_name"
            ref="contact_name"
            placeholder=""
            name="contact_name"
            type="text"
            tabindex="2"
            auto-complete="on"
          />
      </el-form-item>

    <label  class="register-input-title">Contact Phone （Optional）<span style="color:red;"></span></label>
        <el-form-item prop="contact_phone">
          <el-input
            v-model="registerForm.contact_phone"
            ref="contact_phone"
            name="contact_phone"
            type="number"
            tabindex="3"
          />
        </el-form-item>

    <label  class="register-input-title">Company Name<span style="color:red;"></span></label>
      <el-form-item prop="company_name">
            <el-input
              v-model="registerForm.company_name"
              ref="company_name"
              name="company_name"
              type="text"
              tabindex="4"
            />
        </el-form-item>

    <label for="" class="register-input-title">Password<span style="color:red;"></span></label>
    <el-form-item prop="password">
      <el-input
        :key="passwordType"
        v-model="registerForm.password"
        ref="password"
        :type="passwordType"
        placeholder="8-20 Characters"
        name="password"
        tabindex="5"
        auto-complete="on"
        @keyup.enter.native="handleregister"
      />
      <span class="show-pwd" @click="showPwd">
        <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
    </el-form-item>

    <label for="" class="register-input-title">Confirm Password <span style="color:red;"></span></label>
  <el-form-item prop="confirm_password">
    <el-input
      v-model="registerForm.confirm_password"
      :key="passwordType"
      ref="confirm-password"
      :type="passwordType"
      placeholder="Confirm your password"
      name="confirm_password"
      tabindex="6"
      auto-complete="on"
      @keyup.enter.native="handleregister"
    />
    <span class="show-pwd" @click="showPwd">
    <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
    </span>
    </el-form-item>

    <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:10px;background-color: #3B7394;" @click.native.prevent="handleregister">Register</el-button>

    <div class="register-rules">
    <span><el-checkbox v-model="checked"></el-checkbox> By clicking this form you agree with our</span>
  <span><el-button type="text" @click="open" style="color: #3B7394;">terms and conditiongs</el-button></span>
  </div>

  </el-form>
  <div class="register-footer">
    <div>Already have an account?
  <router-link to="/login" style="color: #3B7394;">LOG IN</router-link>
  </div>
  </div>

  </div>
  </template>

  <script>
  import { validateEmail } from '@/utils/validate'
  import { register } from '@/api/user'

  export default {
    name: 'register',
    data() {
      const validateUsername = (rule, value, callback) => {
        if (!validateEmail(value)) {
          callback(new Error('Please enter the correct user name'))
        } else {
          callback()
        }
      }
      const validatePassword = (rule, value, callback) => {
        if (value.length < 8) {
          callback(new Error('The password can not be less than 8 digits'))
        } else {
          callback()
        }
      }
      const validatePassword2 = (rule, value, callback) => {
        if (value == "") {
          callback(new Error("Please enter your password again"))
        } else if (value !== this.registerForm.password) {
          callback(new Error("The two input passwords are inconsistent!"))
        } else {
          callback()
        }
      }
      return {
        registerForm: {
          username:'',
          contact_name:'',
          contact_phone:'',
          company_name:'',
          password:'',
          // confirm_password:''
        },
        checked: true,
        registersrc: require('@/assets/logo.png'),
        registerRules: {
          username: [{ required: true,  trigger: 'blur', validator: validateUsername }],
          contact_name: [{ required: true,  trigger: 'blur' }],
          contact_phone: [{ required: true,  trigger: 'blur' }],
          company_name: [{ required: true,  trigger: 'blur' }],
          password: [{ required: true, trigger: 'blur', validator: validatePassword }],
          confirm_password: [{ required: true, trigger: 'blur', validator: validatePassword2 }]
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
      open() {
        this.$alert('这是内容', '标题名称', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `action: ${ action }`
            });
          }
        });
      },
      handleregister() {
        // axios.get('/api/Login').then(res => {
        //   console.log(res)
        // })
        this.$refs.registerForm.validate(valid => {
          if (valid) {
            console.log(this.registerForm);
             this.loading = true
            register(this.registerForm).then(response => {
              this.$router.push({ path: this.redirect || '/reg-hint' })
              this.loading = false
            }).catch(() => {
              this.loading = false
            })
            //  this.$store.dispatch('/Register', this.registerForm).then(() => {
            //   this.$router.push({ path: this.redirect || '/' })
            //   this.loading = false
          } else {
            console.log('error submit!!');
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
    .register-container .el-input input {
      color: $cursor;
    }
  }

  /* reset element-ui css */
  .register-container {
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

  .register-container {
    min-height: 100%;
    width: 100%;
    background-color: $bg;
    overflow: hidden;

    .register-form {
      position: relative;
      width: 520px;
      max-width: 100%;
      padding: 60px 35px 0;
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

    .register-logo{
      text-align: center;
      margin-bottom: 10px;
    }
    .register-logo img{
      width: 180px;
      height: auto;
    }
    .register-input-title{
      display: block;
      color: #6A6A6A;
      font-size: 12px;
      margin-bottom: 10px;
    }

    .show-pwd {
      position: absolute;
      right: 10px; .register-logo{
      text-align: center;
    }
      .register-logo img{
        width: 180px;
        height: auto;
      }
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }
    .register-footer{
      text-align: center;
      color: #6A6A6A;
      padding-bottom: 80px;
      font-size: 14px;
    }
    .register-rules{
      text-align: center;
      color: #6A6A6A;
      font-size: 14px;

    }
  }

</style>
