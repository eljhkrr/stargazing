var app = angular.module("stargazing", []);
var repos = 0;

app.controller("StarController", ["$scope", "$http", function($scope, $http){

	$scope.data = null;
	$scope.repository_list = [];


	$http({
		method: 'JSONP',
		url: 'http://api.github.com/users/therakken/starred?callback=JSON_CALLBACK'
	}).then(function(response){
		$scope.status = response.status;
		$scope.data = response.data;
		$scope.repository_list = response.data["data"];
		console.log(response.data);
	},function(response){
		$scope.status = response.status;
		$scope.data = response.data || "No response data";
		$scope.repository_list = response.data || "No response data";
	});

}]);