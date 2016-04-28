/**
 * Created by linten01 on 2016/4/8 0008.
 */
const  utilMixin = {
    getGuid(){
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    },
    r(m, n) {
        return (m + Math.random() * (n - m));
    }
}

export default utilMixin;



