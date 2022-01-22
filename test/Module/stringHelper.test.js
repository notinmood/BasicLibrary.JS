import {helper} from "../../utils/stringHelper.mjs";
import {expect} from "chai";

describe("测试组件名称", function () {
    it("测试单元名称", function () {
        let actual = helper.left("I love 中国！",8);
        let expected = "I love 中";
        expect(actual).equals(expected);
    });
});

