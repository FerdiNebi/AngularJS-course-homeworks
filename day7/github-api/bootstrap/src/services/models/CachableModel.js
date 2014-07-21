GitHubStats.factory('CachableModel', function($interpolate, $cacheFactory, $q, req) {
	'use strict';
	var cache = {};

	function CachableModel() {}

	CachableModel.get = function(config) {
		var cacheObject = cache[conig.url];
		if (!cacheObject) {
			cacheObject = $cacheFactory(config.url);
			cache[config.url] = cacheObject;
		}
		var urlExpr = $interpolate(config.url);
		var interpolatedUrl = urlExpr(config.context);
		if (!cacheObject[interpolatedUrl]) {
			return req.get(interpolatedUrl).then(function (result){
				if (config.isArray){
					var data = [];
					for (var i = 0; i < result.length; i++) {
						data[i] = new config.constructor(result[i]);
					};
					return data;
				}
				return new config.constructor(reuslt);
			}).then(function(cacheData){
				cacheObject[interpolatedUrl] = cacheData;
				return cacheData;
			});

		}
		return $q.when(cacheObject[interpolatedUrl]);
	};
	
	return CachableModel;
});