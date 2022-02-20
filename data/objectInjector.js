const oh = require("./objectHelper");


Object.prototype.getMember = function (memberName, defaultValue = null) {
    return oh.getMember(this, memberName, defaultValue);
}

Object.prototype.hasMember = function (memberName) {
    return oh.hasMember(this, memberName);
}


