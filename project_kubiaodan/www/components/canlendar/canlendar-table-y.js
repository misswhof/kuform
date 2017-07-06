define(function(require){
	var app = require("../../app");

	app.directive("canlendarTableY",[function(){
		return {
			restrict : "E",
			templateUrl : "components/canlendar/canlendar-table-y.html",
			scope : {
				"m" : "=m",
				"y" : "@y",
				"min" : "@min",
				"max" : "@max",
				"type" : "=type"
			},
			link : function(scope){
				//最小值和最大值 
				var min = Date.parse(new Date(scope.min));
				var max = Date.parse(new Date(scope.max));
				
				scope.changem = function(month){
					scope.m = month;
					scope.type = "m";
				}

				//判断月份是否可以被选择
				scope.getClass = function(month){
					//本月第一个毫秒
					var A = Date.parse(new Date(scope.y,month - 1 , 1));
					//本月最后一个毫秒
					var B = Date.parse(new Date(scope.y,month - 1 + 1, 0));
					

					
					return {"disabled" : (A < min && B < min) || (A > max && B > max)}; 
				}
			}
		}
	}]);
});