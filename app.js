 (function() {
 	"use strict";

 	angular.module("app", [])
 		.value("model", {
 		user: "Vitaliy",
 		userPhoto: "images/VZ.jpg" //,
 		/* items: [
 			{ "action":  "Estimate...", "done": false },
 			{ "action":  "Create...", "done": false },
 			{ "action":  "Edit...", "done": true },
 			{ "action":  "Delete...", "done": false }
 		] */
 		})
 		.controller("Todo", Todo)
 		.filter("checkedItems", checkedItems)
 		.directive("taskList",taskList)
 		.run(runApp);
 		

 	
 	function runApp($http, model){
 		$http
 			.get("todo.js")
 			.success(function(data){
 				model.items=data;
 			});
 	}	
 	function Todo($scope, model){
 		//API
 		$scope.todo = model;
 		$scope.incompleteCount = incompleteCount;
 		$scope.warningLevel = warningLevel;
 		$scope.addNewItem = addNewItem;
 		// IMPL
 		function incompleteCount(items){
 			var count=0;

 			angular.forEach(items, function(item)){
 				if (!item.done) count++;
 			});

 			return count;
 		}

 		function checkedItems(){
 			return function(items,showComplete){
 				var resArr = [];

 				if(angular.isArray(items)){
 					angular.forEach(items,function(item)){
 						if (item.done === false || showComplete === true){
 							resArr.push(item);
 						}
 					});
 					return resArr;
				}
 				else{
 					return items;
 				}
 			};
 		} 
 		function warningLevel(items) {
 			return incompleteCount(items) < 3 ? "label-succes" : "label-warning"
 		}
 		function addNewItem(items, newItem){
 			if(newItem && newItem.action){
 				items.push({
 					action: newItem.action,
 					done: false
 				});

 				newItem.action = "";
 			}
 		}
 		function taskList(){
 			return{
 				restrict: "A",
 				templateUrl: "table.html"
 			}
 		}
 	}
 })();
