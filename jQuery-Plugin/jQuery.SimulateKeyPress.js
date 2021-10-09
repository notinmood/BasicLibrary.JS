/**
 * 通过代码模拟用户键盘输入字符
 * @param character 要模拟的字符，类型是单个字符组成的字符串或者number(字符对应的键盘码)
 * 具体键盘编码和键位对应关系参考 https://wenku.baidu.com/view/3f99a76148d7c1c709a14501.html
 * @example
 *  1、页面调用,绑定keypress,进行效果检测(非必须)
 jQuery(document).ready(function ($) {
        // 绑定事件处理程序
        $('body').keypress(function (e) {
            alert(String.fromCharCode(e.which));
            console.log(e);
        });
    });

 2、在合适的地方调用以下代码,来模拟按键
 $('body').simulateKeyPress(27); //通过键盘码(特殊键位只能使用键盘码，比如esc、tab等键)
 或者
 $('body').simulateKeyPress('c'); //通过键位名称(普通键位)
 */
jQuery.fn.simulateKeyPress = function (character) {
    let charName = '';

    if (typeof (character) == 'number') {
        character = String.fromCharCode(character);
    }

    charName = character.charCodeAt(0);

    // 内部调用jQuery.event.trigger
    // 参数有 (Event, data, elem). 最后一个参数是非常重要的的！
    jQuery(this).trigger({type: 'keypress', which: charName});
};
