<template>
    <!-- <img src="image/loading/loading.gif" class="loading" /> -->
    <div class="loading"></div>
</template>
<script>
export default {
}
</script>
<style scoped>
/* img.loading {
	position: fixed;
	left: 50%;
	bottom: 50%;
	right: 50%;
	top: 50%;
	max-width: 50px;
	max-height: 50px;
	margin: auto;
	z-index: 999;
} */
div.loading {
    width: 50px;
    height: 50px;
    box-sizing: border-box;
    border: solid 2px transparent;
    border-top-color: #29d;
    border-left-color: #29d;
    border-radius: 50%;
    position: fixed;
    z-index: 9999;
    left: calc(50% - 25px);
    bottom: calc(50% - 25px);
    right: calc(50% - 25px);
    top: calc(50% - 25px);
    animation: turn 1s linear infinite;
}
@keyframes turn {
    0% {
        -webkit-transform: rotate(0deg);
    }
    25% {
        -webkit-transform: rotate(90deg);
    }
    50% {
        -webkit-transform: rotate(180deg);
    }
    75% {
        -webkit-transform: rotate(270deg);
    }
    100% {
        -webkit-transform: rotate(360deg);
    }
}
</style>