<template>
    <category :key="id" v-if="id > 0 && name == 'category'" :id="id"></category>
</template>
<script>
import category from "./category.vue"
export default {
    components: {
        category
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
