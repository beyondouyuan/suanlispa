<template>
  <div class="err-container">
    <p>{{msg}}</p>
  </div>
</template>
<script>
  export default {
    name: 'NotFound',
    data() {
      return {
        msg: 'sorry 404 not found'
      }
    }
  }
</script>
<style lang="scss">
  .err-container {
    width: 100%;
    min-height: 100vh;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    p {
      font-size: 36px
    }
  }
</style>
