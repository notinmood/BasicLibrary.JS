const sh = require("./stringHelper");
/**
 * 获取带精度的浮点数
 * @param value
 * @param precision {number} 获取结果的精度(默认2位小数精度)
 * @returns {number|string}
 */
function getPreciseFloat(value, precision = 2) {
    const paddingZeros = sh.multi("0",precision);

    const temp = parseInt("1" + paddingZeros);
    value = Math.round(parseFloat(value) * temp) / temp;
    let xsd = value.toString().split(".");
    if (xsd.length == 1) {
        value = value.toString() + "." + paddingZeros;
        return value;
    } else if (xsd.length > 1) {
        /**
         * 目前小数点后面的位数
         * @type {number}
         */
        const tempPrecision= xsd[1].length;
        if (xsd[1].length < precision) {
            const stillPaddingZeros= sh.multi('0',precision-tempPrecision);
            value = value.toString() + stillPaddingZeros;
        }

        return value.toString();
    }
}

module.exports = {
    getPreciseFloat,
};