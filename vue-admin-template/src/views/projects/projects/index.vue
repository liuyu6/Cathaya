<template>
  <div>
    <breadcrumb class="breadcrumb-container" />
    <div class="content">
      <div style="margin-bottom: 20px;">
        <el-input v-model="tableDataName" placeholder="Project Name/Markets/Project Status" style="width:240px"></el-input>
        <el-button type="primary" @click="doFilter">Search</el-button>
      </div>

      <el-table
        :data="tableDataEnd"
        border
        style="width: 100%">.
        <el-table-column
          prop="po"
          label="PO#"
          >
        </el-table-column>

        <el-table-column
          prop="project_name"
          sortable
          label="Project Name"
          >
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="linkProjectDetil(scope.$index, scope.row)"
              type="text">
              {{ scope.row.project_name }}
            </el-button>
          </template>
        </el-table-column>

        <el-table-column
          prop="methodology"
          label="Methodology">
        </el-table-column>

        <el-table-column
          prop="markets"
          sortable
          label="Markets">
        </el-table-column>


        <el-table-column
          prop="start_date"
          sortable
          label="Start Date">
        </el-table-column>

        <el-table-column
          prop="methodology"
          label="Project Manager">
        </el-table-column>

        <el-table-column
          prop="project_status"
          sortable
          label="Project Status">
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
  export default {
    data() {
      return {
        tableDataBegin: [
          {
            po: 'QC02022020',
            project_name: '糖尿病患者调查1',
            methodology: '网络问卷',
            markets: '中国市场',
            start_date: '2020-02-02',
            project_manager: 'Rack',
            project_status:'Active'
          }, {
            po: 'QC02022021',
            project_name: '糖尿病患者调查2',
            methodology: '网络问卷',
            markets: '欧洲市场',
            start_date: '2020-02-02',
            project_manager: 'Rack',
            project_status:'Active'
          }, {
            po: 'QC02022022',
            project_name: '糖尿病患者调查3',
            methodology: '网络问卷',
            markets: '美国市场',
            start_date: '2020-02-02',
            project_manager: 'Rack',
            project_status:'Completed'
          }, {
            po: 'QC02022023',
            project_name: '糖尿病患者调查4',
            methodology: '网络问卷',
            markets: '东南亚市场',
            start_date: '2020-02-02',
            project_manager: 'Rack',
            project_status:'Completed'
          }, {
            po: 'QC02022023',
            project_name: '糖尿病患者调查5',
            methodology: '网络问卷',
            markets: '北美市场',
            start_date: '2020-02-02',
            project_manager: 'Rack',
            project_status:'Active'
          }, {
            po: 'QC02022023',
            project_name: '糖尿病患者调查6',
            methodology: '网络问卷',
            markets: '中国市场',
            start_date: '2020-02-02',
            project_manager: 'Rack',
            project_status:'Completed'
          }, {
            po: 'QC02022023',
            project_name: '糖尿病患者调查7',
            methodology: '网络问卷',
            markets: '日本市场',
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
      };
    },
    components: {
      Breadcrumb
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
    methods: {
      //前端搜索功能需要区分是否检索,因为对应的字段的索引不同
      //用两个变量接收currentChangePage函数的参数
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
      linkProjectDetil(index,data){
        this.$router.push({
          name: 'project-qualitative',  // 路由的名称
          query: {
            id:index
          }
        })
      },
      linkProjectDetil2(index,data){
        this.$router.push({
          name: 'project-quantitative',  // 路由的名称
          query: {
            id:index
          }
        })
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
      }
    }
  };
</script>
<style>
  .content{
    width: 80%;
    margin: 10px auto;
  }


</style>
