var app = angular.module("stargazing", []);
var repos = 0;

app.controller("StarController", function($scope, $http){

	$http.jsonp('http://api.github.com/users/TheRakken/starred?callback=kallbuck')
	.then(function successCallback(response) {
		// this callback will be called asynchronously
		// when the response is available
		console.log("success callback");
	console.log(response.data);
	}, function errorCallback(response) {
		// called asynchronously if an error occurs
		// or server returns response with an error status.
		console.log("error callback");
		console.log(response.headers);
	});

	$scope.repos = repos;

});

function kallbuck(json){
	console.log("This is kallbuck");
	console.log(json);
	repos = json;
}