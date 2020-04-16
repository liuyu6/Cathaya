<template xmlns="http://www.w3.org/1999/html">
  <div>
    <breadcrumb class="breadcrumb-container" />

    <el-row :gutter="10">
      <div >
        <el-col :xs="{span: 22, offset: 1}" :sm="{span: 22, offset: 1}" :md="{span: 22, offset: 1}" :lg="{span: 22, offset: 1}">
          <el-col :xs="{span: 24}" :sm="{span: 4}" :md="{span: 4}" :lg="{span: 4}" class="card card1"  @click.native.prevent="jump1()">
            <div class="quota">
              <img :src="img1" alt="">
              <span>Study<br />Materials</span>
            </div>

          </el-col>

          <el-col :xs="{span: 24}" :sm="{span: 4, offset: 1}" :md="{span: 4, offset: 1}" :lg="{span: 4, offset: 1}" class="card card2" @click.native.prevent="jump2()">
            <div class="quota">
              <img :src="img2" alt="">
              <span>Recruiting<br />Sheets</span>
            </div>

          </el-col>

          <el-col :xs="{span: 24}" :sm="{span: 4, offset: 1}" :md="{span: 4, offset: 1}" :lg="{span: 4, offset: 1}" class="card card3" @click.native.prevent="jump3()">
            <div class="quota">
              <img :src="img3" alt="">
              <span>Audio/Video<br />Recordings</span>
            </div>

          </el-col>
          <el-col :xs="{span: 24}" :sm="{span: 4, offset: 1}" :md="{span: 4, offset: 1}" :lg="{span: 4, offset: 1}" class="card card4" @click.native.prevent="jump3()">
            <div class="quota">
              <img :src="img4" alt="">
              <span>Transcripts</span>
            </div>

          </el-col>
          <el-col :xs="{span: 24}" :sm="{span: 4, offset: 1}" :md="{span: 4, offset: 1}" :lg="{span: 4, offset: 1}" class="card card5" @click.native.prevent="jump3()">
            <div class="quota">
              <img :src="img5" alt="">
              <span>Reports</span>

            </div>

          </el-col>
        </el-col>
      </div>
      <div style="margin:20px auto;">
        <el-col   :xs="{span: 22, offset: 1}" :sm="{span: 22, offset: 1}" :md="{span: 22, offset: 1}" :lg="{span: 22, offset: 1}">
          <el-col :xs="{span: 24}" :sm="{span: 4}" :md="{span: 4}" :lg="{span: 4}" class="uptate">
            <div class="uptate_top">
              <p>Recruiting Updates</p>
            </div>
            <div class="uptate_footer">
              <el-col :xs="{span: 24}" :sm="{span: 7}" :md="{span: 7}" class="link link1" >
                <p>Target # of Interviews/Groups# :</p>
                <p>xxxxxxxx</p>

              </el-col>
              <el-col :xs="{span: 24}" :sm="{span: 7, offset: 1}" :md="{span: 7, offset: 1}"  class="link link2" >
                <p>Target # of Interviews/Groups# :</p>
                <p>xxxxxxxx</p>
              </el-col>
              <el-col :xs="{span: 24}" :sm="{span: 7, offset: 1}" :md="{span: 7, offset: 1}" class="link link3" >
                <p>Target # of Interviews/Groups# :</p>
                <p>xxxxxxxx</p>
              </el-col>
            </div>

          </el-col>
        </el-col>
      </div>

      <div style="margin:20px auto;">
        <el-col   :xs="{span: 22, offset: 1}" :sm="{span: 22, offset: 1}" :md="{span: 22, offset: 1}" :lg="{span: 22, offset: 1}">
          <el-col :xs="{span: 24}" :sm="{span: 4}" :md="{span: 4}" :lg="{span: 4}" class="uptate">
            <div class="project_top">
              <p>Project Information</p>
            </div>
            <div class="project_footer">
              <el-col :xs="{span: 20, offset: 2}" :sm="{span: 8, offset: 1}" >

                <div class="input_box">
                  <div class="input_title">PO</div>
                  <el-input
                    placeholder=""
                    size="medium"
                    v-model="formLabelAlign.company_name">
                  </el-input>
                </div>

                <div class="input_box">
                  <div class="input_title">Methodology</div>
                  <el-input
                    placeholder=""
                    size="medium"
                    v-model="formLabelAlign.mailing">
                  </el-input>
                </div>

                <div class="input_box">
                  <div class="input_title">Recruiting Criteria</div>
                  <el-input
                    placeholder=""
                    size="medium"
                    v-model="formLabelAlign.province">
                  </el-input>
                </div>

                <div class="input_box">
                  <div class="input_title">Project Timeline</div>
                  <el-input
                    placeholder=""
                    size="medium"
                    v-model="formLabelAlign.zip_code">
                  </el-input>
                </div>

                <div class="input_box">
                  <div class="input_title">Project Manager</div>
                  <el-input
                    placeholder=""
                    size="medium"
                    v-model="formLabelAlign.contact_name">
                  </el-input>
                </div>


              </el-col>

              <el-col :xs="{span: 20, offset: 2}" :sm="{span: 8, offset: 1}" >

                <div class="input_box">
                  <div class="input_title">Project Name</div>
                  <el-input
                    placeholder=""
                    size="medium"
                    v-model="formLabelAlign.registration">
                  </el-input>
                </div>

                <div class="input_box">
                  <div class="input_title">Detailed Project Specs</div>
                  <el-input
                    placeholder=""
                    size="medium"
                    v-model="formLabelAlign.city">
                  </el-input>
                </div>

                <div class="input_box">
                  <div class="input_title">Start Date</div>
                  <el-input
                    placeholder=""
                    size="medium"
                    v-model="formLabelAlign.country">
                  </el-input>
                </div>

                <div class="input_box">
                  <div class="input_title">Moderator</div>
                  <el-input
                    placeholder=""
                    size="medium"
                    v-model="formLabelAlign.industry_sector">
                  </el-input>
                </div>

                <div style="padding: 50px;"></div>

              </el-col>
            </div>

          </el-col>
        </el-col>
      </div>

    </el-row>
    <div style="margin-bottom: 50px;"></div>
  </div>
</template>

<script>

  import Breadcrumb from '@/components/Breadcrumb'
  import img1 from '../../../assets/project_images/project_file.png'
  import img2 from '../../../assets/project_images/project_reports.png'
  import img3 from '../../../assets/project_images/project_sheets.png'
  import img4 from '../../../assets/project_images/project_study.png'
  import img5 from '../../../assets/project_images/project_transcripts.png'



  export default {
    name:'Qualitative',
    data() {
      return {
        img1:img1,
        img2:img2,
        img3:img3,
        img4:img4,
        img5:img5,
        formLabelAlign: {
          company_name: '',
          registration: '',
          mailing: '',
          city:'',
          province:'',
          country:'',
          industry_sector:'',
          zip_code:'',
          contact_name:'',
          contact_department:'',
          job_title:'',
          contact_email:'',
          contact_phone:'',
          invoice_email:''

        },
      }
    },
    components: {
      Breadcrumb,
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

<style scoped>
  .quota span{
    display: inline-block;
    font-size: 14px;
    float: right;
    margin-top: 20px;
    margin-right: 10px;
  }

  .card {
    height: 80px;
    margin-top: 15px;
    cursor: pointer;
  }
  .card1{
    background:rgba(59,115,148,1);
  }
  .card1 span{
    margin-top: 25px;
    margin-right: 10px;
  }
  .card2{
    background:rgba(119,175,176,1);
  }
  .card2 span{
    margin-top: 25px;
    margin-right: 10px;
  }
  .card3{
    background:rgba(116,141,170,1);
  }
  .card3 span{
    margin-top: 25px;
    margin-right: 10px;
  }
  .card4{
    background:#4867A0;
  }
  .card4 span{
    margin-top: 30px;
    margin-right: 20px;
  }
  .card5{
    background:#DCB451;
    margin-bottom: 30px;
  }
  .card5 span{
    margin-top: 30px;
    margin-right: 20px;
  }
  .quota{
    height: 100%;
    /*border-bottom: 2px solid #cccccc;*/
    color: #ffffff;
    text-align: center;
    /*border-radius: 15px;*/

  }

  .quota img{
    width: 40px;
    height: auto;
    vertical-align: middle;
    margin-top: 20px;
    margin-right: 5px;

  }

  .uptate{
    margin: 20px auto;
    width: 100%;
    box-shadow:3px 3px 10px 0px rgba(199,199,199,1);
    border:1px solid rgba(233,233,233,1);
  }
  .uptate_top{
    height: 50px;
    border-bottom: 2px solid #E9E9E9;
    color: #3B7394;
    line-height: 25px;
    font-size: 20px;
  }
  .uptate_footer{
    height: 120px;
    margin-top: 20px;
    color: #ffffff;
  }
  .link{
    height: 100px;
    background-color: #3B7394;
  }


  .project_top{
    height: 50px;
    border-bottom: 2px solid #E9E9E9;
    color: #3B7394;
    line-height: 25px;
    font-size: 20px;
  }
  .project_footer{
    height: 120px;
    margin-top: 20px;
    color: #ffffff;
  }
  .input_title{
    font-size: 14px;
    color: #566168;
  }

  .el-input{
    margin-top: 10px;
    margin-bottom: 15px;
    display: inline-block;
  }


</style>
