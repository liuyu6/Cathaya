<template>
  <div>
    <breadcrumb class="breadcrumb-container" />
    <el-row :gutter="10">
       <el-col :xs="{span: 20, offset: 2}" :sm="{span: 8, offset: 1}">
         <el-form ref="PassForm" :model="PassForm" :rules="PassRules"  auto-complete="on" label-position="left">

           <label  class="Pass-input-title">Old Password</label>
           <el-form-item prop="old_passwd">
             <el-input
               v-model="PassForm.old_passwd"
               ref="old_passwd"
               placeholder="8-20 Characters"
               tabindex="5"
               auto-complete="on"
               show-password
             />
           </el-form-item>

           <label  class="Pass-input-title">New Password</label>
           <el-form-item prop="new_passwd">
             <el-input
               v-model="PassForm.new_passwd"
               ref="new_passwd"
               placeholder="8-20 Characters"
               tabindex="5"
               auto-complete="on"
               show-password

             />
           </el-form-item>

           <label for="" class="Pass-input-title">Confirm Password</label>
           <el-form-item prop="confirm_password">
             <el-input
               v-model="PassForm.confirm_password"
               ref="confirm-password"
               placeholder="Confirm your password"
               tabindex="6"
               auto-complete="on"
               show-password

             />
           </el-form-item>

           <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:10px;" @click.native.prevent="handlePass()">Submit</el-button>

         </el-form>

       </el-col>
    </el-row>
  </div>
</template>

<script>

  import Breadcrumb from '@/components/Breadcrumb'
  import { updatePasswd } from '@/api/user'
  import { mapGetters } from 'vuex'
  import { validateEmail } from '@/utils/validate'

  //删除cookie
  function deleteCookie(name){
    var date=new Date();
    date.setTime(date.getTime()-10000);
    document.cookie=name+"=v; expires="+date.toGMTString();
  }

  export default {
    name: 'change-password',
    data() {
      const validatePassword = (rule, value, callback) => {
        if (value.length < 8) {
          callback(new Error('The password can not be less than 8 digits'))
        } else {
          callback()
        }
      }
      const validatePassword2 = (rule, value, callback) => {
        if (value == "") {
          callback(new Error("Please enter your password again "))
        } else if (value !== this.PassForm.new_passwd) {
          callback(new Error("The two input passwords are inconsistent !"))
        } else {
          callback()
        }
      }
      return {
        PassForm: {
          old_passwd:'',
          new_passwd:'',
          confirm_password:'',
        },
        checked: true,
        PassRules: {
          old_passwd: [{ required: true, trigger: 'blur', validator: validatePassword }],
          new_passwd: [{ required: true, trigger: 'blur', validator: validatePassword }],
          confirm_password: [{ required: true, trigger: 'blur', validator: validatePassword2 }]
        },
        loading: false,
        redirect: undefined
      }
    },
    computed: {
      ...mapGetters([
        'user_id',
        'name'
      ])
    },
    components: {
      Breadcrumb,
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

      handlePass() {
        var passArr ={
          'id':this.user_id,
          'old_passwd':this.PassForm.old_passwd,
          'new_passwd':this.PassForm.new_passwd
        }
        this.$refs.PassForm.validate(valid => {
          if (valid){
            updatePasswd(passArr).then(response => {
              if (response.code=='1'){
                this.$message({
                  message: 'Save success !',
                  type: 'success'
                });

                setTimeout(function(){
                  deleteCookie('Cathaya')
                  location.reload();
                },3000);

              }
            }).catch(() => {
              this.loading = false
            })
          }

        })

      }
    }
  }
</script>

<style scoped>
  p {
    font-size: 2em;
    text-align: center;
  }

  .Pass-input-title{
    display: block;
    color: #6A6A6A;
    font-size: 12px;
    margin-bottom: 10px;
  }
</style>
