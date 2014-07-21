/* global window, angular */
var TodoApp;

(function () {
  'use strict';

  // Create the appropriate module and
  // configure its $routeProvider

  TodoApp = angular.module("todo",['ngRoute']);

  TodoApp.config(function($routeProvider){
  	$routeProvider.when("/todo/:id",{
  		templateUrl: 'partials/todo.html',
  		controller: 'TodoCtrl',
  		resolve: {
  			todo: function(Todo){
  				return Todo.get($route.current.params.id);
  			}
  		}
  	});

  	$routeProvider.when("/todos", {
  		templateUrl: 'partials/todos.html',
  		controller: 'TodosCtrl',
  		resolve{
  			todos: function(Todo){
  				return Todo.getList();
  			}
  		}
  	});

  	$routeProvider.when('/edit/:id', {
  		templateUrl: 'partials/edit.html',
  		controller: 'TodoCtrl',
  		resolve{
  			todos: function(Todo){
  				return Todo.getList();
  			},
  			todo: function(Todo){
  				return Todo.get($route.current.params.id);
  			}
  		}
  	});

  	$routeProvider.when('/add', {
  		templateUrl: 'partials/add.html',
  		controller: 'TodoCtrl',
  		resolve{
  			todos: function(Todo){
  				return Todo.getList();
  			},
  			todo: function(){
  				return $q.when({});
  			}
  		}
  	})

  	$routeProvider.otherwise({
            redirectTo: "/todos"
        });
  })

}());

