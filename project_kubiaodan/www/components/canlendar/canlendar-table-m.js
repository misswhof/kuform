define(function(require){
	var app = require("../../app");

	app.directive("canlendarTableM",[function(){
		return {
			restrict : "E",
			templateUrl : "components/canlendar/canlendar-table-m.html",
			scope : {
				y : "=y",
				m : "=m",
				d : "=d",
				changeshowbox : "&changeshowbox",
				"min" : "@min",
				"max" : "@max"
			},
			link : function(scope){
				//得到最小min的时间戳，最大max的时间戳
				var min = Date.parse(new Date(scope.min));
				//因为包含那一天
				var max = Date.parse(new Date(scope.max)) + 1000 * 60 * 60 * 24;
 
				//类名
				scope.getClass = function(item){
					return {
						'gray' : item.prevMonth || item.nextMonth, 
						'cur' : item.thisMonth && item.date == d,
						"diabled" : (item.timestamp <= min) || (item.timestamp > max)
					}
				}

				var y;
				var m;
				var d;
				var erweishuzu = [];

				scope.getArr = function(_y , _m , _d){
					//为了防止数组重新计算二维数组，导致infdig错误，我们这里验证本次ymd和闭包中缓存的ymd是否一致。
					//如果一致就不计算了，返回之前的数组。
					if(_y == y && _m == m && _d == d){
						return erweishuzu;
					}
					//不一致的话，更新闭包中的数据
					y = _y;
					m = _m;
					d = _d;
					
					//写业务，出二维数组，服务tr、td的ng-repeat
					datearr = []; 		//从一维数组变
					erweishuzu = [];	//需要从一维数组变为二维数组
					
					//三要素
					//① 本月1号星期几
					var thismonthfirstdateday = (new Date(y , m - 1 , 1)).getDay();
					//② 上一个月最后一天是几号？
					var prevmonthlastdatedate = (new Date(y , m - 1 , 0)).getDate();
					//③ 本月共几天！
					var thismonthdateamount = (new Date(y , m - 1 + 1 , 0)).getDate();
					
					// 拿到三要素，就有数组！
					// 本月1号星期几，就要放置几个上个月的尾巴
					while(thismonthfirstdateday--){
						datearr.unshift({
							prevMonth : true,
							date : prevmonthlastdatedate--,
							timestamp : Date.parse(new Date(y , m - 2 , prevmonthlastdatedate))
						});
					}
					// 放本月
					var count = 1;
					while(thismonthdateamount--){
						datearr.push({
							thisMonth : true,
							date : count++,
							timestamp : Date.parse(new Date(y , m - 1 , count))
						});
					}
					// 放下月
					var target = datearr.length <= 35 ? 35 : 42;
					var count = 1;
					while(datearr.length < target){
						datearr.push({
							nextMonth : true,
							date : count++,
							timestamp : Date.parse(new Date(y , m - 1 + 1 , count))
						});
					}

					while(datearr.length > 0){
						erweishuzu.push(datearr.splice(0,7));
					}
					
					//脏检查的函数，所以要return东西。
					return erweishuzu;
				}

				//点击事件
				scope.changed = function(item){
					if(item.prevMonth){
						scope.m --;
						if(scope.m < 1){
							scope.m = 12;
							scope.y --;
						}
					}else if(item.nextMonth){
						scope.m ++;
						if(scope.m > 12){
							scope.m = 1;
							scope.y ++;
						}
					} 
					scope.changeshowbox();
					scope.d = item.date;
				}
			}
		}
	}]);
});