<template>
  <div>
    <breadcrumb class="breadcrumb-container" />
    <el-row >

      <el-col :xs="{span: 22, offset: 1}" :sm="{span: 22, offset: 1}" :md="{span: 20, offset: 2}"
              :lg="{span: 18, offset: 2}" class="home-table">
        <div>
          <el-button type="primary"  icon="el-icon-circle-plus-outline"  @click="addSubAccount = true">Add Sub-Account</el-button>
        </div>
        <el-table
          style="width: 100%"
          class="mytable"
          :data="userList.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        >
          <el-table-column
            label="User Email" prop="username"
            sortable
            fixed
            min-width="100px"
          >
          </el-table-column>
          <el-table-column
            label="Contact Name" prop="contact_name"
            sortable
          >
          </el-table-column>
          <el-table-column
            label="Job Title" prop="job"
          >
          </el-table-column>

          <el-table-column
            label="Actions"
          >
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click.native.prevent="handleDelete(scope.$index,userList,scope.row)"
                type="danger"
                >Delete</el-button>
            </template>
          </el-table-column>


        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 20, 40]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="userList.length"
          style="margin-top: 20px;text-align: center;"
        >
        </el-pagination>
      </el-col>
    </el-row>

    <el-dialog title="" :visible.sync="addSubAccount">
      <el-form :model="SubForm" :rules="SubFormRules" ref="SubForm">

        <label class="sub-input-title">User Email</label>
        <el-form-item prop="username" >
          <el-input
            v-model="SubForm.username"
            ref="username"
            name="username"
            type="email"
            tabindex="1"
            maxlength="50"
            minlength="8"
            auto-complete="on"
          />
        </el-form-item>

        <label  class="sub-input-title">Contact Name</label>
        <el-form-item prop="contact_name">
          <el-input
            v-model="SubForm.contact_name"
            ref="contact_name"
            name="contact_name"
            tabindex="2"
            type="text"
            auto-complete="on"
          />
        </el-form-item>

        <label  class="sub-input-title">Job Title</label>
        <el-form-item prop="job">
          <el-input
            v-model="SubForm.job"
            ref="job"
            name="job"
            type="text"
            tabindex="3"
            auto-complete="on"
          />
        </el-form-item>


        <label for="" class="sub-input-title">Password</label>
        <el-form-item prop="password">
          <el-input
            v-model="SubForm.password"
            ref="password"
            name="password"
            type="password"
            tabindex="4"
            auto-complete="off"
          />
        </span>
        </el-form-item>

        <label for="" class="sub-input-title">Confirm Password</label>
        <el-form-item prop="confirm_password">
          <el-input
            v-model="SubForm.confirm_password"
            ref="confirm_password"
            name="confirm_password"
            auto-complete="off"
            type="password"
            tabindex="5"
          />
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addSubAccount = false">Cancel</el-button>
        <el-button type="primary" @click.native.prevent="Add_sub_account()">Submit</el-button>
      </div>

    </el-dialog>

  </div>

</template>

<script>
  import { viewSubAccounts } from '@/api/user'
  import { addSubAccount } from '@/api/user'
  import { deleteSubAccounts } from '@/api/user'
  import Breadcrumb from '@/components/Breadcrumb'
  import { mapGetters } from 'vuex'
  import { validateEmail } from '@/utils/validate'

  export default {


    data () {
      const validateUsername = (rule, value, callback) => {
        if (!validateEmail(value)) {
          callback(new Error('Please enter the correct user email'))
        } else {
          callback()
        }
      }
      const validatePassword = (rule, value, callback) => {
        if (value.length < 8) {
          callback(new Error('The password can not be less than 8 digits'))
        } else {
          callback()
        }
      }
      const validatePassword2 = (rule, value, callback) => {
        if (value == "") {
          callback(new Error("Please enter your password again"))
        } else if (value !== this.SubForm.password) {
          callback(new Error("The two input passwords are inconsistent!"))
        } else {
          callback()
        }
      }

      return {
        formLabelWidth: '120px',
        currentPage:1, //初始页
        pagesize:10,    //    每页的数据
        userList: [],
        SubForm:{
          username:'',
          contact_name:'',
          password:'',
          confirm_password:'',
          job:''
        },
        SubFormRules: {
          username: [{ required: true,  trigger: 'blur', validator: validateUsername }],
          contact_name: [{ required: true,  trigger: 'blur' }],
          job: [{ required: true,  trigger: 'blur' }],
          password: [{ required: true, trigger: 'blur', validator: validatePassword }],
          confirm_password: [{ required: true, trigger: 'blur', validator: validatePassword2 }]
        },
        addSubAccount:false
      }
    },
    components: {
      Breadcrumb,
    },
    computed: {
      ...mapGetters([
        'user_id',
        'name'
      ])
    },

    created() {
      this.handleUserList()
    },
    methods: {
      // 初始页currentPage、初始每页数据数pagesize和数据data
      handleSizeChange: function (size) {
        this.pagesize = size;
        console.log(this.pagesize)  //每页下拉显示数据
      },
      handleCurrentChange: function(currentPage){
        this.currentPage = currentPage;
        console.log(this.currentPage)  //点击第几页
      },

      handleUserList() {
        viewSubAccounts(this.user_id).then(response => {
          if (response.code == '1'){
            console.log(response.data);
            this.userList=response.data;
          }
        }).catch(() => {
          this.loading = false
        });
      },

      // handleDelete(index, row) {
      //   console.log(index, row);
      // },
      handleDelete(index,data,row) {

        console.log(index);
        console.log(row);
        deleteSubAccounts(row.id).then(response => {
          if (response.code=='1'){
            this.$message({
              message: 'Save success !',
              type: 'success',
              duration:'2500',
              showClose:'true',
              onClose(){
                data.splice(index, 1);
              }
            });

          }
        }).catch(() => {
          this.loading = false
        })

      },
      Add_sub_account(SubForm) {
        this.SubForm.account_id=this.user_id;
        this.$refs.SubForm.validate(valid => {
              if (valid){
                console.log(this.SubForm);
                addSubAccount(this.SubForm).then(response => {
                  if (response.code=='1'){
                     this.$message({
                      message: 'Save success !',
                      type: 'success',
                      onClose(){
                       location.reload();
                      }
                    });

                  }
                }).catch(() => {
                  this.loading = false
                })
              }

            });
      }
    }



  };

</script>
<style>
  .sub-input-title{
    display: block;
    color: #6A6A6A;
    font-size: 12px;
    margin-bottom: 10px;
  }
  .el-dialog{
    width: 400px;
  }

</style>
