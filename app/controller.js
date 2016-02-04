var app = angular.module('mainApp', []);

app.provider('date', function(){
	var greet;
	return{
		setGreeting: function(value){
			greet = value;
		},
		$get: function() {
			return {
				showDate: function(){
					var date = new Date();
					return greet 
				},
				devshowDate: function(){
					var date = new Date();
					return date.getHours();
				}
			}
		}
	}
});

app.config(function(dateProvider){
	var time = dateProvider.$get().devshowDate();
		if(time > 0 && time < 12){
			dateProvider.setGreeting("Good Morning!");
		} else if (time >= 12 && time < 17){
			dateProvider.setGreeting("Good Afternoon!");
		} else if (time >= 17 && time < 21) {
			dateProvider.setGreeting("Good Evening!");
		} else {
			dateProvider.setGreeting("Good Night!");
		}
})

app.controller('app', function($scope, date){
	$scope.tasks = [];
	$scope.date = new Date();
	$scope.greetMessage = date.showDate();

	var taskData = localStorage['tasksList'];

	if(taskData !== undefined ){
		$scope.tasks = JSON.parse(taskData);
	}

	$scope.searchEnter = function(){
		if(event.which == 13 && $scope.task != ""){
			$scope.addTask();
		}
	};
	$scope.addTask = function(){
		$scope.tasks.push({'taskMessage':$scope.task, 'status':false, 'time': new Date()});
		console.log($scope.tasks);
		$scope.task = '';
		localStorage['tasksList'] = JSON.stringify($scope.tasks);
		console.log(localStorage);
	};

	$scope.contentEdit = function(msg){
		
		for(i = 0; i < $scope.tasks.length; i++){
			if($scope.tasks[i].taskMessage == msg){
				$scope.tasks[i].taskMessage = event.target.innerText;
			}
		}
		localStorage['tasksList'] = JSON.stringify($scope.tasks);

		console.log($scope.tasks);

		event.target.contentEditable = event.target.contentEditable == "false" ? "true" : "false";
	};
	
	$scope.enterAgain = function(msg){
		if(event.which == 13 && msg != ""){
			$scope.contentEdit(msg);
		}
	}

	$scope.removeTask = function(index){
		$scope.tasks.splice(index, 1);
	};
});