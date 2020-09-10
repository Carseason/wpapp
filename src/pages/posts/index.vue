<template>
    <posts :key="id" v-if="id > 0 && name == 'posts'" :id="id"></posts>
</template>
<script>
import posts from "./posts.vue"
export default {
    components: {
        posts,
    },
    computed: {
        name() {
            return this.$route.name
        },
        id() {
            return this.$route.params.id
        }
    },
}
</script>
<style lang="less" scoped>
</style>
