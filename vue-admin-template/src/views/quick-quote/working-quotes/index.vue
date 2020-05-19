<template>
  <div>
    <breadcrumb class="breadcrumb-container" />
    <Remindtext  ></Remindtext>
    <div class="content">
      <div style="margin-bottom: 20px;">
        <el-input v-model="tableDataName" placeholder="Project Name" style="width:240px"></el-input>
        <el-button type="primary" @click="doFilter">Search</el-button>
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
            <el-button
              @click.native.prevent="linkProjectDetil(scope.$index, scope.row)"
              type="text">
              {{ scope.row.po }}
            </el-button>
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
          prop="markets"
          sortable
          label="Quote Status">
        </el-table-column>


        <el-table-column
          prop="start_date"
          label="Action"
          style="text-align: center;"
        >
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="linkProjectDetil(scope.$index, scope.row)"
              type="text">
              <i class="el-icon-edit" style="font-size: 22px;"></i>
            </el-button>

            <el-button
              @click.native.prevent="closeProject(scope.$index, scope.row)"
              type="text">
              <i class="el-icon-switch-button" style="font-size: 22px;color: red;"></i>
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
      };
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
          name: 'new-enquiry',  // 路由的名称
          query: {
            id:index
          }
        })
      },
      closeProject(index,data){
        return this.$confirm('此操作将关闭项目, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '关闭成功！'
          });
        }).catch(() => {
          this.$message({
            type: 'success',
            message: '取消成功！'
          });
          throw new Error("取消成功！");
        });
      },
      linkProjectDetil2(index,data){
        this.$router.push({
          name: 'new-enquiry',  // 路由的名称
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
