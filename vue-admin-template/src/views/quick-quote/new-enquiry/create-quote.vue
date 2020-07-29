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
    <div class="content" style="width: 100%;margin-left: 50px;">
      <div style="margin-bottom: 20px;">
        <el-input v-model="tableDataName" placeholder="PO# / Project Name" style="width:240px"></el-input>
        <el-button type="primary" @click="doFilter" icon="el-icon-search">Search</el-button>
        <el-button type="primary" id="newBtn" @click="dialogMethodology = true">Creation New Enquiry</el-button>
      </div>

      <el-table
        :data="tableDataEnd"
        border
        style="width: 100%">
        <el-table-column
          sortable
          label="PO#"
          min-width="100px"
        >
          <template slot-scope="scope">
            {{ scope.row.number }}
          </template>
        </el-table-column>

        <el-table-column
          prop="project_name"
          label="Project Name"
        >
        </el-table-column>

        <el-table-column
          prop="type"
          label="Methodology"
        >
          <template slot-scope="scope">
            <el-tag v-if="scope.row.type == '1' ">Qualitative</el-tag>
            <el-tag v-else type="success">Quantitative</el-tag>
          </template>
        </el-table-column>

        <el-table-column
          prop="create_time"
          sortable
          min-width="100px"
          label="Date Of Formation">
        </el-table-column>

        <el-table-column
          prop=""
          label="Add other methodology"
          min-width="120px"
        >
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="addOtherMethodologyBtn(scope.$index, scope.row)"
              type="primary"
              size="small">
               Add
            </el-button>

          </template>
        </el-table-column>

        <el-table-column
          prop=""
          label="Action"
          min-width="160px"
          style="text-align: center;"
        >
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="editQuota(scope.$index, scope.row)"
              size="small">
              Edit
            </el-button>

            <el-button
              @click.native.prevent="submitQuota(scope.$index, scope.row)"
              size="small"
              type="warning">
              Preview
            </el-button>

            <el-button
              @click.native.prevent="deleteQuota(scope.$index, scope.row)"
              size="small"
              type="danger">
              Delete
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

<!--    创建项目选择定性，定量弹框-->
    <el-dialog title="Methodology Type" :visible.sync="dialogMethodology" width="30%">

          <el-radio-group v-model="methodologyType" style="font-size: 18px;">
            <el-radio label="Qualitative"></el-radio>
            <el-radio label="Quantitative"></el-radio>
          </el-radio-group>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogMethodology = false">Cancel</el-button>
        <el-button type="primary" @click="addMethodologyType">Confirm</el-button>
      </div>

    </el-dialog>

<!--    添加另外一种方式-->
    <el-dialog title="Methodology" :visible.sync="dialogMethodology2" width="30%">

      <el-select v-model="edit_methodologyVal" placeholder="请选择">
        <el-option
          v-for="item in checkedMethodology"
          :key="item.id"
          :label="item.methodology"
          :value="item.id">
        </el-option>
      </el-select>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogMethodology2 = false">Cancel</el-button>
        <el-button type="primary" @click="editMeth">Confirm</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>

  import Breadcrumb from '@/components/Breadcrumb'
  import Remindtext from '@/components/Remindtext'
  import { mapGetters } from 'vuex'
  import { quotaList } from '@/api/quota'
  import { delEnquiry } from '@/api/quota'
  import { addEnquiry } from '@/api/quota'
  import { projectInformation } from '@/api/quota'

  import { getMeth } from '@/api/quota'
  import { ration } from '@/api/quota'

  import $ from 'jquery'

  export default {
    data() {
      return {
        // 表单
        tableDataBegin: [],
        tableDataName: "",
        tableDataEnd: [],
        currentPage: 1,
        pageSize: 5,
        totalItems: 1,
        filterTableDataEnd:[],

        // 提示
        flag:false,

        // 弹窗框
        dialogMethodology:false,
        dialogMethodology2:false,
        dialogMethodology3:false,

        methodologyType:'',
        checkedMethodology:[],
        edit_methodologyVal:'',

      }
    },
    components: {
      Breadcrumb,
      Remindtext
    },
    created() {
      this.init();
      this.tableStart();
    },
    mounted(){
      this.Openpermission('1');
      this.costboxShow();
    },

    computed: {
      ...mapGetters([
        'user_id',
        'name'
      ]),

    },

    methods:{
      // 页面初始化
      init(){
        this.$cookie.delCookie('project_methodologyType');
        this.$cookie.delCookie('methodology_id');
        this.$cookie.delCookie('project_number');
      },
      // 表格初始化
      tableStart(){
        quotaList(this.user_id).then(response => {
          if (response.code == '1'){
            this.tableDataBegin=[];
            this.tableDataEnd=[];
            this.tableDataBegin=response.data;
            this.totalItems = this.tableDataBegin.length;
            if (this.totalItems > this.pageSize) {
              for (let index = 0; index < this.pageSize; index++) {
                this.tableDataEnd.push(this.tableDataBegin[index]);
              }
            } else {
              this.tableDataEnd = this.tableDataBegin;
            }

          }
        }).catch(() => {
          this.loading = false;
        });
      },
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

          if(value.number){
            if(value.number.indexOf(this.tableDataName)>=0){
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

      // 添加项目
      addMethodologyType(){
        this.dialogMethodology=false;
        var type="";
        if (this.methodologyType == 'Qualitative'){
          type='1';
        }else if(this.methodologyType == 'Quantitative'){
          type="2"
        }

        addEnquiry(this.user_id,type).then(response => {
          if (response.code == '1'){

             this.$cookie.setCookie('project_number',response.data,'1');
             this.$cookie.setCookie('project_methodologyType',type,'1');

              this.$router.push({
                name: 'set-quote-background',  // 路由的名称
                query: {
                }
              })

          }
        }).catch(() => {
          this.loading = false
        });

      },

      // 添加Methodology
      addOtherMethodologyBtn(index,row){
        this.$cookie.setCookie('project_number',row.number,'1');
        this.$cookie.setCookie('project_methodologyType',row.type,'1');
        this.$cookie.delCookie('methodology_id');

        this.$router.push({
          name: 'set-methodology',  // 路由的名称
          query: {
          }
        })
      },

      // 修改Methodology内容
      editQuota(index,row){
        // console.log(index);
        // console.log(row.id);
        // console.log(row.number);
        // console.log(this.user_id);
        this.checkedMethodology="";
        this.edit_methodologyVal="";
        this.dialogMethodology2=true;
        this.$cookie.setCookie('project_number',row.number,'1');
        this.$cookie.setCookie('project_methodologyType',row.type,'1');
        this.$cookie.delCookie('methodology_id');

        // 获取项目信息
        projectInformation(row.number).then(response => {
          if(response.code == '1'){

            // 初始化methodology选项
            this.checkedMethodology=response.data.method;
            console.log(this.checkedMethodology);
          }
        }).catch(() => {
          this.loading = false
        });



      },

      editMeth(){
        if(this.edit_methodologyVal == ''){
          this.$message({
            type: 'warning',
            message: 'Please Select Methodology!'
          });
        }else{
          this.$cookie.setCookie('methodology_id',this.edit_methodologyVal,'1');
          this.$router.push({
            name: 'set-methodology',  // 路由的名称
            query: {
            }
          })
        }

      },


      // 提交项目
      submitQuota(){

      },

      // 删除项目
      deleteQuota(index,row){
        var msg = "Are you sure to delete"+'" '+row.number+' "';
        return this.$confirm(msg, '', {
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          delEnquiry(row.id).then(response => {
            console.log(response);
            if (response.code == '1'){
              this.tableStart();
              this.$message({
                type: 'success',
                message: 'Successfully Delete!'
              });
            }else{
              this.$message({
                type: 'warning',
                message: 'Successfully Delete!'
              });
            }
          }).catch(() => {
            this.loading = false
          })

        }).catch(() => {

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

<style scoped>
  .box{
    width: 1000px;
    padding-bottom: 100px;
  }
  .remind-content{
    width: 95%;
    margin: 50px auto;
    text-align: center;
    font-size: 18px;
    line-height: 25px;
    color: #2D3E48;
  }
  #newBtn{
    background-color: #FF6A00;
    border-color: #FF6A00;
  }

  .tableContent{
    padding: 20px !important;
    background: #ffffff;
    margin-top: 20px;
  }

  body .el-table th.gutter{
    display: table-cell!important;
  }
  body .el-table colgroup.gutter {
    display: table-cell !important;
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


