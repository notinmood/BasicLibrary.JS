const setting = require("./setting.js");

//如果不給傳遞參數，本函數就取當前時間
const formatTime = date => {
  if (date) { } else {
    date = new Date();
  }
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * 为了使用体验，将字符串中的占位符进行替代操作，例子如下：
 * formatString("Hi--2, {0}, '{1}',this is a '{0}'! ", name, 'uuu');
 */
function formatString() {
  var s = arguments[0];
  for (var i = 0; i < arguments.length - 1; i++) {
    var reg = new RegExp("\\{" + i + "\\}", "gm");
    s = s.replace(reg, arguments[i + 1]);
  }
  return s;
}


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

/**判斷數據各種為空的情況 */
function isEmpty(value) {
  if (value == null) return true;
  var typeValue = typeof (value);
  if (typeValue == "string" && value == "") return true;
  if (typeValue == "number" && value == 0) return true;
  if (typeValue == "boolean" && value == false) return true;
  if (typeValue == "undefined" && value == undefined) return true;

  return false;
}

function log(value) {
  var isDevelop= setting.getIsDevelop();

  if (isDevelop) {
    console.log(value);
  }
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
 * @param {*} idFeildName 原数据集中 id 字段的名称
 * @param {*} parentIdFeildName 原数据集中 父亲id 字段的名称
 * @param {*} childrenNodeName 转化后的数据集中 子节点的名称
 * @param {*} parentValue 原数据集中最顶端父亲节点的值
 */
function genTreeData(sourceData, idFeildName, parentIdFeildName, childrenNodeName, parentValue = 0) {
  let cloneData = JSON.parse(JSON.stringify(sourceData))
  return cloneData.filter(father => {
      let branchArr = cloneData.filter(child => father[idFeildName] == child[parentIdFeildName]);
      branchArr.length > 0 ? father[childrenNodeName] = branchArr : ''
      return father[parentIdFeildName] == parentValue;
  })
}



module.exports = {
  getBindFuncData,
  log,
  getResultWithTwoFloat,
  formatTime,
  formatString,
  isEmpty,
  genTreeData,
}