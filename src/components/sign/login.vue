<template>
    <div id="login">
        <div class="bg"></div>
        <button class="close" @click="close()">
            <icon class="icon-close"></icon>
        </button>
        <div class="container">
            <form @submit.prevent="sumbit" :disabled="disabled">
                <li class="item">
                    <div class="key">账号</div>
                    <div class="value">
                        <input type="text" v-model.trim="user_login">
                    </div>
                </li>
                <li class="item">
                    <div class="key">密码</div>
                    <div class="value">
                        <input type="password" v-model.trim="user_password">
                    </div>
                </li>
                <div class="btn">
                    <button class="sumbit" :disabled="disabled">登录</button>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
import axios from '../../plugins/axios/axios'
import { utils } from '../../utils'

export default {
    data() {
        return {
            disabled: false,
            user_login: "",
            user_password: "",
        }
    },
    methods: {
        close() {
            this.$root.setSign(false)
        },
        sumbit() {
            const user_login = this.user_login
            const user_password = this.user_password
            if (user_login.length == 0 || user_password.length == 0) {
                this.$message.error('账号或密码不能为空')
                return
            }
            this.disabled = true
            axios.post(`/api/v1/auth`, {
                "user_login": this.user_login,
                "user_password": this.user_password,
            }).then(res => {
                if (res.data.success == 0) {
                    const user = res.data.result;
                    if (user.token) {
                        utils.setCookie(user.token) //写入本地存储
                    }
                    if (user.id > 0) {
                        this.$store.commit("SetUser", user)
                        this.$store.commit("SetIsLogin", true)
                    }
                    this.$root.setSign(false)
                }
            }).catch(() => { }).then(() => {
                this.disabled = false
            })
        }
    }
}
</script>
<style lang="less" scoped>
#login {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    z-index: 99;
    button.close {
        background: none;
        color: #fff;
        position: absolute;
        top: 100px;
        right: 10px;
        i {
            font-size: 3rem;
        }
    }
    .bg {
        position: fixed;
        z-index: 0;
        width: 100%;
        height: 100%;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: #0f3854;
        background: -webkit-radial-gradient(#0a2e38 0%, #000000 80%);
        background: -o-radial-gradient(#0a2e38 0%, #000000 80%);
        background: -moz-radial-gradient(#0a2e38 0%, #000000 80%);
        background: radial-gradient(#0a2e38 0%, #000000 80%);
        color: #50b2c8;
    }
    .container {
        position: relative;
        display: inline-block;
        width: 90%;
        border-radius: 2px;
        form {
            width: 100%;
            li.item {
                display: flex;
                flex-wrap: wrap;
                width: 100%;
                height: 50px;
                line-height: 50px;
                border: 1px solid #ffffff7d;
                background: rgba(0, 0, 0, 0.1);
                border-radius: 3px;
                color: #454545;
                position: relative;
                font-size: 14px;
                margin: 10px 0;
                padding: 0 10px;
                .key {
                    color: #fff;
                    height: 100%;
                    padding: 0 10px;
                }
                .value {
                    flex: auto;
                    input {
                        width: 100%;
                        background: transparent;
                        border: 0;
                        -webkit-appearance: none;
                        border-radius: 0;
                        color: #fff;
                        height: 100%;
                        caret-color: #fff;
                        font-size: 14px;
                    }
                }
            }
            button.sumbit {
                width: 100%;
                margin: 20px 0;
                height: 42px;
                font-size: 14px;
                border-radius: 4px;
                color: #fff;
                background-color: #1890ff;
                border-color: #1890ff;
            }
        }
    }
}
</style>
