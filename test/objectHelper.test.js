const expect = require('chai').expect;
const oh = require("../utils/objectHelper");
const st = require("./res/Student");

describe("对象其他方法测试", function () {
    const student = new st.Student();

    it("成员存在性", function () {
        expect(oh.hasMember(student, "getName")).equals(true);
    });

    it("成员存在性", function () {
        expect(oh.hasMember(student, "setName")).equals(true);
    });

    it("成员存在性", function () {
        expect(oh.hasMember(student, "getClass")).equals(false);
    });

    it("成员存在性", function () {
        expect(oh.hasMember(student, "name")).equals(true);
    });

    it("成员存在性", function () {
        expect(oh.hasMember(student, "city")).equals(false);
    });
});