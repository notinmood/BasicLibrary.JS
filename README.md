说明
--
## 文档组织说明
1. 本项目使用 WebStorm 打开进行编辑
2. utils 内的文件是在各种类型的应用中均可以使用的功能
3. jQuery-Plugin 是 jQuery 的插件库，仅 Web 类型的项目可用
4. miniApp 是微信等职能小程序可以使用的功能
5. DemoPages 是手工测试页面的目录;test 是单元测试测试框架自动测试的目录。

## 发布说明
1. 打开 package.json 找到 version 进行修改
2. 提交并推送代码到 github
3. 打开终端窗口，执行 npm publish

## 使用说明
本类库兼容 commonjs 和 module(ES)
1. 目标项目如果采用 CommonJS 方式组织代码，调用的时候在 package.json 内请配置 `"type": "commonjs"`,引用类库的方式如下
```shell
const oh = require("../utils/objectHelper");
```
如果是 Inject 类型的文件，引入方式可以简化为
```shell
require("../utils/objectInjector");
```
2. 目标项目如果采用 module 方式组织代码，调用的时候在 package.json 内请配置 `"type": "module"`,引用类库的方式如下
```shell
import {helper as hh} from "../utils/htmlHelper.mjs"
```
如果是 Inject 类型的文件，引入方式可以简化为
```shell
import {} from "../utils/stringInjector.mjs";
```
>通过 import 导入的文件必须含有文件名扩展符 ".mjs"


3. 在HTML页面中调用,需要使用 webpack 配合,使用的大概流程如下：
   1. 在 HTML 中新建立一个 js 文件(假定名称为 main.js)，类似如下
    ```shell
    const ah = require("basiclibrary.javascript/utils/arrayHelper");
    const nh = require("basiclibrary.javascript/utils/numberHelper");
    const jQuery = require("jquery");
    
    let all = {nh, ah};
    
    window._bl_ = all;
    window.$ = jQuery;
    ```
   2. 用webpack转换这个 main.js 为 bundle.js
   3. 然后再HTML页面引用这个 bundle.js
   4. 在HTML页面内可以通过 `_bl_` 继续使用包含的类型和方法 