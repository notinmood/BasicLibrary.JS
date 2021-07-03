// var miniAppNameCn="狐狸恋爱学堂";
// var miniAppNameEn="hlxt";

// /**
//  * 获取运行的平台信息（是微信小程序还是百度小程序）
//  * @param {*} onlyName 默认值为false，返回的是平台对象；设置为true的时候返回的是平台的名称字符串
//  */
// function getPlatform(onlyName = false) {
//   var platform = null;
//   var platformName = '';
//   var tempType = null;

//   //1、判断是否为微信小程序
//   tempType = typeof (wx);
//   if (tempType != "undefined") {
//     platform = wx;
//     platformName = 'weixin';
//   }

//   //2、判断是否为百度小程序
//   tempType = typeof (swan);
//   if (tempType != "undefined") {
//     platform = swan;
//     platformName = 'baidu';
//   }

//   //3、TODO 其他小程序的判断
//   if (onlyName) {
//     return platformName;
//   } else {
//     return platform;
//   }
// }

// /**
//  * 是否在开发状态下
//  */
// function getIsDevelop() {
//   var status = true;
//   // if (__wxConfig) { //import:这个值从配置文件app.json中读取,需要注意__wxConfig对象是否会被腾讯取消
//   //   status = __wxConfig.debug;
//   // }

//   return status;
// }


// module.exports = {
//   getPlatform,
//   getIsDevelop,
//   miniAppNameCn,
//   miniAppNameEn,
// }