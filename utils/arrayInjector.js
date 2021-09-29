const ah = require("./arrayHelper");

/**
 * 判断是否存在某个元素成员(判断Value)
 * (不需要为关联数组和索引数组分别进行判断)
 * @param arrayData
 * @param item
 * @returns {boolean}
 */
Array.prototype.hasMember = function (item) {
    return ah.hasMember(this, item);
}

/**
 * 获取数组上元素的个数
 * @returns {number}
 */
Array.prototype.getCount = function () {
    return ah.getCount(this);
}

/**
 * 用于元素为对象的数组，按照对象的某个属性进行排序
 * 其中propName是数组元素的这个对象的属性名称,例如下面的"age".
 * 例子：
 * var arr = [{name: "zlw", age: "24"}, {name: "wlz", age: "5"}];
 * arrayHelper.sortObjectPropertyValue(arr,"age","DESC");
 */
Array.prototype.sortByPropertyValue = function (propName, sortOrder = "ASC") {
    return ah.sortByPropertyValue(this, propName, sortOrder);
}


/**
 * 用于元素为对象的数组，按照对象的某个属性（通常这个属性为字符串类型）的长度进行排序
 * 其中propName是数组元素的这个对象的属性名称,例如下面的"name".
 * 例子：
 * var arr = [{name: "zlw", age: "24"}, {name: "wl", age: "5"}];
 * arrayHelper.sortObjectPropertyLength(arr,"name","DESC");
 */
Array.prototype.sortByPropertyLength = function (propName, sortOrder = "ASC") {
    return ah.sortByPropertyLength(this, propName, sortOrder);
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
Array.prototype.mergeElementProperty = function (...arrays) {
    return ah.mergeElementProperty(this, ...arrays);
}

/**
 * 判断数组的类型(ArrayTypes值之一:索引数组、关联数组、混合数组)
 * @param arrayData
 * @returns {string}
 */
Array.prototype.getArrayType = function () {
    return ah.getArrayType(this);
}

/**
 * 判断是否为索引数组
 * @param arrayData
 * @returns {boolean}
 */
Array.prototype.isIndexArray = function () {
    return ah.isIndexArray(this);
}


/**
 * 判断是否为关联数组
 * @param arrayData
 * @returns {boolean}
 */
Array.prototype.isAssociationArray = function () {
    return ah.isAssociationArray(this);
}


/**
 * 判断是否为混合了索引元素和关联元素的数组
 * @param arrayData
 * @returns {boolean}
 */
Array.prototype.isHybridArray = function () {
    return ah.isHybridArray(this);
}


Array.prototype.merge = function (...arrays) {
    return ah.merge(this,...arrays);
}
