<template>
  <div class="box">
    <breadcrumb class="breadcrumb-container" />
    <!--  <Remindtext  ></Remindtext>-->
    <step></step>
    <div class="mcontent">
      <div class="fc-item fc-content-scope">
        <el-tabs v-model="activeName" @tab-click="handleCheck" :before-leave="beforeLeaveTab" @tab-remove="removeTab" class="areaScope">
          <el-tab-pane
            v-for="(item, index) in areaScope"
            :key="item.name"
            :label="item.title"
            :name="item.name"
          >
          </el-tab-pane>
        </el-tabs>

        <el-form ref="" v-model="scopeList" >

            <div class="scope-content"  v-for="(domain, index) in scopeList">
              <div  class="remove-scope-box"  v-show="index > 0 " :key="domain.index" @click="removeScopeContent(domain)"><i class="el-icon-remove"></i></div>
              <div class="scope-item project-scope">
                  <div class="scope-item-info">
                    <div>
                      <div class="item-info-title">Methodology</div>
                      <div class="item-info-box">
                        <el-select v-model="domain.methodology" :key="domain.index" placeholder="请选择" @change="changeMethodology">
                          <el-option label="IDI" value="IDI"></el-option>
                          <el-option label="TDI" value="TDI"></el-option>
                          <el-option label="Dyad" value="Dyad"></el-option>
                          <el-option label="Trio" value="Trio"></el-option>
                          <el-option label="Mini-Focus Group" value="Mini-Focus Group"></el-option>
                          <el-option label="Focus Group" value="Focus Group"></el-option>
                          <el-option label="In home/context Ethnography" value="In home/context Ethnography"></el-option>
                          <el-option label="Desk Research" value="Desk Research"></el-option>
                          <el-option label="Other" value="Other"></el-option>
                        </el-select>
                      </div>
                      <span class="fc-form-item-title-span2" style="margin-left: 5px;">( If your project involves multiple methodologies, please select "Add Another Methodology"
                                  after you complete this specs sheet. )</span>
                    </div>
                  </div>
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
            <el-row>
              <div class="add-methodology" @click="addMethodology"><i class="el-icon-circle-plus"></i> Add Another Methodology</div>
              <el-button class="save-btn" type="primary" >Save</el-button>
              <div class="save-btn-remind" v-show="btn_remind">
                      <span class="fc-form-item-title-span2">( Please provide more details on your project requirements & scope,
                        our bidding team will get back to you shortly. )</span>
              </div>
            </el-row>
        </el-form>
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
    name: 'set-project-methodology',
    data(){
      return{
        btn_remind:false,
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

      }
  },
    components: {
      Breadcrumb,
      Remindtext,
      Step
    },
    mounted(){
      $('#step').step({
        index:'2',
        stepDirection:'x',
        showStepButton:true,
        stepCount:4,
        stepTitles:['Set Project Background','Set Market','Set Methodology','Additional Services Required'],
      })
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

      handleClick(val) {
        $('.el-tabs__nav-prev').css('line-height','70px');
        $('.el-tabs__nav-next').css('line-height','70px');
        var val2 = '';
        var str = this.areaForm.othersArea;
        var arr = str.split(',');
        console.log(arr);


        val2 = val.concat(arr);
        console.log(val2);

        if(str == '' && val.length < 1){
          val2 = '';
        }
        if(str == ''){
          val2 = val;
        }
        // if(val.length < 1){
        //   var val2 = arr;
        // }


        console.log(val2);

        if (val2 == ''){
          $('.el-tabs__nav-scroll').css('display','none');
          $('.fc-content-scope').css('display','none');
        }else{
          $('.el-tabs__nav-scroll').css('display','block');
          $('.fc-content-scope').css('display','block');
        }
        this.areaScope=[];
        for(var i=0; i<val2.length; i++){
          this.areaScope.push({
            title: val2[i],
            name: val2[i],
            content: ''
          });
          this.activeName=val2[0];

        };
        console.log(this.activeName);



        // let newTabName = ++this.tabIndex + '';

        // this.areaScope = newTabName;


      },
      handleCheck(tab,event) {
        var presentRes = this.activeName;
        // console.log(presentRes);
        // console.log(tab.name);
      },
      beforeLeaveTab(){
        // console.log(this.areaScope);
        // console.log(this.isTip);
        if (this.areaScope.length == '1'){
          return  false;
        }
        if(!this.isTip){
          this.isTip = true;
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
      changeMethodology(val) {

        if(val == 'Desk Research' || val == 'Other'){
          $('.scope-service').css('display','none');
        }else{
          $('.scope-service').css('display','block');
        }

        for (var i = 0; i<this.scopeList.length;i++){
          if(this.scopeList[i].methodology =='Desk Research' || this.scopeList[i].methodology == 'Other' ){
            this.btn_remind=true;
            return false;
          }else{
            this.btn_remind=false;
            return false;
            // $('.save-btn-remind').css('display','none');
          }
          console.log(this.scopeList[i].methodology);
        }


      },

      changeFieldword(item) {

        var index = this.scopeList.indexOf(item);
        var checkVal = this.scopeList[index].fieldworkCost

        if(checkVal){
          this.scopeList[index].fieldworkCostArr.length=0;
          this.scopeList[index].fieldworkCostArr.push(
            {
              typeRespondents:'',
              specificRecruiting:'',
            }
          );
        }else{
          this.scopeList[index].fieldworkCostArr.length=0;
        }

      },

      changeTypeRespondents(item1,item2) {
        var index1 = this.scopeList.indexOf(item1);
        var index2 = this.scopeList[index1].fieldworkCostArr.indexOf(item2);
        var val = this.scopeList[index1].fieldworkCostArr[index2].typeRespondents;
        console.log(index1);
        console.log(index2);
        console.log(val);


        if (val == 'B2C (consumers)' || val == 'B2B (business decision makers or professionals)'){
          $('.cost-box-s1').css('display','block');
          $('.cost-box-s2').css('display','none');
        }else{
          $('.cost-box-s1').css('display','none');
          $('.cost-box-s2').css('display','block');
        }

      },
      addCostContent(item){
        var index = this.scopeList.indexOf(item);
        this.scopeList[index].fieldworkCostArr.push(
          {
            typeRespondents:'',
            specificRecruiting:'',
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
      removeScopeContent(item){
        // this.scopeList.splice(this.key);  //删除index为i,位置的数组元素
        var index = this.scopeList.indexOf(item);
        this.scopeList.splice(index);
      },
      addMethodology(){
        console.log(typeof(this.scopeList));

        this.scopeList.push(
          {
            methodology:'',
            fieldworkCost:'',
            fieldworkCostArr:[{
              typeRespondents:'',
              specificRecruiting:'',

              one_IR:'',
              one_lengthInterview:'',
              one_sampleSize:'',
              one_targetType:'',

              group_IR:'',
              group_lengthInterview:'',
              group_numberRespondentsGroup :'',
              group_numberGroupsTotal :'',
              group_targetType:'',

            }],
          }
        );
        // let arr = Array.from(this.scopeList);
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
  .cost-box-s1{
    display: none;
  }
  .cost-box-s2{
    display: none;
  }
  .add-cost-content{
    /*display: none;*/
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
    display: none;
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
