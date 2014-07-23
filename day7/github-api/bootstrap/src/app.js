// Define the github.stats module and export is as the global GitHubStats
GitHubStats = angular.module('github.stats', ['ngRoute', 'utils', 'ngGrid', 'googlechart']);
//Define constant
GitHubStats.constant('GITHUB_API', 'https://api.github.com');

GitHubStats.factory('clientInjector', function() {
    var clientInjector = {
        request: function(config) {
            config.url = config.url + '?client_id=8f3b8d572129632cf422&client_secret=f0669941c23378c30fb89f6c37be9075a5628bba';
            return config;
        }
    };

    return clientInjector;
});

GitHubStats.config(function($routeProvider, $httpProvider) {
    // Configure the $httpProvider
    // Define routes here
    $routeProvider.when('/home', {
        templateUrl: 'partials/home.html',
        controller: 'HomeCtrl'
    });
    $routeProvider.when('/users/:username', {
        templateUrl: 'partials/user.html',
        controller: 'UserCtrl',
        resolve: {
            //TODO: Add resolve user logic here
            user: function(User, $route) {
                return User.get($route.current.params.username);
            }
        }
    });
    $routeProvider.when('/repos/:username', {
        templateUrl: 'partials/user-repos.html',
        controller: 'UserReposCtrl',
        resolve: {
            //TODO: Add resolve user logic here
            user: function() {},
            //TODO: Add resolve user logic here
            repos: function() {}
        }
    });
    $routeProvider.when('/repos/:username/:repository', {
        templateUrl: 'partials/repo.html',
        controller: 'RepoCtrl',
        resolve: {
            //TODO: Add resolve user logic here
            user: function() {},
            //TODO: Add resolve user logic here
            repo: function() {}
        }
    });
    $routeProvider.when('/stats/users', {
        templateUrl: 'partials/users-stats.html',
        controller: 'UsersStatsCtrl',
        resolve: {
            //TODO: Add resolve all users logic here
            users: function() {},
        }
    });
    $routeProvider.when('/stats/users/:username', {
        templateUrl: 'partials/user-repo-stats.html',
        controller: 'UserRepoStatsCtrl',
        resolve: {
            //TODO: Add resolve all repos logic here
            repos: function() {},
        }
    });
    $routeProvider.otherwise({
        redirectTo: '/home'
    });

    // Add interceptor
    $httpProvider.interceptors.push('clientInjector');
});


