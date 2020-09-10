<template>
    <layout-header :borderBottom="true">
        <div class="title">
            {{title}}
        </div>
    </layout-header>

</template>
<script>
export default {
    props: ["title"],

}
</script>
<style lang="less" scoped>
.title {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    font-size: 15px;
    color: #212121;
}
</style>
