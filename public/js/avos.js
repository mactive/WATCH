app.controller('avos', ['$scope', '$rootScope','userInfoService',
	function ($scope,$rootScope,userInfoService) {
		$scope.test = 10;
		// $scope.userInfo = userInfoService;
		$scope.init = function(){

			$scope.userdata = [];

			$scope.getAVOS(function(result){
				// console.log("=="+result.length);
				$scope.userdata = result;
				$scope.test = result.length;
				// console.log($scope.test);
				$scope.dataIsReady = 'show';
			});

		}

		// var query;
		$scope.getAVOS = function(callback){
			var _result = [];
			AV.initialize('zli2myhpyjk0jlp0stpm4olwzfr84adtsnwkli95o071jw4w','605j1y9kc0a3wg79oje38l6rs0l20zxqdcbjknj72ke2wtgn');
			var GameScore = AV.Object.extend("users");
			var userRelation = AV.Object.extend("relation");
			$rootScope.userList = new AV.Query(GameScore);
			$rootScope.relation = new AV.Query(userRelation);
			$rootScope.relationDb = new userRelation();
			// query.equalTo("phone", "18610529632");
			$rootScope.userList.limit(30);
			$rootScope.userList.find({
			  success: function(results) {
			    console.log("Successfully retrieved " + results.length + " scores.");
			    // Do something with the returned AV.Object values
			    for (var i = 0; i < results.length; i++) {
			      	var object = results[i];
			      	var item = {
			      		id: object.get('userID'),
			      		name: object.get('name'),
			      		email: object.get('email'),
			      		phone: object.get('phone')
			      	};

			      _result.push(item);
			      // console.log(item);
			      // console.log($scope.userdata);
			    }
			    $rootScope.$apply(function(){
			    	callback(_result);
			    });
			  },
			  error: function(error) {
			    alert("Error: " + error.code + " " + error.message);
			  }
			});

		}
		$scope.chooseUser = function (user) {
			$rootScope.byNowUserID = user.id;
			$rootScope.relation.get({
				'userID' : user.id,
				'projectName' : 'ppc'
			}, {
				success : function (res) {
					console.log(res)
					$scope.userTiems = res
				},
				error : function (res) {
					console.error(res)
					$scope.userTimes = 'none'
				}
			})
			// console.log($rootScope)
			$scope.dataIsReady = '';
		};
	}
]);

app.service('userInfoService', function () {
	// var user
	this.addThisRound = function (data) {
		$rootScope.relation.save(data, {
			success : function () {
				console.log('data is undated');
			},
			error : function () {

			}
		})
	};
	this.checkUser = function (userID,callback) {
		$rootScope.relation.find({
			'userID' : userID,
			'projectName' : 'ppc'
		}, {
			success : function (res) {
				callback(res);
			},
			error : function () {

			}
		})
	};
});
// app.factory('UserInformation', function() {
//   var user = {
//     name: "Angular.js"
//   };

//   return user;
// });

