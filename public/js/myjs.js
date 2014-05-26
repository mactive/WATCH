var app = angular.module('myApp', [], function () {
	console.log('app is runing')
});
app.controller('watch', function ($scope,$interval) {
	var go,flag=true;
	$scope.userTimes = [];
	$scope.watchTime = '00:00:00:00';
	function init() {
		flag = true;
		$scope.second = 0;
		$scope.minutes = 0;
		$scope.hour = 0;
		$scope.ms = 0;
		$scope.watchTime = '00:00:00:00';
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
		}
		
	};
	$scope.watchEnd = function () {
		if(!flag) {
			flag = true;
			$interval.cancel(go);
			$scope.userTimes.push({
				"time" : new Date(),
				"timeLone" : $scope.hour + '小时' + $scope.minutes + '分钟' + $scope.second + '秒',
				"timeData" : [$scope.hour,$scope.minutes,$scope.second]
			})
			$interval.cancel(go)
		}

	};
});
app.controller('users', function ($scope,$http,$animate) {
	var get = $http({
		method : 'GET',
		url : '/users'
	});
	get.success(function (res) {
		$scope.usersData = res;
		$scope.dataIsReady = 'show';
		// $animate.addClass(anjular.element(document.getElementById('users')),'show');
	});
	$scope.chooseUser = function (username) {
		console.log("=="+username)
		$scope.dataIsReady = '';
	}

});

