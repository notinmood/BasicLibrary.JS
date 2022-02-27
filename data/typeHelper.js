/**
 * 因为不是所有的类型都继承与Object,所有对目标对象类型的判断,
 * 不能通过原型中注入的方式实现.因此没有typeHelper对应的Injector.
 */

const ObjectTypes = {
    null     : 'null',
    string   : 'string',
    date     : 'date',
    boolean  : 'boolean',
    undefined: 'undefined',
    function : 'function',
    number   : 'number',
    array    : 'array',
    symbol   : 'symbol',
    error    : 'error',
    regexp   : 'regexp',
    object   : 'object',
};

/**
 * 判断数据的数据类型
 * @param data
 * @returns {string}
 */
const getType = function (data) {
    let typeName = typeof (data);

    /**
     * 对undefined类型要先判断
     */
    if (typeName === 'undefined') {
        return ObjectTypes.undefined;
    }

    if (data == null) {
        return ObjectTypes.null;
    }

    if (typeName === 'object') {
        const typeObject = Object.prototype.toString.call(data);

        switch (typeObject) {
            case '[object Null]':
                typeName = ObjectTypes.null;
                break;
            case '[object Array]':
                typeName = ObjectTypes.array;
                break;
            case '[object Date]':
                typeName = ObjectTypes.date;
                break;
            case '[object RegExp]':
                typeName = ObjectTypes.regexp;
                break;
            case '[object Error]':
                typeName = ObjectTypes.error;
                break;
            default:
                typeName = ObjectTypes.object;
        }
    }

    return typeName;
};

/**
 *
 * @param data
 * @returns {boolean}
 */
const isNumber = function (data) {
    return getType(data) === ObjectTypes.number;
}

/**
 *
 * @param data
 * @returns {boolean}
 */
const isString = function (data) {
    return getType(data) === ObjectTypes.string;
}

/**
 *
 * @param data
 * @returns {boolean}
 */
const isArray = function (data) {
    return getType(data) === ObjectTypes.array;
}

/**
 *
 * @param data
 * @returns {boolean}
 */
const isBoolean = function (data) {
    return getType(data) === ObjectTypes.boolean;
}

/**
 *
 * @param data
 * @returns {boolean}
 */
const isUndefined = function (data) {
    return getType(data) === ObjectTypes.undefined;
}

/**
 *
 * @param data
 * @returns {boolean}
 */
const isNull = function (data) {
    return getType(data) === ObjectTypes.null;
}

/**
 *
 * @param data
 * @returns {boolean}
 */
const isSymbol = function (data) {
    return getType(data) === ObjectTypes.symbol;
}

/**
 *
 * @param data
 * @returns {boolean}
 */
const isObject = function (data) {
    return getType(data) === ObjectTypes.object;
}

/**
 *
 * @param data
 * @returns {boolean}
 */
const isFunction = function (data) {
    return getType(data) === ObjectTypes.function;
}

/**
 * 判断给定的数据是否为引用类型
 * @param value
 * @return {boolean}
 */
function isReferenceType(value) {
    /**
     * 必须使用 === 严格相等（否则 undefined==null）
     */
    if (value === null) {
        return true;
    }

    return value instanceof Object;
}

/**
 * 判断给定的数据是否为值类型
 * @param value
 * @return {boolean}
 */
function isValueType(value){
    return !isReferenceType(value);
}


module.exports = {
    ObjectTypes,
    getType,
    isNumber,
    isString,
    isArray,
    isBoolean,
    isUndefined,
    isNull,
    isSymbol,
    isObject,
    isFunction,
    isReferenceType,
    isValueType,
};
