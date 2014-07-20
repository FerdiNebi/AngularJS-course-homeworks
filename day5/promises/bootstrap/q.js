var STATES = {
	CLEAN: 0,
	RESOLVED: 1,
	REJECTED: 2
};

function Promise(){
	this._done = [];
	this._fail = [];
	this._state = STATES.CLEAN;
	this._resolveData = null;
	this._rejectData = null;
}

Promise.prototype.done = function(callback){
	this._done.push(callback);
	if (this._state === STATES.RESOLVED){
		var result = callback.call(this, this._resolveData);
		this._resolveData = result;
	}

	return this;
};

Promise.prototype.fail = function(callback){
	this._fail.push(callback);
	if (this._state === STATES.REJECTED){
		var result = callback.call(this, this._rejectData);
		this._rejectData = result;
	}

	return this;
}

Promise.prototype.isClean = function(){
	return this._state === STATES.CLEAN;
}

function Deferred(){
	this.promise = new Promise();
}

Deferred.prototype.resolve = function(data){
	if (!this.promise.isClean()){
		throw "Exception! Not clean promise!";
	}

	this.promise._state = STATES.RESOLVED;
	this.promise._resolveData = data;
	for (var i = 0; i < this.promise._done.length; i++) {
		this.promise._done[i].call(this, data);
	};
}

Deferred.prototype.reject = function(data){
	if (!this.promise.isClean()){
		throw "Exception! Not clean promise!";
	}

	this.promise._state = STATES.REJECTED;
	this.promise._rejectData = data;
	for (var i = 0; i < this.promise._fail.length; i++) {
		this.promise._fail[i].call(this, data);
	};
}

var Q = {
	defer: function(){
		return new Deferred();
	},

	all: function(promises){
		var deferred = this.defer();
		deferred.promise.done(function (data){return data});
		deferred.promise.fail(function(err){return err;});

		var resultData = {};
		for (var i = 0; i < promises.length; i++) {
			promises[i].done(function(data){ 
				resultData[i] = data;
				if (resultData.length == promises.length){
					debugger;
					deferred.resolve(resultData);	
				}
			});
			promises[i].fail(function(err){
				debugger;
				if (deferred.promise.isClean()){
				deferred.reject(err);
			}
			});
		};

		return deferred.promise;
	},

	when: function(data){
		var deffered = new Deferred();
		deffered.resolve(data);
		return deffered.promise;
	}
}
