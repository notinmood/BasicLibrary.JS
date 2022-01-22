说明
*******
## 文档组织说明
1. 本项目使用WebStorm打开进行编辑
2. utils内的文件是在各种类型的应用中均可以使用的功能
3. jQuery-Plugin是jQuery的插件库，仅Web类型的项目可用
4. miniApp是微信等职能小程序可以使用的功能
5. Pages是手工测试页面的目录;test是单元测试目录。

## 发布说明
1. 打开package.json找到version进行修改
2. 提交并推送代码到github
3. 打开终端窗口，执行 npm publish

## 使用说明
本类库兼容 commonjs和 module(ES)
1. 目标项目如果采用 CommonJS 方式组织代码，调用的时候在 package.json 内请配置 "type": "commonjs",引用类库的方式如下
```shell
const oh = require("../utils/objectHelper");
```
如果是 Inject 类型的文件，引入方式可以简化为
```shell
require("../utils/objectInjector");
```
2. 目标项目如果采用 module 方式组织代码，调用的时候在 package.json 内请配置 "type": "module",引用类库的方式如下
```shell
import {helper as hh} from "../utils/htmlHelper.mjs"
```
如果是 Inject 类型的文件，引入方式可以简化为
```shell
import {} from "../utils/stringInjector.mjs";
```
>通过 import 导入的文件必须含有文件名扩展符 ".mjs"


3. 在HTML页面中调用,需要使用webpack配合
   1. 在HTML中新建立一个 js 文件(假定名称为main.js)，类似如下
    ```shell
    const ah = require("basiclibrary.javascript/utils/arrayHelper");
    const nh = require("basiclibrary.javascript/utils/numberHelper");
    const jQuery = require("jquery");
    
    let all = {nh, ah};
    
    window._bl_ = all;
    window.$ = jQuery;
    ```
   2. 用webpack转换这个main.js 为 bundle.js
   3. 然后再HTML页面引用这个 bundle.js
   4. 在HTML页面内可以通过 _bl_ 继续使用包含的类型和方法 