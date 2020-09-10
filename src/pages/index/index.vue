

<template>
    <div id="main">
        <wp-header title="首页"></wp-header>
        <!-- <div class="bg"></div> -->
        <div class="body">
            <wp-repull @next="refresh" @scroll="scroll">
                <wp-box :posts="posts"></wp-box>
            </wp-repull>
        </div>
    </div>
</template>
<script>
import axios from "../../plugins/axios/axios"
export default {
    name: "index",
    data() {
        return {
            posts: [],
            offset: 0,
        }
    },
    created() {
        this.getIndex(this.offset);
    },
    methods: {
        refresh() {
            this.offset = 0;
            this.posts = [];
            this.getIndex(this.offset);
        },
        scroll() {
            this.getIndex(++this.offset)
        },
        getIndex(offset) {
            if (offset > 5) {
                return
            }
            this.$root.setLoading(true)
            axios.post(`/api/v1/posts`, {
                "id": [],
                "offset": offset * 30,
                "rand": true,
            }).then(res => {
                if (res.data.success == 0) {
                    const result = res.data.result || []
                    const count = result.length
                    for (let i = 0; i < count; i++) {
                        this.posts.push(result[i])
                    }
                }
            }).catch(() => {

            }).then(() => {
                this.$root.setLoading(false)
            })
        },
    },
}
</script>
<style lang="less" scoped>
#main {
    width: 100%;
    height: 100%;
    .bg {
        position: fixed;
        z-index: -1;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        background-color: #f7f7f7;
    }
    .body {
        height: 100%;
        width: 100%;
        padding: 50px 5px 50px 5px;
        overflow: auto;
    }
}
</style>
