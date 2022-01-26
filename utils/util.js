const th = require("./typeHelper");
const ah = require("./arrayHelper");
const oh = require("./objectHelper");

/**
 * 获取Array,string等对象中元素的个数
 * js数组长度，一般string使用length 属性即可获取，但这个数组是个对象则只能使用以下方式
 * @param {*} targetObject
 */
function getLength(targetObject) {
    let typeName = th.getType(targetObject);
    switch (typeName) {
        case th.ObjectTypes.string:
            return targetObject.length;
        case th.ObjectTypes.array:
            return ah.getCount(targetObject);
        case th.ObjectTypes.object:
            return oh.getMemberCount(targetObject);
    }

    // if (typeName == th.ObjectTypes.string) {
    //     return targetObject.length;
    // } else if (typeName == th.ObjectTypes.array) {
    //     return ah.getCount(targetObject);
    // }
    return 0;
}

function isExist(value) {
    return !isEmpty(value);
}

/**判斷數據各種為空的情況 */
function isEmpty(value) {
    if (value == null) return true;
    let typeValue = typeof (value);

    if (typeValue == "string" && value == "") return true;
    if (typeValue == "number" && value == 0) return true;
    if (typeValue == "boolean" && value == false) return true;
    if (typeValue == "undefined" && value == undefined) return true;

    if (Array.isArray(value) && getLength(value) == 0) return true; //长度为0的数组，也判定为empty
    if (typeValue == "object" && JSON.stringify(value) == "{}") return true; //对空对象{}的判定

    return false;
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


module.exports = {
    getBindFuncData,
    getBindEventData,
    getInputtingValue,

    sleep,
    sleepWrap,

    isEmpty,
    isExist,
    getLength,

    genTreeData,
}