<template>
  <section class="mine-container">
      <div class="title-box">
        <h2>{{title}}</h2>
        <p>{{subTitle}}</p>
      </div>
      <ul class="mine-item">
        <li v-for="(item, index) of mine" :key="index">
          <div class="logo">
            <img :src="item.url">
          </div>
        </li>
      </ul>
  </section>
</template>
<script>
  const host = process.env.BASE_API
  export default {
    name: 'Mine',
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
      subTitle: {
        type: String,
      },
      mine: {
        type: Array,
        required: true
      }
    }
  }
</script>
