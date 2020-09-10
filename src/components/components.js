import Vue from 'vue';
import icon from "./icon/icon.vue"  //图标
Vue.component('icon', icon)
/*******************组件*******************/
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import header from "./nav/header.vue"
Vue.component('wp-header', header)

import nav from "./nav/nav.vue"
Vue.component('wp-nav', nav)


import box from "./box/box.vue"
Vue.component('wp-box', box)


import thumbnail from "./thumbnail/thumbnail.vue"
Vue.component('wp-thumbnail', thumbnail)
import avatar from "./avatar/avatar.vue"
Vue.component('wp-avatar', avatar)

import loading from "./loading/loading.vue"
Vue.component('wp-loading', loading)


import login from "./sign/login.vue"
Vue.component('wp-login', login)


import repull from "./repull/repull.vue"
Vue.component('wp-repull', repull)


import message from "./message/message.vue"
Vue.component('wp-message', message)


import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, { preLoad: 1.3, error: "https://ae01.alicdn.com/kf/H88474df924774b81a2b7b6efa0c38170N.jpg", loading: "https://ae01.alicdn.com/kf/H88474df924774b81a2b7b6efa0c38170N.jpg", attempt: 1, dispatchEvent: true, })
