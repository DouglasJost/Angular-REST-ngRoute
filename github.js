(function(){
  
  var github = function($http, $log){
    
    var getUser = function(username){  
          $log.info("github.getUser : Searching for " + username);
          
          return $http.get("https://api.github.com/users/" + username)
                .then(function(response){
                  return response.data;
                });
    };
  
    var getRepos = function(user){
          $log.info("github.getRepos : Getting repos for " + user);
          return $http.get(user.repos_url)
                      .then(function(response){
                        return response.data;
                      });
    };
  
      var getRepoDetails = function(username, reponame){
      var repo;  // Repo details + collaborators
      var repoUrl = "https://api.github.com/repos/" + username + "/" + reponame;
      
      $log.info("github.getRepoDetails : URL is " + repoUrl);
     
      /*
      return $http.get(repoUrl)
                  .then(function(response){
                      repo = response.data;
                      console.log(repo);
                      return $http.get(repoUrl + "/collaborators");
                  })
                  .then(function(response){
                      repo.collaborators = response.data;
                      console.log(repo);
                      return repo;
                  });
      */       
      
      return $http.get(repoUrl)
                .then(function(response){
                    repo = response.data;
                    $log.info("github.getRepoDetails : repo data is " + repo);
                    return repo;
                });
                  
    };
  
  
    return {
        getUser: getUser,
        getRepos: getRepos,
        getRepoDetails: getRepoDetails
    };
  
  };
  
  var module = angular.module("gitHubSearch");
  module.factory("github", github);
}());