//字符串转日期格式，dateString要转为日期格式的字符串
function getDate(dateString = "") {
    var date = null;

    if (dateString) {
        date = new Date(dateString);
    } else {
        date = new Date();
    }

    return date;
}


/**
 * 根据指定字符串格式，格式日期显示
 * @param {*} formatter  默认为空的时候，格式为YYYY-MM-DD HH:mm:SS
 * 表示日期组成元素的时候
 * Y或y :年
 * M :月
 * D或d :日
 * H或h :小时
 * I或i或m :分钟
 * S或s :秒
 * @param {*} date 
 */
function format(date = null, formatter = "") {
    if (formatter) {} else {
        formatter = "YYYY-MM-DD HH:mm:SS";
    }

    if (date) {} else {
        date = new Date();
    }
    let ret;
    const opt = {
        "Y+": date.getFullYear().toString(), // 年
        "y+": date.getFullYear().toString(), // 年
        "M+": (date.getMonth() + 1).toString(), // 月
        "D+": date.getDate().toString(), // 日
        "d+": date.getDate().toString(), // 日
        "H+": date.getHours().toString(), // 时
        "h+": date.getHours().toString(), // 时
        "m+": date.getMinutes().toString(), // 分
        "I+": date.getMinutes().toString(), // 分
        "i+": date.getMinutes().toString(), // 分
        "S+": date.getSeconds().toString(), // 秒
        "s+": date.getSeconds().toString() // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (var k in opt) {
        ret = new RegExp("(" + k + ")").exec(formatter);
        if (ret) {
            formatter = formatter.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
        };
    };
    return formatter;
}

function isSameDay(timeStampA, timeStampB) {
    let dateA = new Date(timeStampA);
    let dateB = new Date(timeStampB);
    return (dateA.setHours(0, 0, 0, 0) == dateB.setHours(0, 0, 0, 0));
}

/**
 * 计算出 现在距离1970年1月1日的总天数，因为1970年1月1 是周4   
 * 所以（总天数+4）/7 取整 就是周数  如果相同就是同一周反之就不是。
 * @param {*} timeStampA 
 * @param {*} timeStampB 
 */
function isSameWeek(timeStampA, timeStampB) {
    let A = new Date(timeStampA).setHours(0, 0, 0, 0);
    let B = new Date(timeStampB).setHours(0, 0, 0, 0);
    var oneDayTime = 1000 * 60 * 60 * 24;
    var old_count = parseInt(A / oneDayTime);
    var now_other = parseInt(B / oneDayTime);
    if (parseInt((old_count + 4) / 7) == parseInt((now_other + 4) / 7)) {
        return true;
    } else {
        return false;
    }
}

module.exports = {
    getDate,
    format,
    isSameDay,
    isSameWeek,
};