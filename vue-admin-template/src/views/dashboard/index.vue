<template>
  <div class="dashboard-container">
    <breadcrumb class="breadcrumb-container" />
    <el-row >
      <div style="margin:10px auto;">
        <el-col :xs="{span: 18, offset: 3}" :sm="{span: 18, offset: 3}" :md="{span: 20, offset: 2}" :lg="{span: 18, offset: 2}">
          <el-col :xs="{span: 24}" :sm="{span: 6}" :md="{span: 6}" :lg="{span: 6}" class="card card1"  @click.native.prevent="jump1()">
            <div class="quota">
              <img :src="img1" alt="">
              <span>Get Quick Quote</span>
            </div>

          </el-col>

          <el-col :xs="{span: 24}" :sm="{span: 6, offset: 3}" :md="{span: 6, offset: 3}" :lg="{span: 6, offset: 3}" class="card card2" @click.native.prevent="jump2()">
            <div class="quota">
              <img :src="img2" alt="">
              <span>Create New Survey</span>
            </div>

          </el-col>

          <el-col :xs="{span: 24}" :sm="{span: 6, offset: 3}" :md="{span: 6, offset: 3}" :lg="{span: 6, offset: 3}" class="card card3" @click.native.prevent="jump3()">
            <div class="quota">
              <img :src="img3" alt="">
              <span>Market Insights</span>
            </div>

          </el-col>
        </el-col>

      </div>
      <el-col :xs="{span: 22, offset: 1}" :sm="{span: 22, offset: 1}" :md="{span: 20, offset: 2}" :lg="{span: 18, offset: 2}"
              class="home-table">
        <el-table
          :data="tableData"
          style="width: 100%"
          class="mytable"

          :default-sort = "{prop: 'date', order: 'descending'}"
        >
          <el-table-column
            prop="po"
            label="PO#"
            sortable
            fixed
            min-width="100px"
          >
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="deleteRow(scope.$index, scope.row)"
                type="text"
                size="small">
                {{ scope.row.po }}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="project_name"
            label="Project Name"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="methodology"
            label="Methodology"
          >
          </el-table-column>
          <el-table-column
            prop="markets"
            label="Markets"
          >
          </el-table-column>

          <el-table-column
            prop="start_date"
            label="Start Date"
            sortable
          >
          </el-table-column>

          <el-table-column
            prop="project_manager"
            label="Project Manager"
          >
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="deleteRow(scope.$index, tableData)"
                type="text"
                size="small">
                {{ scope.row.project_manager }}
              </el-button>
            </template>
          </el-table-column>


        </el-table>
      </el-col>
    </el-row>



  </div>


</template>

<script>
  import { mapGetters } from 'vuex'
  import Breadcrumb from '@/components/Breadcrumb'
  import $ from 'jquery'
  import router from '../../router'
  import img1 from '../../assets/home_images/home-quota.png'
  import img2 from '../../assets/home_images/home-survey.png'
  import img3 from '../../assets/home_images/home-market.png'

  export default {
    name: 'Home',
    components: {
      Breadcrumb
    },
    data() {
      return {
        img1:img1,
        img2:img2,
        img3:img3,
        tableData: [{
          po: 'QC02022020',
          project_name: '糖尿病患者调查',
          methodology: '网络问卷',
          markets: '中国市场',
          start_date: '2020-02-02',
        project_manager: 'Rack'
        }, {
          po: 'QC02022020',
          project_name: '糖尿病患者调查',
          methodology: '网络问卷',
          markets: '中国市场',
          start_date: '2020-02-02',
          project_manager: 'Rack'
        }, {
          po: 'QC02022020',
          project_name: '糖尿病患者调查',
          methodology: '网络问卷',
          markets: '中国市场',
          start_date: '2020-02-02',
          project_manager: 'Rack'
        }, {
        po: 'QC02022020',
        project_name: '糖尿病患者调查',
        methodology: '网络问卷',
        markets: '中国市场',
        start_date: '2020-02-02',
        project_manager: 'Rack'
      }] }
    },
    methods: {
      deleteRow(index, rows) {
        rows.splice(index, 1);
      },
      jump1(){
        this.$router.push({
          name: 'new-enquiry',  // 路由的名称
        })
      },
      jump2(){
        this.$router.push({
          name: 'create-new-survey',  // 路由的名称
        })
      },
      jump3(){
        this.$router.push({
          name: 'new-enquiry',  // 路由的名称
        })
      },
    }
  }

</script>

<style lang="scss" scoped>
  .home-table{
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    display: none;

    }

.dashboard {
  &-container {
    /*margin: 30px;*/
    width: 100%;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }

}
  .card {
    height: 80px;
    box-shadow:0px 8px 4px 0px rgba(59,115,148,0.5);
    border-radius:30px;
    margin-top: 15px;
    cursor: pointer;
    line-height: 80px;
  }
  .card1{
    background:rgba(59,115,148,1);
  }
  .card2{
    background:rgba(119,175,176,1);
  }
  .card3{
    background:rgba(116,141,170,1);
    margin-bottom: 50px;
  }
  .quota{
    height: 100%;
    /*border-bottom: 2px solid #cccccc;*/
    color: #ffffff;
    line-height: 80px;
    text-align: center;
    /*border-radius: 15px;*/

  }

  .quota img{
    width: 30px;
    height: auto;
    vertical-align: middle;
    margin-right: 15px;
  }
  .info{
    text-align: center;
    color: #ffffff;
    line-height: 60px;
    font-size: 14px;
  }

</style>


