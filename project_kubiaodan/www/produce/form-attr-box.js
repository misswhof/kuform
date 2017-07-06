define(function(require){
	var app = require("../app");

	app.directive("formAttrBox",["formService",function(formService){
		return {
			templateUrl : "./produce/form-attr-box.html",
			link : function(scope,ele){
				//拿到本题的数据
				scope.theq = function(){
					//下面的语句很值钱
					return formService.getFormdata().questions[formService.getOnEdit()]
				}

				scope.addOption = function(event){
					//偶尔也能直接控制DOM
					var content = event.target.value;
					if(!trim(content)) return;
					//操作数据
					scope.theq().options.push(content);
					//控制DOM清空
					event.target.value = "";
				}

				//检查是否是空，如果是空，删除这项
				scope.checkOption = function(event,index){
					var content = event.target.value;

					if(!trim(content)){
						scope.theq().options.splice(index,1);
					}
				}

				scope.remove = function(index){
					scope.theq().options.splice(index,1);
				}

				function trim(x) {
   					 return x.replace(/^\s+|\s+$/gm,'');
				}

				//写DOM
				var startnumber;
				$(ele[0]).find(".optionsbox").sortable({
					handle: ".handle",
					start : function(event, ui){
						startnumber = $(ui.item).index();
					},
					stop : function(event, ui){
						endnumber = $(ui.item).index();
						
						formService.move(startnumber,endnumber);

						scope.$apply();
					}
				});
			}
		}
	}]);
});