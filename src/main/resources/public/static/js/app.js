var workoutApp = angular.module('workoutApp', ['ngRoute', 'ui.bootstrap']);

(function() {
    workoutApp.config(['$routeProvider', '$locationProvider',
        function($routeProvider, $locationProvider) {
            "use strict";

            $routeProvider.when('/home', {
                templateUrl: '/workout/static/html/workout/workout.html',
                controller: 'WorkoutController'
            }).when('/home', {
                templateUrl: '/workout/static/html/workout/workout.html',
                controller: 'WorkoutController'
            }).when('/admin', {
                templateUrl: '/workout/static/html/admin/admin.html',
                controller: 'AdminController'
                /*resolve: {
                    agencySearchResults:['agencySearchFactory', function(agencySearchFactory) {
                        return agencySearchFactory.searchForAgencies();
                    }]
                }*/
            }).otherwise({
                redirectTo: '/home'
            });

            //Angular will use the HTML5 browser history when available, otherwise revert back to the
            //hashbang method maintaining browser history for non HTML 5 browser
            $locationProvider.html5Mode(true);
        }
    ]);

    workoutApp.controller('TabsController', ['$scope', '$location',
        function($scope, $location) {
            "use strict";

            $scope.tabs = [
                {link: 'home', label: 'Home'},
                {link: 'admin', label: 'Add a workout type'}
            ];

            $scope.navigateToTab = function(link) {
                $location.path(link);
            };
        }
    ]);

    workoutApp.controller('WorkoutController', ['$scope', 'WorkoutCategoryFactory', 'WorkoutFactory',
        function($scope, WorkoutCategoryFactory, WorkoutFactory) {
            "use strict";

            $scope.workoutCategories = [];
            WorkoutCategoryFactory.retrieveWorkoutCategories().then(function(response) {
                $scope.workoutCategories = response.data;
            });

            $scope.workouts = [];
            WorkoutFactory.retrieveWorkouts().then(function(response) {
                $scope.workouts = response.data;
            });

            $scope.workout = {"date": "", "description": "", "duration": "", "distance": "", "workoutType": "", "workoutCategory":""};
            $scope.addWorkout = function(workout) {
                console.log(workout);
                /*WorkoutFactory.addWorkout(workout).then(function(response) {
                 $scope.workout = {"date": "", "description": "", "duration": "", "distance": "", "workoutType": "", "workoutCategory":""};
                });*/
            };
        }
    ]);

    workoutApp.factory('WorkoutFactory', ['$http',
        function($http) {
            return {
                retrieveWorkouts: function() {
                    return $http.get("/workout/rest/workout");
                },
                addWorkout: function(workout) {
                    return $http.post("/workout/rest/workout", workout);
                }
            };
        }
    ]);

    workoutApp.controller('AdminController', ['$scope', '$http', '$filter', 'WorkoutCategoryFactory',
        function($scope, $http, $filter, WorkoutCategoryFactory) {
            "use strict";
            $scope.workoutCategories = [];
            WorkoutCategoryFactory.retrieveWorkoutCategories().then(function(response) {
               $scope.workoutCategories = response.data;
               angular.forEach($scope.workoutCategories, function(workoutCategory) {
                   workoutCategory.newWorkoutType = {"description": ""};
                   workoutCategory.collapseTypes = true;
               });
            });

            $scope.workoutCategory = {"description": ""};
            $scope.addWorkoutCategory = function(workoutType) {
                WorkoutCategoryFactory.addWorkoutCategory(workoutType).then(function(response) {
                   response.data.newWorkoutType = {"description": ""};
                   response.data.collapseTypes = true;
                   $scope.workoutCategories.push(response.data);
                   $scope.workoutCategory = {"description": ""}; //clear the form
               });
            };

            $scope.addWorkoutType = function(workoutCategory) {
                var workoutType = {"id": workoutCategory.workoutTypes.length + 1};
                workoutType.description = workoutCategory.newWorkoutType.description;
                workoutCategory.workoutTypes.push(workoutType);

                var submitWorkoutCategory = angular.copy(workoutCategory);
                delete submitWorkoutCategory.newWorkoutType;
                delete submitWorkoutCategory.collapseTypes;
                WorkoutCategoryFactory.addWorkoutTypeToCategory(submitWorkoutCategory).then(function(response) {
                    var workoutCategory = response.data;
                    workoutCategory.newWorkoutType = {"description": ""};
                    $scope.workoutCategories[$filter('findIndexById')($scope.workoutCategories, workoutCategory.id)] = workoutCategory;
                });
            };
        }
    ]);

    workoutApp.factory('WorkoutCategoryFactory', ['$http',
        function($http) {
            return {
                retrieveWorkoutCategories: function() {
                    return $http.get("/workout/rest/workout-category");
                },
                addWorkoutCategory: function(workoutCategory) {
                    return $http.post("/workout/rest/workout-category", workoutCategory);
                },
                addWorkoutTypeToCategory: function(workoutCategory) {
                    return $http.put("/workout/rest/workout-category/" + workoutCategory.id, workoutCategory);
                }
            };
        }
    ]);

    workoutApp.filter('findById', [
        function() {
            return function(input, id) {
                for (var i = 0; i < input.length; i++) {
                    if(+input[i].id === +id) {
                        return input[i];
                    }
                }
                return null;
            };
        }
    ]);
    workoutApp.filter('findIndexById', [
        function() {
            return function(input, id) {
                for (var i = 0; i < input.length; i++) {
                    if(+input[i].id === +id) {
                        return i;
                    }
                }
                return null;
            };
        }
    ]);

})();