/**
 * @file   : stringHelper.test.js
 * @time   : 19:21
 * @date   : 2022/2/8
 * @mail   : 9727005@qq.com
 * @creator: ShanDong Xiedali
 * @company: HiLand & RainyTop
 */

const expect = require('chai').expect;
const sh = require("../../data/stringHelper");


describe("字符串测试", function () {
    it("单元测试方法 explode", function () {
        let original = "我 是 一个 中国 人！";
        let expectData = ['我', '是', '一个', '中国', '人！'];
        let actualData = sh.explode(original, " ");

        expect(actualData.length).equals(expectData.length);
    });

    it('单元测试方法 implode 1', function () {
        let expectData = "我-是-一个-中国-人！";
        let original = ['我', '是', '一个', '中国', '人！'];
        let actualData = sh.implode(original, "-");
        expect(actualData).equals(expectData);
    });

    it('单元测试方法 implode 2', function () {
        let expectData = "我,是,一个,中国,人！";
        let original = ['我', '是', '一个', '中国', '人！'];
        let actualData = sh.implode(original);
        expect(actualData).equals(expectData);
    });

    it('单元测试方法 splice', function () {
        let original = "我 是 一个 中国 人！";

        let expectData = "我,是,一个,中国,人！";
        let actualData = sh.splice(original, " ", ",");

        expect(actualData).equals(expectData);

        expectData = "我是一个中国人！";
        actualData = sh.splice(original, " ");
        expect(actualData).equals(expectData);
    });

    it('单元测试方法 removeAllSpace', function () {
        let stringData = " 张  坤 当 年 07 到 17 年 重 仓。 白 酒. ";
        let expectData = "张坤当年07到17年重仓。白酒.";
        let actualData = sh.removeAllSpace(stringData);
        expect(actualData).equals(expectData);
    });

    it('单元测试方法 lTrim1', function () {
        let stringData = " 张 张  坤 当 年 07 到 17 年 重 仓。 白 酒. ";
        let expectData = "张 张  坤 当 年 07 到 17 年 重 仓。 白 酒. ";
        let actualData = sh.trimLeft(stringData);
        expect(actualData).equals(expectData);
    });

    it('单元测试方法 lTrim2', function () {
        let stringData = " 张 张  坤 当 年 07 到 17 年 重 仓。 白 酒. ";
        let expectData = "  坤 当 年 07 到 17 年 重 仓。 白 酒. ";
        let actualData = sh.trimLeft(stringData, " 张");
        expect(actualData).equals(expectData);
    });

    it('单元测试方法名称 rTrim1', function () {
        let stringData = " 张 张  坤 当 年 07 到 17 年 重 仓。 白 酒. ";
        let expectData = " 张 张  坤 当 年 07 到 17 年 重 仓。 白 酒.";
        let actualData = sh.trimRight(stringData);
        expect(actualData).equals(expectData);
    });

    it('单元测试方法名称 rTrim2', function () {
        let stringData = " 张 张  坤 当 年 07 到 17 年 重 仓. . 白 酒. . ";
        let expectData = " 张 张  坤 当 年 07 到 17 年 重 仓. . 白 酒";
        let actualData = sh.trimRight(stringData, ". ");
        expect(actualData).equals(expectData);
    });

    it('单元测试方法名称 trim1', function () {
        let stringData = " 张 张  坤 当 年 07 到 17 年 重 仓。 白 酒. ";
        let expectData = "张 张  坤 当 年 07 到 17 年 重 仓。 白 酒.";
        let actualData = sh.trimBoth(stringData);
        expect(actualData).equals(expectData);
    });

    it('单元测试方法名称 trim2', function () {
        let stringData = ". 张 张  坤 当 年 07 到 17 年 重 仓。 白 酒. . ";
        let expectData = "张 张  坤 当 年 07 到 17 年 重 仓。 白 酒";
        let actualData = sh.trimBoth(stringData, ". ");
        expect(actualData).equals(expectData);
    });
});

