<template>
    <img :src="url" @error="$event.target.src = avatar" class="avatars" alt="">
</template>
<script>
export default {
    props: ["src"],
    computed: {
        avatar() {
            return "https://ae01.alicdn.com/kf/H84042590c4e14ebd817996f47c94f0f6i.jpg"
        },
        url() {
            return this.src || this.avatar
        }
    },
}
</script>
<style lang="less" scoped>
img.avatars {
    width: 100%;
    height: 100%;
}
</style>
