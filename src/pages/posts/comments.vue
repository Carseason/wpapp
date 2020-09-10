<template>
    <div id="comments">
        <template v-for="item in comments">
            <li :key="item.commentId">
                <div class="info">
                    <div class="nickname">
                        {{item.author.nickname}}:
                    </div>
                    <div class="auto"></div>
                    <div class="date">
                        {{item.updatedAt | dateForm}}
                    </div>
                </div>
                <div class="content" v-html="item.content"></div>
            </li>
        </template>
        <div class="edit" @click="editComments()">
            <div class="avatar">
                <wp-avatar :src="user.avatar"></wp-avatar>
            </div>
            <div class="title">发布评论</div>
        </div>
        <editor v-if="editorStatus" @close="()=>{editorStatus = false}" :postsId="postsId" :parenId="0"></editor>
    </div>
</template>
<script>
import axios from '../../plugins/axios/axios'
import editor from "./editor.vue"
export default {
    props: ["postsId"],
    components: {
        editor
    },
    data() {
        return {
            comments: [],
            editorStatus: false
        }
    },
    computed: {
        isLogin() {
            return this.$store.state.IsLogin
        },
        user() {
            return this.$store.state.User;
        }
    },
    created() {
        this.getComments(this.postsId)
    },
    methods: {
        getComments(postId) {
            this.$root.setLoading(true)
            axios.post(`/api/v1/comments`, {
                "postsId": postId,
                "offset": 30
            }).then(res => {
                if (res.data.success == 0) {
                    const result = res.data.result || []
                    this.comments = result;
                }
            }).then(() => {
                this.$root.setLoading(false)
            })
        },
        editComments() {
            if (!this.isLogin) {
                this.$root.setSign(true)
                return
            }
            this.editorStatus = true
        }
    }
}
</script>
<style lang="less" scoped>
#comments {
    width: 100%;
    li {
        padding: 1rem;
        .info {
            display: flex;
            flex-wrap: wrap;
            .nickname {
                cursor: pointer;
                text-decoration: none;
                color: #673ab7;
                font-weight: 700;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .date {
                color: #666;
                font-size: 1rem;
            }
        }
        .content {
            padding-left: 20px;
            padding-top: 5px;
            color: #656565;
            word-break: break-all;
            font-size: 1rem;
            line-height: 22px;
        }
    }
    li:nth-child(2n) {
        background: rgba(0, 0, 0, 0.02);
    }
    .edit {
        position: relative;
        display: flex;
        flex-wrap: wrap;
        align-content: center;
        font-size: 1.5rem;
        background: #673ab7;
        color: #fff;
        line-height: 1.5;
        margin: 0.5rem 1rem;
        padding: 0 1rem;
        border-radius: 1rem;
        cursor: pointer;
        height: 46px;
        cursor: pointer;
        .avatar {
            position: static;
            width: 2.5rem;
            height: 2.5rem;
            vertical-align: text-bottom;
            margin-right: 0.5rem;
            border: 1px solid #fff;
            background: #fff;
            border-radius: 50%;
            overflow: hidden;
        }
    }
}
</style>
<style scoped>
#comments >>> img {
    max-width: 100%;
}
</style>