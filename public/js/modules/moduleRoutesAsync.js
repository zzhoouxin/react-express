/**
 * Created by zhouxin on 2018/1/12
 * 按需加载模块
 */

var routes = {
    "index":function () {
        return require.ensure([], function(require) {
            var component = require("./index/index");
            return component;
        });
    },
    // "/main":function () {
    //     return require.ensure([], function(require) {
    //         var component = require("./main/index");
    //         return component;
    //     });
    // },
    // "debug":function () {
    //     return require.ensure([], function(require) {
    //         var component = require("./debug");
    //         return component;
    //     });
    // }
};

//本模块的路由
export default routes