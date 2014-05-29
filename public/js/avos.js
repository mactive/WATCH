app.controller('avos', ['$scope', '$rootScope', 
	function ($scope,$rootScope) {

		$scope.test = 10;

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
			// console.log(new GameScore());
			$rootScope.query = new AV.Query(GameScore);
			// query.equalTo("phone", "18610529632");
			$rootScope.query.limit(30);
			$rootScope.query.find({
			  success: function(results) {
			    console.log("Successfully retrieved " + results.length + " scores.");
			    // Do something with the returned AV.Object values
			    for (var i = 0; i < results.length; i++) {
			      	var object = results[i];
			      	// if(object.pingbancheng == undefined) {
			      	// 	console.log('hi')
				      // 	object.save(null,{
				      // 		success : function (user) {
				      // 			user.set('pingbancheng',[])
				      // 			user.save();
				      // 		},	
				      // 		error : function (err) {
				      // 			console.err(err)
				      // 		}
				      // 	});
			      	// }

			      	var item = {
			      		id: object.id,
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
			$rootScope.byNowUserID = user.id
			$rootScope.query.get(user.id,{
				success : function (user) {
					$rootScope.user = user;
					$rootScope.userTimes = user.get('pingbancheng');
				},
				error : function () {

				}
			});
			// console.log($rootScope)
			$scope.dataIsReady = '';
		};
	}
]);


