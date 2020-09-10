/* eslint-disable */
export default {
    SetUser: (state, obj) => {  //更新用户数据
        state.User = obj;
    },
    SetIsLogin: (state, status) => {
        state.IsLogin = status
    },
    SetHistory: (state, postsId) => {
        const id = Number(postsId)
        const count = state.History.length;
        if (count >= 30) {
            state.History = state.History.splice(0, 29)
        }
        state.History.push(id)
        state.History = Array.from(new Set(state.History))
        localStorage.setItem("history", JSON.stringify(state.History))
    }
}