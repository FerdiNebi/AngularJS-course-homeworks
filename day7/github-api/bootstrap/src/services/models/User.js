GitHubStats.factory('User',
  function (GITHUB_API, CachableModel, storage, $q, Repo) {
  'use strict';

  var usernamesList = storage.get('users') || [];

  function User(config) {
  	this.username = config.login;
  	this.avatarUrl = config.avatar_url;
  	this.createdAt = config.created_at;
  	this.followers = config.followers;
    this.following = config.following;
  	this.publicReposCount = config.public_repos;
  	this.type = config.type;
  	this.htmlUrl = config.html_url;

  	Object.defineProperty(this, "repos", function(){
  		Repo.getAllForUser(this.username);
  	});
  }

  User.get = function(username){
    debugger;
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
