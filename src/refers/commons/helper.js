module.exports = {
    eachProps: function (value, props) {
        if (typeof props === "string" && props !== "") {
            return props.split(".").reduce(function (init, item) {
                return init && init[item];
            }, value);
        }
        return value;
    }
};