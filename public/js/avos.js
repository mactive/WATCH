app.controller('avos', ['$scope', '$rootScope', 
	function ($scope,$rootScope) {

		$scope.test = 10;

	$scope.init = function(){

		$scope.userdata = [];

		$scope.getAVOS(function(result){
			console.log("=="+result.length);
			$scope.userdata = result;
			$scope.test = result.length;
			console.log($scope.test);
		});

	}


	$scope.getAVOS = function(callback){

		var _result = [];
		AV.initialize("s1eqj0awaxajpcu6b7sdvfq4yrxel9s0xnnpvqrchmr9jcla", "kqu1bgz6q9i8xdr7c82uhz6fvgpq8vewcx7788rev8p4nfw0");

		var GameScore = AV.Object.extend("users");
		var query = new AV.Query(GameScore);
		// query.equalTo("phone", "18610529632");
		query.limit(30);
		query.find({
		  success: function(results) {
		    console.log("Successfully retrieved " + results.length + " scores.");
		    // Do something with the returned AV.Object values
		    for (var i = 0; i < results.length; i++) {
		      var object = results[i];

		      var item = {
		      	id: object.id,
		      	name: object.get('name'),
		      	email: object.get('email'),
		      	phone: object.get('phone')
		      };

		      _result.push(item);
		      console.log(item);
		      // console.log($scope.userdata);
		    }

		    		    	// callback(_result);

		    $rootScope.$apply(function(){
		    	callback(_result);
		    });
		  },
		  error: function(error) {
		    alert("Error: " + error.code + " " + error.message);
		  }
		});
	}




}]);