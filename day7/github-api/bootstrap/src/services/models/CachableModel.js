GitHubStats.factory('CachableModel', function($interpolate, $cacheFactory, $q, req) {
	'use strict';
	var cache = {};

	function CachableModel() {}

	CachableModel.get = function(config) {
		debugger;
		var cacheObject = cache[config.url];
		if (!cacheObject) {
			cacheObject = $cacheFactory(config.url);
			cache[config.url] = cacheObject;
		}
		var urlExpr = $interpolate(config.url);
		var interpolatedUrl = urlExpr(config.context);
		if (!cacheObject[interpolatedUrl]) {

			return req.get(interpolatedUrl).then(function (result){
				if (config.isArray){
					return result.map(function(d){return new config.constructor(d.data);});
				}
				return new config.constructor(result.data);
			}).then(function(cacheData){
				cacheObject[interpolatedUrl] = cacheData;
				return cacheData;
			});

		}
		
		return $q.when(cacheObject[interpolatedUrl]);
	};
	
	return CachableModel;
});