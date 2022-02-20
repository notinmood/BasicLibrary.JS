const expect = require('chai').expect;
const biz = require("../../data/numberHelper");

describe("数字逻辑-测试", function () {
    const myData = 1234.5678;
    it("测试-精度测试1", function () {
        expect(biz.getFloat(myData, 2)).equals("1234.57");
    });

    it("测试-精度测试2", function () {
        expect(biz.getFloat(myData, 3)).equals("1234.568");
    });

    it("测试-精度测试3", function () {
        expect(biz.getFloat(123, 3)).equals("123.000");
    });

    it("测试-精度测试3", function () {
        expect(biz.getFloat(123.2, 3)).equals("123.200");
    });
});