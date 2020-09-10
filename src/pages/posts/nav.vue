<template>
    <div class="wrap">
        <div class="nav">
            <div class="item" :class="{on:status == 'author'}" @click="status = 'author'">作者</div>
            <div class="item" :class="{on:status == 'comments'}" @click="status = 'comments'">评论（{{commentCount || 0}}）</div>
        </div>
        <keep-alive>
            <author :authorId="authorId" v-if="status == 'author'" />
        </keep-alive>
        <keep-alive>
            <comments :postsId="postsId" v-if="status == 'comments'"></comments>
        </keep-alive>
    </div>
</template>
<script>
import author from "./author.vue"
import comments from "./comments.vue"
export default {
    props: ["postsId", "authorId", "commentCount"],
    components: {
        author,
        comments
    },
    data() {
        return {
            status: "author"
        }
    }
}
</script>
<style lang="less" scoped>
.wrap {
    width: 100%;
    min-height: 50%;
    background-color: #fff;
    margin-top: 10px;
    .nav {
        width: 100%;
        height: 36px;
        line-height: 36px;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-around;
        border-bottom: 1px solid #ebebeb;
        margin-bottom: 20px;
        .item {
            flex: 0 0 100%;
            max-width: 100px;
            height: 100%;
            text-align: center;
            font-size: 14px;
            color: #5f5f5f;
            position: relative;
            display: block;
            color: #5f5f5f;
        }
        .item.on {
            color: #ff5252;
            border-bottom: 2px solid #ff5252;
        }
    }
}
</style>
