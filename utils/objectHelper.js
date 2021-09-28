const ot = require("./objectTypes");

let ObjectTypes = {
    "Null": "null",
    "String": "string",
    "Date": "date",
    "Boolean": "boolean",
    "Undefined": "undefined",
    "Function": "function",
    "Number": "number",
    "Array": "array",
    "Symbol": "symbol",
    "Error": "error",
    "Regexp": "regexp",
    "Object": "object",
}

/**
 * 判断数据的数据类型
 * @param data
 * @returns {string}
 */
let getType = function (data) {
    const objectType = typeof (data);

    /**
     * 对undefined类型要先判断
     */
    if (objectType == "undefined") {
        return ot.ObjectTypes.Undefined;
    }


    if (data == null) {
        return ot.ObjectTypes.Null;
    }


    if (objectType == "object") {
        if (data instanceof Array) {
            return ot.ObjectTypes.Array;
        }

        if (data instanceof Date) {
            return ot.ObjectTypes.DateTime;
        }
    }

    switch (objectType) {
        case "number":
            return ot.ObjectTypes.Number;
        case "symbol":
            return ot.ObjectTypes.Symbol;
        case "boolean":
            return ot.ObjectTypes.Boolean;
        case "string":
            return ot.ObjectTypes.String;
        case "function":
            return ot.ObjectTypes.Function;
        default:
            return ot.ObjectTypes.Object;
    }
}

/**
 * 判断一个对象内是否存在某成员
 * @param objectData 目标对象实例
 * @param memberName 成员名称
 * @returns {boolean}
 */
let hasMember = function (objectData, memberName) {
    if (memberName in objectData) {
        return true;
    } else {
        return false;
    }
}

module.exports = {
    getType,
    hasMember,
}