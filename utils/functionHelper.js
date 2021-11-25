/**
 * 判断是否为函数
 * @param funcName
 * @returns {boolean}
 */
function isFunction(funcName) {
    if (typeof (funcName) == "function" && typeof (funcName.nodeType) != "number") {
        return true;
    } else {
        return false;
    }
}

/**
 * 获取函数参数个数
 * ────────────────────────
 * 本方法是指该函数有多少个必须要传入的参数，即形参的个数。
 * 形参的数量不包括剩余参数个数，仅包括第一个具有默认值之前的参数个数。
 * @param funcName
 * @returns {*}
 */
function getArgsCount(funcName) {
    if (isFunction(funcName)) {
        return funcName.length;
    } else {
        return 0;
    }
}

/**
 * @description: 将函数柯里化的工具函数
 * @param {Function} fn 待柯里化的函数
 * @param   args 已经接收的参数列表
 * @return {Function}
 * ════════════════════════
 * 参考 https://www.cnblogs.com/bidong/p/15498133.html
 */
const currying = function (fn, ...args) {
    // fn需要的参数个数
    const len = fn.length
    // 返回一个函数接收剩余参数
    return function (...params) {
        // 拼接已经接收和新接收的参数列表
        let _args = [...args, ...params]
        // 如果已经接收的参数个数还不够，继续返回一个新函数接收剩余参数
        if (_args.length < len) {
            return currying.call(this, fn, ..._args)
        }
        // 参数全部接收完调用原函数
        return fn.apply(this, _args)
    }
}

module.exports = {
    isFunction,
    getArgsCount,
    currying,
};