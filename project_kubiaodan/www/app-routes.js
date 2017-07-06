//CMD的壳子
define(function (require) {
    //使用app模块
    var app = require('./app');
    //定义路由
    app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        //当访问没有列出的路由的时候，直接转到/home
        $urlRouterProvider.otherwise('/produce');

        $stateProvider
            .state('index', {
                url: '/',
                templateUrl: './index/index.html',
                controllerUrl : './index/IndexCtrl',
                controller : 'IndexCtrl as indexctrl'
            })
            .state('index.home', {
                url: 'home',    //奇淫技巧不加杠
                templateUrl: './home/home.html',
                controllerUrl : './home/HomeCtrl',
                controller : 'HomeCtrl as homectrl'
            })
            .state('index.produce', {
                url: 'produce',    //奇淫技巧不加杠
                templateUrl: './produce/produce.html',
                controllerUrl : './produce/ProduceCtrl',
                controller : 'ProduceCtrl as producectrl',
                dependencies: ['services/formService']
            })
            .state('index.music', {
                url: 'music',
                templateUrl: './music/music.html',
                controllerUrl : './music/MusicCtrl',
                controller : 'MusicCtrl as musicctrl',
                dependencies: ['services/mathService']
            })
    }]);
});