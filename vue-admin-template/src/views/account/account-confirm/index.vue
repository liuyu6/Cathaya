<template>
    <div class="account-confirm-container">
      <div class="account-confirm-content">
        <div class="register-logo">
          <img :src="registersrc" alt="">
        </div>
        <p class="account-confirm-text">Thank you so much for your registration with Cathaya Research!</p>
        <p class="account-confirm-text"> Your account is now active. Please proceed to your account page now.</p>

        <el-button type="primary" style="width:30%;margin-bottom:10px;background-color: #3B7394;" @click.native.prevent="handleLogin">
            MY Account
        </el-button>
      </div>

    </div>
</template>


<script>

  //获取地址栏参数
  function getUrlKey(name){
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null
  }

  // 设置cookie
  function setCookie(cname,cvalue,exdays)
  {
    var d = new Date();
    d.setTime(d.getTime()+(exdays*24*60*60*1000));
    var expires = "expires="+d.toGMTString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
  }

  export default {
    name: 'index',
    data(){
      return {
        registersrc: require('@/assets/logo.png'),
      }
    },
    methods: {
      handleLogin(){
        this.id = getUrlKey('id')
        console.log(this.id);
        setCookie('Cathaya',this.id,'1');
        location.reload();
      }
    },

  }
</script>

<style scoped>
  .account-confirm-container{
    min-height: 100%;
    width: 100%;
    background-color: #F9F9FB;
    overflow: hidden;
  }
  .account-confirm-content{
    position: relative;
    top: 200px;
    width: 600px;
    max-width: 100%;
    margin: 0 auto;
    overflow: hidden;
    text-align: center;
  }
  .register-logo{
    text-align: center;
    margin-bottom: 10px;
  }
  .register-logo img{
    width: 180px;
    height: auto;
  }
  .account-confirm-text{
    font-size: 18px;
    color: #2D3E48;
    line-height: 25px;
  }
</style>
