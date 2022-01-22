const expect = require('chai').expect;
const hh = require("../../utils/htmlHelper");

describe("HTML功能测试", function () {
    it("测试HTML编码", function () {
        expect(hh.htmlEncode("<br>ccccc<p>aaaaa</p>")).equals('&lt;br&gt;ccccc&lt;p&gt;aaaaa&lt;/p&gt;');
    });

    it('测试HTML解码', function () {
        expect(hh.htmlDecode('&lt;br&gt;ccccc&lt;p&gt;aaaaa&lt;/p&gt;')).equals("<br>ccccc<p>aaaaa</p>");
    });

    // it('测试HTML解码', function () {
    //     expect(hh.htmlDecode('&lt;br&gt;ccccc&lt;p&gt;aaaaa&lt;/p&gt;', true)).equals("<br>ccccc<p>aaaaa</p>");
    // });
});