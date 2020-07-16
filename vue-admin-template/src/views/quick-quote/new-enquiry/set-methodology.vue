<template>
  <div class="box">
    <breadcrumb class="breadcrumb-container" />
    <!--  <Remindtext  ></Remindtext>-->
    <step></step>
    <div class="mcontent">
      <div class="fc-item fc-content-scope">
        <div class="scope-item project-scope">
          <div class="scope-item-info">
            <div>
              <div class="item-info-title">Methodology</div>
              <div class="item-info-box">
                <el-select v-model="methodology"   placeholder="Please Select" @change="changeMethodology" style="width:360px;">
                  <el-option
                    v-for="item in active_methodology"
                    :key="item.value"
                    :disabled="item.disabled"
                    :label="item.label"
                    :value="item.value">
                    <span style="float: left">{{ item.label }}</span>
                    <span style="float: right; color: #C0C4CF; font-size: 13px" v-show="item.remind">selected</span>
                  </el-option>
                </el-select>
              </div>
<!--              <span class="fc-form-item-title-span2" style="margin-left: 5px;">( If your project involves multiple methodologies, please select "Add Another Methodology"-->
<!--                                                after you complete this specs sheet. )</span>-->
            </div>
          </div>

        </div>
        <el-row>
          <el-button class="save-btn" type="primary" @click="submit">Save</el-button>
          <div class="save-btn-remind" v-show="btn_remind">
            <span class="fc-form-item-title-span2">( Please provide more details on your project requirements & scope, our bidding team will get back to you shortly. )</span>
          </div>
        </el-row>
      </div>
    </div>

  </div>
</template>

<script>
  import Breadcrumb from '@/components/Breadcrumb'
  import Remindtext from '@/components/Remindtext'
  import $ from 'jquery'
  import Step from '@/components/Step'
  import { createMethodology } from '@/api/quota'



  export default {
    name: 'set-project-methodology',
    data(){
      return{
        btn_remind:false,
        methodology:'',
        methodology_type:'',
        active_methodology:'',
        qualitative_methodology: [{
          value: 'IDI',
          label: 'IDI',
          disabled:false,
          remind:0,
        },{
          value: 'TDI',
          label: 'TDI',
          disabled:false,
          remind:0,
        },{
          value: 'Dyad',
          label: 'Dyad',
          disabled:false,
          remind:0,
        },{
          value: 'Trio',
          label: 'Trio',
          disabled:false,
          remind:0,
        },{
          value: 'Mini-Focus Group',
          label: 'Mini-Focus Group',
          disabled:false,
          remind:0,
        },{
          value: 'Focus Group',
          label: 'Focus Group',
          disabled:false,
          remind:0,
        },{
          value: 'In home/context Ethnography',
          label: 'In home/context Ethnography',
          disabled:true,
          remind:1,
        },{
          value: 'Desk Research',
          label: 'Desk Research',
          disabled:false,
          remind:0,
        },{
          value: 'Other',
          label: 'Other',
          disabled:false,
          remind:0,
        }],
        quantitative_methodology: [{
          value: 'Online Survey',
          label: 'Online Survey',
          disabled:false,
          remind:0,
        },{
          value: 'CAWI',
          label: 'CAWI',
          disabled:false,
          remind:0,
        },{
          value: 'CATI',
          label: 'CATI',
          disabled:false,
          remind:0,
        },{
          value: 'CLT',
          label: 'CLT',
          disabled:false,
          remind:0,
        },{
          value: 'CAPI',
          label: 'CAPI',
          disabled:false,
          remind:0,
        },{
          value: 'Intercept',
          label: 'Intercept',
          disabled:false,
          remind:0,
        },{
          value: 'Mystery Shopping',
          label: 'Mystery Shopping',
          disabled:true,
          remind:1,
        },{
          value: 'Other',
          label: 'Other',
          disabled:false,
          remind:0,
        }],
      }
    },
    components: {
      Breadcrumb,
      Remindtext,
      Step
    },
    created(){
      // cookie中没有项目编号进行跳转
      var projectNumber = this.$cookie.getCookie('project_number');
      if (projectNumber == null){
        this.$router.push({
          name: 'new-enquiry',  // 路由的名称
          query: {
          }
        });
        return false;
      }

      // 获取项目类型展示对应内容 1是qualitative  2是quantitative
      var projectMeth = this.$cookie.getCookie('project_methodologyType');
      this.methodology_type = this.$cookie.getCookie('project_methodologyType');

      if (projectMeth == '1'){
        this.active_methodology = this.qualitative_methodology;
        return false;
      }
      if (projectMeth == '2'){
        this.active_methodology = this.quantitative_methodology;
        return false;
      }

    },
    mounted(){
      // 步骤条
      $('#step').step({
        index:'1',
        stepDirection:'x',
        showStepButton:true,
        stepCount:6,
        type:this.methodology_type,
        stepTitles:['Project Overview','Methodology','Market','Fieldwork Services',' Additional Services','Review'],
      });
    },
    methods:{

      changeMethodology(item) {
        var val =this.methodology;
        console.log(val);
        if(val == 'Other' || val=='Desk Research'){
          this.btn_remind=true;
              return false;
        }else{
          this.btn_remind=false;
         return false;
        }
      },
      submit(){
        console.log(this.methodology);
        var number = this.$cookie.getCookie('project_number');
        if(this.methodology.length == ''){
          this.$alert('Please Select.', '', {
            confirmButtonText: 'confirm',
          });
          return false;
        }else{
          createMethodology(number,this.methodology).then(response => {
            if (response.code == '1'){
              this.$cookie.setCookie('methodology_id',response.data.id,'1');

              // 设置项目名称
              this.$router.push({
                name: 'set-project-market',  // 路由的名称
              })

            }
          }).catch(() => {
            this.loading = false
          });
        }


      },
    }
  }
</script>

<style scoped>
  .box{
    width: 900px;
  }

  .fc-item{
    overflow: hidden;
    margin-bottom: 20px;
  }

  .fc-form-item-title-span2{
    font-size: 12px;
    color: red;
  }

  .fc-content-scope{
    padding: 15px;
    margin-top: 10px;
  }

  .mcontent{
    width: 96%;
    margin-left: 2%;
  }

  .scope-content{
    margin: 20px auto;
    width: 98%;
    padding-top: 20px;
    padding-bottom: 20px;
    background-color: aliceblue;
    box-shadow: 0px 2px 4px 0px rgba(210,210,210,0.5);
    border: 1px solid rgba(216,216,216,1);
  }

  .scope-item{
    overflow: hidden;
    clear: both;
  }


  .scope-item-info{
    margin-left: 20px;
    margin-top: 30px;
  }
  .item-info-title{
    float: left;
    line-height: 40px;
    margin-right: 10px;
    font-size: 16px;
    color: #2D3E48;
  }
  .item-info-box{
    float: left;
    margin-bottom: 15px;
  }
  .project-scope{
    /*display: none;*/
  }
  .save-btn-remind{
    /*display: none;*/
    margin-top: 5px;
  }

  .mcontent{
    width: 100%;
    clear: both;
  }
  .save-btn{
    margin-top: 30px;
    width: 200px;
  }
  .remove-scope-box{
    float: right;
    color: red;
    font-size: 24px;
    margin-top: -15px;
    margin-right: 5px;
    cursor: pointer;
  }
</style>
