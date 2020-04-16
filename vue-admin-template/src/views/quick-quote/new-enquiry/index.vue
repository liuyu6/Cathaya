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
      <div class="fc-header">
        <span style="color: red;">*</span>
        <span>If you have any questions or enquiries, please
        also feel free to contact our bidding team directly at</span>
        <span style="color: #407392;">quotes@cathayaresearch.com </span><span>We will respond within 24 hours.</span>
      </div>
      <div class="fc-middle">
          <div class="fc-item">
            <div class="fc-title-left">Project Name</div>
            <div class="fc-inline-left">
              <el-input
                type="text"
                placeholder=""
                v-model="baseInfo.project_name">
              </el-input>
            </div>
          </div>
          <div class="fc-item">
            <div class="fc-title-left">Background & Objectives</div>
            <div class="fc-inline-left">
              <el-input
                type="textarea"
                :rows="4"
                placeholder=""
                style="width: 500px;"
                v-model="baseInfo.project_background">
              </el-input>
            </div>
          </div>
          <div class="fc-item">
            <div class="fc-title-left" style="width: 100%;">
              <span>Market</span>
              <span class="fc-form-item-title-span2">( *If your project involves multiple methodologies,
                    please select. )</span>
            </div>
            <div class="fc-inline-left">
              <div class="fc-form-item-area">
                <div class="fc-form-item-area-title">APAC</div>
                <el-checkbox-group v-model="fcForm.apacMarketsChecked" size="mini" >
                  <el-checkbox-button v-for="area in fcForm.apacOptions1"    :label="area" :key="area">{{area}}</el-checkbox-button>
                </el-checkbox-group>
                <el-checkbox-group v-model="fcForm.apacMarketsChecked" size="mini" style="margin-top: 10px;">
                  <el-checkbox-button v-for="area in fcForm.apacOptions2"    :label="area" :key="area">{{area}}</el-checkbox-button>
                </el-checkbox-group>
              </div>
              <div class="fc-form-item-area" style="float:left;margin-right: 30px;">
                <div class="fc-form-item-area-title">NA</div>
                <el-checkbox-group v-model="fcForm.naMarketsChecked" size="mini" style="margin-top: 10px;">
                  <el-checkbox-button v-for="area in fcForm.naOptions"    :label="area" :key="area">{{area}}</el-checkbox-button>
                </el-checkbox-group>
              </div>
              <div class="fc-form-item-area" >
                <div class="fc-form-item-area-title">EU</div>
                <el-checkbox-group v-model="fcForm.euMarketsChecked" size="mini" style="margin-top: 10px;">
                  <el-checkbox-button v-for="area in fcForm.euOptions"    :label="area" :key="area">{{area}}</el-checkbox-button>
                </el-checkbox-group>
              </div>
              <div class="fc-form-item-area">
                <div class="fc-form-item-area-title">LATAM</div>
                <el-checkbox-group v-model="fcForm.latamMarketsChecked" size="mini" style="margin-top: 10px;">
                  <el-checkbox-button v-for="area in fcForm.latamOptions"    :label="area" :key="area">{{area}}</el-checkbox-button>
                </el-checkbox-group>
              </div>
              <div class="fc-form-item-area">
                <div class="fc-form-item-area-title">Other，specify</div>
                <el-input v-model="fcForm.otherMarkets" placeholder="placeholder" style="width: 50%"></el-input>
              </div>

            </div>
          </div>
          <div class="fc-item">
          <div class="fc-title-left">Methodology Type:</div>
          <div class="fc-inline-left">
            <el-radio-group v-model="baseInfo.methodology_type" @change="changeHandler">
              <el-radio  label="1" style="line-height: 40px;">Qualitative</el-radio>
              <el-radio  label="2" style="line-height: 40px;">Quantitative</el-radio>
            </el-radio-group>

          </div>
        </div>
          <div>
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="China（mainland）" name="first"></el-tab-pane>
              <el-tab-pane label="Japan" name="second"></el-tab-pane>
              <el-tab-pane label="Canada" name="third"></el-tab-pane>
              <el-tab-pane label="Columbia" name="fourth"></el-tab-pane>
              <el-tab-pane label="Hong Kong" name="fourth1"></el-tab-pane>
              <el-tab-pane label="Macau" name="fourth2"></el-tab-pane>
              <el-tab-pane label="South Korea" name="fourth3"></el-tab-pane>
              <el-tab-pane label="Singapore" name="fourth4"></el-tab-pane>
              <el-tab-pane label="Thailand" name="fourth5"></el-tab-pane>
              <el-tab-pane label="Malaysia" name="fourth6"></el-tab-pane>
              <el-tab-pane label="Philippines" name="fourth7"></el-tab-pane>
              <el-tab-pane label="Other，specify" name="fourth8"></el-tab-pane>
            </el-tabs>
          </div>
          <div class="fc-form fc-qual">
            <div class="project-background fc-form-content">
              <div class="fc-form-title">Project Background</div>
              <div class="fc-form-item">
                <div class="fc-form-item-title">
                  <span>Methodology </span>
                  <span class="fc-form-item-title-span2">( *If your project involves multiple methodologies,
                    please select. )</span>
                </div>
                <el-checkbox-group v-model="fcForm.methodology" size="small" @change="handleMethodologyChange">
                  <el-checkbox-button label="IDI"></el-checkbox-button>
                  <el-checkbox-button label="TDI"></el-checkbox-button>
                  <el-checkbox-button label="Dyad"></el-checkbox-button>
                  <el-checkbox-button label="Trio"></el-checkbox-button>
                  <el-checkbox-button label="Mini-Focus Group"></el-checkbox-button>
                  <el-checkbox-button label="Focus Group"></el-checkbox-button>
                  <el-checkbox-button label="In home/context Ethnography"></el-checkbox-button>
                  <el-checkbox-button label="Desk Research"></el-checkbox-button>
                  <el-checkbox-button label="Other"></el-checkbox-button>
                </el-checkbox-group>
              </div>
            </div>
            <div class="project-scope fc-form-content">
              <div class="fc-form-title">Project Scope</div>
              <div class="fc-form-title2">Service Items / Deliverables:</div>
              <div class="project-scope-additional">
                <span class="project-scope-additional-title">Fieldwork Cost (including sample, recruiting, incentive & incentive handlng fees)</span>
                <el-checkbox v-model="fcForm.additional" @change='handleAdditionalChange' ></el-checkbox>

                <div class="additional-form">
                  <div class="add-respondents">
                    <el-button type="text" ><i class="el-icon-circle-plus-outline"> </i> Add Anogher Type of Respondents</el-button>
                  </div>
                  <el-form ref="form" :model="additionalForm" class="additionalForm">
                    <el-form-item label="">
                      <label class="additional-form-label">Type of Respondents</label>
                      <el-select v-model="additionalForm.region" placeholder="" class="additional-form-select">
                        <el-option label="B2C (consumers)" value="shanghai"></el-option>
                        <el-option label="B2B (business decision makers or professionals)" value="beijing"></el-option>
                        <el-option label="Medical practitioners (e.g. physicians, nurses)" value="beijing2"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-form>
                </div>
              </div>
            </div>
            <div class="fc-form-item">
              <el-row style="margin-top: 30px;margin-left: 20px;">
                <el-button :loading="false">Save</el-button>
                <el-button type="primary" :loading="false">Submit Request</el-button>
              </el-row>
              <div class="fc-form-item-area-remind">
                Please provide more details on your project requirements & scope, our bidding team will get back to you shortly.
              </div>
            </div>

          </div>


      </div>
    </div>
    <div class="footer" style="padding-bottom: 50px;"></div>
  </div>
</template>

<script>

  import Breadcrumb from '@/components/Breadcrumb'
  import $ from 'jquery'

  const apacOptions1 = ['China（mainland）', 'Taiwan', 'Hong Kong', 'Macau', 'Japan', 'South Korea'];
  const apacOptions2 = [ 'Singapore', 'Thailand', 'Malaysia',
    'Philippines', 'Indonesia', 'Vietnam', 'India'];
  const naOptions = [ 'US', 'Canada'];
  const euOptions = [ 'UK', 'Germany', 'France', 'Italy', 'Spain'];
  const latamOptions = [ 'Brazil', 'Mexico', 'Columbia', 'Argentina'];
  export default {
    data() {
      return {
        activeName: 'second',
        baseInfo: {
          project_name: '',
          project_background: '',
          methodology_type:''
        },
        fcForm: {
          methodology: ['Dyad'],
          apacMarketsChecked: ['Taiwan'],
          apacOptions1:apacOptions1,
          apacOptions2:apacOptions2,
          naMarketsChecked: ['US'],
          naOptions:naOptions,
          euOptions:euOptions,
          euMarketsChecked: ['UK'],
          latamOptions:latamOptions,
          latamMarketsChecked: ['Columbia'],
          otherMarkets:'',
          additional:'',

        },
        additionalForm: {
          region:'',
        },

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
      },
      changeHandler(value) {
        console.log('改变之后的值是:' + value)
      },
      handleMethodologyChange(val) {
        console.log(val);
        var str1="Desk Research";
        var str2="Other";
        var str3="IDI";
        var str4="TDI";
        var str5="In home/context Ethnography";

        if($.inArray(str1,this.fcForm.methodology) == '-1' && $.inArray(str2,this.fcForm.methodology) == '-1'){
          $('.fc-form-item-area-remind').css('display','none');
        }
        if($.inArray(str1,this.fcForm.methodology) > -1 || $.inArray(str2,this.fcForm.methodology) > -1){
          $('.fc-form-item-area-remind').css('display','block');
        }
        if($.inArray(str3,this.fcForm.methodology) > -1 || $.inArray(str4,this.fcForm.methodology) > -1 || $.inArray(str5,this.fcForm.methodology) > -1){
          $('.project-scope').css('display','block');
          console.log('1');
        }else{
          $('.project-scope').css('display','none');
        }

      },
      handleAdditionalChange(val){
          if(val){
            $('.additional-form').css('display','block');
          }else{
            $('.additional-form').css('display','none');
          }
      },
      handleClick(tab, event) {
        console.log(tab, event);
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
    width: 1000px;
    margin-left: 50px;
    display: none;
  }
  .fc-header{
    font-size: 20px;
    font-weight:500;
    line-height:28px;
    margin-bottom: 20px;
  }
  .fc-title-left{
    float: left;
    margin-right: 10px;
    line-height: 40px;
  }
  .fc-inline-left{
    float: left;
  }
  .fc-item{
    overflow: hidden;
    margin-bottom: 20px;
  }
  .fc-form{
    width: 940px;
    padding: 30px;
    height: 800px;
    background:rgba(255,255,255,1);
    box-shadow:3px 3px 10px 0px rgba(199,199,199,1);
    border:1px solid rgba(233,233,233,1);
  }
  .fc-form-title{
    width: 300px;
    font-size: 18px;
    font-weight:500;
    color:rgba(45,62,72,1);
    line-height:28px;
    padding-left: 20px;
    border-left: 3px solid #409EFF;
  }
  .fc-form-item{
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .fc-form-item-title{
    font-size: 16px;
    font-weight:400;
    color:rgba(45,62,72,1);
    line-height:14px;
    margin-bottom: 10px;
  }
  .fc-form-item-title-span2{
    font-size: 12px;
    color: red;
  }
  .fc-form-item-area{
    margin-left: 20px;
    /*float: left;*/
    /*height: 120px;*/
  }
  .fc-form-item-area-title{
    font-size: 14px;
    color:rgba(45,62,72,1);
    margin-bottom: 5px;
    margin-top: 15px;
  }
  .fc-form-item-area-remind{
    margin-left: 20px;
    margin-top: 10px;
    font-size: 12px;
    color: red;
    display: none;
  }
  .project-scope{
    display: none;
  }
  .fc-form-title2{
    font-size: 16px;
    font-weight:500;
    color:rgba(45,62,72,1);
    line-height:20px;
    margin-top: 20px;
  }
  .project-scope-additional{
    margin-top: 20px;
  }
  .project-scope-additional-title{
    font-size: 14px;
    font-weight:500;
    color:rgba(45,62,72,1);
    line-height:20px;
    margin-top: 20px;
    margin-right: 5px;
  }
  .additional-form{
    width: 80%;
    margin-top: 30px;
    margin-left: 20px;
    display: none;
  }
  .additionalForm{
    width: 80%;
    margin-top: 10px;
    margin-left: 20px;
    padding: 20px;
    border: 1px solid #cccccc;

  }
  .additional-form-label{
    font-weight: 500;
    margin-right: 5px;
  }
  .additional-form-select{
    width: 400px;
  }
  @media screen and (max-width: 600px){
    .content{
      width: 90%;
      margin: 10% auto;
      text-align: center;
    }
  }
</style>
