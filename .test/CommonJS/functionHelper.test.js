const fh = require("../../data/functionHelper");
const expect = require('chai').expect;


describe("函数Helper测试", function () {

    let aa = "this is a string!";
    it("测试是否为function", function () {
        expect(fh.isFunction(aa)).equals(false);
    });

    let ff = function () {
    };
    it("测试是否为function", function () {
        expect(fh.isFunction(ff)).equals(true);
    });

    function myFunc1(a, b, c) {

    }

    it("测试参数的数量", function () {
        expect(fh.getArgsCount(myFunc1)).equals(3);
    });

    function myFunc2(...args) {

    }

    it("测试参数的数量", function () {
        expect(fh.getArgsCount(myFunc2)).equals(0);
    });


    let original = function (a, b, c, d) {
        return a + b + c + d;
    };
    it('测试柯里化方法', function () {
        let fa = fh.currying(original, 1, 2);
        console.log(fa);
        let fb = fa(3);
        console.log(fb);
        let fc = fb(4);
        console.log(fc);
        expect(fc).equals(10);
    });


    /**
     * 异步执行需要手工测试
     */
    // it('单元测试方法名称 异步执行测试', function () {
    //     let expectData = 0;
    //     let actualData = fh.AsyncCall();
    //     expect(actualData).equals(expectData);
    // });
});

