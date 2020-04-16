<template>
  <div class="my-account-box">
    <breadcrumb class="breadcrumb-container" />
    <div class="my-account-content" >

    <el-form   :model="formLabelAlign" >

      <el-row :gutter="10">
        <el-col :xs="{span: 20, offset: 2}" :sm="{span: 8, offset: 1}" >

            <!--          <div style="float: right;"><i class="el-icon-edit" style="font-size: 20px;"></i></div>-->

            <div class="input_box">
              <div class="input_title">Company Full Legal Name</div>
              <el-input
                placeholder=""
                size="medium"
                v-model="formLabelAlign.company_name">
              </el-input>
            </div>

            <div class="input_box">
              <div class="input_title">Mailing Address</div>
              <el-input
                placeholder=""
                size="medium"
                v-model="formLabelAlign.mailing">
              </el-input>
            </div>

            <div class="input_box">
              <div class="input_title">Province / State</div>
              <el-input
                placeholder=""
                size="medium"
                v-model="formLabelAlign.province">
              </el-input>
            </div>

            <div class="input_box">
              <div class="input_title">Zip Code</div>
              <el-input
                placeholder=""
                size="medium"
                v-model="formLabelAlign.zip_code">
              </el-input>
            </div>

            <div class="input_box">
              <div class="input_title">Main Contact Name</div>
              <el-input
                placeholder=""
                size="medium"
                v-model="formLabelAlign.contact_name">
              </el-input>
            </div>

            <div class="input_box">
              <div class="input_title">Main Contact Department</div>
              <el-input
                placeholder=""
                size="medium"
                v-model="formLabelAlign.contact_department">
              </el-input>
            </div>

            <div class="input_box">
              <div class="input_title">Main Contact Phone</div>
              <el-input
                placeholder=""
                size="medium"
                v-model="formLabelAlign.contact_phone">
              </el-input>
            </div>

        </el-col>

        <el-col :xs="{span: 20, offset: 2}" :sm="{span: 8, offset: 1}" >

            <div class="input_box">
              <div class="input_title">Registration Address</div>
              <el-input
                placeholder=""
                size="medium"
                v-model="formLabelAlign.registration">
              </el-input>
            </div>

            <div class="input_box">
              <div class="input_title">City</div>
              <el-input
                placeholder=""
                size="medium"
                v-model="formLabelAlign.city">
              </el-input>
            </div>

            <div class="input_box">
              <div class="input_title">Country</div>
              <el-input
                placeholder=""
                size="medium"
                v-model="formLabelAlign.country">
              </el-input>
            </div>

            <div class="input_box">
              <div class="input_title">Industry Sector</div>
              <el-input
                placeholder=""
                size="medium"
                v-model="formLabelAlign.industry_sector">
              </el-input>
            </div>

            <div class="input_box">
              <div class="input_title">Main Contact Job Title</div>
              <el-input
                placeholder=""
                size="medium"
                v-model="formLabelAlign.job_title">
              </el-input>
            </div>

            <div class="input_box">
              <div class="input_title">Main Contact Email</div>
              <el-input
                placeholder=""
                size="medium"
                v-model="formLabelAlign.contact_email">
              </el-input>
            </div>

            <div class="input_box">
              <div class="input_title">AP / Invoice Email</div>
              <el-input
                placeholder=""
                size="medium"
                v-model="formLabelAlign.invoice_email">
              </el-input>
            </div>

            <el-button type="primary" @click="onSubmit()">Save</el-button>
            <el-button   >
              <router-link to="/Home">Cancel</router-link>
            </el-button>
          <div style="padding: 50px;"></div>

        </el-col>
      </el-row>

    </el-form>
    </div>

  </div>
</template>

<script>

  import Breadcrumb from '@/components/Breadcrumb'
  import { mapGetters } from 'vuex'
  import { addCompany } from '@/api/user'
  import { seeCompany } from '@/api/user'

  export default {
    data() {
      return {
        formLabelAlign: {
          company_name: '',
          registration: '',
          mailing: '',
          city:'',
          province:'',
          country:'',
          industry_sector:'',
          zip_code:'',
          contact_name:'',
          contact_department:'',
          job_title:'',
          contact_email:'',
          contact_phone:'',
          invoice_email:''

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
        seeCompany(this.user_id).then(response => {
          if (response.code == '1'){
            console.log(response);
            this.formLabelAlign.user_id = this.user_id;
            this.formLabelAlign.company_name = response.data['company_name'];
            this.formLabelAlign.registration = response.data['registration'];
            this.formLabelAlign.mailing = response.data['mailing'];
            this.formLabelAlign.city = response.data['city'];
            this.formLabelAlign.industry_sector = response.data['industry_sector'];
            this.formLabelAlign.province = response.data['province'];
            this.formLabelAlign.country = response.data['country'];
            this.formLabelAlign.zip_code = response.data['zip_code'];
            this.formLabelAlign.contact_name = response.data['contact_name'];
            this.formLabelAlign.contact_department = response.data['contact_department'];
            this.formLabelAlign.job_title = response.data['job_title'];
            this.formLabelAlign.contact_email = response.data['contact_email'];
            this.formLabelAlign.contact_phone = response.data['contact_phone'];
            this.formLabelAlign.invoice_email = response.data['invoice_email'];
          }
        }).catch(() => {
          this.loading = false
        });
      },
      onSubmit(){
        console.log(this.formLabelAlign);
        addCompany(this.formLabelAlign).then(response => {
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
