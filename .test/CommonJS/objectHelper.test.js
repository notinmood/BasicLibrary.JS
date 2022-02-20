const expect = require('chai').expect;
const oh = require("../../data/objectHelper");
const st = require("../_res/Student");
const {getLength} = require("../../utils/util");

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

    it('成员数量', function () {
        let actualData = oh.getMemberCount(student);
        let expectData = 4;
        expect(actualData).equals(expectData);
    });
});

describe("其他复杂方法的测试", function () {
    it("测试object深度赋值assignDeeply", function () {
        let obj1 = {a: {b: 1}};
        let obj2 = oh.assignDeeply({}, obj1)
        let obj3 = Object.assign({}, obj1);

        obj1.a.b = 2;
        // obj2.a.b // 1
        // obj3.a.b // 2

        expect(2).equals(obj1.a.b);
        expect(1).equals(obj2.a.b);
        expect(2).equals(obj3.a.b);
    });

    it("测试array深度赋值assignDeeply", function () {
        let inner = [];
        inner["b"] = 1;

        let obj1 = [];
        obj1["a"] = inner;

        let obj2 = oh.assignDeeply([], obj1)
        let obj3 = Object.assign([], obj1);

        obj1.a.b = 2;
        // obj2.a.b // 1
        // obj3.a.b // 2

        expect(2).equals(obj1.a.b);
        expect(1).equals(obj2.a.b);
        expect(2).equals(obj3.a.b);
    });

    it('测试对象的所有属性赋值', function () {
        let objA = {"X": "xx"};
        let objB = {"A": "aa", "B": "bb", "C": 29};

        objA = oh.assignDeeply(objA, objB);
        // console.log(objA);

        let actualData = oh.getMemberCount(objA);
        let expectData = 4;
        expect(actualData).equals(expectData);
    });
});