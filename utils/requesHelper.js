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
 * @param url
 * @param bizObject
 * @param settingObject
 * @param submitDataObject
 */
function requestBiz(url, bizObject, settingObject = null, submitDataObject = null) {
    if (!submitDataObject) {
        submitDataObject = [];
    }

    submitDataObject['funcName'] = bizObject['funcName'];
    submitDataObject['funcParam'] = bizObject['funcParam'];

    let className = ObjectHelper.getMember(bizObject, 'className', 'Biz');
    let returnJson = ObjectHelper.getMember(bizObject, "returnJson", true);
    submitDataObject['className'] = className;
    submitDataObject['returnJson'] = returnJson;

    let thisTime = Date.now();
    let uuid = uuidHelper.create();
    let sign = cipherHelper.calcSignature(thisTime, uuid);
    submitDataObject['a__t'] = thisTime;
    submitDataObject['a__r'] = uuid;
    submitDataObject['a__s'] = sign;

    // params['MAN'] = config.miniAppNameEn;
    //TODO: 可以对 successFunc 进一步解析处理

    self.request(url, settingObject, submitDataObject);
}

module.exports = {
    request,
    requestBiz,
};
