/**
 对微信wx.abc()这样异步方法的进行promise封装
 比如wx.chooseImage有count和sizeType等参数，options就是这些参数。
 params就是其他的额外参数，比如我有一个方法是test(options, name, no, type)，params就是name, no, type。
 * @param {*} api 微信自身的abc各种异步方法

 @example
 const promisify = require('./utils/promisify.js')
 const wxLogin = promisify(wx.login)
 wxLogin().then(res => {
      console.log(res);
    });

 来源: https://www.jianshu.com/p/8a4f62cc7f8d
 */
module.exports = (api) => {
    return (options, ...params) => {
        return new Promise((resolve, reject) => {
            api(Object.assign({}, options, {
                success: resolve,
                fail: reject
            }), ...params);
        });
    }
}