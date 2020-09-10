<template>
    <div id="main">
        <div class="bg"></div>
        <layout-header>
            <div class="g">
                <button class="back" @click="toNavpage(-1)">
                    <icon class="icon-fanhui" />
                </button>
                <div class="title">
                    {{category.name}}
                </div>
                <button class="lve">
                </button>
            </div>
        </layout-header>
        <div class="body" :style="`padding-top:${barHeight}px`" @scroll="scrollElement($event)" ref="domEl">
            <wp-box :posts="posts"></wp-box>
        </div>
    </div>
</template>
<script>
import axios from '../../plugins/axios/axios'
export default {
    props: ["id"],
    computed: {
        barHeight() {
            return this.$store.getters.barHeight + 60
        },
    },
    data() {
        return {
            posts: [],
            offset: 0,
            scrollHeight: 0,
            scrollTop: 100,
            dispatch: false,
            category: {
                id: 0,
                name: ""
            }
        }
    },
    activated() {
        this.$nextTick(() => {
            this.$refs.domEl.scrollTop = this.scrollTop
        })
    },
    created() {
        this.getCategory(this.id)
        this.getCategoryPosts(this.id, this.offset);
    },
    methods: {
        toNavpage(uri) {
            this.$router.go(uri)
        },
        scrollElement(e) {
            let ele = e.srcElement ? e.srcElement : e.target;
            this.scrollTop = ele.scrollTop;
            let scrollHeight = ele.scrollHeight - 50
            let scrollTop = ele.scrollTop + ele.offsetHeight
            if (scrollTop >= scrollHeight) { //监听滚动到底部
                if (this.scrollHeight == scrollHeight) {
                    return
                }
                this.getCategoryPosts(this.id, ++this.offset)
                this.scrollHeight = scrollHeight
            }
        },
        getCategory(id) {
            if (this.id == 0 || this.id == null) {
                return
            }
            this.$root.setLoading(true)
            axios.post(`/api/v1/category`, {
                "id": [id],
            }).then(res => {
                if (res.data.success == 0) {
                    const result = res.data.result || []
                    if (result.length > 0) {
                        this.category = result[0]
                    }
                }
            }).then(() => {
                this.$root.setLoading(false)
            })
        },
        getCategoryPosts(id, offset) {
            if (id == 0 || id == null) {
                return
            }
            if (this.dispatch) {
                return
            }
            this.$root.setLoading(true)
            axios.post(`/api/v1/posts`, {
                "id": [],
                "category": [id],
                "offset": offset * 30
            }).then(res => {
                if (res.data.success == 0) {
                    const result = res.data.result || []
                    const count = result.length
                    if (count != 30) {  //已经没有文章了
                        this.dispatch = true
                    }
                    for (let i = 0; i < count; i++) {
                        this.posts.push(result[i])
                    }
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

