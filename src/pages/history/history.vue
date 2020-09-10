<template>
    <div id="main">
        <div class="bg"></div>
        <layout-header>
            <div class="g">
                <button class="back" @click="toNavpage(-1)">
                    <icon class="icon-fanhui" />
                </button>
                <div class="title">
                    浏览历史
                </div>
                <button class="lve">
                </button>
            </div>
        </layout-header>
        <div class="body" :style="`padding-top:${barHeight}px`">
            <wp-box :posts="posts"></wp-box>
        </div>
    </div>
</template>
<script>
import axios from '../../plugins/axios/axios'
export default {
    computed: {
        barHeight() {
            return this.$store.getters.barHeight + 60
        },
        id() {
            return this.$store.state.History
        }
    },
    data() {
        return {
            posts: [],
        }
    },
    created() {
        this.getPosts(this.id)
    },
    methods: {
        toNavpage(uri) {
            this.$router.go(uri)
        },
        getPosts(id) {
            if (id.length == 0) {
                return
            }
            this.$root.setLoading(true)
            axios.post(`/api/v1/posts`, {
                "id": id,
            }).then(res => {
                if (res.data.success == 0) {
                    const result = res.data.result || []
                    this.posts = result
                }
            }).then(() => {
                this.$root.setLoading(false)
            })
        },
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
        // background-color: #f7f7f7;
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
        padding: 50px 5px 10px 5px;
        overflow: auto;
    }
}
</style>

