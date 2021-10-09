const sh = require("./stringHelper");

/**
 * 给原型添加新的方法,不需要导出对象.
 */

String.prototype.left = function (length) {
    return sh.left(this, length);
};

String.prototype.right = function (length) {
    return sh.right(this, length);
};

String.prototype.reverse = function () {
    return sh.reverse(this);
};

String.prototype.multi = function (count) {
    return sh.multi(this, count);
}

/**
 * 给原型添加新的方法,不需要导出对象.
 */
// module.exports = {left: String.prototype.left};