<template>
  <div class="box">
    <breadcrumb class="breadcrumb-container" />
    <div class="remind-content">
      <p>If you'd like to activate this quick quote function, please contact our bidding team by clicking the "Activation Request"
        button below. Please make sure you provide correct email or phone information in your account profile.
        We look forward to hearing from you soon!</p>
      <el-button  type="primary" style="margin-bottom:10px;background-color: #3B7394;" @click="open">Activation Request</el-button>
    </div>
    <Remindtext  ></Remindtext>
    <div class="content">
      <div style="margin-bottom: 20px;">
        <el-input v-model="tableDataName" placeholder="Project Name" style="width:240px"></el-input>
        <el-button type="primary" @click="doFilter" icon="el-icon-search">Search</el-button>
        <el-button type="primary" id="newBtn">Creation New Enquiry</el-button>
      </div>

      <el-table
        :data="tableDataEnd"
        border
        style="width: 100%">
        <el-table-column
          sortable
          label="PO#"
        >
          <template slot-scope="scope">
            {{ scope.row.po }}
          </template>
        </el-table-column>

        <el-table-column
          prop="project_name"
          label="Project Name"
        >
        </el-table-column>


        <el-table-column
          prop="start_date"
          sortable
          label="Date Of Formation">
        </el-table-column>

        <el-table-column
          prop="start_date"
          label="Action"
          style="text-align: center;"
        >
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="editQuota(scope.$index, scope.row)"
              type="text">
              Edit
            </el-button>

            <el-button
              @click.native.prevent="submitQuota(scope.$index, scope.row)"
              type="text">
              Submit
            </el-button>

            <el-button
              @click.native.prevent="deleteQuota(scope.$index, scope.row)"
              type="text">
              Delete
            </el-button>

            <el-button
              @click.native.prevent="previewQuota(scope.$index, scope.row)"
              type="text">
              Preview
            </el-button>

          </template>
        </el-table-column>

      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalItems"
        style="margin-top: 20px;"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>

  import Breadcrumb from '@/components/Breadcrumb'
  import Remindtext from '@/components/Remindtext'
  import $ from 'jquery'

  export default {
    data() {
      return {
        tableDataBegin: [
          {
            po: 'QC02022020',
            project_name: '糖尿病患者调查1',
            methodology: '网络问卷',
            markets: 'active',
            start_date: '2020-02-02',
            project_manager: 'Rack',
            project_status:'Active'
          }, {
            po: 'QC02022021',
            project_name: '糖尿病患者调查2',
            methodology: '网络问卷',
            markets: 'Active',
            start_date: '2020-02-02',
            project_manager: 'Rack',
            project_status:'Active'
          }, {
            po: 'QC02022022',
            project_name: '糖尿病患者调查3',
            methodology: '网络问卷',
            markets: 'to be launched',
            start_date: '2020-02-02',
            project_manager: 'Rack',
            project_status:'Completed'
          }, {
            po: 'QC02022023',
            project_name: '糖尿病患者调查4',
            methodology: '网络问卷',
            markets: 'to be launched',
            start_date: '2020-02-02',
            project_manager: 'Rack',
            project_status:'Completed'
          }, {
            po: 'QC02022023',
            project_name: '糖尿病患者调查5',
            methodology: '网络问卷',
            markets: 'Active',
            start_date: '2020-02-02',
            project_manager: 'Rack',
            project_status:'Active'
          }, {
            po: 'QC02022023',
            project_name: '糖尿病患者调查6',
            methodology: '网络问卷',
            markets: 'to be launched',
            start_date: '2020-02-02',
            project_manager: 'Rack',
            project_status:'Completed'
          }, {
            po: 'QC02022023',
            project_name: '糖尿病患者调查7',
            methodology: '网络问卷',
            markets: 'Active',
            start_date: '2020-02-02',
            project_manager: 'Rack',
            project_status:'Completed'
          }
        ],
        tableDataName: "",
        tableDataEnd: [],
        currentPage: 1,
        pageSize: 5,
        totalItems: 0,
        filterTableDataEnd:[],
        flag:false

      }
    },
    components: {
      Breadcrumb,
      Remindtext
    },
    created() {
      this.totalItems = this.tableDataBegin.length;
      if (this.totalItems > this.pageSize) {
        for (let index = 0; index < this.pageSize; index++) {
          this.tableDataEnd.push(this.tableDataBegin[index]);
        }
      } else {
        this.tableDataEnd = this.tableDataBegin;
      }
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
          $('.remind-content').css('display','none');
          $('.form-content').css('display','block');
        }else{
          $('.form-content').css('display','none');
          $('.remind-content').css('display','block');
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
      doFilter() {
        if (this.tableDataName == "") {
          this.$message.warning("查询条件不能为空！");
          this.currentChangePage(this.tableDataBegin);
          return;
        }
        this.tableDataEnd = []
        //每次手动将数据置空,因为会出现多次点击搜索情况
        this.filterTableDataEnd=[]
        this.tableDataBegin.forEach((value, index) => {
          if(value.project_name){
            if(value.project_name.indexOf(this.tableDataName)>=0){
              this.filterTableDataEnd.push(value)
            }
          }
          if(value.project_status){
            if(value.project_status.indexOf(this.tableDataName)>=0){
              this.filterTableDataEnd.push(value)
            }
          }
          if(value.markets){
            if(value.markets.indexOf(this.tableDataName)>=0){
              this.filterTableDataEnd.push(value)
            }
          }
        });
        //页面数据改变重新统计数据数量和当前页
        this.currentPage=1
        this.totalItems=this.filterTableDataEnd.length
        //渲染表格,根据值
        this.currentChangePage(this.filterTableDataEnd)
        //页面初始化数据需要判断是否检索过
        this.flag=true
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pageSize = val;
        this.handleCurrentChange(this.currentPage);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage = val;
        //需要判断是否检索
        if(!this.flag){
          //tableDataBegin不能写成tableDataEnd，不然在没有进行搜索功能的时候，不能进行分页操作，数据丢失
          this.currentChangePage(this.tableDataBegin)
        }else{
          this.currentChangePage(this.filterTableDataEnd)
        }
      }, //组件自带监控当前页码
      currentChangePage(list) {
        let from = (this.currentPage - 1) * this.pageSize;
        let to = this.currentPage * this.pageSize;
        this.tableDataEnd = [];
        for (; from < to; from++) {
          if (list[from]) {
            this.tableDataEnd.push(list[from]);
          }
        }
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
  .box{
    width: 900px;
  }
  .remind-content{
    width: 90%;
    margin: 5% auto;
    text-align: center;
    font-size: 18px;
    line-height: 25px;
    color: #2D3E48;
  }
  .content{
    width: 90%;
    margin: 5% auto;
  }
  #newBtn{
    background-color: #FF6A00;
    border-color: #FF6A00;
  }



  @media screen and (max-width: 600px){
      .box{
        width: 100%;
      }
      .remind-content{
        width: 90%;
        margin: 5% auto;
        text-align: center;
      }
  }
</style>


