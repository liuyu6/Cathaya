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
          prop="create_time"
          sortable
          min-width="100px"
          label="Date Of Formation">
        </el-table-column>

        <el-table-column
          prop=""
          label="Action"
          style="text-align: center;"
        >
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="addOtherMethodologyBtn(scope.$index, scope.row)"

              type="text">
              Add other
              <br /><br />
              methodology type
            </el-button>

          </template>
        </el-table-column>

        <el-table-column
          prop=""
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
              style="color: #E79627;"
              type="text">
              Submit
            </el-button>

            <el-button
              @click.native.prevent="deleteQuota(scope.$index, scope.row)"
              style="color: red;"
              type="text">
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
        <el-button type="primary" @click="changeMethodologyType">Confirm</el-button>
      </div>
    </el-dialog>

<!--    添加另外一种方式-->
    <el-dialog title="Methodology Type" :visible.sync="dialogMethodology3" width="30%">

      <el-radio-group v-model="addOtherMethodology" style="font-size: 18px;">
        <el-radio label="Qualitative" class="addOtherMethRadio1" :disabled="addOtherMethRadioStatus1"></el-radio>
        <el-radio label="Quantitative" class="addOtherMethRadio2" :disabled="addOtherMethRadioStatus2"></el-radio>
      </el-radio-group>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogMethodology3 = false">Cancel</el-button>
        <el-button type="primary" @click="addOtherMeth">Confirm</el-button>
      </div>
    </el-dialog>
<!--    编辑项目选择定性定量-->
    <el-dialog title="Methodology Type" :visible.sync="dialogMethodology2" width="30%">

      <el-radio-group v-model="edit_methodologyType" style="font-size: 18px;">
        <el-radio label="Qualitative" :disabled="edit_methodologyRadioStatus1"></el-radio>
        <el-radio label="Quantitative" :disabled="edit_methodologyRadioStatus2"></el-radio>
      </el-radio-group>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogMethodology2 = false">Cancel</el-button>
        <el-button type="primary" @click="edit_methodology">Confirm</el-button>
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
  import { getMeth } from '@/api/quota'
  import { ration } from '@/api/quota'

  import $ from 'jquery'

  export default {
    data() {
      return {
        tableDataBegin: [],
        tableDataName: "",
        tableDataEnd: [],
        currentPage: 1,
        pageSize: 5,
        totalItems: 1,
        filterTableDataEnd:[],
        flag:false,
        dialogMethodology:false,
        dialogMethodology2:false,
        dialogMethodology3:false,
        addOtherMethodology:'',
        addOtherMethRadioStatus1:false,
        addOtherMethRadioStatus2:false,

        methodologyType:'Qualitative',
        edit_methodologyType:'Qualitative',
        edit_methodologyRadioStatus1:false,
        edit_methodologyRadioStatus2:false,

        projectMeth:'',
      }
    },
    components: {
      Breadcrumb,
      Remindtext
    },
    created() {
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
      getmeth(number){
        getMeth(number).then(response => {
           if (response.code == '1'){
             this.projectMeth =  response.data;
           }
        }).catch(() => {
          this.loading = false;
        });
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
      changeMethodologyType(){
        this.dialogMethodology=false;
        console.log(this.methodologyType);
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

      addOtherMethodologyBtn(index,row){
        this.dialogMethodology3=true;
        this.$cookie.setCookie('project_number',row.number,'1');
        this.$cookie.delCookie('project_methodologyType');
        var pnumber = row.number;
        this.addOtherMethRadioStatus1 =false;
        this.addOtherMethRadioStatus2 =false;
        getMeth(pnumber).then(response => {
          if (response.code == '1'){
                if (response.data == '1'){
                      this.addOtherMethRadioStatus1 =true;
                      this.addOtherMethodology ='Quantitative';
                }else if(response.data == '2'){
                      this.addOtherMethRadioStatus2=true;
                      this.addOtherMethodology ='Qualitative';
                }else if(response.data == '3'){
                  this.addOtherMethRadioStatus1 =true;
                  this.addOtherMethRadioStatus2=true;
                }
          }
        }).catch(() => {
          this.loading = false;
        });

      },
      addOtherMeth(){
        var pnumber2 = this.$cookie.getCookie('project_number');
        ration(pnumber2).then(response => {
          if (response.code == '1'){
            this.$router.push({
              name: 'set-project-market',  // 路由的名称
              query: {
              }
            })
          }
        }).catch(() => {
          this.loading = false;
        });

      },

      editQuota(index,row){
        // console.log(index);
        // console.log(row.id);
        // console.log(row.number);
        // console.log(this.user_id);
        this.dialogMethodology2=true;
        this.$cookie.setCookie('project_number',row.number,'1');
        this.$cookie.delCookie('project_methodologyType');
        var pnumber3 = row.number;
        this.edit_methodologyRadioStatus1 =false;
        this.edit_methodologyRadioStatus2 =false;
        this.edit_methodologyType = ''
        getMeth(pnumber3).then(response => {
          console.log(response);
          if (response.code == '1'){
            if (response.data == '1'){
              this.edit_methodologyRadioStatus2 =true;
              this.edit_methodologyType = 'Qualitative'
            }else if(response.data == '2'){
              this.edit_methodologyRadioStatus1 =true;
              this.edit_methodologyType = 'Quantitative'
            }else if(response.data == '3'){
              this.edit_methodologyRadioStatus1 =false;
              this.edit_methodologyRadioStatus2 =false;
            }
          }
        }).catch(() => {
          this.loading = false;
        });


      },
      edit_methodology(){
        var type="";
        if (this.edit_methodologyType == 'Qualitative'){
          type='1';
        }else if(this.edit_methodologyType == 'Quantitative'){
          type="2"
        }
        this.$cookie.setCookie('project_methodologyType',type,'1');

        this.$router.push({
          name: 'set-quote-background',  // 路由的名称
          query: {
          }
        })

      },
      submitQuota(){

      },
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
      previewQuota(){

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


