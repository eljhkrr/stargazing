var app = angular.module("stargazing", []);
var repos = 0;
//var 

app.controller("StarController", ["$scope", "$http", function($scope, $http){

	$scope.data = null;
	$scope.repository_list = [];
	$scope.readme = "Select a repo";


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

	$scope.showReadme = function(name){
		// console.log(name);
		var readme_url = 'http://api.github.com/repos/'+name+'/readme?callback=JSON_CALLBACK';
		// console.log(url);
		$http({
			method: 'JSONP',
			url: readme_url
		}).then(function(response){
			//$scope.status = response.status;
			$scope.rmdata = response.data;
			//$scope.repository_list = response.data["data"];
			$scope.readme = response.data["data"];
			console.log(response.data);
		},function(response){
			//$scope.status = response.status;
			$scope.rmdata = response.data || "No response data";
			//$scope.repository_list = response.data || "No response data";
		});
	};

}]);