<template>
    <div id="app" :style="`padding-top:${barHeight}px`">
        <div class="bg"></div>
        <!-- cache -->
        <transition :name="transitionName">
            <keep-alive>
                <router-view v-if="keepAlive"></router-view>
            </keep-alive>
        </transition>
        <!-- no chach -->
        <transition :name="transitionName">
            <keep-alive>
                <router-view v-if="!keepAlive"></router-view>
            </keep-alive>
        </transition>
        <wp-nav></wp-nav>
        <wp-loading v-if="$store.state.Loading"></wp-loading>
        <transition name="slide-top">
            <wp-login v-if="$store.state.Sign"></wp-login>
        </transition>
    </div>
</template>
<script>
import { nplus } from "../utils/index"
import axios from '../plugins/axios/axios'
export default {
    name: 'App',
    computed: {
        keepAlive() {
            return this.$route.meta.keepAlive
        },
        barHeight() {
            return this.$store.getters.barHeight
        },
        transitionName() {
            if (this.$route.name == "index") {
                return "slide-right"
            }
            return "slide-left"
        },
    },
    data() {
        return {
            keys: 0,
        }
    },
    watch: {
        "$store.state.BackCount"() {
            if (this.$store.state.Sign) {
                this.$root.setSign(false)
                return
            }
            switch (this.$route.name) {
                case "index":
                    nplus.CloseApp()
                    return
                case "menus":
                    this.$router.push("/")
                    return
                case "action":
                    this.$router.push("/menus")
                    return
                case "my":
                    this.$router.push("/action")
                    return
                case "posts":
                    this.$router.go(-1)
                    return
                case "category":
                    this.$router.go(-1)
                    return
                default:
                    this.$router.go(-1)
            }
            return
        }
    },
    created() {
        this.getUserInfo();
    },
    methods: {
        getUserInfo() {
            axios.get(`/api/v1/auth`).then(res => {
                if (res.data.success == 0) {
                    const user = res.data.result;
                    if (user.id > 0) {
                        this.$store.commit("SetUser", user)
                        this.$store.commit("SetIsLogin", true)
                    }
                }
            })
        }
    }
}
</script>
<style lang="less" scoped>
#app {
    background: #ffffff;
    .bg {
        position: fixed;
        z-index: -2;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        background-color: #ffffff;
    }
}
</style>
<style scoped>
#app >>> #main {
    overflow: scroll;
}
</style>
<style scoped lang="less">
@keyframes slideInLeft {
    from {
        transform: translate3d(100%, 0, 0);
        position: fixed;
        top: 0;
        left: 0;
        opacity: 1;
    }
    to {
        transform: translate3d(0, 0, 0);
        position: fixed;
        top: 0;
        left: 0;
        opacity: 1;
    }
}
@keyframes slideInRight {
    from {
        transform: translate3d(0%, 0, 0);
        position: fixed;
        top: 0;
        left: 0;
        opacity: 1;
    }
    to {
        transform: translate3d(-100%, 0, 0);
        position: fixed;
        top: 0;
        left: 0;
        opacity: 1;
    }
}
.slide-left-enter-active {
    position: fixed;
    top: 0;
    left: 0%;
    width: 100vw;
    height: 100vh;
    animation: slideInLeft 0.2s linear forwards;
}
.slide-left-leave-active {
    position: fixed;
    top: 0;
    left: 0%;
    width: 100vw;
    height: 100vh;
    animation: slideInRight 0.2s linear forwards;
}
/*向右滑动*/
@keyframes slideOutLeft {
    from {
        transform: translate3d(-100%, 0, 0);
        position: fixed;
        top: 0;
        left: 0;
        opacity: 1;
    }
    to {
        transform: translate3d(0%, 0, 0);
        position: fixed;
        top: 0;
        left: 0;
        opacity: 1;
    }
}
@keyframes slideOutRight {
    from {
        transform: translate3d(0%, 0, 0);
        position: fixed;
        top: 0;
        left: 0;
        opacity: 1;
    }
    to {
        transform: translate3d(100%, 0, 0);
        position: fixed;
        top: 0;
        left: 0;
        opacity: 1;
    }
}
.slide-right-enter-active {
    position: fixed;
    top: 0;
    left: 0%;
    width: 100vw;
    height: 100vh;
    animation: slideOutLeft 0.2s linear forwards;
}
.slide-right-leave-active {
    position: fixed;
    top: 0;
    left: 0%;
    width: 100vw;
    height: 100vh;
    animation: slideOutRight 0.2s linear forwards;
}
@keyframes slideInTop {
    from {
        transform: translate3d(0, 100%, 0);
        opacity: 1;
    }
    to {
        transform: translate3d(0, 0, 0);
        opacity: 1;
    }
}
@keyframes slideInBottom {
    from {
        transform: translate3d(0, 0, 0);
        opacity: 1;
    }
    to {
        transform: translate3d(0, 100%, 0);
        opacity: 1;
    }
}
.slide-top-enter-active {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100vw;
    height: 100vh;
    animation: slideInTop 0.2s linear forwards;
}

.slide-top-leave-active {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100vw;
    height: 100vh;
    animation: slideInBottom 0.2s linear forwards;
}
.slide-bottom-enter-active {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100vw;
    height: 100vh;
    animation: slideInBootom 0.2s linear forwards;
}
.slide-bottom-leave-active {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100vw;
    height: 100vh;
    animation: slideInTop 0.2s linear forwards;
}
</style>