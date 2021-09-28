const sh = require("./stringHelper");

String.prototype.left = function (length) {
    return sh.left(this, length);
};

String.prototype.right = function (length) {
    return sh.right(this, length);
};

String.prototype.reverse = function () {
    return sh.reverse(this);
};

/**
 * 给原型添加新的方法,不需要导出对象.
 */
// module.exports = {left: String.prototype.left};