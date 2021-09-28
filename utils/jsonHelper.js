/**
 * 判断给定的字符串是否为一个json字符串
 */
function isJson(str) {
    let result = parse(str);
    if (result) {
        return true;
    } else {
        return false;
    }
}

/**
 * 判断给定的字符串是否为一个json字符串，如果是则转换为object，为否返回false
 * @param {*} str 
 */
function parse(str) {
    if (typeof str == 'string') {
        try {
            let obj = JSON.parse(str);
            if (typeof obj == 'object' && obj) {
                return obj;
            } else {
                return false;
            }
        } catch (e) {
            return false;
        }
    } else {
        return false;
    }
}

/**
 * 判断给定的字符串是否为一个json字符串，如果是则转换为object，为否返回原来的字符串
 * @param {*} str 
 */
function tryParse(str) {
    let result = parse(str);
    if (result) {
        return result;
    } else {
        return str;
    }
}

module.exports = {
    isJson,
    parse: parse,
    tryParse: tryParse,
};