/*
 * @Author       : Shandong Xiedali
 * @Mail         : 9727005@qq.com
 * @Date         : 2021-10-09 14:25:47
 * @LastEditors  : Shandong Xiedali
 * @LastEditTime : 2022-04-17 21:38:29
 * @FilePath     : .eslintrc.js
 * @Description  :
 * Copyright (c) 2022 by Hiland & RainyTop, All Rights Reserved.
 */
module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es2021: true,
    },
    extends: [
        'airbnb-base',
    ],
    parserOptions: {
        ecmaVersion: 12,
    },
    rules: {
        indent: ['off', 2],
    },
};
