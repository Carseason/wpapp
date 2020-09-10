<template>
    <a :href="src" :class="className" :title="title" v-if="E">
        <slot />
    </a>
    <router-link :to="src" :class="className" :title="title" v-else>
        <slot />
    </router-link>
</template>
<script>
export default {
    props: ["src", "className", "title"],
    computed: {
        E() {
            return this.src[0] != "/"
        }
    }
}
</script>
<style lang="less" scoped>
</style>
