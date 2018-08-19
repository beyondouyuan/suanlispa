<template>
    <div v-bind:style="styles" class="spinner spinner-loading">
    </div>
</template>
<script>
export default {
    props: {
        size: {
            default: '40px'
        },
        background: {
            default: 'rgba(0, 180, 157, .4)'
        },
        color: {
            default: 'rgba(0, 180, 157, .8)'
        },
        stroke: {
            default: '5px'
        }
    },
    computed: {
        styles() {
            return {
                width: this.size,
                height: this.size,
                border: this.stroke + ' solid ' + this.background,
                borderTopColor: this.color
            }
        }
    }
}
</script>
<style lang="scss">
.spinner {
    box-sizing: border-box;
    border-radius: 100%;
    border: 10px solid rgba(255, 255, 255, 0.2);
    margin: 0 auto;
    animation: loading-spinner 1s infinite linear;
    @keyframes loading-spinner {
        100% {
            transform: rotate(360deg);
        }
    }
}
</style>
