function isFunction(funcName) {
    if (typeof (funcName) == "function" && typeof (funcName.nodeType) != "number") {
        return true;
    } else {
        return false;
    }
}

