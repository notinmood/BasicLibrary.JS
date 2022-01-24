const jQuery = require("jquery");
const ObjectHelper = require("./objectHelper");

/**
 * @param url 请求的服务器地址(必选)
 * @param settingObject 请求服务器过程的信息设置对象(可以为 null)，
 *      本对象包含以下成员:
 *      - method(请求方法 GET 或者 POST )、
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

    // jQuery("#spmDisplay").text("你好！");

    jQuery.ajax({
        type: method,
        url: url,
        data: submitDataObject,
        success: function (serverResult) {
            typeof successFunc == 'function' && successFunc(serverResult);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            typeof errorFunc == 'function' && errorFunc(XMLHttpRequest, textStatus, errorThrown);
        },
        complete: function (XMLHttpRequest, textStatus) {
            typeof completeFunc == 'function' && completeFunc(XMLHttpRequest, textStatus);
        },
    });
}

module.exports={
    request,
};
