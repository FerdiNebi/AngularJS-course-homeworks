GitHubStats.controller('HomeCtrl', function ($scope, User) {
  $scope.users = User.getUsernames();
  $scope.currentUser = '';

  $scope.add = function (){
  	debugger;
  	User.addUsername($scope.currentUser);
  	$scope.currentUser = '';
  };

  $scope.remove = function(username){
  	User.removeUsername(username);
  };
});
