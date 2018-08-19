<template>
  <section class="platform-container">
      <div class="title-box">
        <h2>我们的<strong class="plat-s">平台优势</strong>有哪些？</h2>
        <p>{{tips}}</p>
      </div>
      <ul class="platform-item">
        <li v-for="(item, index) of platform" :key="index">
          <div>
            <div class="logo">
            <img :src="item.logo">
          </div>
          <div class="title">
            <h2>{{item.title}}</h2>
          </div>
          <div class="tips">{{item.tips}}</div>
          </div>
        </li>
      </ul>
  </section>
</template>
<script>
  const host = process.env.BASE_API
  export default {
    name: 'Platform',
    data() {
      return {
        host
      }
    },
    props: {
      title: {
        type: String,
        required: true
      },
      tips: {
        type: String,
        required: true
      },
      platform: {
        type: Array,
        required: true
      }
    }
  }
</script>
