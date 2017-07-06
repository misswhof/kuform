define(function(require){
	var app = require("../../app");

	require("./canlendar-box.js");

	app.directive("canlendar",[function(){
		return {
			restrict : "E",
			templateUrl : "components/canlendar/canlendar.html",
			scope : {
				"ngModel" : "=ngModel",
				"min" : "@min",
				"max" : "@max"
			},
			//scope、ele（数组）、attrs
			link : function(scope , elements){
				if(!scope.ngModel){
					var jintian = new Date();
					scope.ngModel = jintian.getFullYear() + "-" + (jintian.getMonth() + 1) + "-" + jintian.getDate();
				}
				var matcharr = scope.ngModel.match(/^(\d+)\-(\d+)\-(\d+)$/);
				 
				scope.y = Number(matcharr[1]);
				scope.m = Number(matcharr[2]);
				scope.d = Number(matcharr[3]);

				//监控
				scope.$watch("d",function(){	
					scope.isShowbox = false;
					scope.ngModel = scope.y + "-" + scope.m + "-" + scope.d;
				});
				scope.$watch("y",function(){
					scope.ngModel = scope.y + "-" + scope.m + "-" + scope.d;
				});
				scope.$watch("m",function(){
					scope.ngModel = scope.y + "-" + scope.m + "-" + scope.d;
				});

				scope.type = "m";
				scope.ystart = scope.y - scope.y % 10 - 10;

				scope.isShowbox = false;
				scope.changeshowbox = function(){
					scope.isShowbox = !scope.isShowbox;
				}


			 
				
			}
		}
	}]);
});