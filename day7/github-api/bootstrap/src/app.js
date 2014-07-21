// Define the github.stats module and export is as the global GitHubStats
GitHubStats = angular.module('github.stats', ['gRoute', 'utils', 'ngGrid', 'googlechart']);
//Define constant
GitHubStats.constant('GITHUB_API', 'https://api.github.com');
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
            user: function() {}
        }
    });
    $routeProvider.when('/repos/:username', {
        templateUrl: 'partials/user-repos.html',
        controller: 'UserReposCtrl',
        resolve {
            //TODO: Add resolve user logic here
            user: function() {},
            //TODO: Add resolve user logic here
            repos: function() {}
        }
    });
    $routeProvider.when('/repos/:username/:repository', {
        templateUrl: 'partials/repo.html',
        controller: 'RepoCtrl',
        resolve {
            //TODO: Add resolve user logic here
            user: function() {},
            //TODO: Add resolve user logic here
            repos: function() {}
        }
    });
    $routeProvider.when('/stats/users', {
        templateUrl: 'partials/users-stats.html',
        controller: 'UsersStatsCtrl',
        resolve {
            //TODO: Add resolve all users logic here
            users: function() {},
        }
    });
    $routeProvider.when('/stats/users/:username', {
        templateUrl: 'partials/user-repo-stats.html',
        controller: 'UserRepoStatsCtrl',
        resolve {
            //TODO: Add resolve all repos logic here
            repos: function() {},
        }
    });
    $routeProvider.otherwise({
        redirectTo: '/home'
    });
});