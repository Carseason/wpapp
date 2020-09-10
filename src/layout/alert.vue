<template>
    <div id="alert">
        <div class="bg" @click="close()"></div>
        <slot />
    </div>
</template>
<script>
export default {
    methods: {
        close() {
            this.$emit("close", false)
        }
    }
}
</script>
<style lang="less" scoped>
#alert {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    z-index: 99;
    .bg {
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.35);
        position: absolute;
        cursor: pointer;
        background-size: cover;
    }
}
</style>
<style scoped>
#alert >>> .container {
    position: relative;
    vertical-align: middle;
    background-color: #fff;
    font-size: 18px;
    overflow: hidden;
    border-radius: 4px;
    background: #ffffff;
    -webkit-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
}
</style>
