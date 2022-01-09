/**
 * 使用注入器的时候,只需要导入不需要将其赋值为本地变量(因为不需要引用这个变量了).
 */
require("../utils/objectInjector");
const expect = require("chai").expect;
const {Student} = require("./res/Student");

const myData = new Student();
const moo = {
    m0: 'mike',
    m1: {},
    m2: {
        n1: {
            o: 'hello',
            p: function (s) {
                return 1 + s;
            }
        }
    },
};

describe("对象注入-测试", function () {
    it("成员存在性", function () {
        expect(myData.hasMember("name")).equals(true);
    });

    it("成员存在性", function () {
        expect(myData.hasMember("city")).equals(false);
    });

    it("成员存在性", function () {
        expect(moo.hasMember("m2.n1.o")).equals(true);
    });

    it("成员存在性", function () {
        expect(moo.hasMember("city")).equals(false);
    });


    it("获取成员1", function () {
        expect(moo.getMember("m0")).equals("mike");
    });

    it("获取成员2", function () {
        expect(moo.getMember("n6")).not.equals("mike");
    });

    it("获取成员3", function () {
        expect(moo.getMember("w6", "cells")).equals("cells");
    });

    it("获取成员4", function () {
        expect(moo.getMember("m2.n1.o")).equals("hello");
    });

    it("获取成员5", function () {
        const myFunc = moo.getMember("m2.n1.p");
        expect(myFunc(3)).equals(4);
    });
});