/**
 * @file   : requestHelper.test.js
 * @time   : 19:24
 * @date   : 2022/1/28
 * @mail   : 9727005@qq.com
 * @creator: ShanDong Xiedali
 * @company: HiLand & RainyTop
 */

// +--------------------------------------------------------------------------
// |思路说明 |1. 运行本文件前需要，确认服务器端存在 http://localhost/diyipingce/index.php/open/getecho
// |思路说明 |2. 运行后，控制台应该出现 "I am lisi, my age is 20",表示请求成功。
// +--------------------------------------------------------------------------

const rh = require("../../net/requestHelper");


let url = "http://localhost/diyipingce/index.php/open/getecho";
let settings = {
    "successFunc": function (returnValue) {
        console.log(returnValue);
    }
};
let submitData = {"name": "lisi", "age": "20"};
rh.request(url, settings, submitData);