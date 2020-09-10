<template>
    <footer>
        <router-link to="/" tag="li">
            <icon class="iconfont icon-home"></icon>
            <span>首页</span>
        </router-link>
        <router-link to="/menus" tag="li">
            <icon class="iconfont icon-daohang"></icon>
            <span>频道</span>
        </router-link>
        <li>
            <template v-if="isLogin">
                <div class="author">
                    <wp-avatar :src="user.avatar"></wp-avatar>
                </div>
            </template>
            <template v-else>
                <div class="author" @click="setSign()">
                    <icon class="icon-tianjiashipinhechupintujiahao" />
                </div>
            </template>
        </li>
        <router-link to="/action" tag="li">
            <icon class="iconfont icon-dongtai"></icon>
            <span>动态</span>
        </router-link>
        <router-link to="/my" tag="li">
            <icon class="iconfont icon-my"></icon>
            <span>我的</span>
        </router-link>
    </footer>
</template>
<script>
export default {
    computed: {
        isLogin() {
            return this.$store.state.IsLogin
        },
        user() {
            return this.$store.state.User;
        }
    },
    methods: {
        setSign() {
            this.$root.setSign(true)
        }
    }
}    
</script>
<style lang="less" scoped>
footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 50px;
    line-height: 50px;
    z-index: 10;
    // border-top: 1px solid #e7e7e7;
    background-color: #fff;
    padding: 0 10px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    li {
        flex: 0 0 100%;
        max-width: 20%;
        height: 100%;
        text-align: center;
        padding: 5px 0;
        color: #666;
        .iconfont {
            display: block;
            width: 22px;
            height: 22px;
            line-height: 22px;
            margin: 0 auto;
        }
        span {
            display: block;
            line-height: 23px;
            height: 23px;
        }
        .author {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: center;
            border: 1px solid rgb(231, 231, 231);
            border-radius: 50%;
            width: 50px;
            height: 50px;
            margin: -16px auto 0 auto;
            background-color: #00bcd4;
            color: #fff;
            overflow: hidden;
            i {
                font-size: 2rem;
            }
        }
    }
    li.router-link-exact-active.on {
        color: #f66;
    }
}
</style>
