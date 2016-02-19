angular.module("ClearBladeApp", [])
.controller("ClearBladeController", function($scope, cb, $q) {
	$scope.logins = [{
		User: {name : 'Rohan'},
		Age: 20
	},
	{
		User: {name : 'John'},
		Age: 18 
	}
	];

	var promise = cb.init('test@clearblade.com','rohanbendre');
	promise.then(function(resp) {
		$scope.response = resp;

	});

	$scope.sendRequest = function() {
		var promise = cb.runCode('ServicePart4','' , 2);
		promise.then(function(resp) {
			$scope.result = resp;
		}, function(reason) {
			$scope.result = reason;
		});
	};

	$scope.logout = function() {
		var cbobj = new ClearBlade();
		cbobj.logoutUser();
	}
});