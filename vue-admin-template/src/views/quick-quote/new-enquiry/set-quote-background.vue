<template>
<div class="box">
  <breadcrumb class="breadcrumb-container" />
<!--  <Remindtext  ></Remindtext>-->
  <step></step>
  <div class="setBackgroundForm">
  <el-row :gutter="10">
    <el-col :xs="{span: 20, offset: 2}" :sm="{span: 18, offset: 3}">
      <el-form ref="setBackgroundForm" :model="setBackgroundForm"   auto-complete="on" label-position="left">

        <el-form-item label="Project Name">
          <el-input v-model="setBackgroundForm.project_name"></el-input>
        </el-form-item>

        <el-form-item label="Background & Objectives">
          <el-input type="textarea" v-model="setBackgroundForm.project_background" rows="6"></el-input>
        </el-form-item>
        <div class="saveBtn">
          <el-button type="primary" style="width: 200px;" @click="saveProjectBackground">Save</el-button>
        </div>

      </el-form>
    </el-col>
  </el-row>
</div>
</div>
</template>

<script>
  import Breadcrumb from '@/components/Breadcrumb'
  import Remindtext from '@/components/Remindtext'
  import $ from 'jquery'
  import Step from '@/components/Step'
  import { mapGetters } from 'vuex'
  import { createEnquiry } from '@/api/quota'
  import { projectServices } from '@/api/quota'
  import { projectInformation } from '@/api/quota'


  export default {
    name: 'set-quote-background',
    data(){
      return{
          methodology_type:'',
          setBackgroundForm: {
            project_name:'',
            project_background:''
          }
      }
    },
    created(){
      this.init();
    },

    components: {
      Breadcrumb,
      Remindtext,
      Step
    },
    computed: {
      ...mapGetters([
        'user_id',
        'name'
      ])
    },
    mounted(){
      $('#step').step({
        index:'0',
        stepDirection:'x',
        showStepButton:true,
        stepCount:6,
        type:this.methodology_type,
        stepTitles:['Project Overview','Methodology','Market','Fieldwork Services',' Additional Services','Review'],
      });
    },
    methods:{
      // 页面初始化
      init(){
        // cookie中没有项目编号进行跳转
        var projectNumber = this.$cookie.getCookie('project_number');
        if (projectNumber == null){
          this.$router.push({
            name: 'new-enquiry',  // 路由的名称
            query: {
            }
          });
          return false;
        }else{
          // 页面初始化
          projectInformation(projectNumber).then(response => {
            console.log(response);
            if(response.code == '1'){
              // if(response.data['steps']=='null'){
              //   this.$router.push({
              //     name: 'set-quote-background',  // 路由的名称
              //   })
              // }
              this.setBackgroundForm.project_name = response.data.project_name;
              this.setBackgroundForm.project_background = response.data.content;
            }
          }).catch(() => {
            this.loading = false
          });
        }
      },
      saveProjectBackground(){
        // 获取项目编号
        var number = this.$cookie.getCookie('project_number');
        var project_name = this.setBackgroundForm.project_name;
        var content = this.setBackgroundForm.project_background;
        console.log(number);
        console.log(project_name);
        console.log(content);

        if(project_name == ''){
          this.$alert('Please fill in the project name.', '', {
            confirmButtonText: 'confirm',
          });
          return false;
        }else{
          const loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
          createEnquiry(number,content,project_name).then(response => {
            if (response.code == '1'){

              // 设置项目名称
              this.$router.push({
                name: 'set-methodology',  // 路由的名称
                query: {
                  'number':number
                }
              })

            }
          }).catch(() => {
            this.loading = false
          });
          loading.close();
        }

      }

    }
  }
</script>

<style scoped>
  .box{
    width: 900px;
  }
  .setBackgroundForm{
    width: 600px;
    margin-top: 30px;
  }
  .saveBtn{
    width: 100%;
    text-align: left;
  }
</style>
