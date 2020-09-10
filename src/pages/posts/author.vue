<template>
    <div id="author">
        <div class="avatar">
            <wp-avatar :src="author.avatar" />
        </div>
        <div class="nickename">
            <span>{{author.nickname}}</span>
        </div>
        <div class="description">
            <span>{{author.description}}</span>
        </div>
        <div class="tool">
            <div class="item">
                <span class="number">{{0 || '--'}}</span>
                <span class="name">投稿</span>
                <em></em>
            </div>
            <div class="item">
                <span class="number">{{0  || '--' }}</span>
                <span class="name"> 评论</span>
                <em></em>
            </div>
            <div class="item">
                <span class="number">--</span>
                <span class="name">动态</span>
                <em></em>
            </div>
            <div class="item">
                <span class="number">{{0  || '--' }}</span>
                <span class="name">关注</span>
                <em></em>
            </div>
            <div class="item">
                <span class="number">{{0  || '--' }}</span>
                <span class="name">粉丝</span>
            </div>
        </div>
    </div>
</template>
<script>
import axios from '../../plugins/axios/axios'
export default {
    props: ["authorId"],
    data() {
        return {
            author: {
                avatar: "",
                nickname: "",
            }
        }
    },
    created() {
        this.getAuthor(this.authorId)
    },
    methods: {
        getAuthor(id) {
            this.$root.setLoading(true)
            axios.post(`/api/v1/users`, {
                "id": [Number(id)],
            }).then(res => {
                if (res.data.success == 0) {
                    this.author = res.data.result[0]
                }
            }).then(() => {
                this.$root.setLoading(false)
            })
        }
    }
}
</script>
<style lang="less" scoped>
#author {
    padding: 10px 20px;
    position: relative;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin: 30px 0;
    .avatar {
        flex: 0 0 100%;
        max-width: 150px;
        width: 150px;
        height: 150px;
        margin: 0 auto;
        background: #fff;
        border: 4px solid #fff;
        -webkit-box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
        border-radius: 50%;
        overflow: hidden;
    }
    .nickename {
        flex: 0 0 100%;
        margin-top: 20px;
        text-align: center;
        span {
            display: block;
            padding: 0 0.5rem;
            color: #673ab7;
            padding: 0 1rem;
            font-size: 1.5rem;
        }
    }
    .description {
        flex: 0 0 100%;
        margin-top: 10px;
        text-align: center;
        max-width: 100%;
        span {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            color: #212121;
            font-size: 1rem;
            display: block;
        }
    }
    .tool {
        position: relative;
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        margin-top: 20px;
        .item {
            flex: 0 0 100%;
            max-width: 20%;
            height: 50px;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: center;
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
}
</style>
