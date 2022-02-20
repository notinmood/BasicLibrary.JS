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

        let actualData = oh.getMemberCount(objA);
        let expectData = 4;
        expect(actualData).equals(expectData);
    });
});


describe("单元测试包名称", function () {
    it("单元测试方法 对象值相等1", function () {
        let obj1 = {
            a: 1,
            b: {
                c: 2
            },
        };
        let obj2 = {
            b: {
                c: 2
            },
            a: 1,
        };

        let expectData = true;
        let actualData = oh.isValueEqual(obj1, obj2);
        expect(actualData).equals(expectData);
    });

    it("单元测试方法 对象值相等2", function () {
        let obj1 = {
            a: 1,
            b: {
                c: 2
            }
        };
        let obj2 = {
            b: {
                c: 3
            },
            a: 1
        };

        let expectData = false;
        let actualData = oh.isValueEqual(obj1, obj2);
        expect(actualData).equals(expectData);
    });
});