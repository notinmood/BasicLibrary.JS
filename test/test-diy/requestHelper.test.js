const expect = require('chai').expect;
const requestHelper = require("../../utils/requesHelper");

describe("单元测试包名称", function () {
    it("单元测试方法名称", function () {
        let url = "http://localhost/diyipingce/index.php/open/getecho";
        let settings = {
            "successFunc": function (data) {
                alert(data);
            }
        };
        let submitData = {"name": "lisi"};
        let actual = requestHelper.request(url, settings, submitData);
        let expected = 0;
        expect(actual).equals(expected);
    });
});

