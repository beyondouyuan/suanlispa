<template>
    <div class="carousel-show" @mouseover="handleClearInterval" @mouseout="handleRunInterval">
        <transition-group tag="ul" class='carousel-ul' :name="name">
            <li v-for="(item, index ) in carousels" :key="index" v-show="index===currentIndex">
                <a :href="item.to_url" :target="target">
                  <img :src="item.url" alt="" style="width: 100%; height: 100%">
                </a>
            </li>
        </transition-group>
        <ul class="carousel-pages">
            <li v-for="(item, index) in carousels" @click="go(index)" class="carousel-page-point">
                <a :class="{'active': index === currentIndex}">{{ index + 1 }}</a>
            </li>
        </ul>
        <div class="control-wrapper">
            <a class="prev" @click="go(handlePrev)"></a>
            <a class="next" @click="go(handleNext)"></a>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        carousels: {
            type: Array,
            default: []
        },
        interval: {
            type: Number,
            default: 1000
        },
        name: {
            type: String,
            default: 'move'
        },
        target: {
            type: String,
            default: '_blank'
        }
    },
    data() {
        return {
            intervalId: null,
            currentIndex: 0
        }
    },
    computed: {
        handlePrev() {
            if (this.currentIndex === 0) {
                return this.carousels.length - 1
            } else {
                return this.currentIndex - 1
            }
        },
        handleNext() {
            if (this.currentIndex === this.carousels.length - 1) {
                return 0
            } else {
                return this.currentIndex + 1
            }
        }
    },
    methods: {
        go(index) {
            console.log('hi')
            this.currentIndex = index
        },
        handleRunInterval() {
            this.intervalId = setInterval(() => {
                this.go(this.handleNext)
            }, this.interval)
        },
        handleClearInterval() {
            clearInterval(this.intervalId)
        }
    },
    mounted() {
        this.handleRunInterval()
    }
}
</script>
<style lang="scss" scoped>
.carousel-pages {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    li {
        display: inline-block;
        height: 18px;
        a {
            display: block;
            width: 6px;
            height: 6px;
            margin: 0 5px;
            border: 2px solid #fff;
            border-color: rgba(255, 255, 255, 0.3);
            border-radius: 10px;
            text-align: left;
            text-indent: -9999px;
            overflow: hidden;
            _zoom: 1;
            background: #f5f5f5;
            background: rgba(0, 0, 0, 0.4);
            -webkit-transition: all .2s;
            transition: all .2s;
            &.active {
                background: #fff;
                background: rgba(255, 255, 255, 0.9);
                border-color: #757575;
                border-color: rgba(0, 0, 0, 0.4);
            }
        }
    }
}

.control-wrapper {
    a {
        display: inline-block;
        position: absolute;
        top: 50%;
        width: 41px;
        height: 69px;
        transform: translateY(-50%);
    }
}

.prev {
    left: 0;
    background: url("http://c1.mifile.cn/f/i/2014/cn/icon/icon-slides.png") no-repeat -84px 50%;
    &:hover {
        background-position: 0 50%
    }
}

.next {
    right: 0;
    display: inline-block;
    background: url(//c1.mifile.cn/f/i/2014/cn/icon/icon-slides.png) no-repeat -125px 50%;
    &:hover {
        background-position: -42px 50%;
    }
}

.carousel-show {
    position: relative;
    overflow: hidden;
}

.carousel-ul {
    width: 100%;
    height: 100%;
    li {
        position: absolute;
        width: 100%;
        height: 100%;
        img {
            width: 100%;
            height: 100%;
        }
    }
}

.move-enter-active {
    transition: all 0.5s ease;
    transform: translateX(0)
}

.move-leave-active {
    transition: all 0.5s ease;
    transform: translateX(-100%);
}

.move-enter {
    transform: translateX(100%);
}

.move-leave {
    transform: translateX(0);
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity .5s
}

.fade-enter,
.fade-leave-active {
    opacity: 0
}
</style>
