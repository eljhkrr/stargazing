var app = angular.module("stargazing", ['ab-base64']);
var repos = 0;
//var 

app.directive('markdown', function(){
	var converter = new Showdown.converter();
	return {
		restrict: 'A',
		link: function(scope, element, attrs){
			var htmlText = converter.makeHtml(element.text());
			element.html(htmlText);
		}
	};
});

app.controller("StarController", ["$scope", "$http", "base64", function($scope, $http, base64){

	$scope.data = null;
	$scope.repository_list = [];
	$scope.readme = "Select a repo";
	$scope.readme.markdown = "Select a repo to view details";


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
			$scope.readme.markdown = base64.decode(response.data["data"].content);
			//$scope.readme.markdown = "It works!";
			console.log(response.data);
		},function(response){
			//$scope.status = response.status;
			$scope.rmdata = response.data || "No response data";
			//$scope.repository_list = response.data || "No response data";
		});
	};

}]);