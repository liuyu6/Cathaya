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
      <div class="fc-middle fc-base-info">
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
          <hr style="background-color:#D8D8D8; height:1px; border:none;">
      </div>

      <div class="fc-content" v-for="(v,i) in methodologylist">
          <div class="fc-item fc-content-methodologyType">
            <div class="fc-title-left">Methodology Type:</div>
            <div class="fc-inline-left ">
              <el-radio-group v-model="baseInfo.methodology_type" @change="changeHandler">
                <el-radio  label="1" style="line-height: 40px;">Qualitative</el-radio>
                <el-radio  label="2" style="line-height: 40px;">Quantitative</el-radio>
              </el-radio-group>
            </div>
          </div>
          <div class="fc-item fc-content-market">
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
                      <el-checkbox label="South Korea" border></el-checkbox>
                      <el-checkbox label="Singapore" border></el-checkbox>
                      <el-checkbox label="Thailand" border></el-checkbox>
                      <el-checkbox label="Malaysia" border></el-checkbox>
                      <el-checkbox label="Philippines" border></el-checkbox>
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
                  <div class="latam-box areaForm-item">
                    <div class="fc-inline-left-title">Other，specify</div>
                    <div style="width: 60%;margin-top: 10px;">
                      <el-input v-model="areaForm.othersArea" placeholder="Kroea,Russia" @change='handleothersArea'></el-input>
                      <span></span>
                      <span class="fc-form-item-title-span2">( Please separate multiple areas by "," ).</span>
                    </div>
                  </div>
                </el-checkbox-group>

            </div>
          </div>
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

            <div class="scope-content" v-for="(v,i) in scopelist">
                <div class="scope-item">
                    <div class="scope-item-box">
                      <div class="box-item-title">Project Background</div>
                    </div>
                     <hr style="background-color:#D8D8D8; height:1px; border:none;">
                    <div class="scope-item-info">
                        <div class="item-info-title">Methodology</div>
                        <div class="item-info-box">
                          <el-select v-model="scopeForm.methodology" placeholder="请选择" @change="changeMethodology">
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
                <div class="scope-item project-scope">
                    <div class="scope-item-box">
                      <div class="box-item-title">Project Scope</div>
                    </div>
                     <hr style="background-color:#D8D8D8; height:1px; border:none;">
                    <div class="scope-item-info">
                      <div class="project-scope-service-title">Service Items / Deliverables:</div>
                      <div class="item-info-box cost-content">
                          <span class="fieldwork-title">Fieldwork Cost (including sample, recruiting, incentive & incentive handlng fees):</span>
                          <el-checkbox v-model="scopeForm.fieldworkCost" @change="changeFieldword"></el-checkbox>
                          <div class="cost-cc" v-for="(v,i) in costlist">
                            <div class="cost-box"  >
                              <div class="cost-box-item">
                                <span class="cost-box-item-title">Type of Respondents:</span>
                                <el-select v-model="scopeForm.fieldworkCostArr.typeRespondents" placeholder="" @change="changeTypeRespondents">
                                  <el-option label="B2C (consumers)" value="B2C (consumers)"></el-option>
                                  <el-option label="B2B (business decision makers or professionals)" value="B2B (business decision makers or professionals)"></el-option>
                                  <el-option label="Medical practitioners (e.g. physicians, nurses)" value="Medical practitioners (e.g. physicians, nurses)"></el-option>

                                </el-select>
                              </div>
                              <div class="cost-box-item">
                                <span class="cost-box-item-title">Specific Recruiting Criteria:</span>
                                <div style="width: 200px;display: inline-block;">
                                  <el-input v-model="scopeForm.fieldworkCostArr.specificRecruiting" placeholder=""></el-input>
                                </div>

                              </div>
                              <div class="cost-box-s1">
                                <div class="cost-box-item">
                                  <span class="cost-box-item-title">Estimated IR / Recruiting Difficulty:</span>
                                  <el-select v-model="scopeForm.fieldworkCostArr.B2_IR" placeholder="">
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
                                <div class="cost-box-item">
                                  <span class="cost-box-item-title">Length of Interview:</span>
                                  <el-select v-model="scopeForm.fieldworkCostArr.B2_lengthInterview" placeholder="">
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
                                  <el-select v-model="scopeForm.fieldworkCostArr.B2_numberRespondentsGroup" placeholder="">
                                    <el-option  value="2"></el-option>
                                    <el-option  value="3"></el-option>
                                    <el-option  value="4"></el-option>
                                    <el-option  value="5"></el-option>
                                    <el-option  value="6"></el-option>
                                    <el-option  value="7"></el-option>
                                    <el-option  value="8"></el-option>
                                    <el-option  value="9"></el-option>
                                  </el-select>
                                </div>
                                <div class="cost-box-item">
                                  <span class="cost-box-item-title">Number of Groups in Total:</span>
                                  <div style="width: 200px;display: inline-block;">
                                    <el-input v-model="scopeForm.fieldworkCostArr.B2_numberGroupsTotal" placeholder=""></el-input>
                                  </div>
                                </div>
                              </div>
                              <div class="cost-box-s2">
                                <div class="cost-box-item">
                                  <span class="cost-box-item-title">Target Type of Practitioners:</span>
                                  <el-select v-model="scopeForm.fieldworkCostArr.M_lengthInterview" placeholder="">
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
                                  <el-select v-model="scopeForm.fieldworkCostArr.M_lengthInterview" placeholder="">
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
                                  <el-select v-model="scopeForm.fieldworkCostArr.M_numberRespondentsGroup" placeholder="">
                                    <el-option  value="2"></el-option>
                                    <el-option  value="3"></el-option>
                                    <el-option  value="4"></el-option>
                                    <el-option  value="5"></el-option>
                                    <el-option  value="6"></el-option>
                                    <el-option  value="7"></el-option>
                                    <el-option  value="8"></el-option>
                                    <el-option  value="9"></el-option>
                                  </el-select>
                                </div>
                                <div class="cost-box-item">
                                  <span class="cost-box-item-title">Number of Groups in Total:</span>
                                  <div style="width: 200px;display: inline-block;">
                                    <el-input v-model="scopeForm.fieldworkCostArr.M_numberGroupsTotal" placeholder=""></el-input>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div  class="remove-cost-box"   @click="removeCostContent"><i class="el-icon-remove"></i></div>
                          </div>
                      </div>
                      <div class="item-info-box add-cost-content">
                        <div @click="addCostContent"><i class="el-icon-circle-plus"></i> Add Anogher Type of Respondents</div>
                      </div>
                      <div class="item-info-box additional-Services">
                        <span class="fieldwork-title" >Additional Services Required:</span>
                        <el-checkbox-group v-model="additionalServices" style="margin-top: 10px;">
                          <div style="margin-bottom: 10px;">
                            <el-checkbox  label="Moderation" border></el-checkbox>
                            <el-checkbox  label="Facility rental" border></el-checkbox>
                            <el-checkbox  label="Audio recording" border></el-checkbox>
                            <el-checkbox  label="Video recording" border></el-checkbox>
                          </div>
                          <div style="margin-bottom: 10px;">
                            <el-checkbox  label="Design of screener" border></el-checkbox>
                            <el-checkbox  label="Translation" border>
                              Translation of study materials (estimated word count <input type="text"> )
                            </el-checkbox>
                          </div>
                          <div style="margin-bottom: 10px;">
                            <el-checkbox  label="Design of interview guide" border></el-checkbox>
                            <el-checkbox  label="Transcript in local language" border></el-checkbox>
                            <el-checkbox  label="Transcript in English" border></el-checkbox>
                          </div>
                          <div style="margin-bottom: 10px;">
                            <el-checkbox  label="Simultaneous translation" border></el-checkbox>
                            <el-checkbox  label="Topline report" border></el-checkbox>
                            <el-checkbox  label="Full report" border></el-checkbox>
                          </div>
                          <div style="margin-bottom: 10px;">
                            <el-checkbox  label="Other" border>Other services, specify <input type="text"></el-checkbox>
                          </div>

                        </el-checkbox-group>
                      </div>
                      <div class="item-info-box">
                        <div class="fc-title-left">Project setup and management fee :</div>
                        <div class="fc-inline-left">
                          <el-input
                            type="text"
                            placeholder=""
                            v-model="scopeForm.managementFee">
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
                              v-model="scopeForm.requirementsNotes">
                            </el-input>
                          </div>

                        </div>

                    </div>

                </div>
            </div>
            <el-row>
              <div class="add-methodology" @click="addMethodology"><i class="el-icon-circle-plus"></i> Add Another Methodology</div>
              <el-button class="save-btn">Submit Request</el-button>
              <div class="save-btn-remind">
                  <span class="fc-form-item-title-span2">( Please provide more details on your project requirements & scope,
                    our bidding team will get back to you shortly. )</span>
              </div>
            </el-row>
          </div>
        </div>
      <div class="add-methodology-type" @click="addMethodologyType"><i class="el-icon-circle-plus"></i> Add Another Methodology Type</div>
    </div>
    <div style="text-align: center;">
      <el-row>
        <el-button class="f-save" @click="goPre">Get Quick Quote</el-button>
      </el-row>
    </div>
    <div class="footer" style="padding-bottom: 50px;"></div>
  </div>

</template>

<script>

  import Breadcrumb from '@/components/Breadcrumb'
  import $ from 'jquery'



  export default {
    data() {
      return {
        activeName:'China（mainland）',
        baseInfo: {
          project_name: '',
          project_background: '',
          methodology_type:'1'
        },
        areaForm: {
          confirmArea:[ ],
          othersArea:'',
        },
        areaScope: [ ],
        scopeForm: {
          methodology:'',
          fieldworkCost:'',
          fieldworkCostArr:{
              typeRespondents:'',
              specificRecruiting:'',

              B2_IR:'',
              B2_lengthInterview:'',
              B2_numberRespondentsGroup:'',
              B2_numberGroupsTotal:'',

              M_lengthInterview :'',
              M_Practitioners :'',
              M_numberRespondentsGroup :'',
              M_numberGroupsTotal :'',

          },
          managementFee:'',
          requirementsNotes:'',
        },
        costlist:[
                [''],
        ],
        scopelist:[
          [''],
        ],
        methodologylist:[
          [''],
        ],
        additionalServices:[],
      }
    },
    components: {
      Breadcrumb,
    },
    mounted(){
      this.Openpermission('1');
      this.costboxShow();

    },

    methods:{
      costboxShow(){
        $('.cost-box').css('display','none');
        $('.remove-cost-box').css('display','none');
      },
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
      handleothersArea(value){
        $('.el-tabs__nav-prev').css('line-height','70px');
        $('.el-tabs__nav-next').css('line-height','70px');

        var arr = value.split(',');
        var arr2 = this.areaForm.confirmArea;

        if (value == ''){
          var val=arr2;
        }else if(arr2.length < 1){
          var val=arr;
        }else if(value == '' && arr2.length < 1){
          var val='';
        }else{
          var val = arr2.concat(arr);
        }

        console.log(val);
        if (val == ''){
          $('.el-tabs__nav-scroll').css('display','none');
          $('.fc-content-scope').css('display','none');
        }else{
          $('.el-tabs__nav-scroll').css('display','block');
          $('.fc-content-scope').css('display','block');
        }

        this.areaScope=[];
        for(var i=0; i<val.length; i++){
          this.areaScope.push({
            title: val[i],
            name: val[i],
            content: ''
          });
          this.activeName=val[0];
        };
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
          $('.save-btn-remind').css('display','block');
        }else{
          $('.save-btn-remind').css('display','none');
        }

        if(val == 'IDI' || val == 'TDI' || val == 'In home/context Ethnography'){
          $('.project-scope').css('display','block');
        }else{
          $('.project-scope').css('display','none');
        }

      },
      changeFieldword(value) {

        if (value){
          $('.cost-box').css('display','block');
          $('.remove-cost-box').css('display','block');
          $('.add-cost-content').css('display','block');
        }else{
          $('.cost-box').css('display','none');
          $('.remove-cost-box').css('display','none');
          $('.add-cost-content').css('display','none');
        }
      },
      changeTypeRespondents(value) {
        if (value == 'B2C (consumers)' || value == 'B2B (business decision makers or professionals)'){
          $('.cost-box-s1').css('display','block');
          $('.cost-box-s2').css('display','none');
        }else{
          $('.cost-box-s1').css('display','none');
          $('.cost-box-s2').css('display','block');
        }

      },
      addCostContent(){
        this.costlist.push({contactType: '', number: ''});
      },
      removeCostContent(){
        this.costlist.splice(1);  //删除index为i,位置的数组元素
      },
      addMethodology(){
        this.scopelist.push({contactType: '', number: ''});
      },
      addMethodologyType(){
        this.methodologylist.push({contactType: '', number: ''});
      },
      goPre(){
        this.$router.push({
          name: 'preliminary-quotation',  // 路由的名称
          query: {
          }
        })
      },







    },

  }
</script>

<style>

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
    font-size: 18px;
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
  .fc-inline-left-title{
    font-size: 14px;
    color: #2D3E48;
  }

  .fc-form-item-title-span2{
    font-size: 12px;
    color: red;
  }
  .el-checkbox.is-bordered.el-checkbox--small{
    margin-top: 10px;
  }
  .el-checkbox.is-bordered+.el-checkbox.is-bordered{
    margin-left: 0;
  }
  .fc-content{
    /*box-shadow: 3px 3px 10px 0px rgba(199,199,199,1);*/
    border: 1px solid rgba(233,233,233,1);
    padding: 10px;
    margin-bottom: 20px;
  }
  .fc-content-marketInput{
    margin-left: 60px;
  }
  .areaForm-item{
    margin-top: 10px;
  }
  .fc-content-scope{
    background-color: #ffffff;
    padding: 15px;
    background:rgba(255,255,255,1);
    box-shadow:3px 3px 10px 0px rgba(199,199,199,1);
    border:1px solid rgba(233,233,233,1);
    display: none;
  }

  .scope-content{
    margin: 20px auto;
    width: 90%;
    padding: 10px;
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
    margin-left: 50px;
    margin-top: 20px;
    height: 80px;
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
    display: none;
  }
  .save-btn{
    /*float: right;*/
    width: 150px;
    background:rgba(237,241,255,1);
    margin-top: 20px;
    box-shadow:0px 8px 4px 0px rgba(103,147,219,0.3);
    /*float: right;*/
  }
  .save-btn-remind{
    display: none;
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
    font-size: 26px;
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

  .add-methodology-type{
    font-size: 18px;
    color: #409EFF;
    cursor: pointer;
  }
  .f-save{
    background:linear-gradient(180deg,rgba(72,198,239,1) 0%,rgba(61,117,151,1) 100%);
    box-shadow:0px 8px 4px 0px rgba(103,147,219,0.3);
    color: white;
  }
  .f-save:hover{
    color: black;
  }



  @media screen and (max-width: 600px){
    .content{
      width: 90%;
      margin: 10% auto;
      text-align: center;
    }
  }
</style>


