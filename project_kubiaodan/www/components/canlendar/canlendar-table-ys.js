define(function(require){
	var app = require("../../app");

	app.directive("canlendarTableYs",[function(){
		return {
			restrict : "E",
			templateUrl : "components/canlendar/canlendar-table-ys.html",
			scope : {
				"ystart" : "=ystart" ,
				"y" : "=y",
				"type" : "=type",
				"min" : "@min",
				"max" : "@max"
			},
			link : function(scope){
				var ystart;
				var arr = [];

				
				scope.getClass = function(year){
					//本年度的A、B端点。
					//A表示这一年的1月1日0点0分1毫秒
					var A = Date.parse(new Date(year,0,1));
					//B表示这一年的12月31日23:59:999毫秒
					var B = Date.parse(new Date(year + 1,0,0));
					var min = Date.parse(new Date(scope.min));
					var max = Date.parse(new Date(scope.max));

					return {
						"cur": year == scope.y,
						"disabled" : A < min && B < min || A > max && B > max 
					}
					 
				}

				//数组
				scope.getArr = function(_ystart){
					//放置ng-repeat重复调用函数，视图变化，又调用了ng-repeat的死循环
					if(_ystart == ystart){
						return arr;
					}
					 
					ystart = scope.ystart;
					//清空
					arr = [];

					for(var i = 0 ; i < 3 ; i++){
						var _arr = [];
						for(var j = 0 ; j < 10 ; j++){
							_arr.push(ystart + i * 10 + j);
						}
						arr.push(_arr);
					}

					
					return arr;
				}

				//点击年份年之后
				scope.changey = function(year){
					//如果是不在min、max之中的，就不能点击
					if(scope.getClass(year).disabled){
						return;
					}
					//验证
					scope.y = year;
					scope.type = "y";
				}
			}
		}
	}]);
});