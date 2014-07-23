GitHubStats.controller('UserReposCtrl', function ($location, $scope, repos, user) {
  // Body
  $scope.user = user;
  $scope.users = repos;

  $scope.gridOptions = {
  	data: "repos",
  	columnDefs: [
  	{field: 'name', displayName: 'Name'}, 
  	{field:'starsCount', displayName:'Stars'},
  	{field:'createdAt ', displayName:'Created date'}]
  };

  $scope.beforeSelectionChange = function(row, event){
  	$location.path($location.path() + '/' + row.entity.name);
  };
  
});
