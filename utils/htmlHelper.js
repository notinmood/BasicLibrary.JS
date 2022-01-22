/*1. 用正则表达式实现html转码*/
htmlEncode = function (originalHTML) {
    let result = "";
    if (originalHTML.length == 0) return "";
    result = originalHTML.replace(/&/g, "&amp;");
    result = result.replace(/</g, "&lt;");
    result = result.replace(/>/g, "&gt;");
    result = result.replace(/ /g, "&nbsp;");
    result = result.replace(/\'/g, "&#39;");
    result = result.replace(/\"/g, "&quot;");
    return result;
}

/*2. 用正则表达式实现html解码*/
htmlDecode = function (encodedHTML) {
    if (encodedHTML.length == 0) return "";

    let result = "";
    result = encodedHTML.replace(/&amp;/g, "&");
    result = result.replace(/&lt;/g, "<");
    result = result.replace(/&gt;/g, ">");
    result = result.replace(/&nbsp;/g, " ");
    result = result.replace(/&#39;/g, "\'");
    result = result.replace(/&quot;/g, "\"");
    return result;
}

module.exports = {
    htmlEncode,
    htmlDecode,
};
