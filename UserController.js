(function() {
  
  var app = angular.module("gitHubSearch");
  
  var UserController = function($scope, $routeParams, github){
    
    var onUserComplete = function(data) {
      console.log("onUserComplete");
      console.log(data);
      $scope.user = data;
      $scope.error = "";
      github.getRepos($scope.user).then(onRepos, onError);
    };
    
    var onError = function(response){
      console.log("onError");
      $scope.error = "Could not fetch the data";
    };
    
    var onRepos = function(data){
      console.log("onRepos");
      $scope.repos = data;
    };
    
    $scope.repoSortByName = function(){
      $scope.repoSortOrder = "+name";
    };
    $scope.repoSortByStars = function(){
      $scope.repoSortOrder = ["-stargazers_count", "-Language", "+name"];   //"-stargazers_count";
    };
    $scope.repoSortByLanguage = function(){
      $scope.repoSortOrder = ["+language", "-stargazers_count", "+name"];   //"+language";
    };
    
    
    $scope.username = $routeParams.username;
    $scope.repoSortOrder =  ["-stargazers_count", "-Language", "+name"];  
    github.getUser($scope.username).then(onUserComplete, onError);
    
  };
  
  app.controller("UserController", ["$scope", "$routeParams", "github", UserController]);
  
}());

