/**
 * 对微信得到Setting（对应wx.getSetting方法）后的逻辑处理
 * @param {*} userGottenFunc 
 */
function dealGottenSetting(gottenFunc) {
  wx.getSetting({
    success: res => {
      gottenFunc(res);
    }
  });
}

/**
 * 对微信得到用户基本信息授权（对应wx.getSetting方法）后的逻辑处理
 * @param {*} gottenFunc 得到授权的处理逻辑
 * @param {*} notGottenFunc 未得到授权的处理逻辑
 */
function dealGottenBasicAuth(gottenFunc, notGottenFunc) {
  wx.getSetting({
    success: res => {
      if (res.authSetting['scope.userInfo']) {
        gottenFunc(res);
      } else {
        notGottenFunc(res);
      }
    }
  });
}


/**
 * 对微信得到UserInfo后的逻辑处理
 * @param {*} userGottenFunc 
 */
function dealGottenUserInfo(userGottenFunc) {
  this.dealGottenUserInfo(() => {
    wx.getUserInfo({
      lang: "zh_CN",
      success: res => {
        var userInfo = res.userInfo;
        if (userGottenFunc && typeof (userGottenFunc) === "function") {
          userGottenFunc(userInfo);
        }
      }
    });
  });
}

/**
 * 由于异步的原因，在使用openid的时候有可能其尚未存在，因此对这段逻辑进行包装
 * @param {*} callbackFunc 
 */
function dealOpenIDBiz(callbackFunc) {
  let openid = getApp().globalData.userOpenID;
  if (openid) {
    callbackFunc(openid);
  } else {
    getApp().userSessionCallbackArray.push(res => {
      callbackFunc(res);
    })
  }
}

function showToastFail(title) {
  this.showToast(title, 'fail');
}

function showToast(title, state = 'success') {
  if (state == 'fail') {
    wx.showToast({
      image: '/image/fail.png',
      title: title,
    })
  } else {
    wx.showToast({
      icon: state,
      title: title,
    });
  }
}

/**
 * 检测当前的小程序
 * 是否是最新版本，是否需要下载、更新
 */
function checkUpdateVersion() {
  //判断微信版本是否 兼容小程序更新机制API的使用
  if (wx.canIUse('getUpdateManager')) {
    //创建 UpdateManager 实例
    const updateManager = wx.getUpdateManager();
    //检测版本更新
    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      if (res.hasUpdate) {
        //监听小程序有版本更新事件
        updateManager.onUpdateReady(function () {
          //TODO 新的版本已经下载好，调用 applyUpdate 应用新版本并重启 （ 此处进行了自动更新操作）
          updateManager.applyUpdate();
        })
        updateManager.onUpdateFailed(function () {
          // 新版本下载失败
          wx.showModal({
            title: '已经有新版本喽~',
            content: '请您删除当前小程序，到微信 “发现-小程序” 页，重新搜索打开哦~',
          })
        })
      }
    })
  } else {
    //TODO 此时微信版本太低（一般而言版本都是支持的）
    wx.showModal({
      title: '溫馨提示',
      content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
    })
  }
}

/*获取当前页url*/
function getCurrentPageUrl() {
  var pages = getCurrentPages()    //获取加载的页面
  var currentPage = pages[pages.length - 1]    //获取当前页面的对象
  var url = currentPage.route    //当前页面url
  return url
}

/*获取当前页带参数的url*/
function getCurrentPageUrlWithArgs() {
  var pages = getCurrentPages()    //获取加载的页面
  var currentPage = pages[pages.length - 1]    //获取当前页面的对象
  var url = currentPage.route    //当前页面url
  var options = currentPage.options    //如果要获取url中所带的参数可以查看options

  //拼接url的参数
  var urlWithArgs = url + '?'
  for (var key in options) {
    var value = options[key]
    urlWithArgs += key + '=' + value + '&'
  }
  urlWithArgs = urlWithArgs.substring(0, urlWithArgs.length - 1)

  return urlWithArgs
}

//重写分享方法
function shareAppMessage() {
  //监听路由切换
  //间接实现全局设置分享内容
  wx.onAppRoute(function (res) {
      //获取加载的页面
      let pages = getCurrentPages(),
          //获取当前页面的对象
          view = pages[pages.length - 1],
          //页面数据
          data;
      if (view) {
          data = view.data;
          console.log('是否重写分享方法', data.isOverShare);
          if (data.isOverShare) {
              view.onShareAppMessage = function () {
                let defaultImageUrl = '/images/share2friends.png';  
                //分享配置
                  return {
                      title: data.title?data.title:'欢迎使用FoxLove', // 子页面的title
                      path: '/pages/index/index',
                      imageUrl:imageUrl || defaultImageUrl,
                  };
              }
          }
      }
  })
}

/**
 * 获取运行的平台信息（是微信小程序还是百度小程序）
 * @param {*} onlyName 默认值为false，返回的是平台对象；设置为true的时候返回的是平台的名称字符串
 */
function getPlatform(onlyName = false) {
  var platform = null;
  var platformName = '';
  var tempType = null;

  //1、判断是否为微信小程序
  tempType = typeof (wx);
  if (tempType != "undefined") {
    platform = wx;
    platformName = 'weixin';
  }

  //2、判断是否为百度小程序
  tempType = typeof (swan);
  if (tempType != "undefined") {
    platform = swan;
    platformName = 'baidu';
  }

  //3、TODO 其他小程序的判断
  if (onlyName) {
    return platformName;
  } else {
    return platform;
  }
}

module.exports = {
  dealGottenSetting,
  dealGottenUserInfo,
  dealGottenBasicAuth,
  dealOpenIDBiz,
  showToast,
  showToastFail,
  checkUpdateVersion,
  getCurrentPageUrl,
  getCurrentPageUrlWithArgs,
  shareAppMessage,
  getPlatform,
};
