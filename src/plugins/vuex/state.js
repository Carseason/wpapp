
export default {
    Value: new Map(),   //全局缓存数据
    IsLogin: false,     //是否登录
    User: {},
    Loading: false,
    BackCount: 0,       //返回计数
    PullToRefresh: 0,   //下拉计数
    Sign: false,
    Message: {
        status: false,
        content: "",
    },
    History: JSON.parse(localStorage.getItem("history")) || [], //浏览历史
}