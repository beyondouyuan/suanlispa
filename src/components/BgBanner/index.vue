<template>
  <section class="bg-banner">
    <span>{{title}}</span>
    <img src="/static/image/banner01.png">
  </section>
</template>
<script>
  export default {
    name: 'BgBanner',
    props: {
      title: {
        type: String
      }
    }
  }
</script>
<style lang="scss">
  .bg-banner {
    width: 100%;
    height: auto;
    position: relative;
    overflow: hidden;
    > img {
      display: block;
      width: 100%;
    }
    span {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 30px;
      color: #FFFFFF;
      border-bottom: 4px solid #FFFFFF;
    }
  }
  @media screen and (max-width:767px) {
    .bg-banner {
      display: none;
      height: 20vh;
      > img {
        display: block;
        width: 100%;
        height: 100%;
      }
      span {
        font-size: 1.5rem;
      }
    }
}
</style>
