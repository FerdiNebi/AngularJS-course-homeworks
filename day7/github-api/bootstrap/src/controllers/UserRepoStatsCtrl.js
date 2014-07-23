GitHubStats.controller('UserRepoStatsCtrl', function ($scope, repos) {
  // Body
  $scope.repos = repos;

  // Languages PieChart
  var languages = repos.reduce(function(langs, repo){
  	var language = repo.language;
  	if (!langs[language]){
  		langs[language] = 1;
  	} else {
  		langs[language] += 1;
  	}

  	return langs;
  }, {});

  $scope.languageStats = {};
  $scope.languageStats.data =  {"cols": [
  {id: "l", label: "Language", type: "string"},
  {id: "r", label: "Repositories", type: "number"}
  ], "rows": []};

  languages.map(function(value, index){
  	$scope.languageStats.rows.push({c: [
  		{v: index},
  		{v: value},
  		]});
  });

  $scope.languageStats.type = 'PieChart';
  $scope.languageStats.options = {
  	'title': 'Languages'
  };

  // Repositories with more than 100 stars BarChart
  var popularProjectsCount = repos.reduce(function(count, repo){
  	var stars = repo.starsCount;
  	if (stars >= 100){
  		count += 1;
  	}

  	return count;
  }, 0);

  $scope.starsStats = {};
  $scope.starsStats.data =  {"cols": [
  {id: "r", label: "Repositories", type: "number"}
  ], "rows": [
  		{c: [
  			{v: value},
  		]}
  ]};

  $scope.starsStats.type = 'BarChart';
  $scope.starsStats.options = {
  	'title': 'Repositories with more than 100 stars'
  };

  });
