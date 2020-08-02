<template>
  <p>{{ greeting }} World!</p>

</template>

<script>
    export default {
        data() {
            return {
                greeting: 'Hello'
            }
        },
      mounted(){
        $('#step').step({
          index:'3',
          stepDirection:'x',
          showStepButton:true,
          stepCount:6,
          type:'2',
          stepTitles:['Project Overview','Methodology','Market','Fieldwork Services',' Additional Services','Review'],
        });
        this.loading();
        setTimeout(() => {
          for(var k = 0;k<this.scopeList[0].fieldworkCostArr.length;k++){
            console.log(this.scopeList[0].fieldworkCostArr);
            var res = this.scopeList[0].fieldworkCostArr[k].typeRespondents;
            var mVal =  this.methodology;
            console.log(mVal);
            console.log(res);

            var scopeItem = $('.scope-content')[0];
            var s1_item = $(scopeItem).find('.cost-box-s1')[k];

            if (res == 'B2C (consumers)' || res == 'B2B (business decision makers or professionals)'){
              $(s1_item).css('display','block');
              $(s1_item).find('.oneIR').css('display','block');
              $(s1_item).find('.oneTargetType').css('display','none');
            }else{
              $(s1_item).css('display','block');
              $(s1_item).find('.oneIR').css('display','none');
              $(s1_item).find('.oneTargetType').css('display','block');
            }

          }
        }, 2000);


      },
      methods:{
        filedInit(){
          // 初始化fieldWork
          for(var k = 0;k<this.scopeList[0].fieldworkCostArr.length;k++){

            var res = this.scopeList[0].fieldworkCostArr[k].typeRespondents;
            var mVal =  this.methodology;

            var scopeItem = $('.scope-content')[0];
            var s1_item = $(scopeItem).find('.cost-box-s1')[k];

            if (res == 'B2C (consumers)' || res == 'B2B (business decision makers or professionals)'){
              $(s1_item).css('display','block');
              $(s1_item).find('.oneIR').css('display','block');
              $(s1_item).find('.oneTargetType').css('display','none');
            }else{
              $(s1_item).css('display','block');
              $(s1_item).find('.oneIR').css('display','none');
              $(s1_item).find('.oneTargetType').css('display','block');
            }

          }
        },
        handleCheck(tab,event) {
          var presentRes = this.activeName;
          this.loading();
          setTimeout(() => {
            console.log(this.scopeList[0].fieldworkCostArr);
            for(var k = 0;k<this.scopeList[0].fieldworkCostArr.length;k++){

              var res = this.scopeList[0].fieldworkCostArr[k].typeRespondents;
              var mVal =  this.methodology;

              console.log(res);
              console.log(mVal);

              var scopeItem = $('.scope-content')[0];
              var s1_item = $(scopeItem).find('.cost-box-s1')[k];

              if (res == 'B2C (consumers)' || res == 'B2B (business decision makers or professionals)'){
                $(s1_item).css('display','block');
                $(s1_item).find('.oneIR').css('display','block');
                $(s1_item).find('.oneTargetType').css('display','none');
              }else{
                $(s1_item).css('display','block');
                $(s1_item).find('.oneIR').css('display','none');
                $(s1_item).find('.oneTargetType').css('display','block');
              }

            }
          }, 500);

          // console.log(presentRes);
          // console.log(tab.name);
        },
        // 地区内容初始化
        areaContent(){
          var projectNumber = this.$cookie.getCookie('project_number');
          var met_id = this.$cookie.getCookie('methodology_id');

          projectInformation(projectNumber).then(response => {
            if(response.code == '1'){
              var arr = response.data.method;
              var countrys= '';
              for(var i=0;i<arr.length;i++){
                if(arr[i].id == met_id){
                  countrys = arr[i].countrys;
                }
              }
              var filedArray=countrys[this.activeName];
              // 初始化fieldWork
              console.log(countrys);
              console.log(this.activeName);
              console.log(countrys[this.activeName].length);
              if(filedArray.length == 0){
                this.scopeList[0].fieldworkCost=false;
              }else{
                this.scopeList[0].fieldworkCost=true;
              }
              for (var j = 0;j<filedArray.length;j++){
                this.scopeList[0].fieldworkCostArr.push({
                  'typeRespondents':filedArray[j].type_respondents,
                  'specificRecruiting':filedArray[j].specific_recruiting,
                  'IR':filedArray[j].stimated_ir,
                  'lengthSurvey':filedArray[j].length_survey,
                  'sampleSize':filedArray[j].sample_size,
                  'targetType':filedArray[j].target_type
                })
              }

            }
          }).catch(() => {
            this.loading = false
          });
        },
      }
    }
</script>

<style scoped>
  p {
    font-size: 2em;
    text-align: center;
  }
</style>








this.scopeList[0].fieldworkCostArr.length=0;
this.areaContent();


