<template>
    <div ref="container" id="repull" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend" @scroll="scrollElement($event)">
        <transition name="slide-top">
            <div class="container" v-if="loading" :style="`transform: translate3d(0, 200px, 0);`">
                <div class="loading">
                    <svg t="1497367491334" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1977">
                        <path d="M486.75754 135.400013 402.25163 59.310554C388.509379 46.936957 387.96346 25.139993 400.208308 11.540621 412.822131-2.468343 433.957671-4.001381 447.930113 8.579401L601.089596 146.484825C605.090636 150.087331 607.97301 154.488612 609.74682 159.253816 614.767405 170.908986 613.043155 184.73657 603.956951 194.827778L466.051527 347.987261C453.677999 361.729512 431.880966 362.275431 418.281663 350.030583 404.27263 337.416761 402.739592 316.281152 415.320374 302.308778L504.712387 203.028852C300.714847 206.912339 136.539841 373.49343 136.539841 578.419721 136.539841 785.780633 304.639089 953.87988 512 953.87988 720.609624 953.87988 887.460159 790.22062 887.460159 584.090467 887.460159 517.424512 870.092464 453.371077 837.556793 396.914498 828.144212 380.58164 833.754269 359.710766 850.087128 350.298184 866.420054 340.885671 887.29086 346.49566 896.703442 362.828587 935.174114 429.583765 955.725642 505.37934 955.725642 584.090467 955.725642 828.220806 758.019723 1022.145363 512 1022.145363 266.937086 1022.145363 68.274358 823.482635 68.274358 578.419721 68.274358 341.828486 253.439157 148.484867 486.75754 135.400013Z" p-id="1978" fill="#666666">
                        </path>
                    </svg>
                </div>
            </div>
        </transition>
        <div :style="`height:${translate3dHeight }px;transition: all 0.4s ease 0s;`" v-if="translate3dHeight>0"></div>
        <slot></slot>
    </div>
</template>
<script>
export default {
    data() {
        return {
            flag: 0,            // 表示是否达到刷新条件
            loading: 0,         // 表示是否正在刷新中
            touchStart: 0,      // 手指触摸屏幕的起点
            distance: 0,        // 手指滑动的距离
            keys: 0,
            scrollHeight: 0,
            scrollTop: 100,
            scrollKey: 0,
        }
    },
    computed: {
        translate3dHeight() {
            if (this.distance > 100) {
                return 100
            }
            return this.distance
        }
    },
    activated() {
        this.$nextTick(() => {
            this.$refs.container.scrollTop = this.scrollTop
        })
    },
    methods: {
        scrollElement(e) {  //滚动至最底下
            let ele = e.srcElement ? e.srcElement : e.target;
            this.scrollTop = ele.scrollTop;
            let scrollHeight = ele.scrollHeight - 50
            let scrollTop = ele.scrollTop + ele.offsetHeight
            if (scrollTop >= scrollHeight) { //监听滚动到底部
                if (this.scrollHeight == scrollHeight) {
                    return
                }
                this.scrollKe++
                this.$emit("scroll", this.scrollKe)
                this.scrollHeight = scrollHeight
            }
        },
        touchstart(e) {         //按住屏幕
            this.touchStart = e.targetTouches[0].clientY    // 取第一个手指的触摸点作为起始点
            if (this.loading) {  //如果已加载
                //    e.preventDefault()
                return
            }
        },
        touchmove(e) {   //移动了触控
            if (this.loading || this.touchStart == 0) {
                //    e.preventDefault()
                return
            }
            const container = this.$refs.container
            const touch = e.targetTouches[0]
            const scrollTop = container.scrollTop
            if (scrollTop === 0) {
                this.distance = touch.clientY - this.touchStart
                if (this.distance > 200) {    //判断滑动的坐标
                    this.flag = 1   //已经达到刷新条件
                    return
                }
            }
        },
        touchend() {    //放开了触控
            if (this.distance === 0 || this.loading) {
                //    e.preventDefault()
                return
            }
            if (this.flag && this.distance > 0) {
                this.loading = 1
                this.distance = 0
                setTimeout(() => {
                    this.flag = 0
                    this.loading = 0
                    this.keys++
                    this.$emit("next", this.keys)
                }, 1000)
                return
            }
            // 重置变量
            this.distance = 0
            this.flag = 0
        },
    }
}
</script>
<style lang="less" scoped>
#repull {
    transition: 330ms;
    width: 100%;
    height: 100%;
    overflow: auto;
    .container {
        text-align: center;
        line-height: 50px;
        color: #666;
        position: fixed;
        display: flex;
        justify-content: center;
        height: 100%;
        width: 100%;
        z-index: 15;
        transition: 1s;
        .loading {
            width: 35px;
            height: 35px;
            position: relative;
            background: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 50%;
            svg {
                width: 1.2em;
                height: 1.2em;
                vertical-align: middle;
                fill: currentcolor;
                overflow: hidden;
                font-size: 1.3rem;
                -webkit-animation: loadRotate 1s linear infinite;
                animation: loadRotate 1s linear infinite;
                path {
                    fill: #ff4a4a;
                }
            }
        }
    }
}

@-webkit-keyframes loadRotate {
    from {
        -webkit-transform: rotate(0deg);
    }
    to {
        -webkit-transform: rotate(360deg);
    }
}
@keyframes loadRotate {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}
</style>
<style lang="less" scoped>
@keyframes slideInTop {
    from {
        transform: translate3d(0%, 0, 0);
        opacity: 1;
    }
    to {
        transform: translate3d(0, 200px, 0);
        opacity: 1;
    }
}
.slide-top-enter-active {
    position: fixed;
    animation: slideInTop 0.3s linear forwards;
}
</style>
