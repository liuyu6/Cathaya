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
            <el-button type="primary" style="width: 200px;">Save</el-button>
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


  export default {
    name: 'set-quote-background',
    data(){
      return{
          setBackgroundForm: {
            project_name:'',
            project_background:''
          }
      }
    },
    components: {
      Breadcrumb,
      Remindtext,
      Step
    },
    mounted(){
      $('#step').step({
        index:'0',
        stepDirection:'x',
        showStepButton:true,
        stepCount:4,
        stepTitles:['Set Project Background','Set Market','Set Methodology','Additional Services Required'],
      })
    },
    methods:{

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
    text-align: center;
  }
</style>
