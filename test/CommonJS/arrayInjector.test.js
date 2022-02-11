const expect = require('chai').expect;
const ah = require("../../utils/arrayHelper");

require("../../utils/arrayInjector");
require("../../utils/typeHelper");
require("../../utils/util");

let arrayIndex = [2, 4, 6, 8, 10];

let arrayAssociation = [];
arrayAssociation['a'] = "A";
arrayAssociation['b'] = "B";
arrayAssociation['c'] = "C";

let arrayHybrid = [1, 2, 8];
arrayHybrid["aa"] = "AA";

describe("单元测试包-基本测试", function () {
    it("测试-hasKey-索引数组", function () {
        expect(arrayIndex.hasKey(2)).equals(true);
        expect(arrayIndex.hasKey(5)).equals(false);
    });

    it("测试-hasKey-关联数组", function () {
        expect(arrayAssociation.hasKey('a')).equals(true);
        expect(arrayAssociation.hasKey('A')).equals(false);
    });

    it("测试-hasMember-索引数组", function () {
        expect(arrayIndex.hasMember(2)).equals(true);
        expect(arrayIndex.hasMember(3)).equals(false);
    });

    it("测试-hasMember-关联数组", function () {
        expect(arrayAssociation.hasMember('A')).equals(true);
        expect(arrayAssociation.hasMember('D')).equals(false);
    });

    it("测试-getCount-索引数组", function () {
        expect(arrayIndex.getCount()).equals(5);
    });

    it("测试-getCount-关联数组", function () {
        expect(arrayAssociation.getCount()).equals(3);
    });

    it("测试-isIndexArray-索引数组", function () {
        expect(arrayIndex.isIndexArray()).equals(true);
    });

    it("测试-isIndexArray-关联数组", function () {
        expect(arrayAssociation.isIndexArray()).equals(false);
    });

    it("测试-isIndexArray-混合数组", function () {
        expect(arrayHybrid.isIndexArray()).equals(false);
    });

    it("测试-isAssociationArray-索引数组", function () {
        expect(arrayIndex.isAssociationArray()).equals(false);
    });

    it("测试-isAssociationArray-关联数组", function () {
        expect(arrayAssociation.isAssociationArray()).equals(true);
    });

    it("测试-isAssociationArray-混合数组", function () {
        expect(arrayHybrid.isAssociationArray()).equals(false);
    });

    it("测试-isHybridArray-索引数组", function () {
        expect(arrayIndex.isHybridArray()).equals(false);
    });

    it("测试-isHybridArray-关联数组", function () {
        expect(arrayAssociation.isHybridArray()).equals(false);
    });

    it("测试-isHybridArray-混合数组", function () {
        expect(arrayHybrid.isHybridArray()).equals(true);
    });

    it("测试-getArrayType-索引数组", function () {
        expect(arrayIndex.getArrayType()).equals(ah.ArrayTypes.index);
    });

    it("测试-getArrayType-关联数组", function () {
        expect(arrayAssociation.getArrayType()).equals(ah.ArrayTypes.association);
    });

    it("测试-getArrayType-混合数组", function () {
        expect(arrayHybrid.getArrayType()).equals(ah.ArrayTypes.hybrid);
    });

    it('单元测试方法 isEqual', function () {
        let arrayData1 = [1, 2, 3, 4];
        let arrayData2 = [1, 2, 3, 4];
        let expectData = true;
        let actualData = arrayData1.isEqual(arrayData2);
        expect(actualData).equals(expectData);

        arrayData1 = [1, 2, 3, 4];
        arrayData2 = [1, 2, 3, 5];
        expectData = false;
        actualData = arrayData1.isEqual(arrayData2);
        expect(actualData).equals(expectData);
    });
});

describe("单元测试包-头尾操作测试", function () {
    it("单元测试方法-addHead", function () {
        let myArray = [1, 3, 5];
        let actualData = myArray.addHead(0, 2);
        let expectData = 5;
        expect(actualData).equals(expectData);

        actualData = myArray;
        expectData = [0, 2, 1, 3, 5];
        expect(actualData.toString()).equals(expectData.toString());
    });

    it('单元测试方法-removeHead', function () {
        let myArray = [4, 3, 5];
        let expectData = 4;
        let actualData = myArray.removeHead();
        expect(actualData).equals(expectData);
    });

    it("单元测试方法-addTail", function () {
        let myArray = [1, 3, 5];
        let actualData = myArray.addTail(0, 2);
        let expectData = 5;
        expect(actualData).equals(expectData);

        actualData = myArray;
        expectData = [1, 3, 5, 0, 2];
        expect(actualData.toString()).equals(expectData.toString());
    });

    it('单元测试方法-removeTail', function () {
        let myArray = [4, 3, 5];
        let expectData = 5;
        let actualData = myArray.removeTail();
        expect(actualData).equals(expectData);
    });
});

describe("单元测试包-数组合并测试", function () {
    it("测试-concat-索引数组", function () {
        const arrayA = [1, 3, 5];
        const arrayB = [3, 6, 9];
        const arrayC = [7, 10];

        let actualValue = arrayA.concat(arrayB, arrayC);
        actualValue = JSON.stringify(actualValue);

        let expectValue = [1, 3, 5, 3, 6, 9, 7, 10,];
        expectValue = JSON.stringify(expectValue);
        expect(actualValue).equals(expectValue);
    });

    it("测试-concat-关联数组", function () {
        let arrayA = [];
        arrayA['a'] = "A";
        arrayA['b'] = "B";
        arrayA['c'] = "C";
        //[1, 3, 5];
        let arrayB = [3, 6, 9];


        let actualValue = arrayA.concat(arrayB);
        // actualValue = JSON.stringify(actualValue);

        expect(actualValue["a"]).equals("A");
        expect(actualValue.hasMember(3)).equals(true);
        expect(actualValue.hasMember("D")).equals(false);
    });

    it("测试-merge-索引数组", function () {
        const arrayA = [1, 3, 5];
        const arrayB = [3, 6, 9];
        const arrayC = [7, 10];

        let actualValue = arrayA.merge(arrayB, arrayC);
        actualValue = JSON.stringify(actualValue);

        let expectValue = [1, 3, 5, 3, 6, 9, 7, 10,];
        expectValue = JSON.stringify(expectValue);
        expect(actualValue).equals(expectValue);
    });

    it("测试-merge-关联数组", function () {
        let arrayA = [];
        arrayA['a'] = "A";
        arrayA['b'] = "B";
        arrayA['c'] = "C";
        //[1, 3, 5];
        let arrayB = [3, 6, 9];


        let actualValue = arrayA.merge(arrayB);
        // actualValue = JSON.stringify(actualValue);

        expect(actualValue["a"]).equals("A");
        expect(actualValue.hasMember(3)).equals(true);
        expect(actualValue.hasMember("D")).equals(false);
    });


    it("测试-mergeElementProperty-索引数组", function () {
        let expectValue = [
            {
                "a": "a1",
                "b": "b1",
                "m": "m1",
                "n": "n1",
            },
            {
                "a": "a2",
                "b": "b2",
                "m": "m2",
                "n": "n2",
            },
            {
                "a": "a3",
                "b": "b3",
                "m": "m3",
                "n": "n3",
            },
            {
                "a": "a4",
                "b": "b4",
                "m": "m4",
                "n": "n4",
            },
        ];
        expectValue = JSON.stringify(expectValue);

        let arrayA = [{'a': 'a1', 'b': 'b1'}, {'a': 'a2', 'b': 'b2'}, {'a': 'a3', 'b': 'b3'}, {'a': 'a4', 'b': 'b4'}];
        let arrayB = [{'m': 'm1', 'n': 'n1'}, {'m': 'm2', 'n': 'n2'}, {'m': 'm3', 'n': 'n3'}, {
            'm': 'm4',
            'n': 'n4'
        }, {'m': 'm5', 'n': 'n5'}];
        let actualValue = arrayA.mergeElementProperty(arrayB);
        actualValue = JSON.stringify(actualValue);

        expect(actualValue).equals(expectValue);
    });

    it("测试-mergeElementProperty-索引数组", function () {
        let expectValue = [
            {
                "a": "a1",
                "b": "b1",
                "x": "x1",
                "y": "y1",
            },
            {
                "a": "a2",
                "b": "b2",
                "x": "x2",
                "y": "y2",
            },
            {
                "a": "a3",
                "b": "b3",
                "x": "x3",
                "y": "y3",
            },
            {
                "a": "a4",
                "b": "b4",
                "x": "x1",
                "y": "y1",
            },
        ];
        expectValue = JSON.stringify(expectValue);

        let arrayA = [{'a': 'a1', 'b': 'b1'}, {'a': 'a2', 'b': 'b2'}, {'a': 'a3', 'b': 'b3'}, {'a': 'a4', 'b': 'b4'}];
        let arrayC = [{'x': 'x1', 'y': 'y1'}, {'x': 'x2', 'y': 'y2'}, {'x': 'x3', 'y': 'y3'}];
        let actualValue = arrayA.mergeElementProperty(arrayC);
        actualValue = JSON.stringify(actualValue);

        expect(actualValue).equals(expectValue);
    });

    it("测试-mergeElementProperty-索引数组", function () {
        let expectValue = [
            {
                "a": "a1",
                "b": "b1",
                "m": "m1",
                "n": "n1",
                "x": "x1",
                "y": "y1",
            },
            {
                "a": "a2",
                "b": "b2",
                "m": "m2",
                "n": "n2",
                "x": "x2",
                "y": "y2",
            },
            {
                "a": "a3",
                "b": "b3",
                "m": "m3",
                "n": "n3",
                "x": "x3",
                "y": "y3",
            },
            {
                "a": "a4",
                "b": "b4",
                "m": "m4",
                "n": "n4",
                "x": "x1",
                "y": "y1",
            },
        ];
        expectValue = JSON.stringify(expectValue);

        let arrayA = [{'a': 'a1', 'b': 'b1'}, {'a': 'a2', 'b': 'b2'}, {'a': 'a3', 'b': 'b3'}, {'a': 'a4', 'b': 'b4'}];
        let arrayB = [{'m': 'm1', 'n': 'n1'}, {'m': 'm2', 'n': 'n2'}, {'m': 'm3', 'n': 'n3'}, {
            'm': 'm4',
            'n': 'n4'
        }, {'m': 'm5', 'n': 'n5'}];
        let arrayC = [{'x': 'x1', 'y': 'y1'}, {'x': 'x2', 'y': 'y2'}, {'x': 'x3', 'y': 'y3'}];
        let actualValue = arrayA.mergeElementProperty(arrayB, arrayC);
        actualValue = JSON.stringify(actualValue);

        expect(actualValue).equals(expectValue);
    });
});
