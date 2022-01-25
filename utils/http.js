const miniapp = require('./miniapp.js');
const util = require("./util.js");
const cipher = require("./cipherHelper.js");
const config = require("../config.js");
const jsonHelper = require("./jsonHelper.js");
const uuidHelper = require("./uuidHelper.js");


/**
 * TODO:将 requestCommonApi 改名为 requestBizApi
 */

/**
 * @desc    API请求接口类封装
 * 推荐用这2种方式：
 * requestApi(paramsObject)  //调用服务端的url
 * requestCommonApi(paramsObject) //调用服务器端的某个类内的方法（其中集成了请求权限的验证）
 */

/**
 * GET方式请求服务器API
 * @param  {String}   url         接口地址
 * @param  {Object}   params      请求的参数
 * @param  {Object}   caller   来源对象
 * @param  {Function} successFun  接口调用成功返回的回调函数
 * @param  {Function} failFun     接口调用失败的回调函数
 * @param  {Function} completeFun 接口调用结束的回调函数(调用成功、失败都会执行)
 */
function requestApiGet(caller, url, params, successFun, failFun, completeFun) {
    _requestApi(caller, url, params, 'GET', successFun, failFun, completeFun)
}

/**
 * POST方式请求服务器API
 * @param  {String}   url         接口地址
 * @param  {Object}   params      请求的参数
 * @param  {Object}   caller   来源对象
 * @param  {Function} successFun  接口调用成功返回的回调函数
 * @param  {Function} failFun     接口调用失败的回调函数
 * @param  {Function} completeFun 接口调用结束的回调函数(调用成功、失败都会执行)
 */
function requestApiPost(caller, url, params, successFun, failFun, completeFun) {
    _requestApi(caller, url, params, 'POST', successFun, failFun, completeFun)
}

/**
 * 请求服务器API(推荐用这种方式)
 * @param {*} paramsObject 类型为object，格式为{
 * 'url':'',
 * 'params':'',
 * 'method':'GET', //或者POST
 * 'caller':this,//在调用页面直接传递this（表示调用页面这个对象）
 * 'successFun':'',
 * 'failFun':'',
 * 'completeFun':''
 * }
 */
function requestApi(paramsObject) {
    let url = _getParamSafely(paramsObject, 'url', '');
    let params = _getParamSafely(paramsObject, 'params', '');
    let method = _getParamSafely(paramsObject, 'method', 'GET');
    let caller = _getParamSafely(paramsObject, 'caller');
    let successFun = _getParamSafely(paramsObject, 'successFun');
    let failFun = _getParamSafely(paramsObject, 'failFun');
    let completeFun = _getParamSafely(paramsObject, 'completeFun');

    _requestApi(caller, url, params, method, successFun, failFun, completeFun)
}

/**
 * 请求API (传递给最后三个Function的第一个参数为返回值res的data 属性（即res.data），因此Function内部使用第一个参数的时候就不要在res.data了)
 * @param  {String}   url         接口地址
 * @param  {Object}   params      请求的参数
 * @param  {String}   method      请求类型
 * @param  {Object}   caller   来源对象
 * @param  {Function} successFun  接口调用成功返回的回调函数
 * @param  {Function} failFun     接口调用失败的回调函数
 * @param  {Function} completeFun 接口调用结束的回调函数(调用成功、失败都会执行)
 */
function _requestApi(caller, url, params, method, successFun, failFun, completeFun) {
    //判断url是不是已经包含了网站信息
    var thirdServerBaseUrl = getApp().config.thirdServerBaseUrl
    if (thirdServerBaseUrl && url.indexOf(thirdServerBaseUrl) < 0) {
        url = thirdServerBaseUrl + url;
    }

    if (method == 'POST') {
        var contentType = 'application/x-www-form-urlencoded'
    } else {
        var contentType = 'application/json'
    }

    var platform = miniapp.getPlatform();

    platform.request({
        url: url,
        method: method,
        data: params,
        header: {
            'content-type': contentType
        },
        success: function (res) {
            if (res.statusCode == 200) {
                let returnValue = jsonHelper.tryParse(res.data);
                typeof successFun == 'function' && successFun(returnValue, caller);
            } else {
                console.log("服务器错误" + res.statusCode);
                console.log(JSON.stringify(res.data));
            }
        },
        fail: function (res) {
            let returnValue = jsonHelper.tryParse(res.data);
            typeof failFun == 'function' && failFun(returnValue, caller)
        },
        complete: function (res) {
            let returnValue = jsonHelper.tryParse(res.data);
            typeof completeFun == 'function' && completeFun(returnValue, caller)
        }
    })
}


/**
 * 请求服务器API (推荐用这种方式)
 * @param {*} paramsObject 类型为object，格式为{
 * 'url':'',
 * 'params':'',
 * 'method':'GET', //或者POST
 * 'caller':this,//在调用页面直接传递this（表示调用页面这个对象）
 * 'successFun':'',
 * 'failFun':'',
 * 'completeFun':''
 * }
 */
function requestCommonApi(paramsObject) {
    let funcName = _getParamSafely(paramsObject, 'funcName', '');
    let funcParam = _getParamSafely(paramsObject, 'funcParam', '');
    let moreParams = _getParamSafely(paramsObject, 'moreParams', '');
    let method = _getParamSafely(paramsObject, 'method', 'GET');
    let caller = _getParamSafely(paramsObject, 'caller');
    let callbackFuncs = _getParamSafely(paramsObject, 'callbackfuncs');
    let className = _getParamSafely(paramsObject, 'className');
    let showLoading = _getParamSafely(paramsObject, 'showLoading', true);
    let returnJson = _getParamSafely(paramsObject, 'returnJson', true);
    _requestCommonApi(caller, funcName, funcParam, moreParams, method, callbackFuncs, className, showLoading, returnJson);
}


/**
 * 服务器端统一暴露commonOperate4Client这个接口。其他各个服务器函数方法都作为参数传给此接口。
 * @param {*} funcName 服务器函数方法名称
 * @param {*} funcParam 服务器函数方法后面括号内的参数，统一放在用此参数管理，多个参数的值用^^分隔，仅仅传递参数值（不用传递参数名称）
 * @param {*} moreParams 参数数组。如果是方法内通过input等形式接受的其他参数，使用moreParams[参数名]=参数值 的方法传递
 * @param {*} callbackFuncs 可以是一个方法（success对应的方法）；也可以是一个方法数组，数组内的3个元素分别为successFunc、failFunc、completeFunc
 * @param {*} showLoading 是否显示“正在加载。。。”的遮罩层提示框
 */
function requestCommonApiGet(caller, funcName, funcParam, moreParams, callbackFuncs, className = 'Biz', showLoading = true, returnJson = true) {
    _requestCommonApi(caller, funcName, funcParam, moreParams, "GET", callbackFuncs, className, showLoading, returnJson);
}

/**
 * 服务器端统一暴露commonOperate4Client这个接口。其他各个服务器函数方法都作为参数传给此接口。
 * @param {*} funcName 服务器函数方法名称
 * @param {*} funcParam 服务器函数方法后面括号内的参数，统一放在用此参数管理，多个参数的值用^^分隔，仅仅传递参数值（不用传递参数名称）
 * @param {*} moreParams 参数数组。如果是方法内通过input等形式接受的其他参数，使用moreParams[参数名]=参数值 的方法传递
 * @param {*} callbackFuncs 可以是一个方法（success对应的方法）；也可以是一个方法数组，数组内的3个元素分别为successFunc、failFunc、completeFunc
 * @param {*} showLoading 是否显示“正在加载。。。”的遮罩层提示框
 */
function requestCommonApiPost(caller, funcName, funcParam, moreParams, callbackFuncs, className = 'Biz', showLoading = true, returnJson = true) {
    _requestCommonApi(caller, funcName, funcParam, moreParams, "POST", callbackFuncs, className, showLoading, returnJson);
}


/**
 * 服务器端统一暴露commonOperate4Client这个接口。其他各个服务器函数方法都作为参数传给此接口。
 * @param {*} funcName 服务器函数方法名称
 * @param {String} method 请求类型
 * @param {*} funcParam 服务器函数方法后面括号内的参数，统一放在用此参数管理，多个参数的值用^^分隔，仅仅传递参数值（不用传递参数名称）
 * @param {*} moreParams 参数数组。如果是方法内通过input等形式接受的其他参数，使用moreParams[参数名]=参数值 的方法传递
 * @param {*} callbackFuncs 可以是一个方法（success对应的方法）；也可以是一个方法数组，数组内的3个元素分别为successFunc、failFunc、completeFunc
 * @param {*} showLoading 是否显示“正在加载。。。”的遮罩层提示框
 */
function _requestCommonApi(caller, funcName, funcParam, moreParams, method, callbackFuncs, className = 'Biz', showLoading = true, returnJson = true) {
    // let displayLoading = getApp().globalData.displayLoading;
    // if (displayLoading == null || displayLoading == false) {
    //   getApp().globalData.displayLoading = true;
    //   if (showLoading) {
    //     setTimeout(() => {
    //       wx.showLoading({
    //         title: '数据加载中...',
    //       });
    //     }, 0);
    //   }
    // }

    if (className == null) {
        className = "Biz";
    }

    let params = moreParams;

    if (params) {
        //
    } else {
        params = {};
    }

    var url = '/index/Open/commonOperate4Client';

    let thisTime = Date.now();
    let uuid = uuidHelper.create();
    let sign = arithmetic(thisTime, uuid);

    params['funcName'] = funcName;
    params['funcParam'] = funcParam;
    params['className'] = className;
    params['returnJson'] = returnJson;

    params['a__t'] = thisTime;
    params['a__r'] = uuid;
    params['a__s'] = sign;

    params['MAN'] = config.miniAppNameEn; //小程序的名称为 狐狸学堂

    //console.log("将要传递到服务器端的参数为：" + JSON.stringify(params));

    let successFunc = null;
    let failFunc = null;
    let completeFunc = null;
    if (callbackFuncs) {
        if (typeof (callbackFuncs) == "function") {
            successFunc = callbackFuncs;
        } else {
            if (callbackFuncs instanceof Array) {
                if (callbackFuncs[0]) {
                    successFunc = callbackFuncs[0];
                }

                if (callbackFuncs[1]) {
                    failFunc = callbackFuncs[1];
                }

                if (callbackFuncs[2]) {
                    completeFunc = callbackFuncs[2];
                }
            }
        }
    }

    var newCompleteFunc = function () {
        if (completeFunc) {
            completeFunc();
        }

        // let displayLoading = getApp().globalData.displayLoading;
        // if (displayLoading == true) {
        //   getApp().globalData.displayLoading = false;
        //   if (showLoading) {
        //     setTimeout(() => {
        //       wx.hideLoading();
        //     }, 1);
        //   }
        // }
    }

    _requestApi(caller, url, params, method, successFunc, failFunc, newCompleteFunc);
}

function arithmetic(timeStamp, randomStr) {
    let TOKEN = 'ChinaBoy';
    let arr = [];
    arr.push(timeStamp);
    arr.push(randomStr);
    arr.push(TOKEN);
    //按照首字母大小写顺序排序
    arr = arr.sort();
    //拼接成字符串
    let str = arr.join("");
    //进行加密
    let signature = cipher.sha1(str);
    signature = cipher.md5(signature);
    //转换成大写
    signature = signature.toUpperCase();
    return signature;
}

function _getParamSafely(paramObject, paramName, defaultValue) {
    let target = paramObject[paramName];
    if (target != undefined) {
        return target;
    } else {
        return defaultValue;
    }
}


/**
 * url参数解析
 * @param {*} url
 *  example：
 * var urlObj = app.jsHttp.getUrlParamsObject('add.php?a=1&b=2&c=3');
 * app.util.log('urlObj:', urlObj);
 * 返回結果 {a: "1", b: "2", c: "3"}
 */
function getUrlParamsObject(url) {
    var params = {};
    var urls = url.split("?");
    if (urls[1]) {
        var arr = urls[1].split("&");
        for (var i = 0, l = arr.length; i < l; i++) {
            var a = arr[i].split("=");
            params[a[0]] = a[1];
        }
        return params;
    } else {
        return urls[0]
    }
}

module.exports = {
    requestApi: requestApi,
    requestApiGet: requestApiGet,
    requestApiPost: requestApiPost,
    requestCommonApi: requestCommonApi,
    requestCommonApiGet: requestCommonApiGet,
    requestCommonApiPost: requestCommonApiPost,
    getUrlParamsObject: getUrlParamsObject,
}