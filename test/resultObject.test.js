const ro = require("../utils/resultObject");
const expect = require('chai').expect;

const misc = {"A": "aaa", "B": 111};
const myData = new ro(true, "结果正确", "政治觉悟不错", misc);
myData.setMiscItem("C", false);
const myJson = JSON.stringify(myData);
const myObject = ro.parseReturnsObject(myJson);

describe("业务包名称-测试", function () {
    it("测试-验证原始对象的属性", function () {
        expect(myData.resultType).equals(true);
        expect(myData.title).equals("结果正确");
        expect(myData.desc).equals("政治觉悟不错");
        expect(myData.getMiscItem("A")).equals("aaa");
        expect(myData.getMiscItem("C")).equals(false);
    });

    it("测试-验证重新解析的对象属性", function () {
        expect(myObject.resultType).equals(myData.resultType);
        expect(myObject.title).equals(myData.title);
        expect(myObject.getMiscItem("A")).equals(myData.getMiscItem("A"));
        expect(myObject.getMiscItem("C")).equals(myData.getMiscItem("C"));
    });
});


