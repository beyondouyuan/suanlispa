<template>
  <div class="service-item">
    <div class="list">
      <div class="bg-wrapper">
          <!-- <img :src="Service.logo"> -->
          <h2>{{Service.name}}</h2>
          <img :src="Service.url">
      </div>
        <!-- <li>{{Service.title}}</li> -->
      <div class="list-item">
        <div class="unit">币价(CNY)</div>
        <div class="amount"><h2>{{Service.price}}</h2></div>
        <div v-if="Service.name == '比特币'" class="tips">1TH/s算力产生的收益(BTC)</div>
        <div v-else class="tips">1MH/s算力产生的收益(LTC)</div>
        <div v-if="Service.name == '比特币'"  class="idot"><h2>{{Service.income}}</h2></div>
        <div v-else  class="idot"><h2>{{this.toFixed(Service.income / 1000000, 8)}}</h2></div>
      </div>
    </div>
  </div>
</template>
<script>
  const host = process.env.BASE_API
  export default {
    name: 'ServiceItem',
    data() {
      return {
        host
      }
    },
    props: {
      Service: {
        type: Object,
        required: true
      }
    }
  }
</script>
