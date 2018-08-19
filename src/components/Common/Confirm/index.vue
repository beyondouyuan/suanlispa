<template>
  <transition name="bounce">
    <div class="self-confirm" v-if="visible">
      <div class="bg"></div>
      <div class="self-container" :style="{width: width}">
        <div class="self-header">
          {{title}}
          <span @click="close" class="icon-remove icon-large self-close-btn" v-if="closeDialog">X</span>
        </div>
        <div class="content">
          <slot name="content"></slot>
        </div>
        <slot name="footer">
          <!-- <div class="self-footer" slot="footer">
            <a href="javscript:void(0)" class="self-btn make-sure">确定</a>
            <a href="javscript:void(0)" class="self-btn cancel">取消</a>
          </div> -->
        </slot>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'Confirm',
    props: {
      width: {
        type: String,
        default: '260px'
      },
      title: {
        type: String,
        default: '信息'
      },
      visible: {
        type: Boolean,
        default: false
      },
      closeDialog: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
      }
    },
    methods: {
      close () {
        this.$emit('update:visible', false)
      }
    }
  }
</script>

<style lang="scss">
  .bounce-enter-active {
   -webkit-transform: scale(2);
    -moz-transform: scale(2);
    -ms-transform: scale(2);
    transform: scale(2);
    opacity: 0;
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    transition: all 0.3s;
  }
  .bounce-leave-active {
    -webkit-transform: scale(2);
    -moz-transform: scale(2);
    -ms-transform: scale(2);
    transform: scale(2);
    opacity: 0;
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    transition: all 0.3s;
  }
  @keyframes bounce-in {
    -webkit-transform: scale(2);
    -moz-transform: scale(2);
    -ms-transform: scale(2);
    transform: scale(2);
    opacity: 0;
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    transition: all 0.3s;
  }
  .self-confirm {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9999999;
  }
  .self-confirm .bg {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: #000;
    opacity: 0.3;
    z-index: 99999;
  }
  .self-confirm .self-container {
    position: absolute;
    display: inline-block;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 260px;
    min-width: 260px;
    border-radius: 8px;
    z-index: 9999999999999;
  }
  .self-confirm .self-container .self-header {
    width: 100%;
    padding: 10px;
    background-color: #00B49D;
    border-bottom: 1px solid #eee;
    color: #fff;
    text-align: left;
  }
  .self-confirm .self-container .content {
    width: 100%;
    padding: 10px;
    background-color: #FFFFFF;
  }
  .self-confirm .self-container .self-footer {
    width: 100%;
    padding: 10px;
    background-color: #FFFFFF;
    text-align: right;
    border-top: 1px solid #eee;
  }
  .self-btn {
    padding: 5px 15px;
    text-decoration: none !important;
    border-radius: 2px;
    margin: 6px 6px 0 6px;
    overflow: hidden;
  }
  .self-btn:hover {
    text-decoration:  none !important;
  }
  .self-btn:active {
    text-decoration:  none !important;
  }
  .self-btn.make-sure {
    background-color: #00B49D;
    color: #fff;
  }
  .self-btn.cancel {
    background-color: #BBB5B5;
    color: #fff;
  }
  .self-close-btn {
    cursor: pointer;
    float: right;
  }
</style>
