<template>
  <div class="box">
    <breadcrumb class="breadcrumb-container" />
    <!--  <Remindtext  ></Remindtext>-->
    <step></step>
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
            <el-row>
              <el-button class="save-btn" type="primary" @click="submit">Save</el-button>
              <div class="save-btn-remind" v-show="btn_remind">
                      <span class="fc-form-item-title-span2">( Please provide more details on your project requirements & scope,
                        our bidding team will get back to you shortly. )</span>
              </div>
            </el-row>
        </el-form>
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
  import { createFieldwork } from '@/api/quota'
  import { projectInformation } from '@/api/quota'



  export default {
    name: 'set-project-fieldwork',
    data(){
      return{
        methodology:'',
        btn_remind:false,
        activeName:'',
        remarkActiveName:1,
        scopeList:[{
              fieldworkCost: '',
              fieldworkCostArr:[]
              // fieldworkCostArr: [{
              //   typeRespondents: '',
              //   specificRecruiting: '',
              //
              //   one_IR: '',
              //   one_lengthInterview: '',
              //   one_sampleSize: '',
              //   one_targetType: '',
              //
              //   group_IR: '',
              //   group_lengthInterview: '',
              //   group_numberRespondentsGroup: '',
              //   group_numberGroupsTotal: '',
              //   group_targetType: '',
              //
              // }],
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
        index:'3',
        stepDirection:'x',
        showStepButton:true,
        stepCount:6,
        type:'1',
        stepTitles:['Project Overview','Methodology','Market','Fieldwork Services',' Additional Services','Review'],
      });
      // this.activeName='China（mainland）';
      this.loading();
      setTimeout(() => {
        for(var k = 0;k<this.scopeList[0].fieldworkCostArr.length;k++){
          var res = this.scopeList[0].fieldworkCostArr[k].typeRespondents;
          var mVal =  this.methodology;

          var scopeItem = $('.scope-content')[0];
          var s1_item = $(scopeItem).find('.cost-box-s1')[k];
          var s2_item = $(scopeItem).find('.cost-box-s2')[k];
          console.log(mVal);
          console.log(res);
          console.log(k);
          // console.log(s2_item);
          if (mVal == 'IDI' || mVal == "TDI" || mVal =="In home/context Ethnography"){
            $(s1_item).css('display','block');
            $(s2_item).css('display','none');
            if (res == 'B2C (consumers)' || res == 'B2B (business decision makers or professionals)'){
              $(s1_item).find('.oneIR').css('display','block');
              $(s1_item).find('.oneTargetType').css('display','none');
            }else{
              $(s1_item).find('.oneIR').css('display','none');
              $(s1_item).find('.oneTargetType').css('display','block');
            }
          }

          if (mVal == 'Dyad' || mVal == "Trio" || mVal=="Mini-Focus Group" || mVal =="Focus Group"){
            $(s1_item).css('display','none');
            $(s2_item).css('display','block');
            if (res == 'B2C (consumers)' || res == 'B2B (business decision makers or professionals)'){
              $(s2_item).find('.groupIR').css('display','block');
              $(s2_item).find('.groupTargetType').css('display','none');
            }else{
              $(s2_item).find('.groupIR').css('display','none');
              $(s2_item).find('.groupTargetType').css('display','block');
            }
          }
        }
      }, 2500);


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

          if (projectMeth == '2' || met_id == null){
            this.$router.push({
              name: 'set-quantitative-fieldwork',  // 路由的名称
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
            var countrys= '';
            for(var i=0;i<arr.length;i++){
              if(arr[i].id == met_id){
                countrys = arr[i].countrys;
              }
            }
            var filedArray=countrys[this.activeName];
            // 初始化fieldWork
            console.log(countrys[this.activeName]);
            if(filedArray.length == 0){
              this.scopeList[0].fieldworkCost=false;
              $('.add-cost-content').css('display','none');
            }else{
              this.scopeList[0].fieldworkCost=true;
              $('.add-cost-content').css('display','block');
            }
            for (var j = 0;j<filedArray.length;j++){
              this.scopeList[0].fieldworkCostArr.push({
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

          }
        }).catch(() => {
          this.loading = false
        });
      },

      filedInit(){
        // 初始化fieldWork
        for(var k = 0;k<this.scopeList[0].fieldworkCostArr.length;k++){
          var res = this.scopeList[0].fieldworkCostArr[k].typeRespondents;
          var mVal =  this.methodology;

          var scopeItem = $('.scope-content')[0];
          var s1_item = $(scopeItem).find('.cost-box-s1')[k];
          var s2_item = $(scopeItem).find('.cost-box-s2')[k];
          console.log(mVal);
          console.log(res);
          console.log(k);
          // console.log(s2_item);
          if (mVal == 'IDI' || mVal == "TDI" || mVal =="In home/context Ethnography"){
            $(s1_item).css('display','block');
            $(s2_item).css('display','none');
            if (res == 'B2C (consumers)' || res == 'B2B (business decision makers or professionals)'){
              $(s1_item).find('.oneIR').css('display','block');
              $(s1_item).find('.oneTargetType').css('display','none');
            }else{
              $(s1_item).find('.oneIR').css('display','none');
              $(s1_item).find('.oneTargetType').css('display','block');
            }
          }

          if (mVal == 'Dyad' || mVal == "Trio" || mVal=="Mini-Focus Group" || mVal =="Focus Group"){
            $(s1_item).css('display','none');
            $(s2_item).css('display','block');
            if (res == 'B2C (consumers)' || res == 'B2B (business decision makers or professionals)'){
              $(s2_item).find('.groupIR').css('display','block');
              $(s2_item).find('.groupTargetType').css('display','none');
            }else{
              $(s2_item).find('.groupIR').css('display','none');
              $(s2_item).find('.groupTargetType').css('display','block');
            }
          }
        }
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

      handleCheck(tab,event) {
        var presentRes = this.activeName;
        console.log(this.activeName);
        this.loading();
        setTimeout(() => {
          for(var k = 0;k<this.scopeList[0].fieldworkCostArr.length;k++){
            var res = this.scopeList[0].fieldworkCostArr[k].typeRespondents;
            var mVal =  this.methodology;

            var scopeItem = $('.scope-content')[0];
            var s1_item = $(scopeItem).find('.cost-box-s1')[k];
            var s2_item = $(scopeItem).find('.cost-box-s2')[k];
            console.log(mVal);
            console.log(res);
            console.log(k);
            // console.log(s2_item);
            if (mVal == 'IDI' || mVal == "TDI" || mVal =="In home/context Ethnography"){
              $(s1_item).css('display','block');
              $(s2_item).css('display','none');
              if (res == 'B2C (consumers)' || res == 'B2B (business decision makers or professionals)'){
                $(s1_item).find('.oneIR').css('display','block');
                $(s1_item).find('.oneTargetType').css('display','none');
              }else{
                $(s1_item).find('.oneIR').css('display','none');
                $(s1_item).find('.oneTargetType').css('display','block');
              }
            }

            if (mVal == 'Dyad' || mVal == "Trio" || mVal=="Mini-Focus Group" || mVal =="Focus Group"){
              $(s1_item).css('display','none');
              $(s2_item).css('display','block');
              if (res == 'B2C (consumers)' || res == 'B2B (business decision makers or professionals)'){
                $(s2_item).find('.groupIR').css('display','block');
                $(s2_item).find('.groupTargetType').css('display','none');
              }else{
                $(s2_item).find('.groupIR').css('display','none');
                $(s2_item).find('.groupTargetType').css('display','block');
              }
            }
          }
        }, 2500);
      },
      beforeLeaveTab(){

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
            this.scopeList[0].fieldworkCostArr.length=0;
            this.areaContent();
            this.$message({
              type: 'success',
              message: '切换成功！可以做一些其他的事情'
            });
            console.log(this.activeName);
          }).catch(() => {
            this.$message({
              type: 'success',
              message: '取消成功！可以做一些其他的事情'
            });
            throw new Error("取消成功！");
          });
        }
      },

      changeFieldword(item) {

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

              one_IR: '',
              one_lengthInterview: '',
              one_sampleSize: '',
              one_targetType: '',

              group_IR: '',
              group_lengthInterview: '',
              group_numberRespondentsGroup: '',
              group_numberGroupsTotal: '',
              group_targetType: '',
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
        var mVal =  this.methodology;

        console.log(index1);
        console.log(index2);
        console.log(res);

        var scopeItem = $('.scope-content')[index1];
        var s1_item = $(scopeItem).find('.cost-box-s1')[index2];
        var s2_item = $(scopeItem).find('.cost-box-s2')[index2];
        // console.log(str);
        if (mVal == 'IDI' || mVal == "TDI" || mVal =="In home/context Ethnography"){
          $(s1_item).css('display','block');
          $(s2_item).css('display','none');
          if (res == 'B2C (consumers)' || res == 'B2B (business decision makers or professionals)'){
            $(s1_item).find('.oneIR').css('display','block');
            $(s1_item).find('.oneTargetType').css('display','none');
          }else{
            $(s1_item).find('.oneIR').css('display','none');
            $(s1_item).find('.oneTargetType').css('display','block');
          }
        }

        if (mVal == 'Dyad' || mVal == "Trio" || mVal=="Mini-Focus Group" || mVal =="Focus Group"){
          $(s1_item).css('display','none');
          $(s2_item).css('display','block');
          if (res == 'B2C (consumers)' || res == 'B2B (business decision makers or professionals)'){
            $(s2_item).find('.groupIR').css('display','block');
            $(s2_item).find('.groupTargetType').css('display','none');
          }else{
            $(s2_item).find('.groupIR').css('display','none');
            $(s2_item).find('.groupTargetType').css('display','block');
          }
        }

      },
      addCostContent(item){
        var index = this.scopeList.indexOf(item);
        this.scopeList[index].fieldworkCostArr.push(
          {
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
          // console.log(this.scopeList);
          var met_id = this.$cookie.getCookie('methodology_id');
          var project_methodologyType = this.$cookie.getCookie('project_methodologyType');
          // console.log(this.scopeList[0].fieldworkCostArr);
          var jsonRes = JSON.stringify( this.scopeList[0] );
          console.log(jsonRes);
          console.log(this.activeName);

        createFieldwork(met_id,this.activeName,jsonRes).then(response => {
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
                      name: 'set-qualitative-additional',  // 路由的名称
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

  .scope-item-info{
    margin-left: 20px;
    margin-top: 30px;
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
