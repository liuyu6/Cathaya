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
                  <div class="scope-content">
                    <div class="scope-item project-scope">
                        <div class="scope-item-info scope-service">
                          <div class="item-info-box additional-Services">
                            <span class="fieldwork-title" >Additional Services Required:</span>
                            <el-checkbox-group v-model="scopeList.additionalServices"  @change="changeAdditionalServices"  style="margin-top: 10px;">
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
                                  Translation of study materials (estimated word count <input type="number"  v-model="scopeList.additionalServicesTranslation" > )
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
                    </div>
                  </div>
                  <el-row>
                    <el-button class="save-btn" type="primary" @click="submit">Save</el-button>
                  </el-row>
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
  import { createAdditional } from '@/api/quota'
  import { projectServices } from '@/api/quota'



  export default {
    name: 'set-project-methodology',
    data(){
      return{
        btn_remind:false,
        activeName:'China（mainland）',
        methodology_type:'',
        scopeList:{
              methodology:'CAPI',
              additionalServices:[],
              moderation_input:"",
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

      // 获取项目类型然后跳转到对应页面
      this.methodology_type = this.$cookie.getCookie('project_methodologyType');
      // if (projectMeth == '1'){
      //   this.$router.push({
      //     name: 'set-qualitative-methodology',  // 路由的名称
      //     query: {
      //     }
      //   });
      //   return false;
      // }
      // if (projectMeth == '2'){
      //   this.$router.push({
      //     name: 'set-quantitative-methodology',  // 路由的名称
      //     query: {
      //     }
      //   });
      //   return false;
      // }

    },
    mounted(){
      $('#step').step({
        index:'4',
        stepDirection:'x',
        showStepButton:true,
        stepCount:6,
        type:this.methodology_type,
        stepTitles:['Project Overview','Methodology','Market','Fieldwork Services',' Additional Services','Review'],
      });
      this.activeName='China（mainland）';
    },
    methods:{
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

        return this.$confirm('此操作将切换tab页, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
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
      },

      changeAdditionalServices(val){

          var arr = val;
          var key = $.inArray("Translation", arr );
          // var key2 = $.inArray("Other", arr );
          // var key3 = $.inArray("Cross", arr );

          if(key >= 0){
              if(scopeList.additionalServicesTranslation=='' ){

                  this.$alert('Please fill in the input box.', '', {
                    confirmButtonText: 'confirm',
                  });

                arr.splice($.inArray("Translation", arr),1);
              }
          }

        //   if(key2 >= 0){
        //   if(item.additionalServicesOther=='' ){
        //     this.$alert('Please fill in the input box.', '', {
        //       confirmButtonText: 'confirm',
        //     });
        //     arr.splice($.inArray("Other", arr),1);
        //   }
        // }
        //
        //   if(key3 >= 0){
        //   if(item.additionalServicesCross=='' ){
        //     this.$alert('Please fill in the input box.', '', {
        //       confirmButtonText: 'confirm',
        //     });
        //     arr.splice($.inArray("Cross", arr),1);
        //   }
        // }


          // console.log(item.additionalServices);

      },
      // changeAdditionalTranslationInput(item){
      //   var arr = item.additionalServices;
      //   if (item.additionalServicesTranslation == ''){
      //     arr.splice($.inArray("Translation", arr),1);
      //   }
      // },
      // changeAdditionalCrossInput(item){
      //   var arr = item.additionalServices;
      //   if (item.additionalServicesCross == ''){
      //     arr.splice($.inArray("Cross", arr),1);
      //   }
      // },
      // changeAdditionalOtherInput(item){
      //   var arr = item.additionalServices;
      //   if (item.additionalServicesOther == ''){
      //     arr.splice($.inArray("Other", arr),1);
      //   }
      // },

      submit(){
        // console.log(this.scopeList);
        var met_id = this.$cookie.getCookie('methodology_id');
        var project_methodologyType = this.$cookie.getCookie('project_methodologyType');
        // console.log(this.scopeList[0].fieldworkCostArr);

        if(this.scopeList.additionalServices.includes('Design of screener')){
          this.scopeList.designScreener_input =1;
        }
        if(this.scopeList.additionalServices.includes('Design of interview guide')){
          this.scopeList.designGuide_input =1;
        }
        if(this.scopeList.additionalServices.includes('Topline report')){
          this.scopeList.toplineReport =1;
        }
        if(this.scopeList.additionalServices.includes('Full report')){
          this.scopeList.fullReport =1;
        }

        var jsonRes = JSON.stringify( this.scopeList );
        console.log(jsonRes);



        createAdditional(met_id,this.activeName,jsonRes).then(response => {
          if (response.code == '1'){
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

  .fc-item{
    overflow: hidden;
    margin-bottom: 20px;
  }
  .fc-title-left{
    float: left;
    margin-right: 10px;
    line-height: 40px;
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

  .item-info-box{
    /*float: left;*/
    margin-bottom: 15px;
  }
  .project-scope{
    /*display: none;*/
  }

  .fieldwork-title{
    font-size: 16px;
  }

  .additional-Services{
    display: block;
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

  .add_input{
    float: left;
    width: 120px;
    margin-left: 15px;

  }

</style>
