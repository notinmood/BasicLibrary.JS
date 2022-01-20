/*1. 用正则表达式实现html转码*/
htmlEncode = function (originalHTML) {
    let s = "";
    if (originalHTML.length == 0) return "";
    s = originalHTML.replace(/&/g, "&amp;");
    s = s.replace(/</g, "&lt;");
    s = s.replace(/>/g, "&gt;");
    s = s.replace(/ /g, "&nbsp;");
    s = s.replace(/\'/g, "&#39;");
    s = s.replace(/\"/g, "&quot;");
    return s;
}

/*2. 用正则表达式实现html解码*/
htmlDecode = function (encodedHTML) {
    if (encodedHTML.length == 0) return "";

    let s = "";
    s = encodedHTML.replace(/&amp;/g, "&");
    s = s.replace(/&lt;/g, "<");
    s = s.replace(/&gt;/g, ">");
    s = s.replace(/&nbsp;/g, " ");
    s = s.replace(/&#39;/g, "\'");
    s = s.replace(/&quot;/g, "\"");
    return s;
}

module.exports = {
    htmlEncode,
    htmlDecode,
};
