<template>
    <section class="partner-container">
        <div class="title-box">
            <h2>这是我们的<strong class="partner-s">合作伙伴</strong></h2>
            <p>合作伙伴</p>
        </div>
        <Slide :slides="partner" :interval="inv" :style="styleObject" :name="transitionName1" :target="target"></Slide>
    </section>
</template>
<script>
import Slide from '@/components/Common/Slide/slide.vue'
export default {
    name: 'Partner',
    data() {
        return {
            inv: 3000,
            styleObject: {
                width: '100%',
                height: '10vw'
            },
            transitionName1: 'move',
            target: '_blank'
        }
    },
    components: {
        Slide
    },
    props: {
        partner: {
            type: Array,
            required: true
        },
        title: {
            type: String,
            required: true
        }
    },
    computed: {

    }
}
</script>
