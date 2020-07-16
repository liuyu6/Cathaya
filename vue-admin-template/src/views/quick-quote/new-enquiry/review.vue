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
              prop="date"
              label="Methodology Type"
              sortable
              min-width='150px'
              >
            </el-table-column>
            <el-table-column
              prop="name"
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
                  @click="handleDelete(scope.$index, scope.row)">Preview</el-button>

              </template>
            </el-table-column>
          </el-table>
      <div class="saveBtn" style="margin-top: 30px;">
        <el-button type="primary" style="width: 200px;" @click="getQuot">Get Quick Quot</el-button>
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


  export default {
    name: 'Review',
    data(){
      return{
          tableData: [{
            date: 'Quantitative',
            name: 'Online Survey',
            address: 'China（mainland），Macau'
          }, {
            date: 'Quantitative',
            name: 'CAWI',
            address: 'China（mainland），Hong Kong....'
          }, {
            date: 'Quantitative',
            name: 'Mystery Shopping',
            address: 'China（mainland），Hong Kong'
          }, {
            date: 'Quantitative',
            name: 'Intercept',
            address: 'China（mainland）'
          }]

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
      Step
    },
    computed: {
      ...mapGetters([
        'user_id',
        'name'
      ])
    },
    mounted(){
      $('#step').step({
        index:'5',
        stepDirection:'x',
        showStepButton:true,
        stepCount:6,
        stepTitles:['Project Overview','Methodology','Market','Fieldwork Services',' Additional Services','Review'],
      })
    },
    methods:{
      handleEdit(){
        this.$router.push({
          name: 'set-methodology',  // 路由的名称
          query: {
          }
        })
      },
      getQuot(){
        this.$router.push({
          name: 'preliminary-quotation',  // 路由的名称
          query: {
          }
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
