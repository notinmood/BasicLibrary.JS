const expect = require('chai').expect;
const oh = require("../utils/objectHelper");
const ot = require("../utils/objectTypes");
const st = require("./res/Student");

describe('数据类型测试', function () {

    it("Number-n", function () {
        expect(oh.getType(123.45)).equals(ot.ObjectTypes.Number);
    });

    it("Number-0", function () {
        expect(oh.getType(0)).equals(ot.ObjectTypes.Number);
    });

    it("String", function () {
        expect(oh.getType("123.45")).equals(ot.ObjectTypes.String);
    });

    it("Null", function () {
        const myNull = null;
        expect(oh.getType(myNull)).equals(ot.ObjectTypes.Null);
    });

    it("Boolean-true", function () {
        expect(oh.getType(true)).equals(ot.ObjectTypes.Boolean);
    });

    it("Boolean-false", function () {
        expect(oh.getType(false)).equals(ot.ObjectTypes.Boolean);
    });

    it("Function", function () {
        const myData= function (){

        };
        expect(oh.getType(myData)).equals(ot.ObjectTypes.Function);
    });

    it("Array", function () {
        const myArray = [];
        expect(oh.getType(myArray)).equals(ot.ObjectTypes.Array);
    });

    it("DateTime", function () {
        const myDate = new Date();
        expect(oh.getType(myDate)).equals(ot.ObjectTypes.DateTime);
    });

    it("Undefined-1", function () {
        const nothing = undefined;
        expect(oh.getType(nothing)).equals(ot.ObjectTypes.Undefined);
    });

    it("Undefined-2", function () {
        let nothing; //未赋值的变量
        expect(oh.getType(nothing)).equals(ot.ObjectTypes.Undefined);
    });

    it("Object-simple", function () {
        const myObject = {};
        expect(oh.getType(myObject)).equals(ot.ObjectTypes.Object);
    });

    it("Object-standard", function () {
        const myObject = new st.Student();
        expect(oh.getType(myObject)).equals(ot.ObjectTypes.Object);
    });

});

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