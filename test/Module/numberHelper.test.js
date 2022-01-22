import {expect} from "chai";
import {helper} from "../../utils/numberHelper.mjs";

describe("数字逻辑-测试", function () {
    const myData = 1234.5678;
    it("测试-精度测试1", function () {
        expect(helper.getPreciseFloat(myData, 2)).equals("1234.57");
    });

    it("测试-精度测试2", function () {
        expect(helper.getPreciseFloat(myData, 3)).equals("1234.568");
    });

    it("测试-精度测试3", function () {
        expect(helper.getPreciseFloat(123, 3)).equals("123.000");
    });

    it("测试-精度测试3", function () {
        expect(helper.getPreciseFloat(123.2, 3)).equals("123.200");
    });
});