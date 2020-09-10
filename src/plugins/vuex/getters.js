export default {
    barHeight() { //获得状态栏高度
        try {
            var immersed = 0;
            var ms = (/Html5Plus\/.+\s\(.*(Immersed\/(\d+\.?\d*).*)\)/gi).exec(navigator.userAgent);
            if (ms && ms.length >= 3) { // 当前环境为沉浸式状态栏模式
                immersed = parseFloat(ms[2]);// 获取状态栏的高度
            }
            return immersed;
        } catch (error) {
            return 0
        }
    },
}