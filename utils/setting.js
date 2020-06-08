function getPlatform() {
  var platform = null;
  var tempType = null;

  //1、判断是否为微信小程序
  tempType = typeof (wx);
  if (tempType != "undefined") {
    platform = wx;
  }

  //2、判断是否为百度小程序
  tempType = typeof (swan);
  if (tempType != "undefined") {
    platform = swan;
  }

  //3、TODO 其他小程序的判断

  return platform;
}

/**
 * 是否在开发状态下
 */
function getIsDevelop() {
  var status = true;
  // if (__wxConfig) { //import:这个值从配置文件app.json中读取,需要注意__wxConfig对象是否会被腾讯取消
  //   status = __wxConfig.debug;
  // }

  return status;
}


module.exports = {
  getPlatform,
  getIsDevelop,
}