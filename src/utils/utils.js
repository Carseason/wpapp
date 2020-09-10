export default {
    getCookie() {
        return localStorage.getItem("x-token") || ""
    },
    setCookie(value) {
        if (value) {
            localStorage.setItem("x-token", value)
        } else {
            localStorage.removeItem("x-token");
        }
    }
}