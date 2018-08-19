<template>
  <div id="modal-overlay">
    <div class="modal-data">
      <div class="modal-loading">
        <Loading></Loading>
      </div>
      <label>loading...</label>
    </div>
  </div>
</template>
<script>
  import Loading from '@/components/Common/Loading'
  export default {
    name: 'LoadingModal',
    components: {
      Loading
    },
    data() {
      return {

      }
    }
  }
</script>
<style>
/* 定义模态对话框外面的覆盖层样式 */
#modal-overlay {
    position: fixed;
    left: 0px;
    top: 0px;
    width:100%;
    height:100%;
    text-align:center;
    z-index: 1000;
    overflow: auto;
    background-color: rgba(0,0,0,.4);
}
/* 模态框样式 */
.modal-data{
    width: 200px;
    margin: 200px auto;
    background-color: #fff;
    border:0px solid #000;
    padding:15px;
    text-align:center;
    border-radius:25px;
    position: relative;
}
.modal-loading {
  text-align: center;
}
</style>
