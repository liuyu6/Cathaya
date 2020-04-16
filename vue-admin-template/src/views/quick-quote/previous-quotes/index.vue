<template>
  <div>
    <breadcrumb class="breadcrumb-container" />
    <div class="content">
      <p>If you'd like to activate this quick quote function, please contact our bidding team by clicking the "Activation Request"
        button below. Please make sure you provide correct email or phone information in your account profile.
        We look forward to hearing from you soon!</p>
      <el-button  type="primary" style="margin-bottom:10px;background-color: #3B7394;" @click="open">Activation Request</el-button>
    </div>
    <div class="form-content">
          这是表单
    </div>
  </div>
</template>

<script>

  import Breadcrumb from '@/components/Breadcrumb'
  import $ from 'jquery'

  export default {
    data() {
      return {

      }
    },
    components: {
      Breadcrumb,
    },
    mounted(){
      this.Openpermission('1');
    },

    methods:{
      Openpermission(code){
          if(code == '1'){
            $('.content').css('display','none');
            $('.form-content').css('display','block');
          }else{
            $('.form-content').css('display','none');
            $('.content').css('display','block');
          }
      },
      open() {
        this.$alert('If you\'d like to activate this quick quote function, ' +
          'please contact our bidding team by clicking the "Activation Request" ' +
          'button below. Please make sure you provide correct email or phone information in your account profile.  ' +
          'We look forward to hearing from you soon!', '', {
          confirmButtonText: 'Confirm',
          callback: action => {
            // this.$message({
            //   type: 'info',
            //   message: `action: ${ action }`
            // });
          }
        });
      }
    },

  }
</script>

<style scoped>
  .content{
    width: 80%;
    margin: 10% auto;
    text-align: center;
    font-size: 18px;
    line-height: 25px;
    color: #2D3E48;
  }
  .form-content{
    display: none;
  }
  @media screen and (max-width: 600px){
    .content{
      width: 90%;
      margin: 10% auto;
      text-align: center;
    }
  }
</style>
