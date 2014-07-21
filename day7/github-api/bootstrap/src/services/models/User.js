GitHubStats.factory('User',
  function (GITHUB_API, CachableModel, storage, $q, Repo) {
  'use strict';

  var usernamesList = storage.get('users') || [];

  function User(config) {
  	this.username = config.login;
  	this.avatarUrl = config.avatar_url;
  	this.createdAt = config.created_at;
  	this.followers = config.followers;
  	this.publicReposCount = config.public_repos;
  	this.type = config.type;
  	this.htmlUrl = config.html_url;

  	Object.defineProperty(this, "repos", function(){
  		//TODO: check if this is how repositories are get
  		Repo.get();
  	})
  }

  User.get = function(username){
  	var getConfig = {
  		url: GITHUB_API + '/users/{{username}}',
  		context: {username: username},
  		isArray: false,
  		constructor: User
  	};

  	return CachableModel.get(getConfig);
  }

  User.getUsernames = function(){
  	return usernamesList;
  };

  User.addUsername = function(username){
  	usernamesList.push(username);
  	storage.put('users', usernamesList);
  };

  User.removeUsername = function(username){
  	var index = usernamesList.indexOf(username);
  	if (index > -1) {
  		usernamesList.splice(index, 1);
  		storage.put('users', usernamesList);
  	}
  };

  User.all = function(){
  	return $q.all(usernamesList.map(function(u){return User.get(u)}));
  }

  return User;
});
