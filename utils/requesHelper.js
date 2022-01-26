const jQuery = require("jquery");
const ObjectHelper = require("./objectHelper");
const uuidHelper = require("./uuidHelper");
const cipherHelper = require("./cipherHelper");

/**
 * 对服务器方法通用的请求方法
 * @param url 请求的服务器地址(必选)
 * @param settingObject 请求服务器过程的信息设置对象(可以为 null)，
 *      本对象包含以下成员:
 *      - method(请求方法 GET 或者 POST ;如果设置了参数 submitDataObject，这本 method 自动为 POST)、
 *      - successFunc(服务器执行成功后的回调函数)、
 *      - errorFunc(服务器执行失败后的回调函数)、
 *      - completeFunc(服务器执行完成后的回调函数)
 * @param submitDataObject 提交给服务器的数据对象(可以为 null)
 */
function request(url, settingObject = null, submitDataObject = null) {
    let method = ObjectHelper.getMember(settingObject, 'method', 'GET');
    let successFunc = ObjectHelper.getMember(settingObject, 'successFunc');
    let errorFunc = ObjectHelper.getMember(settingObject, 'errorFunc');
    let completeFunc = ObjectHelper.getMember(settingObject, 'completeFunc');

    if (submitDataObject) {
        method = "POST";
    }

    jQuery.ajax({
                    type    : method,
                    url     : url,
                    data    : submitDataObject,
                    success : function (serverResult) {
                        typeof successFunc == 'function' && successFunc(serverResult);
                    },
                    error   : function (XMLHttpRequest, textStatus, errorThrown) {
                        typeof errorFunc == 'function' && errorFunc(XMLHttpRequest, textStatus, errorThrown);
                    },
                    complete: function (XMLHttpRequest, textStatus) {
                        typeof completeFunc == 'function' && completeFunc(XMLHttpRequest, textStatus);
                    },
                });
}

/**
 * 对服务器端带权限验证的业务逻辑的请求方法
 * @param url 请求的服务器地址(必选)
 * @param bizObject 请求服务器过程的商务逻辑对象
 *      本对象包含以下成员:
 *      - funcName 调用服务器端函数的名称
 *      - funcParam 调用服务器端函数的参数,多个参数用 ^^ 分割的字符串或者直接传递仅有value(没有key)的数组,类似["zhangsan",20]
 *        (推荐做法:
 *        服务器端函数后面的括号内不直接写参数，而是在代码段内用 $_GET 或者 $_POST 接收参数;
 *        这样就不必使用 funcParam 给服务器函数传递多个参数的时候进行 ^^ 拼接了)
 *
 * @param settingObject 请求服务器过程的信息设置对象(可以为 null)，
 *      本对象包含以下成员:
 *      - method(请求方法 GET 或者 POST ;如果设置了参数 submitDataObject，这本 method 自动为 POST)、
 *      - successFunc(服务器执行成功后的回调函数)、
 *      - errorFunc(服务器执行失败后的回调函数)、
 *      - completeFunc(服务器执行完成后的回调函数)
 * @param submitDataObject 提交给服务器的数据对象(可以为 null)
 */
function requestBiz(url, bizObject, settingObject = null, submitDataObject = null) {
    if (!submitDataObject) {
        submitDataObject = [];
    }

    let className = ObjectHelper.getMember(bizObject, 'className', 'Biz');
    let returnJson = ObjectHelper.getMember(bizObject, "returnJson", true);
    bizObject['className'] = className;
    bizObject['returnJson'] = returnJson;

    /**
     * 将对象 bizObject 内所有的信息赋值给 submitDataObject
     */
    ObjectHelper.assignDeeply(submitDataObject, bizObject);

    let timeStamp = Date.now();
    let randomString = uuidHelper.create();
    let signature = cipherHelper.calcSignature(timeStamp, randomString);
    submitDataObject['a__t'] = timeStamp;
    submitDataObject['a__r'] = randomString;
    submitDataObject['a__s'] = signature;

    //TODO: 可以对 successFunc 进一步解析处理

    request(url, settingObject, submitDataObject);
}

module.exports = {
    request,
    requestBiz,
};
