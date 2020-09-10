<template>
    <header :style="`padding-top:${barHeight}px;`">
        <div class="container">
            <slot></slot>
        </div>
        <em v-if="borderBottom"></em>
    </header>
</template>
<script>
export default {
    props: ["borderBottom"],
    computed: {
        barHeight() {
            return this.$store.getters.barHeight
        },
        heightPx() {
            return this.barHeight + 50
        },
    }
}
</script>
<style lang="less" scoped>
header {
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
    right: 0;
    background-color: #fff;
    .top {
        width: 100%;
        display: block;
    }
    .container {
        height: 50px;
        width: 100%;
    }
    em {
        display: block;
        width: 100%;
        border-bottom: 1px solid #e7e7e7;
    }
}
</style>
