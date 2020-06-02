<template>
  <div class="box">
    <breadcrumb class="breadcrumb-container" />
    <Remindtext  ></Remindtext>
    <div class="content">
      <h2>Quotation</h2>
      <p class="project_number">PO : <span id="project_number">LYNK03182020A_rev0</span></p>
      <p class="project_time">TIME: <span id="project_time">2020.3.18 10:10:30</span></p>

<!--      报价单内容-->
      <div class="quotationBox">
<!--          总价格-->
          <div class="projectTotal">
             <span style="font-size: 22px;">Total Project : </span><span id="projectTotal">$5,801.80</span>
          </div>

<!--        定性-->
          <div >
            <el-table
              :data="tableData6"
              :span-method="arraySpanMethod"
              border
              style="width: 100%;">
              <el-table-column
                prop="id"
                label="Methodology Type"
                width="160">
              </el-table-column>
              <el-table-column
                prop="name"
                label="Market">
              </el-table-column>
              <el-table-column
                prop="amount1"
                sortable
                min-width="100px"
                label="Part">
              </el-table-column>
              <el-table-column
                prop="amount2"
                min-width="100px"
                label="The cost includes">
              </el-table-column>
              <el-table-column
                prop="amount3"
                sortable
                label="CPI">
              </el-table-column>
              <el-table-column
                prop="amount3"
                sortable
                label="Subtotal">
              </el-table-column>
            </el-table>
          </div>
          <div class="subtotal">
            <span style="font-size: 22px;">Subtotal： </span><span id="subtotal">$5,801.80</span>
          </div>

<!--        定量-->
          <div >
            <el-table
              :data="tableData7"
              :span-method="arraySpanMethod"
              border
              style="width: 100%;">
              <el-table-column
                prop="id"
                label="Methodology Type"
                width="160">
              </el-table-column>
              <el-table-column
                prop="name"
                label="Market">
              </el-table-column>
              <el-table-column
                prop="amount1"
                sortable
                min-width="100px"
                label="Part">
              </el-table-column>
              <el-table-column
                prop="amount2"
                min-width="100px"
                label="The cost includes">
              </el-table-column>
              <el-table-column
                prop="amount3"
                sortable
                label="CPI">
              </el-table-column>
              <el-table-column
                prop="amount3"
                sortable
                label="Subtotal">
              </el-table-column>
            </el-table>
          </div>
          <div class="subtotal">
            <span style="font-size: 22px;">Subtotal： </span><span id="subtotal">$5,801.80</span>
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

  export default {
    name: 'preliminary-quotation',
    data(){
      return{
        form: {
          project_number:'LYNK03182020A_rev0',
        },
        tableData6: [{
          id: 'Qualitative',
          name: 'Japan',
          amount1: 'Fieldwork',
          amount2: 'xxxxxxxx',
          amount3: '$1,300.90'
        }, {
          id: 'Qualitative',
          name: 'Japan',
          amount1: 'Additional Services',
          amount2: 'The cost includes xxx',
          amount3: '$300.00'
        }, {
          id: 'Qualitative',
          name: 'Canada',
          amount1: 'Fieldwork',
          amount2: 'xxxxxxxx',
          amount3: '$1,300.90'
        },{
          id: 'Qualitative',
          name: 'Canada',
          amount1: 'Additional Services',
          amount2: 'The cost includes xxx',
          amount3: '$300.00'
        }],
        tableData7: [{
          id: 'Quantitative',
          name: 'Japan',
          amount1: 'Fieldwork',
          amount2: 'xxxxxxxx',
          amount3: '$1,300.90'
        }, {
          id: 'Quantitative',
          name: 'Japan',
          amount1: 'Additional Services',
          amount2: 'The cost includes xxx',
          amount3: '$300.00'
        }, {
          id: 'Quantitative',
          name: 'Canada',
          amount1: 'Fieldwork',
          amount2: 'xxxxxxxx',
          amount3: '$1,300.90'
        },{
          id: 'Quantitative',
          name: 'Canada',
          amount1: 'Additional Services',
          amount2: 'The cost includes xxx',
          amount3: '$300.00'
        }],


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
      $('#step').step({
        index:'0',
        stepDirection:'x',
        showStepButton:true,
        stepCount:3,
        stepTitles:['Set Project Background','Set Project Market','Set Project Methodology'],
      })
    },
    methods:{
      arraySpanMethod({ row, column, rowIndex, columnIndex }) {
        console.log(row)
        console.log(column)
        console.log('1');
         if (columnIndex === 0) {
            if (rowIndex % 4 === 0) {
              return {
                rowspan: 4,
                colspan: 1
              };
            } else {
              return {
                rowspan: 0,
                colspan: 0
              };
            }
          }
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
          }

        // if (row.id=='12987122') {
        //   // if (columnIndex === 0) {
        //   //   return [2, 2];
        //   // }
        //   else if (columnIndex === 1) {
        //     return [0, 0];
        //   }
        // }
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
    background-color: #E8C154;
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
