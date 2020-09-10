<template>
    <!-- <img :alt="alt" class="thumbnail" v-lazy="url"> -->
    <div class="thumbnail" v-lazy:background-image="url"></div>
</template>

<script>
export default {
    name: "Thumbnail",
    props: ["src", "alt"],
    computed: {
        url() {
            return this.src || "https://ae01.alicdn.com/kf/Hdecc0196fa004789aa0679fe727a78a0H.jpg";
            //https://ae01.alicdn.com/kf/H84042590c4e14ebd817996f47c94f0f6i.jpg
        }
    }
}
</script>

<style scoped>
.thumbnail {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 50%;
}
</style>