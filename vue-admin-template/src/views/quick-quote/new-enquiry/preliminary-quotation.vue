<template>
  <div class="box">
    <breadcrumb class="breadcrumb-container" />
    <Remindtext  ></Remindtext>
    <div class="content" style="width: 100%;">
      <h2>Quotation</h2>
      <p class="project_number">PO : <span id="project_number" >LYNK03182020A_rev0</span></p>
      <p class="project_number">Methodology Type: <span id="project_methodologyType" >LYNK03182020A_rev0</span></p>
      <p class="project_time">Time: <span id="project_time" >2020.3.18 10:10:30</span></p>

<!--      报价单内容-->
      <div class="quotationBox">
          <div >
            <el-table
              :data="tableData"
              :span-method="arraySpanMethod"
              border
              :header-cell-style="headClass"
              style="width: 100%;">
              <el-table-column
                prop="market"
                label="Market">
              </el-table-column>
              <el-table-column
                prop="category"
                min-width="100px"
                label="Service Category">
              </el-table-column>
              <el-table-column
                prop="cost_items"
                min-width="100px"
                label="Cost Items">
              </el-table-column>
<!--              <el-table-column-->
<!--                prop="cpi"-->
<!--                label="CPI">-->
<!--              </el-table-column>-->
              <el-table-column
                prop="subtotal"
                label="Subtotal">
              </el-table-column>
              <el-table-column
                prop="market_total"
                style="background-color: #1f2d3d;"
                label="Market Total">
              </el-table-column>
            </el-table>
          </div>
          <div class="subtotal">
            <span style="font-size: 22px;">Project Total： </span><span id="subtotal">$<span id="subtotalVal"></span></span>
          </div>

          <div class="saveBtn" style="margin-top: 30px;">
            <el-button  style="width: 200px;" @click="edit">Edit</el-button>
            <el-button type="primary" style="width: 200px;" @click="getQuote">Confirm Quote</el-button>
          </div>
      </div>

    </div>


  </div>
</template>

<script>
  import Breadcrumb from '@/components/Breadcrumb'
  import Remindtext from '@/components/Remindtext'
  import $ from 'jquery'
  import { mapGetters } from 'vuex'
  import { projectInformation } from '@/api/quota'
  import { quotation } from '@/api/quota'
  import { confirmQuotation } from '@/api/quota'


  export default {
    name: 'preliminary-quotation',
    data(){
      return{
        tableData:[]
        // tableData: [{
        //   market: 'Canada',
        //   category: 'Fieldwork',
        //   cost_items: 'xxxxxxxx',
        //   cpi: '$300.00',
        //   subtotal:'$2000',
        //   market_total:'$5000'
        // },{
        //   market: 'Canada',
        //   category: 'Additional Services',
        //   cost_items: 'xxxxxxxx',
        //   cpi: '$500.00',
        //   subtotal:'$3000',
        //   market_total:'$5000'
        // },{
        //   market: 'Japan',
        //   category: 'Fieldwork',
        //   cost_items: 'xxxxxxxx',
        //   cpi: '$600.00',
        //   subtotal:'$4000',
        //   market_total:'$7200'
        // },{
        //   market: 'Japan',
        //   category: 'Additional Services',
        //   cost_items: 'xxxxxxxx',
        //   cpi: '$800.00',
        //   subtotal:'$3200',
        //   market_total:'$7200'
        // }],

      }
    },
    created(){
      this.init();
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
          // 项目信息
          projectInformation(projectNumber).then(response => {
            if(response.code == '1'){
              // console.log(response);
              $('#project_number').text(response.data.number);
              if(response.data.type == '1'){
                $('#project_methodologyType').text('Qualitative');
              }else{
                $('#project_methodologyType').text('Quantitative');
              }
              $('#project_time').text(response.data.create_time);


            }
          }).catch(() => {
            this.loading = false
          });

          // 报价单信息
          quotation(projectNumber).then(response => {
            if(response.code == '1'){
              console.log(response);
              this.tableData=response.data;
              $('#subtotalVal').text(response.sum);
            }
          }).catch(() => {
            this.loading = false
          });
        }
      },
      headClass () {
        return 'background:#328C30;color:#ffffff;'
      },
      edit(){
        this.$router.push({
          name: 'project-review',  // 路由的名称
          query: {
          }
        });
      },
      getQuote(){
        // cookie中没有项目编号进行跳转
        var projectNumber = this.$cookie.getCookie('project_number');
        confirmQuotation(projectNumber).then(response => {
          if(response.code == '1'){
            this.$alert('Quote submitted successfully !', '', {
              confirmButtonText: 'confirm',
              callback: action => {
                this.$router.push({
                  name: 'new-enquiry',  // 路由的名称
                  query: {
                  }
                });
              }
            });
          }
        }).catch(() => {
          this.loading = false
        });
      },
      arraySpanMethod({ row, column, rowIndex, columnIndex }) {
        // console.log(row)
        // console.log(rowIndex)
        // console.log(column)
        // console.log(columnIndex)
         if (columnIndex === 0 || columnIndex === 4) {
            if (rowIndex % 2 === 0) {
              return {
                rowspan: 2,
                colspan: 1
              };
            } else {
              return {
                rowspan: 0,
                colspan: 0
              };
            }
          }

      },
      objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        if (columnIndex === 0) {
          if (rowIndex % 2 === 0) {
            return {
              rowspan: 2,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        };
        if (columnIndex === 1) {
          if (rowIndex % 2 === 0) {
            return {
              rowspan: 2,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        };
      }
    }
  }
</script>

<style>
  .box{
    width: 900px;
    color: #1F263E;

  }
  .content{
    width: 100%;
    padding-left: 50px;
  }
  .project_number{
    font-size: 16px;
    font-weight: 600;
  }
  .project_time{
    font-size: 16px;
    font-weight: 600;
  }
  .quotationBox{
    margin-top: 30px;
    width: 100%;
    /*border: 1px solid red;*/
    height: auto;
    padding-bottom: 100px;
  }
  .projectTotal{
    width: 100%;
    height: 80px;
    background-color: #2F498C;
    color: #ffffff;
    line-height: 80px;
    text-align: right;
  }
  #projectTotal{
    font-size: 30px;
    margin-left: 5px;
    margin-right: 40px;
  }

  .subtotal{
    width: 100%;
    height: 80px;
    background-color: #328C30;
    color: #ffffff;
    line-height: 80px;
    font-size: 18px;
    text-align: right;
  }
  #subtotal{
    font-size: 26px;
    margin-left: 5px;
    margin-right: 40px;
  }

  td{
    text-align: center!important;
  }

</style>
