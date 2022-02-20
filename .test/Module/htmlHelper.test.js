import {helper as hh} from "../../data/htmlHelper.mjs"
import {expect} from "chai";


describe("测试ESM", function () {
    it("测试具体方法", function () {
        expect(hh.htmlEncode("<br>ccccc<p>aaaaa</p>")).equals('&lt;br&gt;ccccc&lt;p&gt;aaaaa&lt;/p&gt;');
    });
});