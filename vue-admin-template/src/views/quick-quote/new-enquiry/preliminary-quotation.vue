<template>
  <div>
    <breadcrumb class="breadcrumb-container" />
    <div class="pre-box">
         <div class="project-title">LYNK03182020A_rev0：</div>
        <div class="pre-content">
            <div class="pre-num-total">
                <div class="num-total-n1">
                  <div class="n1-num">$13,580.90</div>
                  <div class="n1-info">Total Project </div>
                </div>
                <div class="num-total-n2">
                  <div class="n2-num">$3,750.90</div>
                  <div class="n2-info">Total Fieldwork </div>
                </div>
                <div class="num-total-n3">
                  <div class="n3-num">$9,830.00</div>
                  <div class="n3-info">Total Additional Services </div>
                </div>
            </div>
            <div class="pre-city-total">
                <div class="city-total-item c1">
                    <div class="city-item-name">Japan</div>
                    <div class="city-item-top">
                        <div class="item-top-t">
                            <div class="item-top-t-info">Subtotal</div>
                            <div class="item-top-t-info">CPI</div>
                            <div class="item-top-t-info" style="float: left;width: 200px;">&nbsp;</div>
                        </div>
                        <div class="item-top-m">
                            <div class="item-top-m-left"><i class="el-icon-success" style="color: #409EFF;"></i> Fieldwork</div>
                            <div class="item-top-m-info">$2,300.90</div>
                            <div class="item-top-m-info">$XXX</div>

                        </div>
                        <div class="item-top-f">
                          The cost includes sample, recruiting, incentive, & incentive handling fees.
                        </div>

                    </div>
                    <hr style="margin-top: 10px;margin-bottom: 10px;">
                  <div class="city-item-top">
                    <div class="item-top-t">
                      <div class="item-top-t-info">Subtotal</div>
                      <div class="item-top-t-info" style="float: left;width: 200px;">&nbsp;</div>
                    </div>
                    <div class="item-top-m">
                      <div class="item-top-m-left"><i class="el-icon-success" style="color: #F3BAB5;"></i> Additional Services</div>
                      <div class="item-top-m-info">$2,300.90</div>

                    </div>
                    <div class="item-top-f" style="text-align: left;">
                      The cost includes ......
                    </div>

                  </div>
                </div>
                <div class="city-total-item c2" style="background-color: #E8FCFF;">
                    <div class="city-item-name">France</div>
                    <div class="city-item-top">
                        <div class="item-top-t">
                            <div class="item-top-t-info">Subtotal</div>
                            <div class="item-top-t-info">CPI</div>
                            <div class="item-top-t-info" style="float: left;width: 200px;">&nbsp;</div>
                        </div>
                        <div class="item-top-m">
                            <div class="item-top-m-left"><i class="el-icon-success" style="color: #409EFF;"></i> Fieldwork</div>
                            <div class="item-top-m-info">$2,300.90</div>
                            <div class="item-top-m-info">$XXX</div>

                        </div>
                        <div class="item-top-f">
                          The cost includes sample, recruiting, incentive, & incentive handling fees.
                        </div>

                    </div>
                    <hr style="margin-top: 10px;margin-bottom: 10px;">
                  <div class="city-item-top">
                    <div class="item-top-t">
                      <div class="item-top-t-info">Subtotal</div>
                      <div class="item-top-t-info" style="float: left;width: 200px;">&nbsp;</div>
                    </div>
                    <div class="item-top-m">
                      <div class="item-top-m-left"><i class="el-icon-success" style="color: #F3BAB5;"></i> Additional Services</div>
                      <div class="item-top-m-info">$2,300.90</div>

                    </div>
                    <div class="item-top-f" style="text-align: left;">
                      The cost includes ......
                    </div>

                  </div>
                </div>
            </div>
        </div>

    </div>

  </div>
</template>

<script>

  import Breadcrumb from '@/components/Breadcrumb'
  import $ from 'jquery'

  export default {
    data() {
      return {

      }
    },
    components: {
      Breadcrumb,
    },
    mounted(){

    },

    methods:{

    },

  }
</script>

<style scoped>

  .pre-box{
    width: 800px;
    margin: 10px auto;
  }
  .project-title{
    margin-bottom: 10px;
    color: #1F263E;
    font-size: 20px;
  }
  .pre-content{
    width: 500px;
    /*height: 500px;*/
    border-radius:25px;
  }
  .pre-num-total{
    width: 100%;
    height: 300px;
    border-radius:25px;
    background-color: #2F498C;
    position: relative;
    z-index: 999;
  }
  .num-total-n1{
    height: 100px;
    text-align: center;
    color: #ffffff;
    padding-top: 50px;
  }
  .n1-num{
    font-size: 50px;
  }
  .n1-info{
    font-size: 20px;
    color: #C1C1C1;
  }
  .num-total-n2{
    margin-top: 80px;
    float: left;
    width: 50%;
    text-align: center;
    color: #ffffff;
    height: 100px;
   }
  .n2-num{
    font-size: 30px;
  }
  .n2-info{
    font-size: 20px;
    color: #C1C1C1;
  }
  .num-total-n3{
    margin-top: 80px;
    float: left;
    width: 50%;
    text-align: center;
    color: #ffffff;
    height: 100px;
  }
  .n3-num{
    font-size: 30px;
  }
  .n3-info{
    font-size: 20px;
    color: #C1C1C1;
  }
  .pre-city-total{
    width: 100%;
    height: auto;
    border-radius: 25px;
  }
  .city-total-item{
    padding-top: 70px;
    padding-left: 15px;
    padding-right: 15px;
    margin-top: -50px;
    background-color: #E8EFFF;
    border-radius: 25px;
    padding-bottom: 30px;
  }
  .city-item-name{
    width: 100px;
    text-align: center;
    height: 30px;
    font-size: 16px;
    color:rgba(255,255,255,1);
    line-height:30px;
    border-radius:15px;
    background:rgba(254,134,108,0.5);
  }
  .city-item-top{
    margin-top: 20px;
  }
  .item-top-t{
    height: 50px;
  }
  .item-top-m{
    height: 50px;
  }
  .item-top-t-info{
    font-size: 20px;
    margin-right: 30px;
    color: #7B7B7B;
    width: 80px;
    float: right;
  }
  .item-top-m-left{
    float: left;
    font-size: 22px;
  }
  .item-top-m-info{
    font-size: 20px;
    margin-right: 30px;
    color: #1F263E;
    width: 80px;
    float: right;
  }
  .item-top-f{
    color: #1F263E;
    font-size: 14px;
    text-align: center;
    width: 100%;
    clear: both;
  }
  .c1{
    position: relative;
    z-index: 99;
  }

</style>
