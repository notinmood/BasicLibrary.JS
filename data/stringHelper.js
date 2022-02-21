/**
 * 截取某个字符串的子字符串
 * @param {*} wholeString 待截取的全字符串
 * @param {*} length 截取长度
 * @param {*} positive 截取方向（true表示正向，false表示反向）
 */
const getSubString = function (wholeString, length, positive = true) {
    const realLength = wholeString.length;
    let result;
    if (length >= realLength) {
        result = wholeString;
    } else if (positive === true) {
        result = wholeString.substring(0, length);
    } else {
        result = wholeString.substring(realLength - length, realLength);
    }
    return result;
};

/**
 * 从右向左截取字符串
 * @param {*} wholeString
 * @param {*} length
 */
const right = function (wholeString, length) {
    return getSubString(wholeString, length, false);
};

/**
 * 从左向右截取字符串
 * @param {*} wholeString
 * @param {*} length
 */
const left = function (wholeString, length) {
    return getSubString(wholeString, length, true);
};

/**
 * 将字符串进行方向反转
 * @param {*} stringData 待反转的字符串
 */
const reverse = function (stringData) {
    return stringData.split('').reverse().join('');
};

/**
 * 判断一个字符串是否包含另外一个子字符串
 * @param {*} wholeString 全字符串
 * @param {*} target 被包含的子字符串
 */
const isContains = function (wholeString, target) {
    const result = wholeString.indexOf(target);
    return result > -1;
};

/**
 * 判断字符串是否以某个子字符串结尾
 * @param wholeString
 * @param target
 * @return {boolean}
 */
function isEndWith(wholeString, target) {
    return wholeString.endsWith(target);
}

/**
 * 判断字符串是否以某个子字符串开始
 * @param wholeString
 * @param target
 * @return {boolean}
 */
function isStartWith(wholeString, target) {
    return wholeString.startsWith(target);
}

/**
 * 获取子字符串出现的位置
 * @param {*} wholeString
 * @param {*} target
 */
const getPosition = function (wholeString, target) {
    return wholeString.indexOf(target);
};

/**
 * 获取分隔符之前的子字符串
 * @param {*} wholeString
 * @param {*} separator
 */
function getStringBeforeSeparator(wholeString, separator) {
    if (isContains(wholeString, separator)) {
        const pos = getPosition(wholeString, separator);
        return wholeString.substring(0, pos);
    }
    return wholeString;
}

/**
 * 获取分隔符之后的子字符串
 * @param {*} wholeString
 * @param {*} separator
 */
function getStringAfterSeparator(wholeString, separator) {
    if (isContains(wholeString, separator)) {
        const pos = getPosition(wholeString, separator) + 1;
        return wholeString.substring(pos);
    }
    return wholeString;
}

/**
 * 为了使用体验，将字符串中的占位符进行替代操作，例子如下：
 * format("Hi--2, {0}, '{1}',this is a '{0}'! ", name, 'uuu');
 * 【注意】现在统一使用 ES6 下的动态字符串表示方式 `hi,${name}`
 *   即，用反引号包裹目标字符串，字符串内的变量用 ${}包裹
 */
function format() {
    let s = arguments[0];
    for (let i = 0; i < arguments.length - 1; i++) {
        const reg = new RegExp(`\\{${i}\\}`, 'gm');
        s = s.replace(reg, arguments[i + 1]);
    }
    return s;
}

/**
 * 把字符串 whole 按照给定的分隔符 separator 打散为数组
 * @param {*} wholeString
 * @param {*} separator
 */
function explode(wholeString, separator) {
    return wholeString.split(separator);
}

/**
 * 将数组的各个元素组装为字符串（各个元素之间，置入分隔符 separator）
 * @param {array} arrayData
 * @param separator
 * @returns {*}
 */
function implode(arrayData, separator = ",") {
    return arrayData.join(separator);
}

/** 将小写的方法整理成辨识度高的方法，供项目调用
 * （因为随着时间的推移，人脑是很难记清楚系统的小写方法是toLower还是toLowerCase）
 * 将字符串转换为小写
 * @param {*} stringData
 */
function toLower(stringData) {
    return stringData.toLowerCase();
}

/** 将大写的方法整理成辨识度高的方法，供项目调用
 * （因为随着时间的推移，人脑是很难记清楚系统的小写方法是toUpper还是toUpperCase）
 * 将字符串转换为大写
 * @param {*} stringData
 */
function toUpper(stringData) {
    return stringData.toUpperCase();
}

/**
 * 将给定的字符串转换为整数类型
 * @param {*} stringData
 */
function convertToInt(stringData) {
    return parseInt(stringData);
}

/**
 * 将给定的字符串转换为浮点类型
 * @param {*} stringData
 */
function convertToFloat(stringData) {
    return parseFloat(stringData);
}

/**
 * 将给定的字符串转换为布尔类型
 * @param {*} stringData
 */
function convertToBool(stringData) {
    return JSON.parse(stringData);
}

/**
 * 将给定的字符串转换为时间类型
 * @param {*} stringData
 */
function convertTODateTime(stringData) {
    return new Date(stringData);
}

/**
 * 判断给定的字符串内是否为数字类型
 * @param {*} stringData
 */
function isNumber(stringData) {
    return /^[-]?[\.\d]+$/.test(stringData);
}

/**
 * 获取 count 倍的 stringData
 * @param stringData
 * @param count
 * @returns {string}
 */
function multi(stringData, count) {
    let result = '';
    for (let i = 0; i < count; i++) {
        result += stringData;
    }

    return result;
}

/**
 * 将一个字符串按照分隔符 ($oldDelimiter) 撕开，然后再用 $newDelimiter 进行缝合
 * @param {string} stringData
 * @param {string} oldDelimiter
 * @param {string} newDelimiter
 * @return {string}
 */
function splice(stringData, oldDelimiter, newDelimiter = "") {
    let tempArray = explode(stringData, oldDelimiter);
    return implode(tempArray, newDelimiter);
}

/**
 * 移除字符串内所有的空格
 * @param stringData
 * @return {*}
 */
function removeAllSpace(stringData) {
    return stringData.replace(/(\s*)/g, "");
}

function trimLeft(stringData, target = " ") {
    let targetLength = target.length;

    if (stringData.substring(0, targetLength) == target) {
        stringData = stringData.slice(target.length);//将空格从字串中去掉
        stringData = trimLeft(stringData, target);    //递归调用
    }
    return stringData;
}

function trimRight(stringData, target = " ") {
    let allLength = stringData.length;
    let targetLength = target.length;
    if (stringData.substring(allLength - targetLength) == target) {
        //如果字串右边第一个字符为空格
        stringData = stringData.slice(0, allLength - targetLength);//将空格从字串中去掉
        stringData = trimRight(stringData, target);    //递归调用
    }
    return stringData;
}

trimBoth = function (stringData, target = " ") {
    let temp = trimLeft(stringData, target);
    return trimRight(temp, target);
}

module.exports = {
    format,
    explode,
    implode,
    splice,
    getSubString,
    reverse,
    right,
    left,
    isContains,
    getPosition,

    toLower,
    toUpper,

    multi,

    getStringAfterSeparator,
    getStringBeforeSeparator,

    isNumber,
    convertToInt,
    convertToFloat,
    convertToBool,
    convertTODateTime,

    isEndWith,
    isStartWith,
    removeAllSpace,
    trimLeft,
    trimRight,
    trimBoth,
};
