const helper = require("../../data/dateTimeHelper.js");
const expect = require('chai').expect;

describe("单元测试包名称 日期时间测试包", function () {
    it("单元测试方法名称 获取具体日期", function () {
        let expectData = new Date("2022-12-6 0:0:1");
        let actualData = helper.getSpecialDate(1,"2022-12-5 0:0:1");
        expect(actualData.toLocaleString()).equals(expectData.toLocaleString());
    });

    it('单元测试方法名称 获取日期', function () {
        const targetDate = helper.getDate("2022-12-15 0:0:1");

        let expectData = "2022/12/15";
        let actualData = targetDate.toLocaleDateString();
        expect(actualData).equals(expectData);

        expectData = "上午12:00:01";
        actualData = targetDate.toLocaleTimeString();
        expect(actualData).equals(expectData);
    });


})