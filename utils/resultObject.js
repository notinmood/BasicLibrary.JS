const oh = require("./objectHelper");
const th = require("./typeHelper");

/**
 * 本文件返回class本身,使用的时候可以直接调用
 */

/**
 * 从服务端返回的带格式的数据
 * 属性{bool} resultType 表示反回信息的真或者假
 * 属性{string} message 返回信息的主题信息
 * 属性{object} data 返回信息的内容信息
 * 属性{object} misc 返回信息的各种其他信息，这是一个自定义对象可以任意扩展其子属性信息
 */
module.exports = class ResultObject {
    constructor(status = true, message = '', data = null, misc = null) {
        this.status = status;
        this.message = message;
        this.data = data;
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
        return oh.getMember(this.misc, name, defaultValue);
    }

    /**
     * 将ResultObject转换成为json字符串
     * @returns {string}
     */
    stringify = function () {
        return ResultObject.stringify(this);
    }

    /**
     * 将ResultObject转换成为json字符串
     * @param resultObject
     * @returns {string}
     */
    static  stringify = function (resultObject) {
        return JSON.stringify(resultObject);
    }


    /**
     * 解析服务器返回信息为本地类型ResultObject的对象
     * @param {*} jsonData 服务器返回的json格式字符串或者json对象
     */
    static parse = function (jsonData) {
        let typeInfo = th.getType(jsonData);
        if (typeInfo === th.ObjectTypes.string) {
            jsonData = JSON.parse(jsonData);
            typeInfo = th.getType(jsonData);
        }

        let result = null;
        if (typeInfo === th.ObjectTypes.object) {
            let status = oh.getMember(jsonData, 'status', false);
            let message = oh.getMember(jsonData, 'message', '');
            let data = oh.getMember(jsonData, 'data', null);
            let misc = oh.getMember(jsonData, 'misc', null);

            result = new ResultObject(status, message, data, misc);
        }

        return result;
    }
}

