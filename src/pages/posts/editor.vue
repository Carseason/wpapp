<template>
    <wp-alert>
        <div class="container">
            <div class="header">
                <div class="title">
                    发表评论
                </div>
                <div class="auto"></div>
                <button class="close" @click="close()">
                    <icon class="icon-close"></icon>
                </button>
            </div>
            <div class="content">
                <textarea placeholder="您的评论内容 *" required="" ref="editor" v-model.trim="content"></textarea>
            </div>
            <div class="footer">
                <div class="auto"></div>
                <button class="close" @click="close()">取消</button>
                <button class="sumbit" :disabled="disabled" @click="sumbit()">提交</button>
            </div>
        </div>
    </wp-alert>
</template>
<script>
import axios from '../../plugins/axios/axios'
export default {
    props: ["postsId", "parenId"],
    data() {
        return {
            disabled: false,
            content: "",

        }
    },
    watch: {
        content() {
            this.$refs.editor.style.height = this.$refs.editor.scrollHeight + "px"
        }
    },
    methods: {
        close() {
            this.$emit("close", false)
        },
        sumbit() {
            if (this.content.length == 0) {
                this.$message.error('内容不能为空')
                return
            }
            this.$root.setLoading(true)
            axios.post(`/api/v1/comment`, {
                "postsId": Number(this.postsId),
                "parenId": Number(this.parenId),
                "content": this.content,
            }).then(res => {
                if (res.data.success == 0) {
                    this.close()
                }
            }).catch(() => { }).then(() => {
                this.$root.setLoading(false)
            })
        }
    }
}
</script>
<style lang="less" scoped>
.container {
    width: 90%;
    min-height: 100px;
    border-radius: 1rem;
    padding: 10px;
    .header {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        height: 36px;
        line-height: 36px;
        margin-bottom: 10px;
        color: #9c9c9c;
        .title {
            font-size: 13px;
        }
        button.close {
            background: none;
            i {
                font-size: 20px;
            }
        }
    }
    .content {
        textarea {
            resize: none;
            min-height: 56px;
            max-height: 200px;
            display: block;
            background: #fff;
            width: 100%;
            padding: 1rem;
            border-radius: 1rem;
            margin-bottom: 0.5rem;
            border: 1px solid #bbb9b9;
            outline: none;
        }
        textarea:focus {
            border: 1px solid #8ea2e2;
        }
    }
    .footer {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        margin-top: 20px;
        button.close {
            background: none;
            background-color: #ff4848;
            height: 32px;
            line-height: 32px;
            width: 150px;
            border-radius: 3px;
            color: #fff;
            margin-right: 10px;
        }
        button.sumbit {
            height: 32px;
            line-height: 32px;
            width: 150px;
            border-radius: 3px;
            background: #4caf50;
            color: #fff;
        }
    }
}
</style>
