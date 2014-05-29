var app = angular.module('myApp', [], function () {
	console.log('app is runing')
});
app.controller('watch', ['$scope','$interval','$rootScope',  'userInfoService',
	function ($scope,$interval,$rootScope,userInfoService) {
	// $scope.userInfo = userInfoService;
	var go,flag=true;
	$scope.userTimes = [];
	// $scope.watchTime = '00:00:00:00';
	function init() {
		flag = true;
		$scope.second = 0;
		$scope.minutes = 0;
		$scope.hour = 0;
		$scope.ms = 0;
		$scope.watchTime = '00:00:00:00';
		$scope.round = {};
	}
	$scope.watchStart = function () {
		if(flag) {
			init();
			flag = false;
			go = $interval(function () {
				$scope.ms += 1;
				if($scope.ms == 10) {
					$scope.ms =0;
					$scope.second +=1;
				}
				if($scope.second == 60) {
					$scope.second = 0;
					$scope.minutes +=1;
				};
				if($scope.minutes == 60) {
					$scope.minutes = 0;
					$scope.hour +=1;
				};
				$scope.watchTime = (($scope.hour < 10) ? '0' +$scope.hour : $scope.hour) + ':' + (($scope.minutes < 10) ? '0' + $scope.minutes :$scope.minutes) + ':' + (($scope.second < 10 ) ? '0' + $scope.second : $scope.second) + ':' + (($scope.ms < 10 ) ? '0' + $scope.ms : $scope.ms)  ;

			},100);
			$scope.btnAction = true;
		}
	};
	$scope.watchEnd = function ($filter) {
		if(!flag) {
			flag = true;
			$interval.cancel(go);
			var persist = $scope.hour * 3600 + $scope.minutes * 60 + $scope.second + ($scope.ms / 10);
			$scope.round = {
				'projectName' : 'pbc',
				"time" : new Date(),
				"timeLone" : $scope.hour + '小时' + $scope.minutes + '分钟' + $scope.second + '秒',
				"persist" : persist
			}
			$scope.userTimes.push($scope.round);
			// console.log($rootScope.relation)

			var userRelation = AV.Object.extend("relation");
			$rootScope.relationDb = new userRelation();
			console.log($rootScope.byNowUserID)
			
			var temp = {
					'persist' : persist,
					'projectName' : $scope.round.projectName,
					'userID' : $rootScope.byNowUserID,
					'addTime' : new Date()
				};

			$rootScope.relationDb.save(
				temp,
				{
					success : function (res) {
						console.log(res)
					},
					error : function () {

					}
				}
			)
			// $rootScope.relation.save({'projectName' : 'pbc'}, {
			// 	success : function () {
			// 		console.log('data is undated');
			// 	},
			// 	error : function () {

			// 	}
			// })
			$scope.btnAction = false;
		}
	};
	$scope.creatChart = function () {
	};

}]);


