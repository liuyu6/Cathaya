<template>
  <div id="step"></div>
</template>

<script>
  import $ from 'jquery'
  $(function(){
    function Step (el,opts){
      this.$el=$(el),
        this.defaults={
          stepCount:3,
          stepTitles:['标题一','标题二','标题三'],
          stepContent:'.eis-stepContents',
          stepDirection:'x',
          index:'1',
          showStepButton:false,
        }
      this.settings=$.extend({},this.defaults,opts);
    }
    Step.prototype={
      init:function(){
        var that = this,
          $stepBox=that.$el;
        // 初始化步骤条
        function _initStepBar(direct){
          var stepHtml=$('<div class="eis-form-steps"></div>'),
            stepBarHtml ='';
          if(direct==='x'){
            for(var i = 0;i<that.settings.stepCount;i++){
              if(i===that.settings.stepCount-1){
                stepBarHtml+='<div class="eis-form-step" style="width:'+(100/that.settings.stepCount).toFixed(2)+'%">\n' +
                  '            <div class="eis-step-head">\n' +
                  '                <div class="eis-step-icon">\n' +
                  '                    <div class="step-icon-txt">'+(i+1)+'</div>\n' +
                  '                </div>\n' +
                  '            </div>\n' +
                  '            <div class="eis-step-main">'+that.settings.stepTitles[i]+'</div>\n' +
                  '        </div>';
              }else{
                stepBarHtml+='<div class="eis-form-step" style="width:'+(100/that.settings.stepCount).toFixed(2)+'%">\n' +
                  '            <div class="eis-step-head">\n' +
                  '                <div class="eis-step-icon">\n' +
                  '                    <div class="step-icon-txt">'+(i+1)+'</div>\n' +
                  '                </div>\n' +
                  '                <div class="eis-step-line">\n' +
                  '                </div>\n' +
                  '            </div>\n' +
                  '            <div class="eis-step-main">'+that.settings.stepTitles[i]+'</div>\n' +
                  '        </div>';
              }


            }
            stepHtml.append($(stepBarHtml));
            stepHtml.append($('<div class="eis-step-progress"></div>'));
            $stepBox.append(stepHtml);
            // 步骤内容填充到dom中
            var $stepContent = $stepBox.find(that.settings.stepContent);
            $stepBox.append($stepContent);
            $stepBox.find('.eis-stepContent').eq(0).show().siblings('.eis-stepContent').hide();
            var $formStep = that.$el.find('.eis-form-steps'),
              $formSteps = $formStep.find('.eis-form-step'),
              $stepWidth = $formSteps.width(),
              $stepProgress = $formStep.find('.eis-step-progress'),//步骤条
              $stepIcon = $formSteps.find('.eis-step-icon');


            // $stepProgress.width($stepWidth/2);

            // 定义初始化位置
            if (that.settings.index < that.settings.stepCount-1){
              $stepProgress.width($stepWidth*(that.settings.index)+($stepWidth/2));
            }else{
              $stepProgress.width($stepWidth*(that.settings.index));
            }


            var numIndex=parseInt(that.settings.index)+ parseInt(1);

            for (var i = 0;i< numIndex;i++){
              $($formSteps[i]).addClass('is-finish');
            }

            $stepIcon.each(function(index){
              var $this = $(this),
                len = $stepIcon.length;
              $this.on('click',function(){
                if(index===0){
                  $stepProgress.width($stepWidth/2);
                  $this.parent().parent().nextAll().removeClass('is-finish');
                  _initStepCon(index);
                  _initStepFooter(index);
                }else if(index===$stepIcon.length-1){
                  $stepProgress.width($stepWidth*(that.settings.stepCount-1));
                  $this.parent().parent().addClass('is-finish');
                  $this.parent().parent().siblings().addClass('is-finish');
                  _initStepCon(index);
                  _initStepFooter(index);
                }else{
                  $stepProgress.width($stepWidth/2+$stepWidth*index);
                  $this.parent().parent().addClass('is-finish');
                  $this.parent().parent().prevAll().addClass('is-finish');
                  $this.parent().parent().nextAll().removeClass('is-finish');
                  _initStepCon(index);
                  _initStepFooter(index);
                }

              })
            })
          }else if(direct==='y'){
            for(var i = 0;i<that.settings.stepCount;i++){
              if(i===that.settings.stepCount-1){
                stepBarHtml+='<div class="eis-form-step">\n' +
                  '            <div class="eis-step-head">\n' +
                  '                <div class="eis-step-icon">\n' +
                  '                    <div class="step-icon-txt">'+(i+1)+'</div>\n' +
                  '                </div>\n' +
                  '            </div>\n' +
                  '            <div class="eis-step-main">'+that.settings.stepTitles[i]+'</div>\n' +
                  '        </div>';
              }else{
                stepBarHtml+='<div class="eis-form-step">\n' +
                  '            <div class="eis-step-head">\n' +
                  '                <div class="eis-step-icon">\n' +
                  '                    <div class="step-icon-txt">'+(i+1)+'</div>\n' +
                  '                </div>\n' +
                  '                <div class="eis-step-line">\n' +
                  '                </div>\n' +
                  '            </div>\n' +
                  '            <div class="eis-step-main">'+that.settings.stepTitles[i]+'</div>\n' +
                  '        </div>';
              }
            }
            stepHtml.append($(stepBarHtml));
            stepHtml.append($('<div class="eis-step-progress"></div>'));
            that.$el.append(stepHtml);
            // 步骤内容填充到dom中
            var $stepContent = $stepBox.find(that.settings.stepContent);
            $stepBox.append($stepContent);
            $stepBox.find('.eis-stepContent').eq(0).show().siblings('.eis-stepContent').hide();
            $formStep = that.$el.find('.eis-form-steps');
            $formSteps = $formStep.find('.eis-form-step');
            $stepProgress = $formStep.find('.eis-step-progress');//步骤条
            $stepIcon = $formSteps.find('.eis-step-icon');
            var $stepHeight = $formSteps.height();
            $stepProgress.height($stepHeight/2);
            $formSteps.eq(0).addClass('is-finish');
            $stepIcon.each(function(index){
              var $this = $(this),
                len = $stepIcon.length;
              $this.on('click',function(){
                if(index===0){
                  $stepProgress.height($stepHeight/2);
                  $this.parent().parent().nextAll().removeClass('is-finish');
                  _initStepCon(index);
                  _initStepFooter(index);
                }else if(index===$stepIcon.length-1){
                  $stepProgress.height($stepHeight*(that.settings.stepCount-1));
                  $this.parent().parent().addClass('is-finish');
                  $this.parent().parent().siblings().addClass('is-finish');
                  _initStepCon(index);
                  _initStepFooter(index);
                }else{
                  $stepProgress.height($stepHeight/2+$stepHeight*index);
                  $this.parent().parent().addClass('is-finish')
                  $this.parent().parent().nextAll().removeClass('is-finish');
                  _initStepCon(index)
                  _initStepFooter(index);
                }

              })
            })
          }
          _initStepFooter(0)
        }
        // 处理步骤内容
        function _initStepCon(i){
          switch (i) {
            case 0:
              location.href="/#/quick-quote/set-quote-background"
              break;
            case 1:
              location.href="/#/quick-quote/set-project-market"
              break;
            case 2:
              location.href="/#/quick-quote/set-project-methodology"
              break;
            case 3:
              location.href="http://13.230.166.63/laravel/public/admin/AddProjectd"
              break;
            case 4:
              location.href="http://13.230.166.63/laravel/public/admin/AddProjecte"
              break;
            case 5:
              location.href="http://13.230.166.63/laravel/public/admin/AddProjectf"
              break;
            case 6:
              location.href="http://13.230.166.63/laravel/public/admin/AddProjectg"
          }
          // alert(i);
          // var $stepContent = that.$el.find(that.settings.stepContent),
          //     $stepContents = $stepContent.find('.eis-stepContent');
          // $stepContents.eq(i).show().siblings('.eis-stepContent').hide();
        }
        // 初始化生成上一步，下一步
        function _initStepFooter(i){
          if(that.settings.showStepButton===false)return;
          if($(that.settings.stepContent).find('.eis-stepFooter').length===0){
            $(that.settings.stepContent).append('<div class="eis-stepFooter"></div>');
          }
          var $stepFooter = that.$el.find('.eis-stepFooter');
          $stepFooter.html('');
          if(i===0){
            $stepFooter.append($('<button class="eis-btn eis-next-btn">下一步</button>'))
          }else if(i===that.settings.stepCount-1){
            $stepFooter.append($(
              '<button class="eis-btn eis-prev-btn">\n'+
              '上一步</button>\n'+
              '<button class="eis-btn eis-over-btn">完成</button>'))
          }else{
            $stepFooter.append($(
              '<button class="eis-btn eis-prev-btn">\n'+
              '上一步</button>\n'+
              '<button class="eis-btn eis-next-btn">\n'+
              '下一步</button>'
            ))
          }
          /*跳转上一步下一步begin*/
          var $stepContents = $stepBox.find('.eis-stepContent'),
            $formSteps = $stepBox.find('.eis-form-steps'),
            $stepIcon = $formSteps.find('.eis-step-icon');
          function _stepPrevMove(i){
            i-=1;
            if(i<0)i=0;
            $stepIcon.eq(i).trigger('click')
            _initStepCon(i);

          }
          function _stepNextMove(i){
            i+=1;
            if(i>=that.settings.stepCount-1)i=that.settings.stepCount-1;
            $stepIcon.eq(i).trigger('click')
            _initStepCon(i);
          }
          $stepContents.eq(i).parent().find('.eis-btn').on('click',function(){
            var $this=$(this);
            if($this.hasClass('eis-prev-btn')){
              _stepPrevMove(i);
            }else if($this.hasClass('eis-next-btn')){
              _stepNextMove(i)
            }
          })
          /*跳转上一步下一步end*/
        }
        if(that.settings.stepDirection==='x'){
          $stepBox.addClass('eis-horizontal-steps');
          _initStepBar('x');
        }else if(that.settings.stepDirection==='y'){
          $stepBox.addClass('eis-vertical-steps');
          _initStepBar('y');

        }


      }
    }
    $.fn.extend({
      step:function(opt){
        return this.each(function(){
          new Step($(this),opt).init()
        })
      }
    })

  })

  export default {
    name: 'Step',
    mounted(){

    },
    methods:{

    }
  }

</script>

<style >
  *{
    box-sizing: border-box;
  }
  .eis-horizontal-steps .eis-form-steps{
    overflow: hidden;
    padding:0;
    font-size:0;
    position: relative;
  }
  .eis-vertical-steps .eis-form-steps{
    overflow: hidden;
    padding:0;
    font-size:0;
    position: relative;
    width: 150px;
    float:left;
  }
  .eis-horizontal-steps .eis-form-steps .eis-form-step{
    display: inline-block;
    vertical-align: middle;
    width:33.33333%;
    text-align: center;
  }
  .eis-vertical-steps .eis-form-steps .eis-form-step{
    text-align: left;
    height: 80px;
  }
  .eis-horizontal-steps .eis-form-steps .eis-step-progress {
    height: 2px;
    background: #4995FA;
    width: 0;
    position: absolute;
    top: 15px;
    left: 80px;
    -webkit-transition: all .4s;
    -moz-transition: all .4s;
    -ms-transition: all .4s;
    -o-transition: all .4s;
    transition: all .4s;
  }

  .eis-vertical-steps .eis-form-steps .eis-step-progress{
    width:2px;
    background:#4995FA;
    height:0;
    position: absolute;
    top:15px;
    left:15px;
    -webkit-transition: all .4s;
    -moz-transition: all .4s;
    -ms-transition: all .4s;
    -o-transition: all .4s;
    transition: all .4s;

  }
  .eis-horizontal-steps .eis-form-steps .eis-step-head{
    width:100%;
    position: relative;
    left: 65px;
  }
  .eis-vertical-steps .eis-form-steps .eis-step-head{
    float: left;
    height: 100%;
    position: relative;
  }
  .eis-step-head .eis-step-icon{
    width:30px;
    height:30px;
    font-size:16px;
    border-radius:50%;
    position:relative;
    z-index: 1;
    cursor: pointer;
  }
  .is-finish .eis-step-icon{
    border:1px solid #4995FA;
  }
  .eis-step-head .eis-step-icon .step-icon-txt{
    width:26px;
    height:26px;
    background:#DDDDDD;
    border:1px solid #DDDDDD;
    -webkit-border-radius:50%;
    -moz-border-radius:50%;
    border-radius:50%;
    text-align: center;
    line-height: 26px;
    color:#fff;
    position: absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;
    margin: auto;
  }
  .is-finish .eis-step-icon .step-icon-txt{
    background:#4995FA;
    border:1px solid #4995FA;
  }
  .eis-horizontal-steps .eis-step-head .eis-step-line{
    position: absolute;
    background-color: #F1F1F1;
    height: 2px;
    top: 15px;
    left: 28px;
    right: -4px;
  }
  .eis-vertical-steps .eis-step-head .eis-step-line{
    position: absolute;
    background-color: #F1F1F1;
    width: 2px;
    height: 100%;
    top: 15px;
    left:15px;
  }
  .eis-horizontal-steps .eis-form-step .eis-step-main{
    font-size:14px;
    padding:6px 0 0 0;
    color:#666;
    /*text-align: center;*/
    margin-left: -50px;
  }
  .eis-vertical-steps .eis-form-step .eis-step-main{
    overflow: hidden;
    padding:5px 10px;
    font-size:14px;
    color:#666;
    text-align: left;
  }
  .is-finish .eis-step-main{
    color:#3197FD
  }
  .eis-stepContents{
    position: relative;
    min-height: 200px;
    overflow: hidden;
  }
  .eis-stepContents .eis-stepFooter{
    position: absolute;
    bottom:10px;
    right:10px;
  }
  .eis-btn {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    outline:0;
    cursor: pointer;
    font-size: 12px;
    min-width: 64px;
    height: 25px;
    line-height: 25px;
    background: #fff;
    text-align: center;
    border: 1px solid #3197FD;
    color: #3197FD;
    margin-right: 14px;
    border-radius: 2px;
  }
</style>
