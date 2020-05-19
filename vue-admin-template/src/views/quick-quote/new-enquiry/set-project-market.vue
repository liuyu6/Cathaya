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
        <el-checkbox-group v-model="areaForm.confirmArea" size="small" @change='handleClick'>
          <div class="apac-box areaForm-item">
            <div class="fc-inline-left-title">APAC</div>
            <div class="apac-check">
              <el-checkbox label="China（mainland）" border ></el-checkbox>
              <el-checkbox label="Taiwan" border></el-checkbox>
              <el-checkbox label="Hong Kong" border></el-checkbox>
              <el-checkbox label="Macau" border></el-checkbox>
              <el-checkbox label="Japan" border></el-checkbox>
            </div>
            <div class="apac-check">
              <el-checkbox label="South Korea" border></el-checkbox>
              <el-checkbox label="Singapore" border></el-checkbox>
              <el-checkbox label="Thailand" border></el-checkbox>
              <el-checkbox label="Malaysia" border></el-checkbox>
              <el-checkbox label="Philippines" border></el-checkbox>
            </div>
            <div class="apac-check">
              <el-checkbox label="Indonesia" border></el-checkbox>
              <el-checkbox label="Vietnam" border></el-checkbox>
              <el-checkbox label="India" border></el-checkbox>
            </div>
          </div>
          <div class="na-box areaForm-item">
            <div class="fc-inline-left-title">NA</div>
            <div class="na-check">
              <el-checkbox label="US" border ></el-checkbox>
              <el-checkbox label="Canada" border></el-checkbox>
            </div>
          </div>
          <div class="eu-box areaForm-item">
            <div class="fc-inline-left-title">EU</div>
            <div class="eu-check">
              <el-checkbox label="UK" border ></el-checkbox>
              <el-checkbox label="Germany" border></el-checkbox>
              <el-checkbox label="France" border></el-checkbox>
              <el-checkbox label="Italy" border></el-checkbox>
              <el-checkbox label="Spain" border></el-checkbox>
            </div>
          </div>
          <div class="latam-box areaForm-item">
            <div class="fc-inline-left-title">LATAM</div>
            <div class="latam-check">
              <el-checkbox label="Brazil" border ></el-checkbox>
              <el-checkbox label="Mexico" border></el-checkbox>
              <el-checkbox label="Columbia" border></el-checkbox>
              <el-checkbox label="Argentina" border></el-checkbox>
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
      <el-button type="primary" style="width: 200px;">Save</el-button>
    </div>

  </div>
</template>

<script>
  import Breadcrumb from '@/components/Breadcrumb'
  import Remindtext from '@/components/Remindtext'
  import $ from 'jquery'
  import Step from '@/components/Step'


  export default {
    name: 'set-project-market',
    data(){
      return {
        areaForm: {
          confirmArea:['Taiwan','Japan'],
          othersArea:'',
        },
      }
    },
    components: {
      Breadcrumb,
      Remindtext,
      Step
    },
    mounted(){
      $('#step').step({
        index:'1',
        stepDirection:'x',
        showStepButton:true,
        stepCount:4,
        stepTitles:['Set Project Background','Set Market','Set Methodology','Additional Services Required'],
      })
    },
    methods:{
      handleothersArea(value){
        var arr = value.split(',');
        var arr2 = this.areaForm.confirmArea;
      },
      handleClick(val) {
        var val2 = '';
        var str = this.areaForm.othersArea;
        var arr = str.split(',');
        val2 = val.concat(arr);
        console.log(val2);
        console.log(this.activeName);
      },
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
