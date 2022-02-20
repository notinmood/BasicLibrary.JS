const sh = require("./stringHelper");

/**
 * 特别说明：JavaScript下最好不要使用关联数组，如果有这种需求就使用对象{}形式。
 */

/**
 * 数组的类型（索引数组、关联数组、混合数组等）
 * @type {{hybrid: string, index: string, association: string, non: string}}
 */
const ArrayTypes = {
    "index": "index", "association": "association", "hybrid": "hybrid", "non": "non",
}

/**
 * 判断是否存在某个元素成员(判断Value)
 * (不需要为关联数组和索引数组分别进行判断)
 * @param arrayData
 * @param item
 * @returns {boolean}
 */
function hasMember(arrayData, item) {
    for (const arrayDataKey in arrayData) {
        if (arrayData[arrayDataKey] === item) {
            return true;
        }
    }

    return false;
}

// +--------------------------------------------------------------------------
// |::说明·|
// |::一一·|
// +--------------------------------------------------------------------------

/**
 * 是否存在某个Key
 * @param arrayData
 * @param keyName
 * @returns {boolean}
 */
function hasKey(arrayData, keyName) {
    for (const arrayDataKey in arrayData) {
        if (arrayData.hasOwnProperty(arrayDataKey)) {
            // noinspection all
            if (arrayDataKey == keyName) {
                return true;
            }
        }
    }

    return false;
}

/**
 * 获取元素的个数
 * @param arrayData
 * @returns {number}
 */
function getCount(arrayData) {
    return _getSelfCount(arrayData);
}

/**
 * 获取数组上所有的元素个数 (包括索引元素、关联元素、原型链元素)
 * @param arrayData
 * @returns {number}
 * @private
 */
function getAllCount(arrayData) {
    let inCount = 0;
    for (const myArrayKey in arrayData) {
        inCount++;
    }
    return inCount;
}

/**
 * 获取数组自身上所有的元素个数(包括索引元素、关联元素;但不包括原型链元素)
 * @param arrayData
 * @returns {number}
 * @private
 */
function _getSelfCount(arrayData) {
    let inHasCount = 0;
    for (const myArrayKey in arrayData) {
        if (arrayData.hasOwnProperty(myArrayKey)) {
            inHasCount++;
        }
    }

    return inHasCount;
}

/**
 * 获取数组上索引元素的个数(不包括关联元素和原型链元素;本方法跟length属性结果一致。)
 * @param arrayData
 * @returns {number}
 * @private
 */
function _getIndexCount(arrayData) {
    let ofCount = 0;
    for (const number of arrayData) {
        ofCount++;
    }

    return ofCount;
}

/**
 * 判断是否为索引数组
 * @param arrayData
 * @returns {boolean}
 */
function isIndexArray(arrayData) {
    const indexCount = _getIndexCount(arrayData);
    const selfCount = _getSelfCount(arrayData);

    return indexCount !== 0 && indexCount === selfCount;
}

/**
 * 判断是否为关联数组
 * @param arrayData
 * @returns {boolean}
 */
function isAssociationArray(arrayData) {
    const indexCount = _getIndexCount(arrayData);
    const selfCount = _getSelfCount(arrayData);

    return indexCount === 0 && selfCount !== 0;
}

/**
 * 判断是否为混合了索引元素和关联元素的数组
 * @param arrayData
 * @returns {boolean}
 */
function isHybridArray(arrayData) {
    const indexCount = _getIndexCount(arrayData);
    const selfCount = _getSelfCount(arrayData);

    return indexCount !== 0 && indexCount !== selfCount;
}

/**
 * 判断 2个数组是否相等
 * @param arrayData1
 * @param arrayData2
 * @return {boolean}
 */
function isEqual(arrayData1, arrayData2) {
    /**
     * 如果2个数组对应的指针相同，那么肯定相等，同时也对比一下类型
     */
    if (arrayData1 === arrayData2) {
        return true;
    } else {
        if (arrayData1.length !== arrayData2.length) {
            return false;
        } else {
            for (let i in arrayData1) {
                /**
                 * 只要出现一次不相等，那么2个数组就不相等
                 */
                if (arrayData1[i] !== arrayData2[i]) {
                    return false;
                }
            }

            /**
             * for循环完成，没有出现不相等的情况，那么2个数组相等
             */
            return true;
        }
    }
}

/**
 * 判断数组的类型(ArrayTypes值之一:索引数组、关联数组、混合数组)
 * @param arrayData
 * @returns {string}
 */
function getArrayType(arrayData) {
    if (isIndexArray(arrayData)) {
        return ArrayTypes.index;
    }

    if (isAssociationArray(arrayData)) {
        return ArrayTypes.association;
    }

    if (isHybridArray(arrayData)) {
        return ArrayTypes.hybrid;
    }

    return ArrayTypes.non;
}

/**
 * 用于元素为对象的数组，按照对象的某个属性进行排序
 * 其中propName是数组元素的这个对象的属性名称,例如下面的"age".
 * 例子：
 * var arr = [{name: "zlw", age: "24"}, {name: "wlz", age: "5"}];
 * arrayHelper.sortObjectPropertyValue(arr,"age","DESC");
 */
function sortByPropertyValue(arrayData, propName, sortOrder = "ASC") {
    return arrayData.sort(_sortByPropertyValue(propName, sortOrder));
}

function _sortByPropertyValue(propName, sortOrder = "ASC") {
    return function (obj1, obj2) {
        let val1 = obj1[propName];
        let val2 = obj2[propName];
        if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
            val1 = Number(val1);
            val2 = Number(val2);
        }

        return _sortTwoValue(val1, val2, sortOrder);
    }
}

/**
 * 用于元素为对象的数组，按照对象的某个属性（通常这个属性为字符串类型）的长度进行排序
 * 其中propName是数组元素的这个对象的属性名称,例如下面的"name".
 * 例子：
 * var arr = [{name: "zlw", age: "24"}, {name: "wl", age: "5"}];
 * arrayHelper.sortObjectPropertyLength(arr,"name","DESC");
 */
function sortByPropertyLength(arrayData, propName, sortOrder = "ASC") {
    return arrayData.sort(_sortByPropertyLength(propName, sortOrder));
}

function _sortByPropertyLength(propName, sortOrder = "ASC") {
    return function (obj1, obj2) {
        let val1 = obj1[propName].toString().length;
        let val2 = obj2[propName].toString().length;

        return _sortTwoValue(val1, val2, sortOrder);
    }
}

function _sortTwoValue(val1, val2, sortOrder = "ASC") {
    let result;
    if (val1 < val2) {
        result = -1;
    } else if (val1 > val2) {
        result = 1;
    } else {
        result = 0;
    }

    sortOrder = sortOrder.toLowerCase();
    if (sortOrder === "desc") {
        result = 0 - result;
    }

    return result;
}

/**
 * 用于元素为对象的索引数组(不能是关联数组)，将两个数组中元素对象的属性进行顺次合并.
 * 1、以主数组为基准,如果后面的各个数组长度比主数组长,那么舍弃长的部分;
 * (主数组arrayA和其他数组arrayB合并的时候,arrayA的长度为4,那么arrayB的第5个元素就舍弃.)
 * 以主数组为基准,如果后面的各个数组长度比主数组短，那么将后面数组二次循环填充到主数组的未匹配元素上
 * (主数组arrayA和其他数组arrayC合并的时候,arrayA的长度为4,arrayC的长度为3,就将arrayC再循环一次(将arrayC的第一个元素匹配给arrayA的第4个元素))
 * 例如：
 let arrayA = [{ 'a': 'a1', 'b': 'b1' }, { 'a': 'a2', 'b': 'b2' }, { 'a': 'a3', 'b': 'b3' }, { 'a': 'a4', 'b': 'b4' }];
 let arrayB = [{ 'm': 'm1', 'n': 'n1' }, { 'm': 'm2', 'n': 'n2' }, { 'm': 'm3', 'n': 'n3' }, { 'm': 'm4', 'n': 'n4' }, { 'm': 'm5', 'n': 'n5' }];
 let arrayC = [{ 'x': 'x1', 'y': 'y1' }, { 'x': 'x2', 'y': 'y2' }, { 'x': 'x3', 'y': 'y3' }];

 let result1 = ***.mergeElementProperty(arrayA, arrayB);
 app.log(result1);
 let result2 = ***.mergeElementProperty(arrayA, arrayC);
 app.log(result2);

 ────────────────────────
 result1的结果为：
 [
 {
        "a": "a1",
        "b": "b1",
        "m": "m1",
        "n": "n1",
     },
 {
        "a": "a2",
        "b": "b2",
        "m": "m2",
        "n": "n2",
     },
 {
        "a": "a3",
        "b": "b3",
        "m": "m3",
        "n": "n3",
     },
 {
        "a": "a4",
        "b": "b4",
        "m": "m4",
        "n": "n4",
     },
 ];

 result2的结果为：
 [
 {
        "a": "a1",
        "b": "b1",
        "x": "x1",
        "y": "y1",
     },
 {
        "a": "a2",
        "b": "b2",
        "x": "x2",
        "y": "y2",
     },
 {
        "a": "a3",
        "b": "b3",
        "x": "x3",
        "y": "y3",
     },
 {
        "a": "a4",
        "b": "b4",
        "x": "x1",
        "y": "y1",
     },
 ]
 */
function mergeElementProperty(mainArray, ...otherArrays) {
    let result = mainArray;

    for (const currentArray of otherArrays) {
        result = _mergeElementProperty(result, currentArray);
    }

    return result;
}

function _mergeElementProperty(mainArray, secondaryArray) {
    let mainCount = getCount(mainArray);
    let secondaryCount = getCount(secondaryArray);

    let result = [];
    for (let i = 0; i < mainCount; i++) {
        let item = null;
        let index = i % secondaryCount;
        item = Object.assign(mainArray[i], secondaryArray[index]);
        result.push(item);
    }

    return result;
}

/**
 * 合并各个数组的元素
 * @param arrays
 * @returns []
 */
function concat(...arrays) {
    let result = [];
    if (arrays.length > 0) {
        const arrayCount = arrays.length;
        for (let i = 0; i < arrayCount; i++) {
            let currentArray = arrays[i];

            for (const currentArrayKey in currentArray) {
                if (currentArray.hasOwnProperty(currentArrayKey)) {
                    const tempKey = parseInt(currentArrayKey);

                    if (isNaN(tempKey)) {
                        result[currentArrayKey] = currentArray[currentArrayKey];
                    } else {
                        result.push(currentArray[currentArrayKey]);
                    }
                }
            }
        }
    }

    return result;
}

/**
 * 合并各个数组的元素(concat的别名)
 * @param arrays
 * @returns []
 */
function merge(...arrays) {
    return concat(...arrays);
}

/**
 * 把字符串 stringData 按照给定的分隔符 separator 打散为数组
 * @param {string} stringData
 * @param {*} separator
 * @return {array}
 */
function explode(stringData, separator) {
    return sh.explode(stringData, separator);
}

/**
 * 将数组的各个元素组装为字符串（各个元素之间，置入分隔符 separator）
 * @param {array} arrayData
 * @param {string} separator
 * @returns string
 */
function implode(arrayData, separator = ",") {
    return sh.implode(arrayData, separator);
}

/**
 * 将元素添加到数组的头部
 * @param {array} arrayData
 * @param items
 * @return {int} 返回数组新的长度
 */
function addHead(arrayData, ...items) {
    return arrayData.unshift(...items);
}

/**
 * 获取数组的头部元素并将其从数组内移除
 * @param  {array} arrayData
 * @return {*} 返回数组的头部元素
 */
function removeHead(arrayData) {
    return arrayData.shift();
}

/**
 * 将元素添加到数组的尾部
 * @param {array} arrayData
 * @param items
 * @return {int} 返回数组新的长度
 */
function addTail(arrayData, ...items) {
    return arrayData.push(...items);
}

/**
 * 获取数组的尾部元素并将其从数组内移除
 * @param  {array} arrayData
 * @return {any}
 */
function removeTail(arrayData) {
    return arrayData.pop();
}

module.exports = {
    ArrayTypes,
    implode,
    explode,

    merge,
    concat,
    hasMember,
    hasKey,
    sortByPropertyValue,
    sortByPropertyLength,
    mergeElementProperty,
    getCount,
    getAllCount,
    getArrayType,
    isIndexArray,
    isAssociationArray,
    isHybridArray,
    isEqual,

    addHead,
    removeHead,
    addTail,
    removeTail,
}