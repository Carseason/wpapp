<template>
    <div id="main">
        <div class="bg"></div>
        <layout-header>
            <div class="g">
                <button class="back" @click="toNavpage(-1)">
                    <icon class="icon-fanhui" />
                </button>
                <div class="title">
                    {{posts.title}}
                </div>
                <button class="lve">
                    <icon class="icon-shenglve"></icon>
                </button>
            </div>
        </layout-header>
        <div class="body" :style="`padding-top:${barHeight}px`" v-if="status">
            <div class="container">
                <div class="text" v-html="posts.content"></div>
                <div class="tool">
                    <div class="auto"></div>
                    <div class="item">{{posts.views}}观看</div>
                    <div class="item">{{posts.updatedAt | dateForm}}</div>
                </div>
            </div>
            <div class="hy"></div>
            <posts-nav :postsId="posts.id" :authorId="posts.authorId" :commentCount="posts.commentCount"></posts-nav>
        </div>
    </div>
</template>
<script>
import axios from '../../plugins/axios/axios'
import nav from "./nav.vue"
export default {
    props: ["id"],
    components: {
        "posts-nav": nav
    },
    computed: {
        barHeight() {
            return this.$store.getters.barHeight + 50
        },
    },
    data() {
        return {
            status: false,
            posts: {
                title: "",
                content: "",
                author: 0,
            },
        }
    },
    created() {
        this.getPosts(this.id)
    },
    methods: {
        getPosts(id) {
            this.$root.setLoading(true)
            axios.post(`/api/v1/post`, {
                "id": Number(id),
            }).then(res => {
                if (res.data.success == 0) {
                    this.posts = res.data.result
                    this.$store.commit("SetHistory", id)
                }
            }).then(() => {
                this.status = true
                this.$root.setLoading(false)
            })
        },
        toNavpage(uri) {
            this.$router.go(uri)
        }
    }
}
</script>
<style lang="less" scoped>
#main {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-color: #fff;
    z-index: 11;
    .bg {
        position: fixed;
        z-index: -1;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        background-color: #fff;
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
        position: relative;
        width: 100%;
        height: 100%;
        padding-top: 50px;
        overflow: auto;
        .hy {
            background-color: #f7f7f7;
            height: 10px;
        }
        .container {
            width: 100%;
            background-color: #fff;
            padding: 10px 20px;
            .tool {
                margin: 30px 0 10px 0;
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                height: 36px;
                font-size: 3.2vw;
                color: #999;
                .item {
                    margin-left: 10px;
                }
            }
        }
    }
}
</style>
<style scoped>
.text {
    color: #6e6e6e;
    font-size: 14px;
    line-height: 22px;
}
.text >>> img {
    max-width: 100%;
}
.text >>> * {
    color: #6e6e6e;
    font-size: 14px;
    max-width: 100%;
}
</style>
