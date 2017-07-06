define(function(require){
	var app = require("../app");

	require("../components/canlendar/canlendar.js");

	app.directive("formComponent",[function(){
		return {
			restrict : "E",
			templateUrl : "./produce/form-component.html",
			scope : {
				"type" : "@type",
				"question" : "=question",
				"name" : "@name"
			},
			link : function(scope,elements){
				 
			}
		}
	}]);
});