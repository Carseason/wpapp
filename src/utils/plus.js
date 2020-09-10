
export default {
    CloseApp() {    //关闭APP
        const plus = window.plus;
        ('iOS' == plus.os.name) ? plus.nativeUI.confirm('确认退出？', function (e) {
            if (e.index > 0) {
                plus.runtime.quit();
            }
        }, 'HelloH5', ['取消', '确定']) : (confirm('确认退出？') && plus.runtime.quit());
    },
}