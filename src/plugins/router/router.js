import Vue from 'vue';
import VueRouter from 'vue-router'
import home from "../../pages/index/index.vue"
import my from "../../pages/my/my.vue"
import menus from "../../pages/menus/menus.vue"
import action from "../../pages/action/action.vue"
import posts from "../../pages/posts/index.vue"
import category from "../../pages/category/index.vue"
import history from "../../pages/history/history.vue"
Vue.use(VueRouter);
const router = new VueRouter({  //创建路由对象
    mode: 'hash',        //hash模式，history模式去掉#
    routes: [
        { path: '', component: home, name: "index", meta: { keepAlive: true } },
        { path: '/my', component: my, name: "my", meta: { keepAlive: true } },
        { path: '/menus', component: menus, name: "menus", meta: { keepAlive: true } },
        { path: '/action', component: action, name: "action", meta: { keepAlive: true } },
        { path: '/posts/:id(\\d+)', component: posts, name: "posts", meta: { keepAlive: true } },
        { path: '/category/:id(\\d+)', component: category, name: "category", meta: { keepAlive: true } },
        { path: '/history', component: history, name: "history", meta: { keepAlive: false } },
    ],
    linkActiveClass: 'on',
})
export default router;
