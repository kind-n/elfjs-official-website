var helper = require("../helper");

module.exports = Elf.Transform("async", {

    transform : function (value, props) {
        if (value instanceof Elf.Promise) {
            if (this._lastPromise !== value) {
                this._lastResults = void 0;
                this._lastPromise = value;
            }
            this._lastPromise.then(function (value) {
                this._lastResults = value;
            }.bind(this));
            return helper.eachProps(this._lastResults, props);
        } else {
            return value;
        }
    }
});