define(function(require){
	var app = require("../app");

	app.factory("formService",[function(){
		//表格数据（明天变到服务器拉取）
		var formdata = {
			"title" : "王者荣耀顾客意见调查",
			"questions" : [
				{
					"title" : "你玩过王者荣耀么？",
					"options" : [
						"有",
						"没有"
					],
					"type" : "single-option",
					"required" : true
				},
				{
					"title" : "请问您对所玩王者荣耀的预期与第一次体验的相符程度的满意度为？",
					"options" : [
						"非常满意",
						"满意",
						"不满意",
						"极其满意"
					],
					"type" : "single-option",
					"required" : true
				},
				{
					"title" : " 请问您认为丰富的游戏体验要包含以下哪些游戏内容？ ",
					"options" : [
						"PVP（玩家PK）",
						"PVE（副本）",
						"组队系统与高难度合作副本",
						"寻宝探险系统等	",
						"聊天系统（包括文字与语音、视频）",
						"“摆摊”或者“拍卖行”等交易系统",
						"特色培养系统（如梦幻西游，DNF的DIY房间系统）"
					],
					"type" : "mutiple-option",
					"required" : true
				},
				{
					"title" : "你是哪儿人？",
					"options" : [
						"北方人",
						"南方人"
					],
					"type" : "select-option",
					"required" : true
				},
				{
					"title" : "你的名字",
					"type" : "text",
					"required" : true,
					"options" : [
						 
					]
				},
				{
					"title" : "意见和建议",
					"type" : "textarea",
					"required" : true,
					"options" : [
						 
					]
				},
				{
					"title" : "你的生日",
					"type" : "date",
					"required" : true,
					"options" : [
						 
					]
				},
				{
					"title" : "你的身高",
					"type" : "range",
					"required" : true,
					"min" : 100,
					"max" : 200,
					"options" : [
						 
					]
				}
			]
		}

		//正在编辑的题号
		var onEdit = 0;

		return {
			getFormdata : function(){
				return formdata;
			},
			//编辑 SETTER
			edit : function(number){
				onEdit = number;
			},
			//得到编辑的那个人
			getOnEdit : function(){
				return onEdit;
			},
			//移动
			move : function(s,e){
				formdata.questions[onEdit].options.splice(e,0,formdata.questions[onEdit].options.splice(s,1)[0]);
			}
		}
	}]);
});