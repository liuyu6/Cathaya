<template>
  <div class="my-account-box">
    <breadcrumb class="breadcrumb-container" />
    <div class="my-account-content" >


      <el-row :gutter="10">
        <el-col :xs="{span: 12, offset: 2}" :sm="{span: 8, offset: 2}">
<!--          <div style="float: right;"><i class="el-icon-edit" style="font-size: 20px;"></i></div>-->
            <el-form   :model="formLabelAlign" >
                <div class="input_box">
                  <div class="input_title">User ID</div>
                  <el-input
                    placeholder=""
                    size="medium"
                    disabled='disabled'
                    v-model="formLabelAlign.id">
                  </el-input>
                </div>

                <div class="input_box">
                  <div class="input_title">User Name/Email</div>
                  <el-input
                    placeholder=""
                    size="medium"
                    disabled='disabled'
                    v-model="formLabelAlign.user_email">
                  </el-input>
                </div>

                <div class="input_box">
                  <div class="input_title">Company Name</div>
                  <el-input
                    placeholder=""
                    size="medium"
                    v-model="formLabelAlign.company_name">
                  </el-input>
                </div>

                <div class="input_box">
                  <div class="input_title">Job Title</div>
                  <el-input
                    placeholder=""
                    size="medium"
                    v-model="formLabelAlign.job">
                  </el-input>
                </div>

                <div class="input_box">
                  <div class="input_title">Office Address </div>
                  <el-input
                    placeholder=""
                    size="medium"
                    v-model="formLabelAlign.office_address">
                  </el-input>
                </div>

                <div class="input_box">
                  <div class="input_title">Contact Phone </div>
                  <el-input
                    placeholder=""
                    size="medium"
                    v-model="formLabelAlign.contact_phone">
                  </el-input>
                </div>
                <el-button type="primary" @click="onSubmit()">Save</el-button>
                <el-button   >
                  <router-link to="/Home">Cancel</router-link>
                </el-button>

           </el-form>
        </el-col>

        <el-col :xs="{span: 9, offset: 1}" :sm="{span: 8, offset: 2}" v-show="affVal">
          <div class="input_box">
            <div class="input_title" style="margin-bottom: 20px;">Affiliated Sub-Account (If any) </div>
            <el-tag
              v-for="tag in formLabelAlign.affiliated_sub_account"
              closable
              :disable-transitions="false"
              @click="clickTag(tag)"
              @close="handleClose(tag)">
              {{ tag.username }}
            </el-tag>
            <el-button  class="button-new-tag" size="small" @click="addSubAccount = true"> + New Sub Account</el-button>
          </div>
        </el-col>
      </el-row>

<!--      添加子账户-->
      <el-dialog title="" :visible.sync="addSubAccount" :close-on-click-modal="false">
        <el-form :model="SubForm" :rules="SubFormRules" ref="SubForm">

          <label class="sub-input-title">User Email</label>
          <el-form-item prop="username" >
            <el-input
              v-model="SubForm.username"
              ref="username"
              name="username"
              type="email"
              tabindex="1"
              maxlength="50"
              minlength="8"
              auto-complete="on"
            />
          </el-form-item>

          <label  class="sub-input-title">Contact Name</label>
          <el-form-item prop="contact_name">
            <el-input
              v-model="SubForm.contact_name"
              ref="contact_name"
              name="contact_name"
              tabindex="2"
              type="text"
              auto-complete="on"
            />
          </el-form-item>

          <label  class="sub-input-title">Job Title</label>
          <el-form-item prop="job">
            <el-input
              v-model="SubForm.job"
              ref="job"
              name="job"
              type="text"
              tabindex="3"
              auto-complete="on"
            />
          </el-form-item>


          <label for="" class="sub-input-title">Password</label>
          <el-form-item prop="password">
            <el-input
              v-model="SubForm.password"
              ref="password"
              name="password"
              type="password"
              tabindex="4"
              auto-complete="off"
            />
            </span>
          </el-form-item>

          <label for="" class="sub-input-title">Confirm Password</label>
          <el-form-item prop="confirm_password">
            <el-input
              v-model="SubForm.confirm_password"
              ref="confirm_password"
              name="confirm_password"
              auto-complete="off"
              type="password"
              tabindex="5"
            />
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addSubAccount = false">Cancel</el-button>
          <el-button type="primary" @click.native.prevent="Add_sub_account()">Submit</el-button>
        </div>

      </el-dialog>

      <el-dialog title="" :visible.sync="viewSubAccount" :close-on-click-modal="false">
        <el-form :model="SubInfo"  >

          <label class="sub-input-title">User Email</label>
          <el-form-item prop="username" >
            <el-input
              v-model="SubInfo.username"
              name="username"
              type="email"
              tabindex="1"
              maxlength="50"
              minlength="8"
              auto-complete="on"
            />
          </el-form-item>

          <label  class="sub-input-title">Contact Name</label>
          <el-form-item prop="contact_name">
            <el-input
              v-model="SubInfo.contact_name"
              name="contact_name"
              tabindex="2"
              type="text"
              auto-complete="on"
            />
          </el-form-item>

          <label  class="sub-input-title">Job Title</label>
          <el-form-item prop="job">
            <el-input
              v-model="SubInfo.job"
              name="job"
              type="text"
              tabindex="3"
              auto-complete="on"
            />
          </el-form-item>

          <label  class="sub-input-title">Create Time</label>
          <el-form-item prop="create_time">
            <el-input
              v-model="SubInfo.create_time"
              name="create_time"
              type="text"
              tabindex="3"
              auto-complete="on"
            />
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="viewSubAccount = false">Cancel</el-button>
        </div>

      </el-dialog>

    </div>

  </div>
</template>

<script>

import Breadcrumb from '@/components/Breadcrumb'
import { mapGetters } from 'vuex'
import { getInfo } from '@/api/user'
import { saveAccount } from '@/api/user'
import { validateEmail } from '@/utils/validate'
import { viewSubAccounts } from '@/api/user'
import { addSubAccount } from '@/api/user'
import { deleteSubAccounts } from '@/api/user'

export default {
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validateEmail(value)) {
        callback(new Error('Please enter the correct user email'))
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
      } else if (value !== this.SubForm.password) {
        callback(new Error("The two input passwords are inconsistent!"))
      } else {
        callback()
      }
    }
    return {
      formLabelAlign: {
        id: '',
        user_email: '',
        company_name: '',
        job:'',
        office_address:'',
        contact_phone:'',
        affiliated_sub_account:''
      },
      SubForm:{
        username:'',
        contact_name:'',
        password:'',
        confirm_password:'',
        job:''
      },
      SubInfo:{
        username:'',
        contact_name:'',
        job:'',
        create_time:''
      },
      SubFormRules: {
        username: [{ required: true,  trigger: 'blur', validator: validateUsername }],
        contact_name: [{ required: true,  trigger: 'blur' }],
        job: [{ required: true,  trigger: 'blur' }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        confirm_password: [{ required: true, trigger: 'blur', validator: validatePassword2 }]
      },
      addSubAccount:false,
      viewSubAccount:false,
      affVal:false

    }
  },
  components: {
        Breadcrumb,
  },
  computed: {
    ...mapGetters([
      'user_id',
      'name'
    ])
  },
  created:{

  },
  mounted(){
    this.getInfo();
  },
  methods:{
    getInfo(){
      getInfo(this.user_id).then(response => {
        console.log('111111111111111111111111');
        console.log(response);

        if (response.code == '1'){
          // console.log(response.data.type);
          if(response.data['type'] == '1'){
            this.affVal=true;
          }else{
            this.affVal=false;
          }
          this.formLabelAlign.id = this.user_id;
          this.formLabelAlign.user_email = this.name;
          this.formLabelAlign.company_name = response.data['company_name'];
          this.formLabelAlign.job = response.data['job'];
          this.formLabelAlign.office_address = response.data['office_address'];
          this.formLabelAlign.contact_phone = response.data['contact_phone'];

        }
      }).catch(() => {
        this.loading = false
      });
      viewSubAccounts(this.user_id).then(response => {
        if (response.code == '1'){
          console.log(response.data);
          this.formLabelAlign.affiliated_sub_account = response.data;
        }
      }).catch(() => {
        this.loading = false
      });
    },
    onSubmit(){
      saveAccount(this.formLabelAlign).then(response => {
        if (response.code == '1'){
          this.$message({
            message: 'Save success !',
            type: 'success'
          });

        }
      }).catch(() => {
        this.loading = false
      });
    },
    handleClose(tag){
      var user_id = this.user_id;
      var that = this.$router;
      var thatSubForm = this.formLabelAlign.affiliated_sub_account;
      console.log(tag);
      console.log(this.SubForm);

      var msg = "Are you sure to delete"+'" '+tag.username+' "';
      return this.$confirm(msg, '', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        deleteSubAccounts(tag.id).then(response => {
          if (response.code=='1'){
            this.$message({
              message: 'Save success !',
              type: 'success',
              duration:'2500',
              showClose:'true',
              onClose(){
                // thatSubForm.filter(i => {
                //   return i.id !== tag.id
                // });
                thatSubForm.splice(thatSubForm.indexOf(tag), 1);


              }
            });

          }
        }).catch(() => {
          this.loading = false
        })
      }).catch(() => {

      })
    },
    clickTag(tag){

      // this.SubInfo.username = tag.username;
      this.$set(this.SubInfo,'username',tag.username);
      this.$set(this.SubInfo,'job',tag.job);
      this.$set(this.SubInfo,'contact_name',tag.contact_name);
      this.$set(this.SubInfo,'create_time',tag.create_time);
      this.viewSubAccount = true;
      console.log(tag);
      console.log(this.SubInfo);
    },

    Add_sub_account(){
      this.SubForm.account_id=this.user_id;
      var  thatAdd = this.addSubAccount;
      var that = this.$router;
      this.$refs.SubForm.validate(valid => {
        if (valid){
          console.log(this.SubForm);
          addSubAccount(this.SubForm).then(response => {
            if (response.code=='1'){
              this.$message({
                message: 'Save success !',
                type: 'success',
                onClose(){
                  that.go(0);
                }
              });

            }
          }).catch(() => {
            this.loading = false
          })
        }

      });
    }
  },

}
</script>



<style scoped>
.my-account-content{



  /*box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);*/

}

  .my-account-content input{
      display: inline-block;

  }
  .el-input{
    margin-top: 5px;
    margin-bottom: 10px;
    display: inline-block;
  }
  .input_title{
    font-size: 14px;
    color: #566168;
  }

.el-tag{
  margin-bottom: 8px;
  margin-right: 8px;
  cursor: pointer;
}



</style>
