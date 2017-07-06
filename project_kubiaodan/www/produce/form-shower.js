define(function(require){
	var app = require("../app");

	require("./form-component.js");
	
	app.directive("formShower",["formService","$compile",function(formService,$compile){
		return {
			templateUrl : "./produce/form-shower.html",
			link : function(scope){
				//得到服务数据
				scope.getFormdata = function(){
					return formService.getFormdata();
				}

				//编辑按钮（铅笔按钮被按下）
				scope.edit = function(number){
					//命令服务做edit事件
					formService.edit(number);
				}

				//得到正在编辑的人的序号
				scope.onEdit = function(){
					return formService.getOnEdit();
				}
			}
		}
	}]);
});