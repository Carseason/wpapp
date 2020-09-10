<template>
    <div id="main">
        <div class="bg"></div>
        <layout-header :borderBottom="false">
            <div class="g">
                <button class="back">
                </button>
                <div class="title">

                </div>

                <el-dropdown trigger="click" @command="handleCommand">
                    <button class="lve">
                        <icon class="el-dropdown-link icon-shenglve"></icon>
                    </button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item icon="icon iconfont icon-zhuxiao" command="outLogin" :disabled="disabled" v-if="isLogin">退出登录</el-dropdown-item>
                        <el-dropdown-item icon="icon iconfont icon-zhuxiao" command="wpApp">关于程序</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>

            </div>
        </layout-header>
        <div class="body" :style="`padding-top:${barHeight}px`" @scroll="scrollElement($event)" ref="domEl">
            <ul class="user">
                <div class="avatar">
                    <wp-avatar :src="user.avatar"></wp-avatar>
                </div>
                <div class="info">
                    <div class="nickname">{{user.nickname }}</div>
                    <div class="level">{{user.id }}</div>
                    <div class="description">
                        {{user.description}}
                    </div>
                </div>
            </ul>
            <ul class="count">
                <div class="item">
                    <span class="number">{{user.postsCount || '--'}}</span>
                    <span class="name">投稿</span>
                    <em></em>
                </div>
                <div class="item">
                    <span class="number">{{user.commentsCount  || '--' }}</span>
                    <span class="name"> 评论</span>
                    <em></em>
                </div>
                <div class="item">
                    <span class="number">--</span>
                    <span class="name">动态</span>

                </div>
                <div class="item">
                    <span class="number">{{user.followersCount  || '--' }}</span>
                    <span class="name">关注</span>
                    <em></em>
                </div>
                <div class="item">
                    <span class="number">{{user.fansCount  || '--' }}</span>
                    <span class="name">粉丝</span>
                    <em></em>
                </div>
                <div class="item">
                    <span class="number">{{user.favoriteCount  || '--' }}</span>
                    <span class="name">收藏</span>

                </div>
            </ul>
            <ul class="setting">
                <div class="title">更多服务</div>
                <router-link to="/history" tag="li">
                    <icon class="icon-rili"></icon><span>浏览历史</span>
                    <div class="auto"></div>
                    <div class="right">
                        <icon class="icon-arrow-right-ico"></icon>
                    </div>
                </router-link>
                <li>
                    <icon class="icon-jishiben"></icon><span>我的投稿</span>
                    <div class="auto"></div>
                    <div class="right">
                        <icon class="icon-arrow-right-ico"></icon>
                    </div>
                </li>
                <li>
                    <icon class="icon-xinxi"></icon><span>我的评论</span>
                    <div class="auto"></div>
                    <div class="right">
                        <icon class="icon-arrow-right-ico"></icon>
                    </div>
                </li>
                <li>
                    <icon class="icon-shuqian"></icon><span>我的动态</span>
                    <div class="auto"></div>
                    <div class="right">
                        <icon class="icon-arrow-right-ico"></icon>
                    </div>
                </li>
                <li>
                    <icon class="icon-qunzu"></icon><span>我的关注</span>
                    <div class="auto"></div>
                    <div class="right">
                        <icon class="icon-arrow-right-ico"></icon>
                    </div>
                </li>
                <li>
                    <icon class="icon-qunzu"></icon><span>我的粉丝</span>
                    <div class="auto"></div>
                    <div class="right">
                        <icon class="icon-arrow-right-ico"></icon>
                    </div>
                </li>
                <li>
                    <icon class="icon-xihuan"></icon><span>我的收藏</span>
                    <div class="auto"></div>
                    <div class="right">
                        <icon class="icon-arrow-right-ico"></icon>
                    </div>
                </li>
                <li>
                    <icon class="icon-shezhi1"></icon><span>设置</span>
                    <div class="auto"></div>
                    <div class="right">
                        <icon class="icon-arrow-right-ico"></icon>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import { utils } from '../../utils';
export default {
    computed: {
        barHeight() {
            return this.$store.getters.barHeight + 60
        },
        isLogin() {
            return this.$store.state.IsLogin
        },
        user() {
            return this.$store.state.User;
        }
    },
    data() {
        return {
            scrollHeight: 0,
            scrollTop: 100,
            disabled: false
        }
    },
    activated() {
        this.$nextTick(() => {
            this.$refs.domEl.scrollTop = this.scrollTop
        })
    },
    methods: {
        scrollElement(e) {
            let ele = e.srcElement ? e.srcElement : e.target;
            this.scrollTop = ele.scrollTop;
        },
        handleCommand(e) {
            switch (e) {
                case "outLogin":
                    this.outLogin();
                    return
                case "wpApp":
                    this.wpApp()
                    return
            }
        },
        wpApp() {
            this.$alert('使用 WPAPP 构建,开源地址 \n https://github.com/Carseason/wpapp', '', {
                confirmButtonText: '确定',
                callback: () => { }
            });
        },
        outLogin() { //注销登录
            this.disabled = true
            this.$confirm('是否退出当前登录用户?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                utils.setCookie();
                this.$store.commit("SetUser", {})
                this.$store.commit("SetIsLogin", false)
                this.$message({
                    showClose: true,
                    message: '已退出登录',
                    type: 'success',
                });
            }).catch(() => { }).then(() => {
                this.disabled = false
            })
        }
    }
}
</script>
<style lang="less" scoped>
#main {
    width: 100%;
    height: 100%;
    background-color: #fff;
    .bg {
        position: fixed;
        z-index: -1;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        background-color: #ffffff;
    }
    .g {
        width: 100%;
        height: 100%;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        .back {
            width: 50px;
            height: 100%;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            color: #212121;
            background: none;
            padding: 0 10px;
            i {
                font-size: 14px;
                margin: 0 auto;
            }
        }
        .lve {
            width: 50px;
            height: 100%;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            color: #212121;
            background: none;
            padding: 0 10px;
            i {
                font-size: 18px;
                margin: 0 auto;
            }
        }
        .title {
            margin: 0 auto;
            max-width: 200px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            color: #212121;
            font-size: 16px;
            font-weight: 510;
        }
    }
    .body {
        height: 100%;
        width: 100%;
        padding: 50px 5px 50px 5px;
        overflow: auto;
        ul.user {
            position: relative;
            display: flex;
            flex-wrap: wrap;
            padding: 10px;
            width: 100%;
            .avatar {
                width: 75px;
                height: 75px;
                flex: 0 0 100%;
                max-width: 75px;
                border-radius: 50%;
                margin-right: 20px;
                overflow: hidden;
            }
            .info {
                flex: 0 0 100%;
                max-width: calc(100% - 100px);
                height: 75px;
                display: flex;
                flex-wrap: wrap;
                align-content: space-around;
                .nickname {
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    width: 100%;
                    font-size: 16px;
                    color: #f00;
                    font-weight: 540;
                    flex: 0 0 100%;
                }
                .level {
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    color: #404040;
                    font-size: 12px;
                    flex: 0 0 100%;
                }
                .description {
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    color: #a1a1a1;
                    font-size: 12px;
                    line-height: 22px;
                    flex: 0 0 100%;
                }
            }
        }
        ul.count {
            position: relative;
            display: flex;
            flex-wrap: wrap;
            width: 100%;
            .item {
                flex: 0 0 100%;
                max-width: 33.333%;
                height: 50px;
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                justify-content: center;
                margin: 10px 0;
                position: relative;
                span {
                    display: block;
                    flex: 0 0 100%;
                    text-align: center;
                }
                span.name {
                    font-size: 12px;
                    color: #919191;
                }
                span.number {
                    font-size: 15px;
                    color: #000000;
                }
                em {
                    width: 1px;
                    height: 30px;
                    background-color: #f0f0f0;
                    position: absolute;
                    right: 0;
                }
            }
        }
        ul.setting {
            width: 100%;
            padding: 10px;
            margin-top: 20px;
            .title {
                color: #000;
                font-size: 14px;
                font-weight: 550;
                margin-bottom: 10px;
            }
            li {
                margin: 10px 0;
                height: 36px;
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                i {
                    font-size: 1.8rem;
                    color: #ff9090;
                }
                span {
                    margin: 0 15px;
                    color: #4d4d4d;
                    font-size: 14px;
                }
                .right {
                    i {
                        font-size: 10px;
                        color: #a2a2a2;
                    }
                }
            }
        }
    }
}
</style>
<style scoped>
.el-dropdown-menu__item {
    font-size: 12px;
    color: #626161;
}
.el-dropdown-menu__item >>> i {
    font-size: 13px;
}
</style>