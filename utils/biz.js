// function registerStartupCallbacks() {
//     let app = getApp();
//     app.callbackAdd("wxPaid,codeActived", status => {
//         if (status == "success") {
//             loadUserBiz(true, null);
//         }
//     });
// }
//
//
// /**
//  * 载入用户的业务数据(将成功载入的用户业务数据置入app.globalData.LocalUserBiz内)
//  * @param {*} forceFromRemote 本地如果存在了这个业务数据，是否仍然从远程服务器重新载入
//  * @param {*} callbackFunc 载入用户业务数据成功后的回调函数(本函数的参数是成功载入的用户业务数据)
//  */
// function loadUserBiz(forceFromRemote = false, callbackFunc = null) {
//     let app = getApp();
//     let userBiz = null;
//     if (app.util.isExist(app.globalData.LocalUserBiz) && forceFromRemote == false) {
//         userBiz = app.globalData.LocalUserBiz;
//         typeof callbackFunc == 'function' && callbackFunc(userBiz)
//     } else {
//         var funcName = 'getUserBiz';
//         var funcParam = '';
//         var params = {
//             'openid': app.globalData.userOpenID,
//         };
//
//         var successFunc = function (res, caller) {
//             if (res) {
//                 userBiz = res;
//                 app.globalData.LocalUserBiz = res;
//                 typeof callbackFunc == 'function' && callbackFunc(userBiz)
//             }
//         };
//
//         app.http.requestCommonApiGet(this, funcName, funcParam, params, successFunc, "Biz");
//     }
// }
//
// module.exports = {
//     loadUserBiz: loadUserBiz,
//     registerStartupCallbacks,
// };