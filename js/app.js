var app = angular.module("stargazing", ['ab-base64', 'ngSanitize']);
var repos = 0;

//var Showdown = require('showdown');
//var 

// app.directive('markdown', function(){
// 	var converter = new showdown.Converter();
// 	return {
// 		restrict: 'A',
// 		link: function(scope, element, attrs){
// 			var htmlText = converter.makeHtml(element.text());
// 			element.html(htmlText);
// 		}
// 	};
// });

app.controller("StarController", ["$scope", "$http", "base64", "$sce", function($scope, $http, base64, $sce){

	$scope.data = null;
	$scope.repository_list = [];
	$scope.readme = "Select a repo";
	$scope.readme.markdown = "Select a repo to view details";

	$scope.deliberatelyTrustDangerousSnippet = function() {
	  return $sce.trustAsHtml($scope.readme.markdown);
	};


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
		var converter = new showdown.Converter();
		// console.log(url);
		$http({
			method: 'JSONP',
			url: readme_url
		}).then(function(response){
			//$scope.status = response.status;
			$scope.rmdata = response.data;
			//$scope.repository_list = response.data["data"];
			$scope.readme = response.data["data"];
			$scope.readme.markdown = converter.makeHtml(base64.decode(response.data["data"].content));
			//$scope.readme.markdown = "It works!";
			console.log(response.data);
		},function(response){
			//$scope.status = response.status;
			$scope.rmdata = response.data || "No response data";
			//$scope.repository_list = response.data || "No response data";
		});
	};

}]);