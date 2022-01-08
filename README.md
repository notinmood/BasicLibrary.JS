说明
*******
## 文档组织说明
1. 本项目使用WebStorm打开进行编辑
2. utils内的文件是在各种类型的应用中均可以使用的功能
3. jQuery-Plugin是jQuery的插件库，仅Web类型的项目可用
4. miniApp是微信等职能小程序可以使用的功能

5. Pages是手工测试页面的目录;test是单元测试目录。
6. 本项目采用CommonJS方式组织代码，调用的时候在package.json内请配置"type": "commonjs"

## 发布说明
1. 打开package.json找到version进行修改
2. 提交并推送代码到github
3. 打开终端窗口，执行 npm publish
