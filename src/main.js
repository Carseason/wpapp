import Vue from 'vue'
import App from "./app/App.vue"
import router from "./plugins/router/router"
import store from './plugins/vuex/store'
import axios from './plugins/axios/axios'
Vue.prototype.$axios = axios
import "./style/style.css"
import "./components/components"
import "./layout/layout"
import "./filter/filter"
Vue.config.productionTip = false
document.addEventListener('plusready', function () {
    const plus = window.plus
    plus.navigator.setStatusBarStyle('dark');               // 设置系统状态栏为深色前景色（黑色文字）
    document.addEventListener('touchstart', function () {   //取消浏览器的左右滑动事件，使得active的样式在手机上正常生效
        return false;
    }, true);
    // 禁止选择
    document.oncontextmenu = function () {  //禁止右键
        return false;
    };
    // H5 plus事件处理
    // openPrivacy();
    // Android处理返回键
    plus.key.addEventListener('backbutton', function () {
        store.state.BackCount++ //触发返回计数
    }, false);

    //下拉刷新事件
    // const ws = plus.webview.currentWebview();
    // ws.setStyle({
    //     pullToRefresh: {
    //         support: true,
    //         style: (plus.os.name == 'iOS') ? 'default' : 'circle'
    //     }
    // });
    // ws.addEventListener('pullToRefresh', () => {
    //     setTimeout(() => {
    //         store.state.PullToRefresh++ //触发下拉计数
    //         ws.endPullToRefresh();
    //     }, 1000);
    // }, false);
    // setTimeout(() => {
    //     ws.beginPullToRefresh();
    // }, 200);

});
new Vue({
    store,
    router,
    methods: {
        setLoading(status) {
            store.state.Loading = status
        },
        setTitle(title) {
            store.state.Title = title
        },
        setSign(status) {
            store.state.Sign = status
        },
    },
    render: h => h(App),
}).$mount('#app')
