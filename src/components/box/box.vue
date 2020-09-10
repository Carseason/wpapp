<template>
    <div class="p">
        <template v-for="(item,i) in posts">
            <div class="l" :key="i">
                <router-link :to="`/posts/${item.id}`" tag="li">
                    <div class="wrap">
                        <wp-thumbnail :src="item.thumbnail"></wp-thumbnail>
                        <div class="count">
                            <div class="item">
                                <icon class="icon-guankancishu"></icon>
                                <span>{{item.views}}</span>
                            </div>
                            <div class="auto"></div>
                            <div class="item">
                                <icon class="icon-message"></icon>
                                <span>{{item.commentCount}}</span>
                            </div>

                        </div>
                    </div>
                    <div class="info">
                        <div class="title">{{item.title}}</div>
                        <div class="fo">
                            <div class="date">{{ item.updatedAt | dateForm }}</div>
                            <div class="auto"></div>

                        </div>

                    </div>
                </router-link>
            </div>
        </template>
    </div>
</template>
<script>
export default {
    props: ["posts"],

}
</script>
<style lang="less" scoped>
.p {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    .l {
        flex: 0 0 100%;
        max-width: 50%;
        height: 190px;
        padding: 5px;
        li {
            display: block;
            width: 100%;
            height: 100%;
            background-color: #fff;
            border-radius: 3px;
            // box-shadow: 0 1px 10px 0 rgb(225 225 225);
            overflow: hidden;
            .wrap {
                width: 100%;
                height: 110px;
                position: relative;
                border-radius: 4px;
                overflow: hidden;
                .count {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    font-size: 3.2vw;
                    padding: 1.33333vw 1.6vw;
                    display: -webkit-box;
                    display: -ms-flexbox;
                    display: flex;
                    -webkit-box-pack: justify;
                    -ms-flex-pack: justify;
                    justify-content: space-between;
                    align-items: center;
                    color: #fff;
                    background: -webkit-gradient(
                        linear,
                        left bottom,
                        left top,
                        from(rgba(0, 0, 0, 0.85)),
                        to(transparent)
                    );
                    background: linear-gradient(
                        0deg,
                        rgba(0, 0, 0, 0.85),
                        transparent
                    );
                    .item {
                        i {
                            font-size: 3.2vw;
                        }
                        span {
                            margin-left: 5px;
                            font-size: 3.2vw;
                        }
                    }
                }
            }
            .info {
                width: 100%;
                height: 80px;
                padding: 10px 0;
                .title {
                    font-size: 3.2vw;
                    color: #212121;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    height: 34px;
                }
                .fo {
                    margin-top: 5px;
                    font-size: 12px;
                    color: #aeaeae;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    display: flex;
                    flex-wrap: wrap;
                }
            }
        }
    }
}
</style>
