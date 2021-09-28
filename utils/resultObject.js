const oh = require("./objectHelper");
const th = require("./typeHelper");

/**
 * 本文件返回class本身,使用的时候可以直接调用
 */

/**
 * 从服务端返回的带格式的数据
 * 属性{bool}resultType 表示反回信息的真或者假
 * 属性{string}title返回信息的主题信息
 * 属性{string}desc返回信息的内容信息
 * 属性{object}misc返回信息的各种其他信息，这是一个自定义对象可以任意扩展其子属性信息
 */
module.exports = class ResultObject {
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
        return oh.getMember(this.misc, name, defaultValue);
    }


    /**
     * 解析服务器返回信息为本地类型ReturnsObject的对象
     * @param {*} data 服务器返回的json格式字符串或者json对象
     */
    static parseReturnsObject = function (data) {
        let typeInfo = th.getType(data);
        if (typeInfo == th.ObjectTypes.string) {
            data = JSON.parse(data);
            typeInfo = th.getType(data);
        }

        let result = null;
        if (typeInfo == th.ObjectTypes.object) {
            let resultType = oh.getMember(data, 'resultType', false);
            let title = oh.getMember(data, 'title', '');
            let desc = oh.getMember(data, 'desc', '');
            let misc = oh.getMember(data, 'misc', null);

            result = new ResultObject(resultType, title, desc, misc);
        }

        return result;
    }
}

