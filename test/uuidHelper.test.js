const expect = require('chai').expect;
const biz = require("../utils/uuidHelper");

describe("UUID-测试", function () {
    it("测试-新建uuid36", function () {
        const uuid = biz.create();
        console.log(uuid)
        expect(uuid).length(36);
    });

    it("测试-新建uuid12", function () {
        const uuid = biz.create(12);
        console.log(uuid)
        expect(uuid).length(12);
    });
});