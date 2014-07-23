GitHubStats.controller('HeaderCtrl', function ($scope) {

	$scope.loading = false;

	$scope.$on('$routeChangeStart', function (event, next, current) {
		$scope.loading = true;
	});

	$scope.$on('$routeChangeSuccess', function (event, current, previous) {
		$scope.loading = false;
	});

	$scope.$on('$routeChangeError', function (event) {
		$scope.loading = false;
	});

});

