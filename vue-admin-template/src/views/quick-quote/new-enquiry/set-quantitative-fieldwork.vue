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
                <div class="scope-item project-scope">
                    <div class="scope-item-info scope-service">
                      <div class="item-info-box cost-content">
                        <div>
                          <el-checkbox v-model="domain.fieldworkCost" :key="domain.index" @change="changeFieldwork(domain)" ></el-checkbox>
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
                                <el-select v-model="v.IR" :key="v.i" placeholder="">
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
                                <el-select v-model="v.targetType" :key="v.i" placeholder="">
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
                                <span class="cost-box-item-title">Length of Survey:</span>
                                <el-select v-model="v.lengthSurvey" :key="v.i" placeholder="">
                                  <el-option  value="5 minutes or shorter"></el-option>
                                  <el-option  value="6-10 minutes"></el-option>
                                  <el-option  value="11-15 minutes"></el-option>
                                  <el-option  value="16-20 minutes"></el-option>
                                  <el-option  value="21-25 minutes"></el-option>
                                  <el-option  value="26-30 minutes"></el-option>
                                  <el-option  value="31-35 minutes"></el-option>
                                  <el-option  value="36-40 minutes"></el-option>
                                  <el-option  value="41-45 minutes"></el-option>
                                </el-select>
                              </div>
                              <div class="cost-box-item">
                                <span class="cost-box-item-title">Sample Size:</span>
                                <div style="width: 200px;display: inline-block;">
                                  <el-input v-model="v.sampleSize" :key="v.i" type="number"></el-input>
                                </div>

                              </div>
                            </div>

                          </div>
                          <div  class="remove-cost-box"  v-show="i > 0 " :key="v.i" @click="removeCostContent(domain,v)"><i class="el-icon-remove"></i></div>
                        </div>
                        <div class="item-info-box add-cost-content">
                          <div :key="domain.index" @click="addCostContent(domain)" v-show="domain.fieldworkCost"><i class="el-icon-circle-plus"></i> Add Another Type of Respondents</div>
                        </div>
                      </div>

                    </div>
                </div>

              </div>
              <el-row>
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



  export default {
    name: 'set-project-fieldwork',
    data(){
      return{
        btn_remind:false,
        activeName:'China（mainland）',

            scopeList:[{
              methodology:'',
              fieldworkCost: '',
              fieldworkCostArr: [{
                typeRespondents: '',
                specificRecruiting: '',

                IR: '',
                lengthSurvey: '',
                sampleSize: '',
                targetType: '',
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
      var projectMeth = this.$cookie.getCookie('project_methodologyType');
      if (projectMeth == '1'){
        this.$router.push({
          name: 'set-qualitative-fieldwork',  // 路由的名称
          query: {
          }
        });
        return false;
      }
      if (projectMeth == '2'){
        this.$router.push({
          name: 'set-quantitative-fieldwork',  // 路由的名称
          query: {
          }
        });
        return false;
      }

    },
    mounted(){
      $('#step').step({
        index:'3',
        stepDirection:'x',
        showStepButton:true,
        stepCount:6,
        type:'2',
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
        console.log(this.areaScope);
        console.log(this.activeName);
        if (this.areaScope.length == '1'){
          return  false;
        }
        if(!this.activeName){
          this.activeName = true;
          return true;
        }

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
      changeMethodology(item) {
        // var index = this.scopeList.indexOf(item);
        // this.scopeList[index].fieldworkCostArr.length=0;
        // this.scopeList[index].fieldworkCost=false;
        //
        // var val =item.methodology;
        // console.log(val);
        // var itemDiv =  $('.scope-content')[index];
        //
        // if(val == 'Other'){
        //   $(itemDiv).find('.scope-service').css('display','none');
        //   $(itemDiv).find('.hr').css('display','none');
        // }else{
        //   $(itemDiv).find('.scope-service').css('display','block');
        //   $(itemDiv).find('.hr').css('display','block');
        // }
        //
        // for (var i = 0; i<this.scopeList.length;i++){
        //   if(this.scopeList[i].methodology == 'Other' ){
        //     this.btn_remind=true;
        //     return false;
        //   }else{
        //     this.btn_remind=false;
        //     return false;
        //     // $('.save-btn-remind').css('display','none');
        //   }
        //   // console.log(this.scopeList[i].methodology);
        // }


      },

      changeFieldwork(item) {

        var index = this.scopeList.indexOf(item);
        var checkVal = this.scopeList[index].fieldworkCost
        var scopeBox = $('.scope-content')[index];

        if(checkVal){
          $(scopeBox).find('.add-cost-content').css('display','block');
          this.scopeList[index].fieldworkCostArr.length=0;
          this.scopeList[index].fieldworkCostArr.push(
            {
              typeRespondents: '',
              specificRecruiting: '',

              IR: '',
              lengthSurvey: '',
              sampleSize: '',
              targetType: '',
            }
          );
        }else{
          $(scopeBox).find('.add-cost-content').css('display','none');
          this.scopeList[index].fieldworkCostArr.length=0;
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
      addCostContent(item){
        var index = this.scopeList.indexOf(item);
        this.scopeList[index].fieldworkCostArr.push(
          {
            typeRespondents: '',
            specificRecruiting: '',

            IR: '',
            lengthSurvey: '',
            sampleSize: '',
            targetType: '',
          }
        );

      },
      removeCostContent(item1,item2){
        // this.costlist.splice(1);  //删除index为i,位置的数组元素
        var index1 = this.scopeList.indexOf(item1);
        var index2 = this.scopeList[index1].fieldworkCostArr.indexOf(item2);
        // console.log(index1);
        // console.log(index2);
        this.scopeList[index1].fieldworkCostArr.splice(index2);

      },

      submit(){
          console.log(this.scopeList);
      },
    }
  }
</script>

<style scoped>
  .box{
    width: 900px;
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
