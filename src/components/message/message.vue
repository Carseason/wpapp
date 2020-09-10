<template>
    <div id="message">
        <div class="container">
            {{content}}
        </div>
    </div>
</template>
<script>
import store from "../../plugins/vuex/store"
export default {
    computed: {
        content() {
            return store.state.Message.content
        }
    },
    created() {
        setTimeout(() => {
            this.close()
        }, 2000)
    },
    methods: {
        close() {
            store.state.Message = {
                status: false,
                content: "",
            }
        }
    }
}
</script>
<style lang="less" scoped>
#message {
    position: fixed;
    left: 0;
    right: 0;
    text-align: center;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    top: calc(50% - 16px);
    max-width: 90%;
    margin: auto;
    z-index: 99;
    .container {
        max-width: 90%;
        min-width: 100px;
        height: 32px;
        line-height: 32px;
        background-color: #00000070;
        padding: 0 10px;
        color: #fff;
        border-radius: 2px;
        font-size: 14px;
    }
}
</style>
