const expect = require('chai').expect;
const th = require("../../data/typeHelper");
const st = require("../_res/Student");


describe('数据类型测试', function () {

    it("Number-n", function () {
        expect(th.getType(123.45)).equals(th.ObjectTypes.number);
    });

    it("Number-0", function () {
        expect(th.getType(0)).equals(th.ObjectTypes.number);
    });

    it("String", function () {
        expect(th.getType("123.45")).equals(th.ObjectTypes.string);
    });

    it("Null", function () {
        const myNull = null;
        expect(th.getType(myNull)).equals(th.ObjectTypes.null);
    });

    it("Boolean-true", function () {
        expect(th.getType(true)).equals(th.ObjectTypes.boolean);
    });

    it("Boolean-false", function () {
        expect(th.getType(false)).equals(th.ObjectTypes.boolean);
    });

    it("Function", function () {
        const myData = function () {

        };
        expect(th.getType(myData)).equals(th.ObjectTypes.function);
    });

    it("Array", function () {
        const myArray = [];
        expect(th.getType(myArray)).equals(th.ObjectTypes.array);
    });

    it("Date", function () {
        const myDate = new Date();
        expect(th.getType(myDate)).equals(th.ObjectTypes.date);
    });

    it("Undefined-1", function () {
        const nothing = undefined;
        expect(th.getType(nothing)).equals(th.ObjectTypes.undefined);
    });

    it("Undefined-2", function () {
        let nothing; //未赋值的变量
        // noinspection all
        expect(th.getType(nothing)).equals(th.ObjectTypes.undefined);
    });

    it("Object-simple", function () {
        const myObject = {};
        expect(th.getType(myObject)).equals(th.ObjectTypes.object);
    });

    it("Object-standard", function () {
        const myObject = new st.Student();
        expect(th.getType(myObject)).equals(th.ObjectTypes.object);
    });

    it('date 类型因为是object的子类,所以可以自由添加属性', function () {
        let myDate = new Date();
        myDate["mm"] = "foo";

        expect(myDate["mm"]).equals("foo");
    });
});

describe("单元测试包名称 类型模式判断", function () {
    it("单元测试方法名称 number", function () {
        let expectData = false;
        let actualData = th.isReferenceType(123);
        expect(actualData).equals(expectData);
    });

    it("单元测试方法名称 string", function () {
        let expectData = false;
        let actualData = th.isReferenceType("123");
        expect(actualData).equals(expectData);
    });

    it("单元测试方法名称 bool", function () {
        let expectData = false;
        let actualData = th.isReferenceType(true);
        expect(actualData).equals(expectData);
    });

    it("单元测试方法名称 undefined1", function () {
        let expectData = false;
        let actualData = th.isReferenceType(undefined);
        expect(actualData).equals(expectData);
    });

    it("单元测试方法名称 undefined2", function () {
        let expectData = true;
        let actualData = th.isValueType(undefined);
        expect(actualData).equals(expectData);
    });

    it("单元测试方法名称 function", function () {
        let expectData = true;
        let actualData = th.isReferenceType(function doSomething() {
        });
        expect(actualData).equals(expectData);
    });

    it("单元测试方法名称 Date", function () {
        let expectData = true;
        let actualData = th.isReferenceType(new Date());
        expect(actualData).equals(expectData);
    });

    it("单元测试方法名称 object", function () {
        let expectData = true;
        let actualData = th.isReferenceType({});
        expect(actualData).equals(expectData);
    });

    it("单元测试方法名称 array", function () {
        let expectData = true;
        let actualData = th.isReferenceType([]);
        expect(actualData).equals(expectData);
    });

    it("单元测试方法名称 null", function () {
        let expectData = true;
        let actualData = th.isReferenceType(null);
        expect(actualData).equals(expectData);
    });

    it("单元测试方法名称 new", function () {
        let expectData = true;
        let actualData = th.isReferenceType(new Number(123));
        expect(actualData).equals(expectData);
    });
});
