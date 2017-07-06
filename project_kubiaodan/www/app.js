//CMD的壳子，也就是说app对象将用CMD方式暴露，require的时候更简单。
define(function (require, exports, module) {
	//引用了angular
    var angular = require('angular');
    //用到了'angular-async-loader'
    var asyncLoader = require('angular-async-loader');
    //引用第三方路由模块
    require('angular-ui-router');

    //肯定认识，创建app模型，并且依赖ui.router，上午学习的。
    var app = angular.module('app', ['ui.router']);

    //initialze app module for angular-async-loader
    asyncLoader.configure(app);
    
    //暴露
    module.exports = app;
});