import {expect} from "chai";
import {} from "../utils/stringInjector.mjs";

describe("测试组件名称", function () {
    it("测试单元名称", function () {
        let actual = "I love 中国！".left(8);
        let expected = "I love 中";
        expect(actual).equals(expected);
    });
});
