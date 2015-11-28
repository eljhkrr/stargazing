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
	$scope.username = "therakken";
	$scope.base_url = 'http://api.github.com/users/' + $scope.username + '/starred?callback=JSON_CALLBACK';

	$scope.deliberatelyTrustDangerousSnippet = function() {
	  return $sce.trustAsHtml($scope.readme.markdown);
	};


	$http({
		method: 'JSONP',
		//url: 'http://api.github.com/users/' + $scope.username + '/starred?callback=JSON_CALLBACK&per_page=100'
		url: $scope.base_url
	}).then(function(response){
		$scope.status = response.status;
		$scope.data = response.data;
		$scope.repository_list = response.data["data"];
		// console.log(response.data.meta);
		// iterate through all pages
		if ('Link' in response.data.meta){
			console.log("property exists!");
			console.log("pages: ");
			
			var url = response.data.meta.Link[1][0];
			var ptn = /&page=/i;
			console.log(url);
			var pages = url.slice(url.search(ptn) + 6, url.length);
			console.log("pages = " + pages);
			if (isNaN(pages)){
				// display some error message
			} else {
				// call method pass in no. of pages
				$scope.getAllPages(url, pages);
			}
	
		} else {
			// There are no other pages
		}

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

	$scope.getAllPages = function(link, pages){
		console.log("Link: " + link);
		console.log("Pages: " + pages);
		for (var i = 1; i < pages; i++){
			//console.log("Fetching page: " + (i + 1));
			var url = $scope.base_url + "&page=" + (i + 1);
			console.log(url);
			$http({
				method: 'JSONP',
				url: url
			}).then(function(response){
				//console.log("Repo list length=" + $scope.repository_list.length);
				$scope.repository_list= $scope.repository_list.concat(response.data.data);
				console.log($scope.repository_list);
				//$scope.$apply();
			}, function(response){
				console.log("$http failed");
			});
		}

	};

	$scope.getAllPages1 = function(link, pages){
		console.log("Link: " + link);
		console.log("Pages: " + pages);
		var i = 1;
		var url = $scope.base_url + "&page=" + (i + 1);
		console.log(url);
		console.log("Repo list:");
		console.log($scope.repository_list);
		$http({
			method: 'JSONP',
			url: url
		}).then(function(response){
			//console.log("Repo list length=" + $scope.repository_list.length);
			$scope.repository_list= $scope.repository_list.concat(response.data.data);
			console.log("Response:");
			console.log(response.data);
			console.log($scope.repository_list);
		}, function(response){
			console.log("$http failed");
		});
		console.log("Repo list end=\n");
		console.log($scope.repository_list);
	};


}]);