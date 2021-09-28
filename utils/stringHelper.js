/**
 * 截取某个字符串的子字符串
 * @param {*} whole 待截取的全字符串
 * @param {*} length 截取长度
 * @param {*} positive 截取方向（true表示正向，false表示反向）
 */
let getSubString = function (whole, length, positive = true) {
    let realLength = whole.length;
    let result = "";
    if (length >= realLength) {
        result = whole;
    } else {
        if (positive == true) {
            result = whole.substring(0, length);
        } else {
            result = whole.substring(realLength - length, realLength);
        }
    }
    return result;
}

/**
 * 从右向左截取字符串
 * @param {*} whole
 * @param {*} length
 */
let right = function (whole, length) {
    return getSubString(whole, length, false);
}

/**
 * 从左向右截取字符串
 * @param {*} whole
 * @param {*} length
 */
let left = function (whole, length) {
    return getSubString(whole, length, true);
}

/**
 * 将字符串进行方向反转
 * @param {*} data 待反转的字符串
 */
let reverse = function (data) {
    return data.split("").reverse().join("");
}

/**
 * 判断一个字符串是否包含另外一个子字符串
 * @param {*} whole 全字符串
 * @param {*} target 被包含的子字符串
 */
let isContains = function (whole, target) {
    let result = whole.indexOf(target);
    if (result > -1) {
        return true;
    } else {
        return false;
    }
}

/**
 * 获取子字符串出现的位置
 * @param {*} whole
 * @param {*} target
 */
let getPosition = function (whole, target) {
    return whole.indexOf(target);
}

/**
 * 获取分隔符之前的子字符串
 * @param {*} whole
 * @param {*} separator
 */
function getStringBeforeSeparator(whole, separator) {
    if (isContains(whole, separator)) {
        let pos = getPosition(whole, separator);
        return whole.substring(0, pos);
    } else {
        return whole;
    }
}

/**
 * 获取分隔符之后的子字符串
 * @param {*} whole
 * @param {*} separator
 */
function getStringAfterSeparator(whole, separator) {
    if (isContains(whole, separator)) {
        let pos = getPosition(whole, separator) + 1;
        return whole.substring(pos);
    } else {
        return whole;
    }
}


/**
 * 为了使用体验，将字符串中的占位符进行替代操作，例子如下：
 * format("Hi--2, {0}, '{1}',this is a '{0}'! ", name, 'uuu');
 * 【注意】现在统一使用ES6下的动态字符串表示方式 `hi,${name}`
 *   即，用反引号包裹目标字符串，字符串内的变量用 ${}包裹
 */
function format() {
    let s = arguments[0];
    for (let i = 0; i < arguments.length - 1; i++) {
        let reg = new RegExp("\\{" + i + "\\}", "gm");
        s = s.replace(reg, arguments[i + 1]);
    }
    return s;
}

/**
 * 把字符串whole按照给定的分隔符separator打散为数组
 * @param {*} whole
 * @param {*} separator
 */
function explode(whole, separator) {
    let array = whole.split(separator);
    return array;
}

/**将小写的方法整理成辨识度高的方法，供项目调用
 * （因为随着时间的推移，人脑是很难记清楚系统的小写方法是toLower还是toLowerCase）
 * 将字符串转换为小写
 * @param {*} strData
 */
function toLower(strData) {
    return strData.toLowerCase();
}

/**将大写的方法整理成辨识度高的方法，供项目调用
 * （因为随着时间的推移，人脑是很难记清楚系统的小写方法是toUpper还是toUpperCase）
 * 将字符串转换为大写
 * @param {*} strData
 */
function toUpper(strData) {
    return strData.toUpperCase();
}

/**
 * 将给定的字符串转换为整数类型
 * @param {*} strData
 */
function convertToInt(strData) {
    return parseInt(strData);
}

/**
 * 将给定的字符串转换为浮点类型
 * @param {*} strData
 */
function convertToFloat(strData) {
    return parseFloat(strData);
}

/**
 * 将给定的字符串转换为布尔类型
 * @param {*} strData
 */
function convertToBool(strData) {
    return JSON.parse(strData);
}

/**
 * 将给定的字符串转换为时间类型
 * @param {*} strData
 */
function convertTODateTime(strData) {
    return new Date(strData);
}

/**
 * 判断给定的字符串内是否为数字类型
 * @param {*} strData
 */
function isNumber(strData) {
    // return !isNaN(strData);
    return /^[-]?[\.\d]+$/.test(strData);
}

module.exports = {
    format,
    explode,
    getSubString,
    reverse,
    right,
    left,
    isContains,
    getPosition,

    toLower,
    toUpper,

    getStringAfterSeparator,
    getStringBeforeSeparator,

    isNumber,
    convertToInt,
    convertToFloat,
    convertToBool,
    convertTODateTime,
};