function isExist(arrayData, item) {
    if (item in arrayData) {
        return true;
    } else {
        return false;
    }
}

/**
 * 用于元素为对象的数组，按照对象的某个属性进行排序
 * 其中propName是数组元素的这个对象的属性名称,例如下面的"age".
 * 例子：
 * var arr = [{name: "zlw", age: "24"}, {name: "wlz", age: "5"}];
 * arrayHelper.sortObjectPropertyValue(arr,"age","DESC");
 */
function sortObjectPropertyValue(arrayData, propName, sortOrder = "ASC") {
    return arrayData.sort(_sortObjectPropertyValue(propName, sortOrder));
}

function _sortObjectPropertyValue(propName, sortOrder = "ASC") {
    return function (obj1, obj2) {
        var val1 = obj1[propName];
        var val2 = obj2[propName];
        if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
            val1 = Number(val1);
            val2 = Number(val2);
        }

        var reuslt = 0;
        if (val1 < val2) {
            reuslt = -1;
        } else if (val1 > val2) {
            reuslt = 1;
        } else {
            reuslt = 0;
        }

        sortOrder = sortOrder.toLowerCase();
        if (sortOrder == "desc") {
            reuslt = 0 - reuslt;
        }

        return reuslt;
    }
}

/**
 * 用于元素为对象的数组，按照对象的某个属性（通常这个属性为字符串类型）的长度进行排序
 * 其中propName是数组元素的这个对象的属性名称,例如下面的"name".
 * 例子：
 * var arr = [{name: "zlw", age: "24"}, {name: "wl", age: "5"}];
 * arrayHelper.sortObjectPropertyLength(arr,"name","DESC");
 */
function sortObjectPropertyLength(arrayData, propName, sortOrder = "ASC") {
    return arrayData.sort(_sortObjectPropertyLength(propName, sortOrder));
}

function _sortObjectPropertyLength(propName, sortOrder = "ASC") {
    return function (obj1, obj2) {
        var val1 = obj1[propName].toString().length;
        var val2 = obj2[propName].toString().length;

        var reuslt = 0;
        if (val1 < val2) {
            reuslt = -1;
        } else if (val1 > val2) {
            reuslt = 1;
        } else {
            reuslt = 0;
        }

        sortOrder = sortOrder.toLowerCase();
        if (sortOrder == "desc") {
            reuslt = 0 - reuslt;
        }

        return reuslt;
    }
}

/**
 * 用于元素为对象的数组，将两个数组中对象元素的属性进行顺次合并
 * 例如：
 *  let arrayA = [{ 'a': 'a1', 'b': 'b1' }, { 'a': 'a2', 'b': 'b2' }, { 'a': 'a3', 'b': 'b3' }, { 'a': 'a4', 'b': 'b4' }];
    let arrayB = [{ 'm': 'm1', 'n': 'n1' }, { 'm': 'm2', 'n': 'n2' }, { 'm': 'm3', 'n': 'n3' }, { 'm': 'm4', 'n': 'n4' }, { 'm': 'm5', 'n': 'n5' }];
    let arrayC = [{ 'x': 'x1', 'y': 'y1' }, { 'x': 'x2', 'y': 'y2' }, { 'x': 'x3', 'y': 'y3' }];

    let result1 = ***.mergeElementProperty(arrayA, arrayB);
    app.log(result1);
    let result2 = ***.mergeElementProperty(arrayA, arrayC);
    app.log(result2);
 */
function mergeElementProperty(mainArray, secondaryArray) {
    let mainCount = (mainArray).length;
    let sencondaryCount = (secondaryArray).length;
  
    let result = [];
    for (let i = 0; i < mainCount; i++) {
      let item = null;
      let index = i % sencondaryCount;
      item = Object.assign(mainArray[i], secondaryArray[index]);
      result.push(item);
    }
  
    return result;
  }

module.exports = {
    isExist,
    sortObjectPropertyValue,
    sortObjectPropertyLength,
    mergeElementProperty,
}