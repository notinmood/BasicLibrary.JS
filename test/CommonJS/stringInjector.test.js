const expect = require('chai').expect;
const si = require("../../utils/stringInjector");


let original = "我是一个中国人！";

describe("字符串测试", function () {
    it("left方法", function () {
        expect(original.left(2)).equals("我是");
    });

    it("reverse方法", function () {
        expect(original.reverse()).equals("！人国中个一是我");
    });

    it("multi方法", function () {
        expect("00".multi(3)).equals("000000");
    });
});