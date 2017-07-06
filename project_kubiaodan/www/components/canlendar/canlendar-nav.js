define(function(require){
	var app = require("../../app");

	app.directive("canlendarNav",[function(){
		return {
			restrict : "E",
			templateUrl : "components/canlendar/canlendar-nav.html",
			scope : {
				"y" : "=y",
				"m" : "=m",
				"type" : "=type",
				"ystart" : "=ystart",
				"yend" : "=yend",
				"min" : "@min",
				"max" : "@max"
			},
			link : function(scope , elements){
				var min = Date.parse(new Date(scope.min));
				var max = Date.parse(new Date(scope.max));

				//更改类型
				scope.changetype = function(){
					if(scope.type == "y"){
						scope.type = "ys";
					}else if(scope.type == "ys"){
						scope.type = "m";
					}else if(scope.type == "m"){
						scope.type = "y";
					}
				}

								//下按钮
				scope.goNext = function(){
					console.log("gon")
					//根据当前是什么type来决定做什么
					if(scope.type == "m"){
						//先实验下一个月是否合法
						//下一个月的开头日子
						var A = Date.parse(new Date(scope.y , scope.m - 1 + 1 , 1));
						var B = Date.parse(new Date(scope.y , scope.m - 1 + 2 , 0));
						if(A < min && B < min || A > max && B > max){
							return;
						}

						scope.m++;
						if(scope.m > 12){
							scope.m = 1;
							scope.y ++;
						}
					}else if(scope.type == "y"){
						//先实验下一个年是否合法
						//下一个年的开头日子
						var A = Date.parse(new Date(scope.y + 1, 0 , 1));
						var B = Date.parse(new Date(scope.y + 1, 11, 31));
						if(A < min && B < min || A > max && B > max){
							return;
						}

						scope.y++;
					}else if(scope.type == "ys"){
						//先验证加了30年之后的A、B值
						//A表示加了30年的1月1日
						//b表示加了30年再加29年的12月31日
						var A = Date.parse(new Date(scope.ystart + 30 , 0 , 1));
						var B = Date.parse(new Date(scope.ystart + 30 + 29, 12 , 31));
						if(A < min && B < min || A > max && B > max){
							return;
						}

						scope.ystart += 30;
					}
				}

				//上一个月
				scope.goPrev = function(){
					if(scope.type == "m"){
						//先实验上一个月是否合法
						//上一个月的开头日子
						var A = Date.parse(new Date(scope.y , scope.m - 1 - 1 , 1));
						var B = Date.parse(new Date(scope.y , scope.m - 1 , 0));
						if(A < min && B < min || A > max && B > max){
							return;
						}

						scope.m--;
						if(scope.m < 1){
							scope.m = 12;
							scope.y --;
						}
					}else if(scope.type == "y"){
						//先实验上一个年是否合法
						//上一个年的开头日子
						var A = Date.parse(new Date(scope.y - 1, 0 , 1));
						var B = Date.parse(new Date(scope.y - 1, 11, 31));
						if(A < min && B < min || A > max && B > max){
							return;
						}

						scope.y--;
					}else if(scope.type == "ys"){
						//先验证减了30年之后的A、B值
						//A表示减了30年的1月1日
						//b表示减了30年再加29年的12月31日
						var A = Date.parse(new Date(scope.ystart - 30 , 0 , 1));
						var B = Date.parse(new Date(scope.ystart - 30 + 29, 12 , 31));
						if(A < min && B < min || A > max && B > max){
							return;
						}

						scope.ystart -= 30;
					}
				}
			}
		}
	}]);
});