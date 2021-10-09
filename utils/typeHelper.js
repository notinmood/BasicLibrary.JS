/**
 * 因为不是所有的类型都继承与Object,所有对目标对象类型的判断,
 * 不能通过原型中注入的方式实现.因此没有typeHelper对应的Injector.
 */

const ObjectTypes = {
    null: 'null',
    string: 'string',
    date: 'date',
    boolean: 'boolean',
    undefined: 'undefined',
    function: 'function',
    number: 'number',
    array: 'array',
    symbol: 'symbol',
    error: 'error',
    regexp: 'regexp',
    object: 'object',
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
    if (typeName == 'undefined') {
        return ObjectTypes.undefined;
    }

    if (data == null) {
        return ObjectTypes.null;
    }

    if (typeName == 'object') {
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

module.exports = {
    ObjectTypes,
    getType,
};
