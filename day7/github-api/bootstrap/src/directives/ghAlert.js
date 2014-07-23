GitHubStats.directive('ghAlert', function ($timeout, $rootScope) {
	return {
		scope: {},
		template: '<div class="alert alert-danger" role="alert" ng-bind="message"></div>',
		replace: true,
		link:  function link(scope, element, attrs) {
			scope.$on('$routeChangeStart', function (event, next, current) {
				jQuery(element).hide();
			});

			$rootScope.$on('error',function(ev, arg){
				scope.message = arg;
				jQuery(element).show();
				$timeout(function(){jQuery(element).hide()}, 4000);
			})
		}

	};
});
