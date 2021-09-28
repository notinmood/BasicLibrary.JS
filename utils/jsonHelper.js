/**
 * 判断给定的字符串是否为一个json字符串
 * @param stringData
 * @returns {boolean}
 */
function isJson(stringData) {
    let result = parse(stringData);
    if (result) {
        return true;
    } else {
        return false;
    }
}

/**
 * 将对象转成json字符串
 * @param jsonObject
 * @returns {string}
 */
function serialize(jsonObject) {
    return JSON.stringify(jsonObject)
}

/**
 * 判断给定的字符串是否为一个json字符串，如果是则转换为object，为否返回false
 * @param {*} stringData
 */
function parse(stringData) {
    if (typeof stringData == 'string') {
        try {
            let obj = JSON.parse(stringData);
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
 * @param {*} stringData
 */
function tryParse(stringData) {
    let result = parse(stringData);
    if (result) {
        return result;
    } else {
        return stringData;
    }
}

module.exports = {
    isJson,
    serialize,
    parse,
    tryParse,
};