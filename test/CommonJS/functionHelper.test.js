const fh = require("../../utils/functionHelper");
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

    function myfunc1(a, b, c) {

    }

    it("测试参数的数量", function () {
        expect(fh.getArgsCount(myfunc1)).equals(3);
    });

    function myfunc2(...args) {

    }

    it("测试参数的数量", function () {
        expect(fh.getArgsCount(myfunc2)).equals(0);
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
});

