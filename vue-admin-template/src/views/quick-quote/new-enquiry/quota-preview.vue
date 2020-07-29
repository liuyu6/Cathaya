<template>
  <div class="box">
    <breadcrumb class="breadcrumb-container" />
      <Remindtext  ></Remindtext>

    <el-collapse v-model="activeNames" @change="handleChange" style="width: 90%;margin-left: 5%;margin-top: 30px;">
      <el-collapse-item title="Project Overview" name="1">
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

              </el-form>
            </el-col>
          </el-row>
        </div>
      </el-collapse-item>
      <el-collapse-item title="Methodology" name="3">
        <div class="fc-item fc-content-scope">
          <div class="scope-item project-scope">
            <div class="scope-item-info">
              <div>
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
              </div>
            </div>
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item title="Market" name="2">
        <div class="fc-content-market">
          <div class="fc-inline-left fc-content-marketInput">
            <el-checkbox-group v-model="areaForm.confirmArea" size="small">
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
      </el-collapse-item>
      <el-collapse-item title="Fieldwork" name="4">
        <div class="mcontent">
          <div class="fc-item fc-content-scope">
            <!--        已选择国家-->
            <el-tabs type="border-card" v-model="activeName" @tab-click="handleCheck" :before-leave="beforeLeaveTab" @tab-remove="removeTab" class="areaScope">
              <el-tab-pane
                v-for="(item, index) in areaScope"
                :key="item.name"
                :label="item.title"
                :name="item.name"
              >
              </el-tab-pane>


              <el-form ref="" v-model="scopeList" >

                <div class="scope-content"  v-for="(domain, index) in scopeList">
                  <div class="scope-item project-scope">
                    <div class="scope-item-info scope-service">
                      <div class="item-info-box cost-content">
                        <div>
                          <el-checkbox v-model="domain.fieldworkCost" :key="domain.index" @change="changeFieldword(domain)" ></el-checkbox>
                          <span class="fieldwork-title"> Fieldwork Cost (including sample, recruiting, incentive & incentive handlng fees)</span>
                        </div>

                        <div class="cost-cc" v-for="(v,i) in domain.fieldworkCostArr" v-show="domain.fieldworkCost">
                          <div class="cost-box" >
                            <div class="cost-box-item">
                              <span class="cost-box-item-title">Type of Respondents:</span>
                              <el-select v-model="v.typeRespondents" :key="v.i" placeholder="" @change="changeTypeRespondents(domain,v)">
                                <el-option label="B2C (consumers)" value="B2C (consumers)"></el-option>
                                <el-option label="B2B (business decision makers or professionals)" value="B2B (business decision makers or professionals)"></el-option>
                                <el-option label="Medical practitioners (e.g. physicians, nurses)" value="Medical practitioners (e.g. physicians, nurses)"></el-option>

                              </el-select>
                            </div>
                            <div class="cost-box-item">
                              <span class="cost-box-item-title">Specific Recruiting Criteria:</span>
                              <div style="width: 200px;display: inline-block;">
                                <el-input v-model="v.specificRecruiting" :key="v.i" placeholder=""></el-input>
                              </div>

                            </div>


                            <div class="cost-box-s1">
                              <div class="cost-box-item oneIR">
                                <span class="cost-box-item-title">Estimated IR / Recruiting Difficulty:</span>
                                <el-select v-model="v.one_IR" :key="v.i" placeholder="">
                                  <el-option label="<1%" value="<1%"></el-option>
                                  <el-option label="1-5%" value="1-5%"></el-option>
                                  <el-option label="6-10%" value="6-10%"></el-option>
                                  <el-option label="11-20%" value="11-20%"></el-option>
                                  <el-option label="21-30%" value="21-30%"></el-option>
                                  <el-option label="31-50%" value="31-50%"></el-option>
                                  <el-option label="51-80%" value="51-80%"></el-option>
                                  <el-option label=">80%" value=">80%"></el-option>

                                </el-select>
                              </div>

                              <div class="cost-box-item oneTargetType">
                                <span class="cost-box-item-title">Target Type of Practitioners:</span>
                                <el-select v-model="v.one_targetType" :key="v.i" placeholder="">
                                  <el-option label="Physicians (GP/PCP/HCP)" value="Physicians (GP/PCP/HCP)"></el-option>
                                  <el-option label="Physician Specialists (e.g. Oncologists, Cardiologists, Dermatologists)" value="Physician Specialists (e.g. Oncologists, Cardiologists, Dermatologists)"></el-option>
                                  <el-option label="Nurses" value="Nurses"></el-option>
                                  <el-option label="Pharmacists" value="Pharmacists"></el-option>
                                  <el-option label="Hospital Procurement / Management" value="Hospital Procurement / Management"></el-option>
                                  <el-option label="KOLs" value="KOLs"></el-option>
                                  <el-option label="Payers" value="Payers"></el-option>
                                  <el-option label="Lab Managers/Directors" value="Lab Managers/Directors"></el-option>

                                </el-select>
                              </div>

                              <div class="cost-box-item">
                                <span class="cost-box-item-title">Length of Interview:</span>
                                <el-select v-model="v.one_lengthInterview" :key="v.i" placeholder="">
                                  <el-option  value="30 minutes"></el-option>
                                  <el-option  value="45 minutes"></el-option>
                                  <el-option  value="60 minutes"></el-option>
                                  <el-option  value="90 minutes"></el-option>
                                  <el-option  value="2 hours"></el-option>
                                  <el-option  value="2.5 hours"></el-option>
                                  <el-option  value="3 hours"></el-option>
                                </el-select>
                              </div>
                              <div class="cost-box-item">
                                <span class="cost-box-item-title">Sample Size:</span>
                                <div style="width: 200px;display: inline-block;">
                                  <el-input v-model="v.one_sampleSize" :key="v.i" type="number"></el-input>
                                </div>

                              </div>
                            </div>

                            <div class="cost-box-s2">
                              <div class="cost-box-item groupIR">
                                <span class="cost-box-item-title">Estimated IR / Recruiting Difficulty:</span>
                                <el-select v-model="v.group_IR" :key="v.i" placeholder="">
                                  <el-option label="<1%" value="<1%"></el-option>
                                  <el-option label="1-5%" value="1-5%"></el-option>
                                  <el-option label="6-10%" value="6-10%"></el-option>
                                  <el-option label="11-20%" value="11-20%"></el-option>
                                  <el-option label="21-30%" value="21-30%"></el-option>
                                  <el-option label="31-50%" value="31-50%"></el-option>
                                  <el-option label="51-80%" value="51-80%"></el-option>
                                  <el-option label=">80%" value=">80%"></el-option>

                                </el-select>
                              </div>
                              <div class="cost-box-item groupTargetType">
                                <span class="cost-box-item-title">Target Type of Practitioners:</span>
                                <el-select v-model="v.group_targetType" :key="v.i" placeholder="">
                                  <el-option value="Physicians (GP/PCP/HCP)"></el-option>
                                  <el-option value="Physician Specialists (e.g. Oncologists, Cardiologists, Dermatologists)"></el-option>
                                  <el-option value="Nurses"></el-option>
                                  <el-option value="Pharmacists"></el-option>
                                  <el-option value="Hospital Procurement / Management"></el-option>
                                  <el-option value="KOLs"></el-option>
                                  <el-option value="Payers"></el-option>
                                  <el-option value="Lab Managers/Directors"></el-option>
                                </el-select>
                              </div>

                              <div class="cost-box-item">
                                <span class="cost-box-item-title">Length of Interview:</span>
                                <el-select v-model="v.group_lengthInterview" :key="v.i" placeholder="">
                                  <el-option  value="60 minutes"></el-option>
                                  <el-option  value="90 minutes"></el-option>
                                  <el-option  value="2 hours"></el-option>
                                  <el-option  value="2.5 hours"></el-option>
                                  <el-option  value="3 hours"></el-option>
                                  <el-option  value="4 hours"></el-option>
                                </el-select>
                              </div>
                              <div class="cost-box-item">
                                <span class="cost-box-item-title">Number of Respondents per Group:</span>
                                <el-select v-model="v.group_numberRespondentsGroup" :key="v.i" placeholder="">
                                  <el-option  value="2"></el-option>
                                  <el-option  value="3"></el-option>
                                  <el-option  value="4"></el-option>
                                  <el-option  value="5"></el-option>
                                  <el-option  value="6"></el-option>
                                  <el-option  value="7"></el-option>
                                  <el-option  value="8"></el-option>
                                  <el-option  value="9"></el-option>
                                  <el-option  value="10"></el-option>
                                </el-select>
                              </div>
                              <div class="cost-box-item">
                                <span class="cost-box-item-title">Number of Groups in Total:</span>
                                <div style="width: 200px;display: inline-block;">
                                  <div style="width: 200px;display: inline-block;">
                                    <el-input v-model="v.group_numberGroupsTotal" :key="v.i" placeholder="" type="number"></el-input>
                                  </div>
                                </div>
                              </div>
                            </div>

                          </div>
                          <div  class="remove-cost-box"  v-show="i > 0 " :key="v.i" @click="removeCostContent(domain,v)"><i class="el-icon-remove"></i></div>
                        </div>
                        <div class="item-info-box add-cost-content">
                          <div :key="domain.index" @click="addCostContent(domain)" v-show="domain.fieldworkCost"><i class="el-icon-circle-plus"></i> Add Anogher Type of Respondents</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </el-form>
            </el-tabs>
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item title="Additional Services" name="5">
        <div class="mcontent">
          <div class="fc-item fc-content-scope">
            <el-tabs type="border-card" v-model="activeName" @tab-click="handleCheck" :before-leave="beforeLeaveTab" @tab-remove="removeTab" class="areaScope">
              <el-tab-pane
                v-for="(item, index) in areaScope"
                :key="item.name"
                :label="item.title"
                :name="item.name"
              >

                <el-form ref="" v-model="scopeList" >

                  <div class="scope-content"  v-for="(domain, index) in scopeList">
                    <div  class="remove-scope-box"  v-show="index > 0 " :key="domain.index" @click="removeScopeContent(domain)"><i class="el-icon-remove"></i></div>
                    <div class="scope-item project-scope">

                      <div class="scope-item-info scope-service">

                        <div class="item-info-box additional-Services">
                          <span class="fieldwork-title" >Additional Services Required:</span>
                          <el-checkbox-group v-model="domain.additionalServices" :key="domain.index" @change="changeAdditionalServices(domain)"  style="margin-top: 10px;">
                            <div style="margin-bottom: 10px;">
                              <el-checkbox  label="Design of Questionnaire" border></el-checkbox>
                            </div>
                            <div style="margin-bottom: 10px;">
                              <el-checkbox  label="Translation" border>
                                Translation of study materials (estimated word count <input type="number" :key="domain.index" v-model="domain.additionalServicesTranslation" @change="changeAdditionalTranslationInput(domain)"> )
                              </el-checkbox>
                            </div>
                            <div style="margin-bottom: 10px;">
                              <el-checkbox  label="Programming & Hosting" border></el-checkbox>
                            </div>
                            <div style="margin-bottom: 10px;">
                              <el-checkbox  label="Data preparation / Data in Excel or SPSS" border></el-checkbox>
                            </div>
                            <div style="margin-bottom: 10px;">
                              <el-checkbox  label="Cross" border>
                                Cross-tabulation, how many <input type="number" v-model="domain.additionalServicesCross" :key="domain.index" @change="changeAdditionalCrossInput(domain)">
                              </el-checkbox>
                            </div>
                            <div style="margin-bottom: 10px;">
                              <el-checkbox  label="Advanced Analysis  (e.g. segmentation, conjoint analysis, MaxDiff, etc.)" border></el-checkbox>
                            </div>
                            <div style="margin-bottom: 10px;">
                              <el-checkbox  label="Topline report" border></el-checkbox>
                            </div>
                            <div style="margin-bottom: 10px;">
                              <el-checkbox  label="Full report" border></el-checkbox>
                            </div>
                            <div style="margin-bottom: 10px;">
                              <el-checkbox  label="Other" border>Other services, specify <input type="text" :key="domain.index" v-model="domain.additionalServicesOther" @change="changeAdditionalOtherInput(domain)"></el-checkbox>
                            </div>

                          </el-checkbox-group>
                        </div>
                        <div class="item-info-box">
                          <div class="fc-title-left">Project setup and management fee :</div>
                          <div class="fc-inline-left">
                            <el-input
                              type="text"
                              placeholder=""
                              :key="domain.index"
                              v-model="domain.managementFee">
                            </el-input>
                          </div>
                        </div>
                        <div class="item-info-box">
                          <div class="fc-title-left">Special Requirements / Notes (if any) :</div>
                          <div class="fc-inline-left">
                            <el-input
                              type="textarea"
                              :rows="4"
                              placeholder=""
                              :key="domain.index"
                              style="width: 400px;"
                              v-model="domain.requirementsNotes">
                            </el-input>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </el-form>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
    <div class="saveBtn" style="margin-top: 30px;margin-left: 5%;">
      <el-button  style="width: 200px;" @click="handleBack" icon="el-icon-back"></el-button>
      <el-button type="primary" style="width: 200px;" @click="handleEdit">Edit</el-button>
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


  export default {
    name: 'set-quote-background',
    data(){
      return{
        activeNames: ['1'],
        activeName:'China（mainland）',
        scopeList:[{
          methodology: '',
          fieldworkCost: '',
          fieldworkCostArr: [{
            typeRespondents: '',
            specificRecruiting: '',

            one_IR: '',
            one_lengthInterview: '',
            one_sampleSize: '',
            one_targetType: '',

            group_IR: '',
            group_lengthInterview: '',
            group_numberRespondentsGroup: '',
            group_numberGroupsTotal: '',
            group_targetType: '',

          }],
        }],
        areaScope: [
          {
            title:'China（mainland）',
            name:'China（mainland）',
            content:'China（mainland）'
          },
          {
            title:'Taiwan',
            name:'Taiwan',
            content:'Taiwan'
          },
          {
            title:'Japan',
            name:'Japan',
            content:'Japan'
          }
        ],
        methodology_type:'',

        methodology:'CAPI',
        additionalServices:[],
        additionalServicesTranslation:'',
        additionalServicesCross:'',
        additionalServicesOther:'',
        managementFee:'',
        requirementsNotes:'',

        areaForm: {
          confirmArea:['Taiwan','Japan'],
          othersArea:'',
        },
        setBackgroundForm: {
          project_name:'',
          project_background:''
        }
      }
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
      this.methodology_type = this.$cookie.getCookie('project_methodologyType');
      var med_id = this.$cookie.getCookie('methodology_id');
      if(med_id !== null ){
        projectServices(med_id).then(response => {
          if (response.code == '1'){
            console.log(response);
          }
        }).catch(() => {
          this.loading = false
        });
      }


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
      })
    },
    methods:{
      handleChange(val) {
        console.log(val);
      },
      handleEdit(){
        this.$router.push({
          name: 'set-methodology',  // 路由的名称
          query: {
          }
        })
      },
      handleBack(){
        this.$router.go(-1);
      },
      saveProjectBackground(){
        // 获取地址栏参数
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
        }

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
    margin-top: 30px;
  }
  .saveBtn{
    width: 100%;
    text-align: left;
  }

  /*市场*/
  .fc-content-market{
    width: 95%;
    margin-left: 5%;
    padding-bottom: 30px;
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
</style>

