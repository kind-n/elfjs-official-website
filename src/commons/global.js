var s_language = "";
var s_previous = 0;
var s_recently = 0;

module.exports = {

    get language () {
        return s_language || (window.localStorage && window.localStorage.getItem("lang")) || navigator.language;
    },

    set language (s_value) {
        s_language = s_value, window.localStorage && window.localStorage.setItem("lang", s_value);
    },

    get clientWidth () {
        return document.documentElement.clientWidth || window.innerWidth || document.body.clientWidth;
    },

    get clientHeight () {
        return document.documentElement.clientHeight || window.innerHeight || document.body.clientHeight;
    },

    get scrollTop () {
        var top = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        if (top !== s_recently) {
            s_previous = s_recently;
            s_recently = top;
        }
        return top;
    },
   
    get scrollDir () {
        return this.scrollTop - s_previous;
    }
};