const miniapp = require('./miniapp.js');
const config = require('../config.js');
const stringHelper = require('./stringHelper.js');

// 获取小数点后两位
function getResultWithTwoFloat(value) {
  var value = Math.round(parseFloat(value) * 100) / 100;
  var xsd = value.toString().split(".");
  if (xsd.length == 1) {
    value = value.toString() + ".00";
    return value;
  } else if (xsd.length > 1) {
    if (xsd[1].length < 2) {
      value = value.toString() + "0";
    }
    return value;
  }
}

/**
 * 获取Array,string等对象中元素的个数
 * js数组长度，一般string使用length 属性即可获取，但这个数组是个对象则只能使用以下方式
 * @param {*} targetObject 
 */
function getLength(targetObject) {
  var t = typeof targetObject;
  if (t == 'string') {
    return targetObject.length;
  } else if (t == 'object') {
    var n = 0;
    for (var i in targetObject) {
      n++;
    }
    return n;
  }
  return 0;
}

function isExist(value) {
  return !isEmpty(value);
}

/**判斷數據各種為空的情況 */
function isEmpty(value) {
  if (value == null) return true;
  var typeValue = typeof (value);

  if (typeValue == "string" && value == "") return true;
  if (typeValue == "number" && value == 0) return true;
  if (typeValue == "boolean" && value == false) return true;
  if (typeValue == "undefined" && value == undefined) return true;

  if (Array.isArray(value) && getLength(value) == 0) return true; //长度为0的数组，也判定为empty
  if (typeValue == "object" && JSON.stringify(value) == "{}") return true; //对空对象{}的判定

  return false;
}

function log(value) {
  var isDevelop = config.getIsDevelop();

  if (isDevelop) {
    console.log(value);
  }
}

/**
 * 暂停功能。
 * 调用示例：（用async锁定需要暂停的代码块（通常是一个function），内部用await调用sleep让程序暂停。）
  test:async function (){
    console.log('Hello');
    await app.util.sleep(3000).then(result=>{console.log("beijing");});
    console.log('world!');
  }
 */
function sleep(msTime) {
  return new Promise((resolve) => setTimeout(resolve, msTime));
}

async function sleepWrap(msTime, callbackFunc, ...args) {
  await sleep(msTime);
  callbackFunc(...args);
}

/**
 * 获取uuid字符串
 * @param {*} len uuid的长度，默认为0表示获取标准长度的uuid
 * @param {*} radix uuid组成的字符的进制格式，默认为16表示标准的格式
 */
function uuid(len = 0, radix = 16) {
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  var uuid = [],
    i;
  radix = radix || chars.length;

  if (len) {
    // Compact form
    for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
  } else {
    // rfc4122, version 4 form
    var r;

    // rfc4122 requires these characters
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';

    // Fill in random data.  At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | Math.random() * 16;
        uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
      }
    }
  }

  return uuid.join('');
}

/**
 * 获取在前台wxml文件中，要传递给后台js方法的参数
 * @param {*} event 
 * @param {*} paramName 
 */
function getBindFuncData(event, paramName) {
  return event.currentTarget.dataset[paramName];
}

/**
 * 获取通过事件，要传递给接受者方法的参数
 * @param {*} event 
 * @param {*} paramName 
 */
function getBindEventData(event, paramName) {
  return event.detail[paramName];
}

/**
 * 在input控件的bindinput事件对应的方法中获取正在输入的信息
 */
function getInputtingValue(event) {
  return event.detail.value;
}

/**
将类似如下类型的数据进行转化
data : [
            {id:1,parentId:0,name:"一级菜单A",rank:1},
            {id:2,parentId:0,name:"一级菜单B",rank:1},
            {id:3,parentId:0,name:"一级菜单C",rank:1},
            {id:4,parentId:1,name:"二级菜单A-A",rank:2},
            {id:5,parentId:1,name:"二级菜单A-B",rank:2},
            {id:6,parentId:2,name:"二级菜单B-A",rank:2},
            {id:7,parentId:4,name:"三级菜单A-A-A",rank:3},
            {id:8,parentId:7,name:"四级菜单A-A-A-A",rank:4},
            {id:9,parentId:8,name:"五级菜单A-A-A-A-A",rank:5},
            {id:10,parentId:9,name:"六级菜单A-A-A-A-A-A",rank:6},
            {id:11,parentId:10,name:"七级菜单A-A-A-A-A-A-A",rank:7},
            {id:12,parentId:11,name:"八级菜单A-A-A-A-A-A-A-A",rank:8},
            {id:13,parentId:12,name:"九级菜单A-A-A-A-A-A-A-A-A",rank:9},
            {id:14,parentId:13,name:"十级菜单A-A-A-A-A-A-A-A-A-A",rank:10},
          ]
转化成
[{
	"id": 1,
	"parentId": 0,
	"name": "一级菜单A",
	"rank": 1,
	"children": [{
		"id": 4,
		"parentId": 1,
		"name": "二级菜单A-A",
		"rank": 2,
		"children": [{
			"id": 7,
			"parentId": 4,
			"name": "三级菜单A-A-A",
			"rank": 3,
			"children": [{
				"id": 8,
				"parentId": 7,
				"name": "四级菜单A-A-A-A",
				"rank": 4,
				"children": [{
					"id": 9,
					"parentId": 8,
					"name": "五级菜单A-A-A-A-A",
					"rank": 5,
					"children": [{
						"id": 10,
						"parentId": 9,
						"name": "六级菜单A-A-A-A-A-A",
						"rank": 6,
						"children": [{
							"id": 11,
							"parentId": 10,
							"name": "七级菜单A-A-A-A-A-A-A",
							"rank": 7,
							"children": [{
								"id": 12,
								"parentId": 11,
								"name": "八级菜单A-A-A-A-A-A-A-A",
								"rank": 8,
								"children": [{
									"id": 13,
									"parentId": 12,
									"name": "九级菜单A-A-A-A-A-A-A-A-A",
									"rank": 9,
									"children": [{
										"id": 14,
										"parentId": 13,
										"name": "十级菜单A-A-A-A-A-A-A-A-A-A",
										"rank": 10
									}]
								}]
							}]
						}]
					}]
				}]
			}]
		}]
	}, {
		"id": 5,
		"parentId": 1,
		"name": "二级菜单A-B",
		"rank": 2
	}]
}, {
	"id": 2,
	"parentId": 0,
	"name": "一级菜单B",
	"rank": 1,
	"children": [{
		"id": 6,
		"parentId": 2,
		"name": "二级菜单B-A",
		"rank": 2
	}]
}, {
	"id": 3,
	"parentId": 0,
	"name": "一级菜单C",
	"rank": 1
}]

其中各参数如下：
 * @param {*} sourceData 待转化的原始数据集
 * @param {*} idFieldName 原数据集中 id 字段的名称
 * @param {*} parentIdFieldName 原数据集中 父亲id 字段的名称
 * @param {*} childrenNodeName 转化后的数据集中 子节点的名称
 * @param {*} parentValue 原数据集中最顶端父亲节点的值
 */
function genTreeData(sourceData, idFieldName, parentIdFieldName, childrenNodeName, parentValue = 0) {
  let cloneData = JSON.parse(JSON.stringify(sourceData))
  return cloneData.filter(father => {
    let branchArr = cloneData.filter(child => father[idFieldName] == child[parentIdFieldName]);
    branchArr.length > 0 ? father[childrenNodeName] = branchArr : ''
    return father[parentIdFieldName] == parentValue;
  })
}


/**
 * 獲取对象的成员信息。如果指定的成员名称不存在，则返回defaultValue。
 * @param {*} targetObject 
 * @param {*} memberName 成员的名称，如果是某个对象子对象的成员，则可以使用“A.B.C”的格式。
 * @param {*} defaultValue 
 * @example:
 * 如下有对象moo
 * moo: {
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
function getObjectMemberSafely(targetObject, memberName, defaultValue = null) {
  let nodes = memberName.split(".");
  let nodeCount = nodes.length;
  let lastNode = targetObject;

  for (let i = 0; i < nodeCount; i++) {
    if (lastNode == null) {
      break;
    }

    lastNode = _getObjectMemberInner(lastNode, nodes[i], defaultValue);
  }

  return lastNode;
}

function _getObjectMemberInner(targetObject, propertyName, defaultValue = null) {
  let exist = isObjectMember(targetObject, propertyName);
  if (exist) {
    return targetObject[propertyName];
  } else {
    return defaultValue;
  }
}

/**
 * 判断某个对象是否拥有某个成员
 */
function isObjectMember(targetObject, memberName) {
  if (isExist(targetObject) && isExist(memberName)) {
    if (targetObject[memberName] == undefined) {
      return false;
    } else {
      return true;
    }
  } else {
    return false;
  }
}


var OjectTypeNames = {
  "null": "null",
  "string": "string",
  "date": "date",
  "boolean": "boolean",
  "undefined": "undefined",
  "function": "function",
  "number": "number",
  "array": "array",
  "symbol": "symbol",
  "error": "error",
  "regexp": "regexp",
  "object": "object",
}

function getTypeName(data) {
  let typeName = null;
  typeName = typeof (data)
  if (typeName == "object") {
    let typeObject = Object.prototype.toString.call(data);

    switch (typeObject) {
      case "[object Null]":
        typeName = OjectTypeNames.null;
        break;
      case "[object Array]":
        typeName = OjectTypeNames.array;
        break;
      case "[object Date]":
        typeName = OjectTypeNames.date;
        break;
      case "[object RegExp]":
        typeName = OjectTypeNames.regexp;
        break;
      case "[object Error]":
        typeName = OjectTypeNames.error;
        break;
      default:
        typeName = OjectTypeNames.object;
    }
  }

  return typeName;
}

/**
 * 从服务端返回的带格式的数据
 * 属性{bool}resultType 表示反回信息的真或者假
 * 属性{string}title返回信息的主题信息
 * 属性{string}desc返回信息的内容信息
 * 属性{object}misc返回信息的各种其他信息，这是一个自定义对象可以任意扩展其子属性信息
 */
class ReturnsObject {
  constructor(resultType = true, title = '', desc = '', misc = null) {
    this.resultType = resultType;
    this.title = title;
    this.desc = desc;
    if (misc == null) {
      misc = {};
    }
    this.misc = misc;
  }

  /**
   * 设定属性misc的各个子属性
   * @param {*} name 
   * @param {*} value 
   */
  setMiscItem(name, value) {
    this.misc[name] = value;
  }

  /**
   * 获取misc的各个子属性的值
   * @param {*} name 
   * @param {*} defaultValue 
   */
  getMiscItem(name, defaultValue = null) {
    return getObjectMemberSafely(this.misc, name, defaultValue);
  }
}

/**
 * 解析服务器返回信息为本地类型ReturnsObject的对象
 * @param {*} data 服务器返回的json格式字符串或者json对象
 */
function parseReturnsObject(data) {
  let typeInfo = getTypeName(data);
  if (typeInfo == OjectTypeNames.string) {
    data = JSON.parse(data);
    typeInfo = getTypeName(data);
  }

  let result = null;
  if (typeInfo == OjectTypeNames.object) {
    let resultType = getObjectMemberSafely(data, 'resultType', true);
    let title = getObjectMemberSafely(data, 'title', '');
    let desc = getObjectMemberSafely(data, 'desc', '');
    let misc = getObjectMemberSafely(data, 'misc', null);

    result = new ReturnsObject(resultType, title, desc, misc);
  }

  return result;
}

module.exports = {
  getBindFuncData,
  getBindEventData,
  getInputtingValue,

  log,
  uuid,
  sleep,
  sleepWrap,
  getResultWithTwoFloat,

  isEmpty,
  isExist,

  isObjectMember,
  getObjectMemberSafely,

  getLength,

  getTypeName,
  OjectTypeNames,
  
  genTreeData,

  ReturnsObject,
  parseReturnsObject,
}