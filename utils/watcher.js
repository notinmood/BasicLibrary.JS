let watchCallBack = {};
let watchingKeys = [];

/**
 * 对同一个参数可以设置多个回调函数的Watch。调用示例：
 * （其中temp为getApp().globalData内的一个成员的名称）
 * XXX.watch("temp", (value, old) => {
    this.setData({ displayInfo: value });
  });
 * @param {*} keyName 参数targetDataSet内某个属性的名称
 * @param {*} callbackFunc 参数targetDataSet内属性key对应的值发生改变时回调的函数。这个函数又两个参数，value为改变后的值，old为改变之前的值。
 * @param {*} targetDataSet 被监控的数据集（缺省情形下为getApp().globalData，也可以设置为Page的data）;
 * 因为只会会监控targetDataSet下的一级属性成员的变化。如果要监控比如getApp().globalData下的二级属性
 * (比如globalData.a.b)的变化,那么就应该将globalData.a设置为targetDataSet。具体如下
 * XXX.watch("temp", someFunc, getApp().globalData.a);
 */
function watch(keyName, callbackFunc, targetDataSet = null) {
  if (targetDataSet == null) {
    targetDataSet = getApp().globalData;
  }

  watchCallBack = Object.assign({}, watchCallBack, {
    [keyName]: watchCallBack[keyName] || []
  });
  watchCallBack[keyName].push(callbackFunc);
  if (!watchingKeys.find(x => x === keyName)) {
    //const that = this;
    watchingKeys.push(keyName);
    let val = targetDataSet[keyName];
    Object.defineProperty(targetDataSet, keyName, {
      configurable: true,
      enumerable: true,
      set(value) {
        const old = targetDataSet[keyName];
        val = value;
        watchCallBack[keyName].map(func => func(value, old));
      },
      get() {
        return val
      }
    })
  }
}


module.exports = {
  watch,
};