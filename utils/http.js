const setting = require("./setting.js");

// url参数解析
// example：
// var urlObj = app.jsHttp.getUrlKey('add.php?a=1&b=2&c=3');
// app.util.log('urlObj:', urlObj);
// 返回結果 {a: "1", b: "2", c: "3"}
function getUrlKey(url) {
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

/**
 * @desc    API请求接口类封装
 */
/**
 * POST请求API
 * @param  {String}   url         接口地址
 * @param  {Object}   params      请求的参数
 * @param  {Object}   sourceObj   来源对象
 * @param  {Function} successFun  接口调用成功返回的回调函数
 * @param  {Function} failFun     接口调用失败的回调函数
 * @param  {Function} completeFun 接口调用结束的回调函数(调用成功、失败都会执行)
 */
function requestPostApi(url, params, sourceObj, successFun, failFun, completeFun) {
  requestApi(url, params, 'POST', sourceObj, successFun, failFun, completeFun)
}
/**
 * GET请求API
 * @param  {String}   url         接口地址
 * @param  {Object}   params      请求的参数
 * @param  {Object}   sourceObj   来源对象
 * @param  {Function} successFun  接口调用成功返回的回调函数
 * @param  {Function} failFun     接口调用失败的回调函数
 * @param  {Function} completeFun 接口调用结束的回调函数(调用成功、失败都会执行)
 */
function requestGetApi(url, params, sourceObj, successFun, failFun, completeFun) {
  requestApi(url, params, 'GET', sourceObj, successFun, failFun, completeFun)
}
/**
 * 请求API (传递给最后三个Function的第一个参数为返回值res的data 属性（即res.data），因此Function内部使用第一个参数的时候就不要在res.data了)
 * @param  {String}   url         接口地址
 * @param  {Object}   params      请求的参数
 * @param  {String}   method      请求类型
 * @param  {Object}   sourceObj   来源对象
 * @param  {Function} successFun  接口调用成功返回的回调函数 
 * @param  {Function} failFun     接口调用失败的回调函数
 * @param  {Function} completeFun 接口调用结束的回调函数(调用成功、失败都会执行)
 */
function requestApi(url, params, method, sourceObj, successFun, failFun, completeFun) {
  //判断url是不是已经包含了网站信息
  var thirdServerBaseUrl = getApp().globalData.thirdServerBaseUrl
  if (thirdServerBaseUrl && url.indexOf(thirdServerBaseUrl) < 0) {
    url = getApp().globalData.thirdServerBaseUrl + url;
  }

  if (method == 'POST') {
    var contentType = 'application/x-www-form-urlencoded'
  } else {
    var contentType = 'application/json'
  }

  var platform = setting.getPlatform();

  platform.request({
    url: url,
    method: method,
    data: params,
    header: {
      'content-type': contentType
    },
    success: function (res) {
      typeof successFun == 'function' && successFun(res.data, sourceObj)
    },
    fail: function (res) {
      typeof failFun == 'function' && failFun(res.data, sourceObj)
    },
    complete: function (res) {
      typeof completeFun == 'function' && completeFun(res.data, sourceObj)
    }
  })
}

module.exports = {
  requestPostApi,
  requestGetApi,
  getUrlKey
}