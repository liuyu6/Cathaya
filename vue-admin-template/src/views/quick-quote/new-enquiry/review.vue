<template>
  <div class="box">
    <breadcrumb class="breadcrumb-container" />
    <!--  <Remindtext  ></Remindtext>-->
    <step></step>
    <div class="setBackgroundForm">
          <el-table
            :data="tableData"
            stripe
            style="width: 100%"
            :default-sort = "{prop: 'date', order: 'descending'}"
          >
            <el-table-column
              prop="methodology_type"
              label="Methodology Type"
              sortable
              min-width='150px'
              >
            </el-table-column>
            <el-table-column
              prop="methodology"
              label="Methodology"
              sortable
              min-width='150px'
              >
            </el-table-column>

<!--            <el-table-column-->
<!--              prop="address"-->
<!--              label="Market"-->
<!--              min-width='200px'-->
<!--              :formatter="formatter">-->
<!--            </el-table-column>-->

            <el-table-column
              prop=""
              label="Action"
              style="text-align: center;"
              min-width="150px"
            >
              <template slot-scope="scope">
<!--                <el-button-->
<!--                @click.native.prevent="editQuota(scope.$index, scope.row)"-->
<!--                type="text">-->
<!--                Edit-->
<!--              </el-button>-->

<!--                <el-button-->
<!--                  @click.native.prevent="deleteQuota(scope.$index, scope.row)"-->
<!--                  style="color: red;"-->
<!--                  type="text">-->
<!--                  Delete-->
<!--                </el-button>-->
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
                <el-button
                  size="mini"
                  type="primary"
                  @click="handlePreview(scope.$index, scope.row)">Preview</el-button>

              </template>
            </el-table-column>
          </el-table>
      <div class="saveBtn" style="margin-top: 30px;">
        <el-button  style="width: 200px;" @click="AddMethodology">Add other methodology</el-button>
        <el-button type="primary" style="width: 200px;" @click="getQuot">Get Quick Quote</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import Breadcrumb from '@/components/Breadcrumb'
  import Remindtext from '@/components/Remindtext'
  import $ from 'jquery'
  import Step from '@/components/Step'
  import { mapGetters } from 'vuex'
  import { createEnquiry } from '@/api/quota'
  import { projectInformation } from '@/api/quota'
  import { deleteMethodology } from '@/api/quota'


  export default {
    name: 'Review',
    data(){
      return{
          tableData: []
      }
    },
    created(){
      this.init();
    },

    components: {
      Breadcrumb,
      Remindtext,
      Step
    },
    computed: {
      ...mapGetters([
        'user_id',
        'name'
      ])
    },
    mounted(){
      var project_methodologyType = this.$cookie.getCookie('project_methodologyType');
      $('#step').step({
        index:'5',
        stepDirection:'x',
        showStepButton:true,
        stepCount:6,
        type:project_methodologyType,
        stepTitles:['Project Overview','Methodology','Market','Fieldwork Services',' Additional Services','Review'],
      })
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
          // 页面初始化
          projectInformation(projectNumber).then(response => {
            if(response.code == '1'){
              console.log(response);
              this.methodology_type=response.data.type;
              var mem='';
              if(response.data.type == '1' ){
                mem='Qualitative';
              }else{
                mem='Quantitative'
              }
              var arr = response.data.method;
              for(var i=0;i<arr.length;i++){
                  this.tableData.push({
                      'met_id':arr[i].id,
                      'methodology_type':mem,
                      'methodology':arr[i].methodology
                  })
              }
            }
          }).catch(() => {
            this.loading = false
          });
        }
      },
      handleEdit(index,row){

        console.log(index);
        console.log(row);
        this.$cookie.setCookie('methodology_id',row.met_id,'1');
        // this.$cookie.setCookie('project_methodologyType',row.type,'1');
        this.$router.push({
          name: 'set-methodology',  // 路由的名称
          query: {
          }
        })
      },
      handleDelete(index,row){
        var msg = "Are you sure to delete"+' "'+ row.methodology +'"';
        return this.$confirm(msg, '', {
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          deleteMethodology(row.met_id).then(response => {
            if(response.code == '1'){
              this.tableData.splice(index, 1);
              // this.init();
              this.$message({
                type: 'success',
                message: 'Successfully Delete!'
              });
            }
          })
        }).catch(() => {
        })



      },
      handlePreview(index,row){
        this.$cookie.setCookie('methodology_id',row.met_id,'1');
        this.$router.push({
          name: 'quota-preview',  // 路由的名称
        })
      },
      getQuot(){
        var projectNumber = this.$cookie.getCookie('project_number');
        this.$router.push({
          name: 'preliminary-quotation',  // 路由的名称
          query: {
          }
        });
        // deleteMethodology(projectNumber).then(response => {
        //   if(response.code == '1'){
        //     this.$router.push({
        //       name: 'preliminary-quotation',  // 路由的名称
        //       query: {
        //       }
        //     })
        //   }else{
        //     this.$message({
        //       type: 'error',
        //       message: 'Submit failed!'
        //     });
        //   }
        // })

      },
      AddMethodology(){
        this.$cookie.delCookie('methodology_id');
        this.$router.push({
          name: 'set-methodology',  // 路由的名称
        })
      }
    }
  }
</script>

<style scoped>
  .box{
    width: 900px;
  }
  .setBackgroundForm{
    /*width: 600px;*/
    margin-top: 30px;
    margin-left: 5%;
  }
  .saveBtn{
    width: 100%;
    text-align: left;
  }
</style>
