<template>
  <div class="box">
    <breadcrumb class="breadcrumb-container" />
    <!--  <Remindtext  ></Remindtext>-->
    <step></step>
    <div class="fc-content-market">
      <div class="fc-title-left" style="width: 100%;">
        <span>Market</span>
        <span class="fc-form-item-title-span2">( If your project involves multiple methodologies,
                    please select. )</span>
      </div>
      <div class="fc-inline-left fc-content-marketInput">
        <el-checkbox-group v-model="areaForm.confirmArea" size="small">
          <div class="apac-box areaForm-item">
            <div class="fc-inline-left-title">APAC</div>
            <div class="apac-check">
              <el-checkbox label="China（mainland）" border ></el-checkbox>
              <el-checkbox label="Hong Kong" border></el-checkbox>
              <el-checkbox label="Japan" border></el-checkbox>
              <el-checkbox label="Macau" border></el-checkbox>
              <el-checkbox label="Taiwan" border></el-checkbox>
            </div>
            <div class="apac-check">
              <el-checkbox label="Malaysia" border></el-checkbox>
              <el-checkbox label="Philippines" border></el-checkbox>
              <el-checkbox label="Singapore" border></el-checkbox>
              <el-checkbox label="South Korea" border></el-checkbox>
              <el-checkbox label="Thailand" border></el-checkbox>
            </div>
            <div class="apac-check">
              <el-checkbox label="India" border></el-checkbox>
              <el-checkbox label="Indonesia" border></el-checkbox>
              <el-checkbox label="Vietnam" border></el-checkbox>
            </div>
          </div>
          <div class="eu-box areaForm-item">
            <div class="fc-inline-left-title">EU</div>
            <div class="eu-check">
              <el-checkbox label="France" border></el-checkbox>
              <el-checkbox label="Germany" border></el-checkbox>
              <el-checkbox label="Italy" border></el-checkbox>
              <el-checkbox label="Spain" border></el-checkbox>
              <el-checkbox label="UK" border ></el-checkbox>
            </div>
          </div>
          <div class="latam-box areaForm-item">
            <div class="fc-inline-left-title">LATAM</div>
            <div class="latam-check">
              <el-checkbox label="Argentina" border></el-checkbox>
              <el-checkbox label="Brazil" border ></el-checkbox>
              <el-checkbox label="Columbia" border></el-checkbox>
              <el-checkbox label="Mexico" border></el-checkbox>
            </div>
          </div>
          <div class="na-box areaForm-item">
            <div class="fc-inline-left-title">NA</div>
            <div class="na-check">
              <el-checkbox label="Canada" border></el-checkbox>
              <el-checkbox label="US" border ></el-checkbox>
            </div>
          </div>
          <div class=" areaForm-item">
            <div class="fc-inline-left-title">Other，specify</div>
            <div style="width: 60%;margin-top: 10px;">
              <el-input v-model="areaForm.othersArea" placeholder="Kroea,Russia" @change='handleothersArea'></el-input>
              <span class="fc-form-item-title-span2" style="margin-top: 5px;display: inline-block;" >( Please separate multiple areas by "," ).</span>
            </div>
          </div>
        </el-checkbox-group>
      </div>
    </div>
    <div class="saveBtn">
      <el-button type="primary" style="width: 200px;" @click="saveProjectMarket">Save</el-button>
    </div>

  </div>
</template>

<script>
  import Breadcrumb from '@/components/Breadcrumb'
  import Remindtext from '@/components/Remindtext'
  import $ from 'jquery'
  import Step from '@/components/Step'
  import { addCountry } from '@/api/quota'
  import { projectInformation } from '@/api/quota'


  export default {
    name: 'set-project-market',
    data(){
      return {
        methodology_type:'',
        areaForm: {
          confirmArea:[],
          othersArea:'',
        },
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
    watch:{
      // this.methodology_type
    },
    mounted(){
      var project_methodologyType = this.$cookie.getCookie('project_methodologyType');
      $('#step').step({
        index:'2',
        stepDirection:'x',
        showStepButton:true,
        stepCount:6,
        type:project_methodologyType,
        stepTitles:['Project Overview','Methodology','Market','Fieldwork Services',' Additional Services','Review'],
      })

    },
    methods:{
      // 页面初始化
      init(){
        // cookie中没有项目编号进行跳转
        var projectNumber = this.$cookie.getCookie('project_number');
        var met_id = this.$cookie.getCookie('methodology_id');

        if (projectNumber == null || met_id == null){
          this.$router.push({
            name: 'new-enquiry',  // 路由的名称
            query: {
            }
          });
          return false;
        }else{
          const loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
          // 页面初始化
          projectInformation(projectNumber).then(response => {
            if(response.code == '1'){
              console.log(response);
              this.methodology_type=response.data.type;
              console.log(this.methodology_type);
              var arr = response.data.method;
              for(var i=0;i<arr.length;i++){
                if (met_id == arr[i].id){
                  this.areaForm.confirmArea=arr[i].country.split(',');
                  this.areaForm.othersArea=arr[i].other_country;
                }
              }
            }
          }).catch(() => {
            this.loading = false
          });
          loading.close();
        }
      },
      handleothersArea(value){
        var arr = value.split(',');
        var arr2 = this.areaForm.confirmArea;
      },
      saveProjectMarket(){
        var marketArr = Array.from(this.areaForm.confirmArea);
        console.log(marketArr.length);
        // return false;

        if(marketArr.length < 1 && this.areaForm.othersArea == ''){
          this.$alert('Please select the project market.', '', {
            confirmButtonText: 'confirm',
          });
          return false;
        }else{

          var met_id = this.$cookie.getCookie('methodology_id');
          var project_methodologyType = this.$cookie.getCookie('project_methodologyType');
          var marketArr2 = marketArr.join(',');
          var otherCity = this.areaForm.othersArea
          console.log(met_id);
          console.log(this.areaForm.othersArea);
          console.log(marketArr2);
          // return  false;
          addCountry(met_id,otherCity,marketArr2).then(response => {
            if (response.code == '1'){
                // console.log(response);
                if(project_methodologyType == '1'){
                    this.$router.push({
                    name: 'set-qualitative-fieldwork',  // 路由的名称
                  })
                }else if(project_methodologyType == '2'){
                  this.$router.push({
                    name: 'set-quantitative-fieldwork',  // 路由的名称
                  })
                }


            }
          }).catch(() => {
            this.loading = false
          });
        }

        // console.log(this.areaForm.confirmArea);
      }
    }
  }
</script>

<style scoped>
  .box{
    width: 900px;
    padding-bottom: 100px;
  }
  .setBackgroundForm{
    width: 600px;
    margin: 30px auto;
  }
  .saveBtn{
    width: 100%;
    text-align: center;
  }

  .fc-content-market{
    width: 95%;
    margin-left: 5%;
    margin-top: 30px;
  }

  .fc-title-left{
    float: left;
    margin-right: 10px;
    line-height: 40px;
    font-size: 16px;
  }
  .fc-inline-left{
    float: left;
  }

  .fc-inline-left-title{
    font-size: 14px;
    color: #2D3E48;
    margin-bottom: 5px;
  }
  .areaForm-item{
    margin-top: 15px;
  }
  .fc-form-item-title-span2{
    font-size: 14px;
    color: red;
  }
  .apac-check{
    margin-bottom: 10px;
  }
  .saveBtn{
    clear: both;
    width: 95%;
    padding-top: 30px;
    margin-left: 5%;
    text-align: left;
  }

</style>
