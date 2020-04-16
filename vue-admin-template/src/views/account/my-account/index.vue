<template>
  <div class="my-account-box">
    <breadcrumb class="breadcrumb-container" />
    <div class="my-account-content" >


      <el-row :gutter="10">
        <el-col :xs="{span: 20, offset: 2}" :sm="{span: 8, offset: 2}">
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

          <div class="input_box">
            <div class="input_title">Affiliated Sub-Account (If any) </div>
            <el-input
              placeholder=""
              size="medium"
              disabled='disabled'
              v-model="formLabelAlign.affiliated_sub_account">
            </el-input>
          </div>

          <el-button type="primary" @click="onSubmit()">Save</el-button>
          <el-button   >
            <router-link to="/Home">Cancel</router-link>
          </el-button>





        </el-form>
        </el-col>
      </el-row>
    </div>

  </div>
</template>

<script>

import Breadcrumb from '@/components/Breadcrumb'
import { mapGetters } from 'vuex'
import { getInfo } from '@/api/user'
import { saveAccount } from '@/api/user'

export default {
  data() {
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
  mounted(){
    this.getInfo();
  },
  methods:{
    getInfo(){
      getInfo(this.user_id).then(response => {
        if (response.code == '1'){
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
    },
    onSubmit(){
      console.log(this.formLabelAlign);
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



</style>
