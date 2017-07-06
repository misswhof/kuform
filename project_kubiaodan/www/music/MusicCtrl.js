define(function(require){
	var app = require("../app");

	app.controller("MusicCtrl",["mathService",function(mS){
		this.getA = function(){
			return mS.getA();
		}
	}]);
});