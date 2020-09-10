/*axios异步请求库*/
import { utils } from '../../utils/index'
import { Message } from 'element-ui';
import axios from 'axios';
const LocalHostURL = window.LocalHostURL || "http://10.0.0.1:9080"
const api = `${LocalHostURL}/wp-json`
axios.defaults.withCredentials = true
axios.interceptors.request.use(//请求拦截器
    config => {
        config.headers["x-token"] = utils.getCookie()
        config.url = api + config.url
        return config;
    },
    err => {
        return err;
    },
);
axios.interceptors.response.use(//响应拦截器
    res => {
        if (res.config.method != "get" && res.data.message) {
            if (res.data.success === 0) {
                Message.success({ showClose: true, message: res.data.message, type: "success" });
            } else {
                Message.error({ showClose: true, message: res.data.message, type: "error", });
            }
        }
        return res;
    },
    err => {
        console.log(err);
        return err
    }
);
// axios.defaults.headers.common['x-token'] = utils.getCookie()
export default axios;