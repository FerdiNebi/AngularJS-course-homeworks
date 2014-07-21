/* global angular */
angular.module('utils').factory('req', function(){
	function req(){};

	req.get =  function(url){
		$http.get(url).then(function(response){
			return response;
		}, function(response){
			$rootScope.$broadcast("error", response.data.message);
		});
	}
})