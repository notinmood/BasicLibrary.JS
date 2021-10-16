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


        // console.log(obj1);
        // console.log(obj2);
        // console.log(obj3);

        expect(2).equals(obj1.a.b);
        expect(1).equals(obj2.a.b);
        expect(2).equals(obj3.a.b);
    });
});