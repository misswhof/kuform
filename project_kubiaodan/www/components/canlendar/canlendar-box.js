define(function(require){
	var app = require("../../app");

	require("./canlendar-table-m.js");
	require("./canlendar-table-y.js");
	require("./canlendar-table-ys.js");
	require("./canlendar-nav.js");

	app.directive("canlendarBox",["$compile",function($compile){
		return {
			restrict : "E",
			templateUrl : "components/canlendar/canlendar-box.html",
			scope : {
				"y" : "=y",
				"m" : "=m",
				"d" : "=d",
				"ystart" : "=ystart",
				"type" : "=type",
				"min" : "@min",
				"max" : "@max"
			},
			link : function(scope,elements){
				var $dom = $(elements[0]).find(".canlendar-box");
				var min = Date.parse(new Date(scope.min));
				var max = Date.parse(new Date(scope.max));

				//下按钮
				scope.goNext = function(){
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

				//鼠标滚轮
				$dom.bind("mousewheel",function(event,delta){
					event.preventDefault();

					if(delta < 0){
						scope.goNext();
					}else{
						scope.goPrev();
					}
					
					//强制视图更新
					scope.$apply();
				});
			}
		}
	}]);
});