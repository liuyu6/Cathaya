<template>
    <div class="form-content">
      <div class="fc-header">
        <span style="color: red;">*</span>
        <span>If you have any questions or enquiries, please
        also feel free to contact our bidding team directly at</span>
        <span style="color: #407392;">quotes@cathayaresearch.com </span><span>We will respond within 24 hours.</span>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'Remindtext',
  }
</script>

<style style lang="scss" scoped>
  .form-content {
    display: block;
    width: 100%;
    margin-left: 50px;
  }
  .fc-header{
    font-size: 18px;
    font-weight:500;
    line-height:28px;
    margin-bottom: 20px;
    padding: 8px;
    background-color: aliceblue;
  }
</style>
