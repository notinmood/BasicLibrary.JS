const th = require("./typeHelper");

/**
 * 判断一个对象内是否存在某成员
 * @param objectData 目标对象实例
 * @param memberName 成员名称(如果是某个对象子对象的成员，则可以使用“A.B.C”的格式。)
 * @returns {boolean}
 */
let hasMember = function (objectData, memberName) {
    let nodes = memberName.split(".");
    let nodeCount = nodes.length;
    let lastNode = objectData;

    let defaultValue = "_hasMember_|_defaultValue_";
    for (let i = 0; i < nodeCount; i++) {
        if (lastNode == null) {
            break;
        }

        lastNode = _getMemberInner(lastNode, nodes[i], defaultValue);
    }


    if (lastNode == defaultValue) {
        return false;
    } else {
        return true;
    }
}

let _hasMemberInner = function (objectData, memberName) {
    if (memberName in objectData) {
        return true;
    } else {
        return false;
    }
}

/**
 * 獲取对象的成员信息。如果指定的成员名称不存在，则返回defaultValue。
 * @param {*} targetObject
 * @param {*} memberName 成员的名称(如果是某个对象子对象的成员，则可以使用“A.B.C”的格式。)
 * @param {*} defaultValue
 * @example:
 * 如下有对象moo
 moo= {
    m0: 'mike',
    m1: {},
    m2: {
      n1: {
        o: 'hello',
        p: function (s) {
          return 1 + s;
        }
      }
    },
  }

 调用时候：
 //调用直接moo的属性
 let p = app.util.getObjectMemberSafely(this.moo, "m0");
 console.log(p);
 //调用moo的子属性对象的属性
 p = app.util.getObjectMemberSafely(this.moo, "m2.n1.o", "something");
 console.log(p);
 //调用moo的子属性对象的方法
 p = app.util.getObjectMemberSafely(this.moo, "m2.n1.p");
 console.log(p(5));
 //调用moo的不存在的属性，返回的结果为第三个参数
 //（缺省值i am empty。如果不给指定明确的缺省值，那么返回null作为缺省值）
 p = app.util.getObjectMemberSafely(this.moo, "m2.n1.w", "i am empty");
 console.log(p);
 */
function getMember(targetObject, memberName, defaultValue = null) {
    let nodes = memberName.split(".");
    let nodeCount = nodes.length;
    let lastNode = targetObject;

    for (let i = 0; i < nodeCount; i++) {
        if (lastNode == null) {
            break;
        }

        lastNode = _getMemberInner(lastNode, nodes[i], defaultValue);
    }

    return lastNode;
}

function _getMemberInner(targetObject, propertyName, defaultValue = null) {
    let exist = _hasMemberInner(targetObject, propertyName);
    if (exist) {
        return targetObject[propertyName];
    } else {
        return defaultValue;
    }
}

/**
 * 与assign相对,assignDeeply是深度赋值
 * @param args
 * @returns {{}|*}
 */
function assignDeeply(...args) {
    if (args.length === 0) {
        console.error('extends params is undefined')
        return {};
    }

    if (args.length === 1) {
        return args[0]
    }

    //要合并的目标对象
    let target = args[0];
    //要合并的内容
    let sources = args.slice(1, args.length)

    if (th.isObject(target) && th.isArray(target)) {
        target = {};
    }

    sources.map(function (item) {
        //防止死循环
        if (target === item) {
            return false;
        }

        //如果内容是对象
        if (th.isObject(item) || th.isArray(item)) {
            for (const key in item) {
                if (item.hasOwnProperty(key)) {
                    if (th.isObject(item[key])) {
                        //修正数据
                        target[key] = (target[key] && th.isObject(target[key])) ? target[key] : {};
                        target[key] = assignDeeply(target[key], item[key])
                    } else if (th.isArray(item[key])) {
                        //修正数据
                        target[key] = (target[key] && th.isArray(target[key])) ? target[key] : [];
                        target[key] = assignDeeply(target[key], item[key])
                    } else {
                        //基本类型直接赋值
                        target[key] = item[key]
                    }
                }
            }
        }
    })
    return target
}

/**
 * 获取所有属性的数量
 */
function getMemberCount(targetObject){
   return Object.getOwnPropertyNames(targetObject).length;
}

module.exports = {
    hasMember,
    getMember,
    assignDeeply,
    getMemberCount,
}