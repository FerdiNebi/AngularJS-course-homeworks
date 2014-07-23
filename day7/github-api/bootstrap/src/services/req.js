/* global angular */
angular.module('utils').factory('req', function($http){
	function req(){};

	req.get =  function(url){
		return $http.get(url).then(function(response){
			return response;
		}, function(response){
			$rootScope.$broadcast("error", response.data.message);
		});
	}

	return req;
})