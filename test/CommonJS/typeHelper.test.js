const expect = require('chai').expect;
const oh = require("../../utils/typeHelper");
const st = require("../res/Student");


describe('数据类型测试', function () {

    it("Number-n", function () {
        expect(oh.getType(123.45)).equals(oh.ObjectTypes.number);
    });

    it("Number-0", function () {
        expect(oh.getType(0)).equals(oh.ObjectTypes.number);
    });

    it("String", function () {
        expect(oh.getType("123.45")).equals(oh.ObjectTypes.string);
    });

    it("Null", function () {
        const myNull = null;
        expect(oh.getType(myNull)).equals(oh.ObjectTypes.null);
    });

    it("Boolean-true", function () {
        expect(oh.getType(true)).equals(oh.ObjectTypes.boolean);
    });

    it("Boolean-false", function () {
        expect(oh.getType(false)).equals(oh.ObjectTypes.boolean);
    });

    it("Function", function () {
        const myData= function (){

        };
        expect(oh.getType(myData)).equals(oh.ObjectTypes.function);
    });

    it("Array", function () {
        const myArray = [];
        expect(oh.getType(myArray)).equals(oh.ObjectTypes.array);
    });

    it("Date", function () {
        const myDate = new Date();
        expect(oh.getType(myDate)).equals(oh.ObjectTypes.date);
    });

    it("Undefined-1", function () {
        const nothing = undefined;
        expect(oh.getType(nothing)).equals(oh.ObjectTypes.undefined);
    });

    it("Undefined-2", function () {
        let nothing; //未赋值的变量
        expect(oh.getType(nothing)).equals(oh.ObjectTypes.undefined);
    });

    it("Object-simple", function () {
        const myObject = {};
        expect(oh.getType(myObject)).equals(oh.ObjectTypes.object);
    });

    it("Object-standard", function () {
        const myObject = new st.Student();
        expect(oh.getType(myObject)).equals(oh.ObjectTypes.object);
    });

    it('date 类型因为是object的子类,所以可以自由添加属性', function () {
        let myDate= new Date();
        myDate["mm"]= "foo";

        expect(myDate["mm"]).equals("foo");
    });
});
