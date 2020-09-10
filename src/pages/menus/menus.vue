<template>
    <div id="main">
        <wp-header title="分区菜单"></wp-header>
        <div class="bg"></div>
        <div class="body">
            <div class="flex">
                <template v-for="( item ,i ) in menus">
                    <router-link class="item" :key="i" :to="`/category/${item.id}`" tag="li">
                        <img src="https://tiebapic.baidu.com/forum/pic/item/38dbb6fd5266d01632da2071802bd40734fa35a3.jpg" alt="">
                        <span>
                            {{item.name}}
                        </span>
                    </router-link>
                </template>
            </div>
        </div>
    </div>
</template>
<script>
import axios from "../../plugins/axios/axios"
export default {
    data() {
        return {
            menus: [],
        }
    },
    created() {
        this.getMenus()
    },
    methods: {
        getMenus() {
            this.$root.setLoading(true)
            axios.post(`/api/v1/category`, {
                "id": [],
            }).then(res => {
                if (res.data.success == 0) {
                    this.menus = res.data.result || []
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
        // background-color: #f7f7f7;
    }
    .body {
        height: 100%;
        width: 100%;
        padding: 50px 5px 50px 5px;
        overflow: auto;
        .flex {
            width: 100%;
            height: 100%;
            display: flex;
            flex-wrap: wrap;
            overflow: auto;
            li.item {
                flex: 0 0 100%;
                max-width: 25%;
                text-align: center;
                height: 80px;
                padding: 10px;
                img {
                    max-width: 100%;
                    height: 50px;
                }
                span {
                    height: 20px;
                    line-height: 20px;
                    width: 100%;
                    font-size: 14px;
                    color: #5f5f5f;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    display: block;
                }
            }
        }
    }
}
</style>