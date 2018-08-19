<template>
    <div id="app">
        <Loading v-show="fetchLoading"></Loading>
        <router-view/>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
    name: 'App',
    computed: {
        ...mapGetters([
            'fetchLoading'
        ])
    },
    methods: {

    }
}
</script>
<style lang="scss">
html,
body {
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    position: relative;
}

#app {
    width: 100%;
    height: 100%;
    position: relative;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
}
</style>
