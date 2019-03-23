<template>
    <div class="slide-show" @mouseover="handleClearSlideInterval" @mouseout="handleRunSlideInterval">
        <transition-group
          tag="ul"
          class='slide-ul'
          :name="name"
          :style="{left: left, width: width}">
            <li
              v-for="(item, index ) in slides"
              :key="item.url"
              :style="{
                width: sliderWidth,
                height: styles.height,
                marginLeft: styles.marginLeft,
                border: styles.border,
                boxSizing: 'border-box'
              }"
              >
                <a :href="item.to_url" :target="target">
                  <img :src="item.url" alt="">
                  <p v-if="item.name">{{item.name}}</p>
                </a>
            </li>
        </transition-group>
        <div class="control-wrapper">
            <a class="prev" @click="handleGo(handlePrev)"></a>
            <a class="next" @click="handleGo(handleNext)"></a>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        styles: {
          type: Object,
          default: function() {
            return {
              width: '10vw',
              height: '10vw',
              marginLeft: '2vw',
              border: '1px solid #DDDDDD'
            }
          }
        },
        slides: {
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
        sliderWidth() {
          return (100/this.slides.length + 'vw')
        },
        handlePrev() {
            if (this.currentIndex === 0) {
                return this.slides.length - 1
            } else {
                return this.currentIndex - 1
            }
        },
        left() {
          return -this.currentIndex * (parseInt(this.sliderWidth) + parseInt(this.styles.marginLeft)) + 'vw'
        },
        width() {
          return this.slides.length * (parseInt(this.sliderWidth) + parseInt(this.styles.marginLeft)) + 'vw'
        },
        handleNext() {
            if (this.currentIndex === this.slides.length - 1) {
                return 0
            } else {
                return this.currentIndex + 1
            }
        }
    },
    methods: {
        handleGo(index) {
            this.currentIndex = index
        },
        handleRunSlideInterval() {
            this.intervalId = setInterval(() => {
                this.handleGo(this.handleNext)
            }, this.interval)
        },
        handleClearSlideInterval() {
            clearInterval(this.intervalId)
        }
    },
    mounted() {
        this.handleRunSlideInterval()
    }
}
</script>
<style lang="scss" scoped>
.slide-pages {
    position: absolute;
    bottom: 20px;
    right: 30px;
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
                background: rgba(255, 255, 255, 0.4);
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

.slide-show {
    position: relative;
    overflow: hidden;
}

.slide-ul {
    // width: 100%;
    width: auto;
    height: 100%;
    position: absolute;
    transition: all 0.5s ease-in-out;
    li {
      float: left;
        // position: absolute;
        width: 100%;
        height: 100%;
        &:first-child {
          margin-left: 0 !important;
        }
        a {
          display: block;
          width: 100%;
          height: 100%;
          text-align: center;
          position: relative;
          overflow: hidden;
          &:hover {
            p {
              color: #FFFFFF;
              background-color: rgba(0, 0, 0, .7);
              transform: scale(1.2)

            }
          }
        }
        p {
          transition: background-color 1s ease-in-out;
          width: 100%;
          position: absolute;
          // left: 50%;
          bottom: 0;
          z-index: 100;
          color: #999999;
          // transform: translateX(-50%);
        }
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
