<template>
  <div class="box">
    <breadcrumb class="breadcrumb-container" />
    <Remindtext  ></Remindtext>

    <el-collapse v-model="activeNames" @change="handleChange" style="width: 800px;margin-left: 5%;margin-top: 30px;">
      <el-collapse-item title="Project Overview" name="1">
        <div class="setBackgroundForm" style="margin-top: 20px;">
          <el-row :gutter="10">
            <el-col :xs="{span: 20}" :sm="{span: 18}">
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

      <el-collapse-item title="Methodology" name="2">
        <el-select v-model="active_methodology" placeholder="" style="width: 300px;margin-top: 20px;" @change="methodologyChange">
          <el-option
            v-for="item in methodology"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-collapse-item>

      <el-collapse-item title="Market" name="3">

        <div class="marketContent" style="margin-top: 20px;">
          <el-tag
            v-for="item in marketArr"
            :key="item.label"
            size="medium"
            style="margin-right: 10px;margin-top: 10px;"
            :type="item.type">
            {{ item.label }}
          </el-tag>
        </div>


      </el-collapse-item>

      <el-collapse-item title="Fieldwork Services" name="4">
        <el-tabs type="border-card" v-model="activeMarket" @tab-click="handleCheck" :before-leave="beforeLeaveTab"  class="areaScope" style="margin-top: 20px;">
          <el-tab-pane
            v-for="(item, index) in areaScope"
            :key="item.name"
            :label="item.title"
            :name="item.name"
          >
          </el-tab-pane>

          <div class="fieldContent" v-for="(domain, index) in fieldList">
              <div v-if="domain.project_type == '1'" class="qualFieldWork">

                    <div class="fieldContent_item">
                      <span class="fieldContent_item_title">Type of Respondents：</span>
                      <div style="width: 200px;display: inline-block;">
                        <el-input v-model="domain.typeRespondents" :key="domain.index" placeholder="" readonly="readonly"></el-input>
                      </div>
                    </div>
                    <div class="fieldContent_item">
                      <span class="fieldContent_item_title">Specific Recruiting Criteria：</span>
                      <div style="width: 200px;display: inline-block;">
                        <el-input v-model="domain.specificRecruiting" :key="domain.index" placeholder="" readonly="readonly"></el-input>
                      </div>
                    </div>

                    <div class="one"
                         v-show="domain.methodology == 'IDI' || domain.methodology == 'TDI' || domain.methodology =='In home/context Ethnography'">

                      <div class="fieldContent_item" v-if="domain.typeRespondents!='Medical practitioners (e.g. physicians, nurses)'">
                        <span class="fieldContent_item_title">Estimated IR / Recruiting Difficulty：</span>
                        <div style="width: 200px;display: inline-block;">
                          <el-input v-model="domain.one_IR" :key="domain.index" placeholder="" readonly="readonly"></el-input>
                        </div>
                      </div>

                      <div class="fieldContent_item" v-if="domain.typeRespondents=='Medical practitioners (e.g. physicians, nurses)'">
                        <span class="fieldContent_item_title">Target Type of Practitioners：</span>
                        <div style="width: 200px;display: inline-block;">
                          <el-input v-model="domain.one_targetType" :key="domain.index" placeholder="" readonly="readonly"></el-input>
                        </div>
                      </div>

                      <div class="fieldContent_item">
                        <span class="fieldContent_item_title">Length of Interview：</span>
                        <div style="width: 200px;display: inline-block;">
                          <el-input v-model="domain.one_lengthInterview" :key="domain.index" placeholder="" readonly="readonly"></el-input>
                        </div>
                      </div>

                      <div class="fieldContent_item">
                        <span class="fieldContent_item_title">Sample Size：</span>
                        <div style="width: 200px;display: inline-block;">
                          <el-input v-model="domain.one_sampleSize" :key="domain.index" placeholder="" readonly="readonly"></el-input>
                        </div>
                      </div>

                    </div>

                    <div class="group"
                         v-show="domain.methodology == 'Dyad' || domain.methodology == 'Trio' || domain.methodology =='Mini-Focus Group' || domain.methodology =='Focus Group'">

                      <div class="fieldContent_item" v-show="domain.typeRespondents!='Medical practitioners (e.g. physicians, nurses)'">
                        <span class="fieldContent_item_title">Estimated IR / Recruiting Difficulty：</span>
                        <div style="width: 200px;display: inline-block;">
                          <el-input v-model="domain.group_IR" :key="domain.index" placeholder="" readonly="readonly"></el-input>
                        </div>
                      </div>

                      <div class="fieldContent_item" v-show="domain.typeRespondents=='Medical practitioners (e.g. physicians, nurses)'">
                        <span class="fieldContent_item_title">Target Type of Practitioners：</span>
                        <div style="width: 200px;display: inline-block;">
                          <el-input v-model="domain.group_targetType" :key="domain.index" placeholder="" readonly="readonly"></el-input>
                        </div>
                      </div>

                      <div class="fieldContent_item">
                        <span class="fieldContent_item_title">Length of Interview：</span>
                        <div style="width: 200px;display: inline-block;">
                          <el-input v-model="domain.group_lengthInterview" :key="domain.index" placeholder="" readonly="readonly"></el-input>
                        </div>
                      </div>

                      <div class="fieldContent_item">
                        <span class="fieldContent_item_title">Number of Respondents per Group：</span>
                        <div style="width: 200px;display: inline-block;">
                          <el-input v-model="domain.group_numberRespondentsGroup" :key="domain.index" placeholder="" readonly="readonly"></el-input>
                        </div>
                      </div>

                      <div class="fieldContent_item">
                        <span class="fieldContent_item_title">Number of Groups in Total：</span>
                        <div style="width: 200px;display: inline-block;">
                          <el-input v-model="domain.group_numberGroupsTotal" :key="domain.index" placeholder="" readonly="readonly"></el-input>
                        </div>
                      </div>

                    </div>

              </div>
              <div v-if="domain.project_type == '2'" class="quanFieldWork">
                <div class="fieldContent_item">
                  <span class="fieldContent_item_title">Type of Respondents：</span>
                  <div style="width: 200px;display: inline-block;">
                    <el-input v-model="domain.typeRespondents" :key="domain.index" placeholder="" readonly="readonly"></el-input>
                  </div>
                </div>
                <div class="fieldContent_item">
                  <span class="fieldContent_item_title">Specific Recruiting Criteria：</span>
                  <div style="width: 200px;display: inline-block;">
                    <el-input v-model="domain.specificRecruiting" :key="domain.index" placeholder="" readonly="readonly"></el-input>
                  </div>
                </div>

                <div class="fieldContent_item" v-show="domain.typeRespondents!='Medical practitioners (e.g. physicians, nurses)'">
                  <span class="fieldContent_item_title">Estimated IR / Recruiting Difficulty：</span>
                  <div style="width: 200px;display: inline-block;">
                    <el-input v-model="domain.IR" :key="domain.index" placeholder="" readonly="readonly"></el-input>
                  </div>
                </div>

                <div class="fieldContent_item" v-show="domain.typeRespondents=='Medical practitioners (e.g. physicians, nurses)'">
                  <span class="fieldContent_item_title">Target Type of Practitioners：</span>
                  <div style="width: 200px;display: inline-block;">
                    <el-input v-model="domain.targetType" :key="domain.index" placeholder="" readonly="readonly"></el-input>
                  </div>
                </div>

                <div class="fieldContent_item">
                  <span class="fieldContent_item_title">Length of Interview：</span>
                  <div style="width: 200px;display: inline-block;">
                    <el-input v-model="domain.lengthSurvey" :key="domain.index" placeholder="" readonly="readonly"></el-input>
                  </div>
                </div>

                <div class="fieldContent_item">
                  <span class="fieldContent_item_title">Sample Size：</span>
                  <div style="width: 200px;display: inline-block;">
                    <el-input v-model="domain.sampleSize" :key="domain.index" placeholder="" readonly="readonly"></el-input>
                  </div>
                </div>

              </div>
          </div>



        </el-tabs>
      </el-collapse-item>

      <el-collapse-item title="Additional Services" name="5">
        <el-tabs type="border-card" v-model="activeMarket2" @tab-click="handleCheck2" :before-leave="beforeLeaveTab2"  class="areaScope" style="margin-top: 20px;">
          <el-tab-pane
            v-for="(item, index) in areaScope2"
            :key="item.name"
            :label="item.title"
            :name="item.name"
          >
          </el-tab-pane>
          <div v-if="scopeList.project_type == '1' ">
            <div class="item-info-box additional-Services">
              <el-checkbox-group v-model="scopeList.additionalServices"    style="margin-top: 10px;"  >
                <div style="margin-bottom: 10px;overflow: hidden;">
                  <el-checkbox  label="Moderation" border style="float: left;" size='medium'></el-checkbox>
                  <el-input size="medium"
                            v-model="scopeList.moderation_input"
                            class="add_input"
                            type="number"
                            min="1"
                            v-show="scopeList.additionalServices.includes('Moderation')"
                  ></el-input>
                </div>
                <div style="margin-bottom: 10px;overflow: hidden;">
                  <el-checkbox  label="Facility rental" border style="float: left;" size='medium'></el-checkbox>
                  <el-input size="medium" v-model="scopeList.facility_input" class="add_input" type="number" min="1"
                            v-show="scopeList.additionalServices.includes('Facility rental')"
                  ></el-input>
                </div>

                <div style="margin-bottom: 10px;overflow: hidden;">
                  <el-checkbox  label="Audio recording" border style="float: left;" size='medium'></el-checkbox>
                  <el-input size="medium" v-model="scopeList.audio_input" class="add_input" type="number" min="1"
                            v-show="scopeList.additionalServices.includes('Audio recording')"
                  ></el-input>
                </div>

                <div style="margin-bottom: 10px;overflow: hidden;">
                  <el-checkbox  label="Video recording" border style="float: left;" size='medium'></el-checkbox>
                  <el-input size="medium" v-model="scopeList.video_input" class="add_input" type="number" min="1"
                            v-show="scopeList.additionalServices.includes('Video recording')"
                  ></el-input>
                </div>

                <div style="margin-bottom: 10px;overflow: hidden;">
                  <el-checkbox  label="Design of screener" border style="float: left;" size='medium'></el-checkbox>
                </div>

                <div style="margin-bottom: 10px;overflow: hidden;">
                  <el-checkbox  label="Design of interview guide" border style="float: left;" size='medium'></el-checkbox>
                </div>

                <div style="margin-bottom: 10px;">
                  <el-checkbox  label="Translation" border>
                    <!--                                  Translation of study materials (estimated word count <input type="number"  v-model="scopeList.additionalServicesTranslation" @change="changeAdditionalTranslationInput"> )-->
                    Translation of study materials (estimated word count <input type="number" min='1' v-model="scopeList.additionalServicesTranslation" > )
                  </el-checkbox>
                </div>

                <div style="margin-bottom: 10px;overflow: hidden;">
                  <el-checkbox  label="Transcript in local language" border style="float: left;" size='medium'></el-checkbox>
                  <el-input size="medium" v-model="scopeList.translationLocal_input" class="add_input" type="number" min="1"
                            v-show="scopeList.additionalServices.includes('Transcript in local language')"
                  ></el-input>
                </div>

                <div style="margin-bottom: 10px;overflow: hidden;">
                  <el-checkbox  label="Transcript in English" border style="float: left;" size='medium'></el-checkbox>
                  <el-input size="medium" v-model="scopeList.transEnglish_input" class="add_input" type="number" min="1"
                            v-show="scopeList.additionalServices.includes('Transcript in English')"
                  ></el-input>
                </div>


                <div style="margin-bottom: 10px;overflow: hidden;">
                  <el-checkbox  label="Simultaneous translation" border style="float: left;" size='medium'></el-checkbox>
                  <el-input size="medium" v-model="scopeList.simultaneous_input" class="add_input" type="number" min="1"
                            v-show="scopeList.additionalServices.includes('Simultaneous translation')"
                  ></el-input>
                </div>


                <div style="margin-bottom: 10px;">
                  <el-checkbox  label="Topline report" border></el-checkbox>
                </div>
                <div style="margin-bottom: 10px;">
                  <el-checkbox  label="Full report" border></el-checkbox>
                </div>
                <div style="margin-bottom: 10px;">
                  <el-checkbox  label="Other" border>Other services, specify <input type="text"  v-model="scopeList.additionalServicesOther""></el-checkbox>
                  <!--                                <el-checkbox  label="Other" border>Other services, specify <input type="text"  v-model="scopeList.additionalServicesOther" @change="changeAdditionalOtherInput"></el-checkbox>-->
                </div>

              </el-checkbox-group>
            </div>
            <div class="item-info-box">
              <div class="fc-title-left">Project setup and management fee :</div>
              <div class="fc-inline-left">
                <el-input
                  type="text"
                  placeholder=""
                  style="width: 200px;"
                  v-model="scopeList.managementFee">
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
                  style="width: 500px;"
                  v-model="scopeList.requirementsNotes">
                </el-input>
              </div>
            </div>
          </div>
          <div v-if="scopeList.project_type == '2' ">
            <div class="item-info-box additional-Services">
              <el-checkbox-group v-model="scopeList.additionalServices"    style="margin-top: 10px;" >
                <div style="margin-bottom: 10px;">
                  <el-checkbox  label="Design of Questionnaire" border></el-checkbox>
                </div>
                <div style="margin-bottom: 10px;">
                  <el-checkbox  label="Translation" border>
                    Translation of study materials (estimated word count <input type="number"  v-model="scopeList.additionalServicesTranslation" @change="changeAdditionalTranslationInput(domain)"> )
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
                    Cross-tabulation, how many <input type="number" v-model="scopeList.additionalServicesCross"  >
                  </el-checkbox>
                </div>
                <div style="margin-bottom: 10px;">
                  <el-checkbox  label="Advanced Analysis (e.g. segmentation/conjoint analysis/MaxDiff/etc.)" border></el-checkbox>
                </div>
                <div style="margin-bottom: 10px;">
                  <el-checkbox  label="Topline report" border></el-checkbox>
                </div>
                <div style="margin-bottom: 10px;">
                  <el-checkbox  label="Full report" border></el-checkbox>
                </div>
                <div style="margin-bottom: 10px;">
                  <el-checkbox  label="Other" border>Other services, specify <input type="text" v-model="scopeList.additionalServicesOther" ></el-checkbox>
                </div>

              </el-checkbox-group>
            </div>
            <div class="item-info-box">
              <div class="fc-title-left">Project setup and management fee :</div>
              <div class="fc-inline-left">
                <el-input
                  type="text"
                  placeholder=""
                  v-model="scopeList.managementFee">
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
                  style="width: 400px;"
                  v-model="scopeList.requirementsNotes">
                </el-input>
              </div>
            </div>
          </div>
        </el-tabs>
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
  import { mapGetters } from 'vuex'
  import { projectInformation } from '@/api/quota'


  export default {
    name: 'quota-preview',
    data(){
      return{
        remarkActiveName:1,
        remarkActiveName2:1,
        activeNames:'1',
        setBackgroundForm: {
          project_name:'',
          project_background:''
        },

        methodology:[],
        active_methodology:'',

        marketArr:[],
        areaScope:[],
        activeMarket:'',

        fieldList:[],

        scopeList:{},
        areaScope2:[],
        activeMarket2:'',
        qual_scopeList:{
          additionalServices:[],
          project_type:'',
          moderation_input:'',
          facility_input:'',
          audio_input:"",
          video_input:'',
          translationLocal_input:'',
          transEnglish_input:'',
          simultaneous_input:"",
          designScreener_input:'',
          designGuide_input:'',
          toplineReport:'',
          fullReport:'',


          additionalServicesTranslation:'',
          additionalServicesOther:'',
          managementFee:'',
          requirementsNotes:'',

        },
        quan_scopeList:{
          additionalServices:[],
          project_type:'',
          designQuestionnaire_input:0,
          programming_input:0,
          dataSpss_input:0,
          analysis_input:0,
          topline_input:0,
          fullReport_input:0,

          additionalServicesTranslation:'',
          additionalServicesCross:'',
          additionalServicesOther:'',
          managementFee:'',
          requirementsNotes:'',

        }

      }
    },
    created(){
      this.init();
      this.areaContent();
    },

    components: {
      Breadcrumb,
      Remindtext,
    },
    computed: {
      ...mapGetters([
        'user_id',
        'name'
      ])
    },
    mounted(){
      // 初始化样式
      $('.el-collapse-item__header').css({
        'color':'#ffffff',
        'background-color':'#407392',
        'padding-left':'15px'
      });
    },
    methods:{
      // 初始化
      init(){
        // cookie中没有项目编号进行跳转
        var projectNumber = this.$cookie.getCookie('project_number');
        var met_id = this.$cookie.getCookie('methodology_id');

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
            if(response.code == '1'){
              console.log(response);
              var arr = response.data.method;

              // 项目背景
              this.setBackgroundForm.project_name = response.data.project_name;
              this.setBackgroundForm.project_background = response.data.content;

              // methodology
              for(var j=0;j<response.data.method.length;j++){
                this.methodology.push({
                  'value':response.data.method[j].id,
                  'label':response.data.method[j].methodology
                });
                if(met_id == response.data.method[j].id){
                  this.active_methodology = response.data.method[j].methodology;
                }
              }

              // Market
              var marketVal=[];
              for(var i=0;i<arr.length;i++){
                if(arr[i].id == met_id){
                  if(arr[i].other_country == '' ){
                    marketVal = arr[i].country.split(',');
                  }else{
                    var str = arr[i].country+','+arr[i].other_country;
                    marketVal = str.split(',');
                  }
                  console.log(marketVal);
                  // 选中地区初始化
                  for (var j=0;j<marketVal.length;j++){
                    this.marketArr.push({
                      'type':'',
                      'label':marketVal[j]
                    });
                  }
                }
              }

              // FieldWork
              var areaScopeArr = [];
              for(var i=0;i<arr.length;i++){
                if(arr[i].id == met_id){
                  if(arr[i].other_country == ''){
                    areaScopeArr = arr[i].country.split(',');
                  }else{
                    var str = arr[i].country+','+arr[i].other_country;
                    areaScopeArr = str.split(',');
                  }
                  // 选中地区初始化
                  for (var j=0;j<areaScopeArr.length;j++){
                    this.areaScope.push({
                      'title':areaScopeArr[j],
                      'name':areaScopeArr[j],
                      'content':areaScopeArr[j]
                    });
                  }
                  this.activeMarket = this.areaScope[0].title;

                }
              }

              // additional
              var areaScopeArr2 = '';
              for(var i=0;i<arr.length;i++){
                if(arr[i].id == met_id){
                  if(arr[i].other_country == null ){
                    areaScopeArr2 = arr[i].country.split(',');
                  }else{
                    var str = arr[i].country+','+arr[i].other_country;
                    areaScopeArr2 = str.split(',');
                  }
                  // 选中地区初始化
                  for (var j=0;j<areaScopeArr2.length;j++){
                    this.areaScope2.push({
                      'title':areaScopeArr2[j],
                      'name':areaScopeArr2[j],
                      'content':areaScopeArr2[j]
                    });
                  }
                  this.activeMarket2 = this.areaScope2[0].title;

                }
              }
            }
          }).catch(() => {
            this.loading = false
          });
        }
      },

      // 地区内容初始化
      areaContent(val){
        var projectNumber = this.$cookie.getCookie('project_number');
        var met_id = this.$cookie.getCookie('methodology_id');
        var methodologyVal = '';

        projectInformation(projectNumber).then(response => {
          if(response.code == '1'){
            var arr = response.data.method;
            var countrys= '';
            var requiredArr= '';
            for(var i=0;i<arr.length;i++){
              if(arr[i].id == met_id){
                methodologyVal = arr[i].methodology;
                countrys = arr[i].countrys;
                requiredArr = arr[i].required;
              }
            }
            var filedArray=countrys[this.activeMarket];

            if(response.data.type == '1'){
              // 初始化fieldWork
              this.fieldList=[];
              for (var j = 0;j<filedArray.length;j++){
                this.fieldList.push({
                  'project_type':'1',
                  'methodology':methodologyVal,
                  'typeRespondents':filedArray[j].respondents,
                  'specificRecruiting':filedArray[j].criteria,
                  'one_IR':filedArray[j].difficulty,
                  'one_lengthInterview':filedArray[j].interview,
                  'one_sampleSize':filedArray[j].size,
                  'one_targetType':filedArray[j].target_practitioners,
                  'group_IR':filedArray[j].estimated_ir,
                  'group_lengthInterview':filedArray[j].length_interview,
                  'group_numberRespondentsGroup':filedArray[j].respondents_number,
                  'group_numberGroupsTotal':filedArray[j].number_groups,
                  'group_targetType':filedArray[j].target
                })
              }

              // 初始化additional
              this.scopeList = this.qual_scopeList;
              for(var k = 0; k<requiredArr.length;k++){
                if(this.activeMarket2 == requiredArr[k].country){
                  this.scopeList.project_type='1';
                  this.scopeList.additionalServices=requiredArr[k].options.split(',');
                  this.scopeList.moderation_input=requiredArr[k].mode_ration;
                  this.scopeList.facility_input=requiredArr[k].facility_rental;
                  this.scopeList.audio_input=requiredArr[k].audio_recording;
                  this.scopeList.video_input=requiredArr[k].video_recording;
                  this.scopeList.translationLocal_input=requiredArr[k].transcript;
                  this.scopeList.transEnglish_input=requiredArr[k].transcript_english;
                  this.scopeList.simultaneous_input=requiredArr[k].simultaneous;
                  this.scopeList.additionalServicesTranslation=requiredArr[k].translation;
                  this.scopeList.additionalServicesOther=requiredArr[k].other_services;

                  this.scopeList.managementFee=requiredArr[k].project_setup;
                  this.scopeList.requirementsNotes=requiredArr[k].special;
                  // console.log(requiredArr[k].options);
                }
              }
            }
            if(response.data.type == '2'){
              // 初始化fieldWork
              this.fieldList=[];
              for (var n = 0;n<filedArray.length;n++){
                this.fieldList.push({
                  'project_type':'2',
                  'methodology':methodologyVal,
                  'typeRespondents':filedArray[n].type_respondents,
                  'specificRecruiting':filedArray[n].specific_recruiting,
                  'IR':filedArray[n].stimated_ir,
                  'lengthSurvey':filedArray[n].length_survey,
                  'sampleSize':filedArray[n].sample_size,
                  'targetType':filedArray[n].target_type
                })
              }

              // 初始化additional
              this.scopeList = this.qual_scopeList;
              for(var k = 0; k<requiredArr.length;k++){
                if(this.activeMarket2 == requiredArr[k].country){
                  this.scopeList.additionalServices=requiredArr[k].options.split(',');
                  this.scopeList.project_type='2';
                  this.scopeList.additionalServicesTranslation=requiredArr[k].translation
                  this.scopeList.additionalServicesCross=requiredArr[k].cross_tabulation
                  this.scopeList.additionalServicesOther=requiredArr[k].other_services
                  this.scopeList.managementFee=requiredArr[k].project_setup
                  this.scopeList.requirementsNotes=requiredArr[k].special
                }
              }
            }


          }
        }).catch(() => {
          this.loading = false
        });
      },
      loading(){
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        setTimeout(() => {
          loading.close();
        }, 2000);
      },

      handleChange(val) {
        console.log(val);
      },
      methodologyChange(id){



        return this.$confirm('此操作将切换Methodology, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$cookie.setCookie('methodology_id',id,'1');
          this.fieldList.length=0;
          this.methodology=[];
          this.remarkActiveName=1;
          this.remarkActiveName2=1;
          this.marketArr=[];
          this.activeMarket='';
          this.areaScope=[];
          this.scopeList={};
          this.areaScope2=[];
          this.activeMarket2='';

          this.loading();
          this.init();
          this.areaContent();


          this.$message({
            type: 'success',
            message: '切换成功！'
          });
          console.log(this.activeName);
        }).catch(() => {
          this.$message({
            type: 'success',
            message: '取消成功！'
          });
          throw new Error("取消成功！");
        });
      },
      handleCheck(tab,event) {
        var presentRes = this.activeMarket;
      },
      handleCheck2(tab,event) {
        var presentRes = this.activeMarket2;
      },

      beforeLeaveTab(){

        // if (this.areaScope.length == '1'){
        //   return  false;
        // }
        // if(!this.activeMarket){
        //   this.activeMarket = true;
        //   return true;
        // }
        if(this.remarkActiveName == 1){
          this.remarkActiveName+=1;
        }else if(this.remarkActiveName == 2){
          this.remarkActiveName+=1;
        }else if(this.remarkActiveName >2){
          return this.$confirm('此操作将切换tab页, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.fieldList.length=0;
            this.areaContent();
            this.$message({
              type: 'success',
              message: '切换成功！'
            });
            console.log(this.activeName);
          }).catch(() => {
            this.$message({
              type: 'success',
              message: '取消成功！'
            });
            throw new Error("取消成功！");
          });
        }
      },
      beforeLeaveTab2(){

        // if (this.areaScope.length == '1'){
        //   return  false;
        // }
        // if(!this.activeMarket2){
        //   this.activeMarket2 = true;
        //   return true;
        // }
        if(this.remarkActiveName2 == 1){
          this.remarkActiveName2+=1;
        }else if(this.remarkActiveName2 == 2){
          this.remarkActiveName2+=1;
        }else if(this.remarkActiveName2 >2){
          return this.$confirm('此操作将切换tab页, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            // this.scopeList={};
            var pm = this.$cookie.getCookie('project_methodologyType');
            if(pm == '1'){
              this.scopeList.additionalServices=[];
              this.scopeList.moderation_input='';
              this.scopeList.facility_input='';
              this.scopeList.audio_input='';
              this.scopeList.video_input='';
              this.scopeList.translationLocal_input='';
              this.scopeList.transEnglish_input='';
              this.scopeList.simultaneous_input='';
              this.scopeList.additionalServicesTranslation='';
              this.scopeList.additionalServicesOther='';

              this.scopeList.managementFee='';
              this.scopeList.requirementsNotes='';
            }else if( pm == '2'){
              this.scopeList.additionalServices=[];
              this.scopeList.additionalServicesTranslation='';
              this.scopeList.additionalServicesCross='';
              this.scopeList.additionalServicesOther='';
              this.scopeList.managementFee='';
              this.scopeList.requirementsNotes='';
            }


            this.loading();
            this.areaContent();
            this.$message({
              type: 'success',
              message: '切换成功！'
            });
            console.log(this.activeName);
          }).catch(() => {
            this.$message({
              type: 'success',
              message: '取消成功！'
            });
            throw new Error("取消成功！");
          });
        }
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
  }
  .saveBtn{
    width: 100%;
    text-align: left;
  }
  .fieldContent{
    margin: 20px auto;
    width: 98%;
    padding-top: 20px;
    padding-bottom: 20px;
    background-color: aliceblue;
    -webkit-box-shadow: 0px 2px 4px 0px rgba(210,210,210,0.5);
    box-shadow: 0px 2px 4px 0px rgba(210,210,210,0.5);
    border: 1px solid rgba(216,216,216,1);
  }
  .fieldContent_item{
    width: 550px;
    margin: 10px auto;
  }
  .fieldContent_item_title{
    display: inline-block;
    width: 250px;
    text-align: right;
  }

  .fc-title-left{
    float: left;
    margin-right: 10px;
    line-height: 40px;
  }
  .fc-inline-left{
    float: left;
  }
  .add_input{
    float: left;
    width: 120px;
    margin-left: 15px;
  }
  .item-info-box{
    margin-bottom: 15px;
    display: block;
    overflow: hidden;
  }

</style>


