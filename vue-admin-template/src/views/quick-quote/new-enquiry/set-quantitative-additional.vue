<template>
  <div class="box">
    <breadcrumb class="breadcrumb-container" />
    <!--  <Remindtext  ></Remindtext>-->
    <step></step>
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
                          <el-checkbox  label="Advanced Analysis (e.g. segmentation/conjoint analysis/MaxDiff/etc.)" border></el-checkbox>
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
            <el-row>
<!--              <div class="add-methodology" @click="addMethodology"><i class="el-icon-circle-plus"></i> Add Another Methodology</div>-->
              <el-button class="save-btn" type="primary" @click="submit">Save</el-button>
              <div class="save-btn-remind" v-show="btn_remind">
                      <span class="fc-form-item-title-span2">( Please provide more details on your project requirements & scope, our bidding team will get back to you shortly. )</span>
              </div>
            </el-row>
        </el-form>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>

  </div>
</template>

<script>
  import Breadcrumb from '@/components/Breadcrumb'
  import Remindtext from '@/components/Remindtext'
  import $ from 'jquery'
  import Step from '@/components/Step'
  import { quantitativeAdditional } from '@/api/quota'
  import { projectInformation } from '@/api/quota'



  export default {
    name: 'set-project-methodology',
    data(){
      return{
        btn_remind:false,
        activeName:'',
        remarkActiveName:1,

        scopeList:[{
              additionalServices:[],

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

            }],
        areaScope: [],

      }
  },
    components: {
      Breadcrumb,
      Remindtext,
      Step
    },
    created(){
      this.init();
      this.areaContent();

    },
    mounted(){
      $('#step').step({
        index:'4',
        stepDirection:'x',
        showStepButton:true,
        stepCount:6,
        type:'2',
        stepTitles:['Project Overview','Methodology','Market','Fieldwork Services',' Additional Services','Review'],
      });

    },
    methods:{
      // 页面初始化
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

          // 获取项目类型然后跳转到对应页面
          var projectMeth = this.$cookie.getCookie('project_methodologyType');

          if (projectMeth == '1'){
            this.$router.push({
              name: 'set-qualitative-additional',  // 路由的名称
              query: {
              }
            });
            return false;
          }else{
            // 页面初始化
            projectInformation(projectNumber).then(response => {
              if(response.code == '1'){

                var arr = response.data.method;
                var areaScopeArr = '';
                for(var i=0;i<arr.length;i++){
                  if(arr[i].id == met_id){
                    this.methodology = arr[i].methodology;
                    if(arr[i].other_country == null ){
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
                    this.activeName = this.areaScope[0].title;

                  }
                }
              }
            }).catch(() => {
              this.loading = false
            });
          }
        }
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

      // 地区内容初始化
      areaContent(val){
        var projectNumber = this.$cookie.getCookie('project_number');
        var met_id = this.$cookie.getCookie('methodology_id');

        projectInformation(projectNumber).then(response => {
          if(response.code == '1'){
            var arr = response.data.method;
            var requiredArr= '';
            var countrys= '';
            for(var i=0;i<arr.length;i++){
              if(arr[i].id == met_id){
                requiredArr = arr[i].required;
                // countrys = arr[i].countrys;
              }
            }
            // console.log(requiredArr);
            // var filedArray=countrys[this.activeName];
            // var interviewNum = '';
            // for (var j = 0;j<filedArray.length;j++){
            //   interviewNum=Number(interviewNum)+Number(filedArray[j].sample_size);
            // }
            // console.log(interviewNum);
            for(var k = 0; k<requiredArr.length;k++){
              if(this.activeName == requiredArr[k].country){
                this.scopeList[0].additionalServices=requiredArr[k].options.split(',');

                this.scopeList[0].additionalServicesTranslation=requiredArr[k].translation
                this.scopeList[0].additionalServicesCross=requiredArr[k].cross_tabulation
                this.scopeList[0].additionalServicesOther=requiredArr[k].other_services
                this.scopeList[0].managementFee=requiredArr[k].project_setup
                this.scopeList[0].requirementsNotes=requiredArr[k].special
              }
            }


          }
        }).catch(() => {
          this.loading = false
        });
      },
      removeTab(targetName) {
        let tabs = this.editableTabs;
        let activeName = this.areaForm.confirmArea;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }

        this.areaForm.confirmArea = activeName;
        this.editableTabs = tabs.filter(tab => tab.name !== targetName);
      },
      changeHandler(value) {
        console.log('改变之后的值是:' + value)
      },

      handleCheck(tab,event) {
        var presentRes = this.activeName;
        // console.log(presentRes);
        // console.log(tab.name);
      },
      beforeLeaveTab(){
        // console.log(this.areaScope);
        // console.log(this.activeName);
        // if (this.areaScope.length == '1'){
        //   return  false;
        // }
        // if(!this.activeName){
        //   this.activeName = true;
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
            this.loading();
            this.scopeList[0].additionalServices=[];
            this.scopeList[0].additionalServicesTranslation='';
            this.scopeList[0].additionalServicesCross='';
            this.scopeList[0].additionalServicesOther='';
            this.scopeList[0].managementFee='';
            this.scopeList[0].requirementsNotes='';
            this.areaContent();
            this.$message({
              type: 'success',
              message: '切换成功！可以做一些其他的事情'
            });
          }).catch(() => {
            this.$message({
              type: 'success',
              message: '取消成功！可以做一些其他的事情'
            });
            throw new Error("取消成功！");
          });
        }

      },

      changeAdditionalServices(item){

          var arr = item.additionalServices;
          // var index = this.scopeList.indexOf(item);
          // var scopeDiv = $('.scope-content')[index];
          var key = $.inArray("Translation", arr );
          var key2 = $.inArray("Other", arr );
          var key3 = $.inArray("Cross", arr );

          if(key >= 0){
              if(item.additionalServicesTranslation=='' ){

                  this.$alert('Please fill in the input box.', '', {
                    confirmButtonText: 'confirm',
                  });

                arr.splice($.inArray("Translation", arr),1);
              }
          }

          if(key2 >= 0){
          if(item.additionalServicesOther=='' ){
            this.$alert('Please fill in the input box.', '', {
              confirmButtonText: 'confirm',
            });
            arr.splice($.inArray("Other", arr),1);
          }
        }

          if(key3 >= 0){
          if(item.additionalServicesCross=='' ){
            this.$alert('Please fill in the input box.', '', {
              confirmButtonText: 'confirm',
            });
            arr.splice($.inArray("Cross", arr),1);
          }
        }


          console.log(item.additionalServices);

      },
      changeAdditionalTranslationInput(item){
        var arr = item.additionalServices;
        if (item.additionalServicesTranslation == ''){
          arr.splice($.inArray("Translation", arr),1);
        }
      },
      changeAdditionalCrossInput(item){
        var arr = item.additionalServices;
        if (item.additionalServicesCross == ''){
          arr.splice($.inArray("Cross", arr),1);
        }
      },
      changeAdditionalOtherInput(item){
        var arr = item.additionalServices;
        if (item.additionalServicesOther == ''){
          arr.splice($.inArray("Other", arr),1);
        }
      },
      changeTypeRespondents(item1,item2) {
        var index1 = this.scopeList.indexOf(item1);
        var index2 = this.scopeList[index1].fieldworkCostArr.indexOf(item2);
        var res = this.scopeList[index1].fieldworkCostArr[index2].typeRespondents;
        var mVal = this.scopeList[index1].methodology;

        console.log(index1);
        console.log(index2);
        console.log(mVal);
        console.log(res);

        var scopeItem = $('.scope-content')[index1];
        var s1_item = $(scopeItem).find('.cost-box-s1')[index2];

        // console.log(str);

        if (res == 'B2C (consumers)' || res == 'B2B (business decision makers or professionals)'){
          $(s1_item).css('display','block');
          $(s1_item).find('.oneIR').css('display','block');
          $(s1_item).find('.oneTargetType').css('display','none');
        }else{
          $(s1_item).css('display','block');
          $(s1_item).find('.oneIR').css('display','none');
          $(s1_item).find('.oneTargetType').css('display','block');
        }



      },
      submit(){
        // console.log(this.scopeList);
        var met_id = this.$cookie.getCookie('methodology_id');
        var project_methodologyType = this.$cookie.getCookie('project_methodologyType');
        // console.log(this.scopeList[0].fieldworkCostArr);

        // designQuestionnaire_input:'',
        //   programming_input:'',
        //   dataSpss_input:'',
        //   analysis_input:'',
        //   topline_input:'',
        //   fullReport_input:'',

        if(this.scopeList[0].additionalServices.includes('Design of Questionnaire')){
          this.scopeList[0].designQuestionnaire_input =1;
        }
        if(this.scopeList[0].additionalServices.includes('Programming & Hosting')){
          this.scopeList[0].programming_input =1;
        }
        if(this.scopeList[0].additionalServices.includes('Data preparation / Data in Excel or SPSS')){
          this.scopeList[0].dataSpss_input =1;
        }
        if(this.scopeList[0].additionalServices.includes('Advanced Analysis  (e.g. segmentation, conjoint analysis, MaxDiff, etc.)')){
          this.scopeList[0].analysis_input =1;
        }
        if(this.scopeList[0].additionalServices.includes('Topline report')){
          this.scopeList[0].topline_input =1;
        }
        if(this.scopeList[0].additionalServices.includes('Full report')){
          this.scopeList[0].fullReport_input =1;
        }

        var jsonRes = JSON.stringify( this.scopeList[0] );
        console.log(jsonRes);

        quantitativeAdditional(met_id,this.activeName,jsonRes).then(response => {
          if (response.code == '1'){
            return this.$confirm('Save success!', '', {
              confirmButtonText: 'Edit other markets',
              cancelButtonText: 'Next',
              type: 'success'
            }).then(() => {

              this.$message({
                type: 'info',
                message: 'Please choose another market'
              });
            }).catch(() => {
              this.$router.push({
                name: 'project-review',  // 路由的名称
              })
            });
            // if(project_methodologyType == '1'){
            //   this.$router.push({
            //     name: 'set-qualitative-additional',  // 路由的名称
            //   })
            // }else if(project_methodologyType == '2'){
            //   this.$router.push({
            //     name: 'set-quantitative-additional',  // 路由的名称
            //   })
            // }
          }
        }).catch(() => {
          this.loading = false
        });
      },
    }
  }
</script>

<style scoped>
  .box{
    width: 900px;
    padding-bottom: 100px;
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
  .scope-item-box{
    border-left: 3px solid #409EFF;
    padding-left: 20px;
    overflow: hidden;
    clear: both;
  }
  .box-item-title{
    font-size: 18px;
    font-weight:500;
    color:rgba(45,62,72,1);
    line-height:28px;
  }
  .scope-item{
    overflow: hidden;
    clear: both;
  }

  .cost-box-s1{
    display: none;
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
  .project-scope-service-title{
    color: #2D3E48;
    font-size:18px;
    font-weight:bold;
    line-height:20px;
    margin-bottom: 15px;
  }
  .fieldwork-title{
    font-size: 16px;
  }
  .cost-box{
    width: 90%;
    float: left;
    margin-top: 20px;
    box-shadow:0px 2px 4px 0px rgba(210,210,210,0.5);
    border:1px solid rgba(216,216,216,1);
    margin-right: 10px;
    padding: 20px;
    text-align: center;
  }
  .cost-box-item{
    margin-bottom: 10px;
  }
  .cost-box-item-title{
    width: 270px;
    display: inline-block;
    text-align: right;
  }

  .add-cost-content{
    display: none;
    margin-top:20px;
    margin-bottom: 20px;
    color: #409EFF;
    cursor: pointer;
    overflow: hidden;
    width: 100%;
  }
  .remove-cost-box{
    font-size: 24px;
    margin-top: 20px;
    cursor: pointer;
    color: #F75454;
    line-height: inherit;
    float: left;
  }
  .additional-Services{
    display: block;
  }
  .add-methodology{
    font-size: 18px;
    float: right;
    color: #409EFF;
    cursor: pointer;
  }
  .mcontent{
    width: 100%;
    clear: both;
  }
  .scope-service{
    /*display: none;*/
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
