// 观察者
let observer = {
    // 订阅集合
    subscribes: [],

    // 订阅
    subscribe: function (type, fn) {
        if (!this.subscribes[type]) {
            this.subscribes[type] = [];
        }

        // 收集订阅者的处理
        typeof fn === 'function' && this.subscribes[type].push(fn);
    },

    // 发布  可能会携带一些信息发布出去
    publish: function () {
        let type = [].shift.call(arguments),
                fns = this.subscribes[type];

        // 不存在的订阅类型，以及订阅时未传入处理回调的
        if (!fns || !fns.length) {
            return;
        }

        // 挨个处理调用
        for (let i = 0; i < fns.length; ++i) {
            fns[i].apply(this, arguments);
        }
    },

    // 删除订阅
    remove: function (type, fn) {
        // 删除全部
        if (typeof type === 'undefined') {
            this.subscribes = [];
            return;
        }

        let fns = this.subscribes[type];

        // 不存在的订阅类型，以及订阅时未传入处理回调的
        if (!fns || !fns.length) {
            return;
        }

        if (typeof fn === 'undefined') {
            fns.length = 0;
            return;
        }

        // 挨个处理删除
        for (let i = 0; i < fns.length; ++i) {
            if (fns[i] === fn) {
                fns.splice(i, 1);
            }
        }
    }
};


module.exports = {
    observer,
}