var workoutApp = angular.module('workoutApp', ['ngRoute']);

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

    workoutApp.controller('TabsController', ['$scope',
        function($scope) {
            "use strict";

            $scope.tabs = [
                {link: 'home', label: 'Home'},
                {link: 'admin', label: 'Add a workout type'}
            ];

            $scope.selectedTab = $scope.tabs[0];
            $scope.setSelectedTab = function (tab) {
                $scope.selectedTab = tab;
            }
        }
    ]);

    workoutApp.controller('WorkoutController', ['$scope', 'WorkoutTypeFactory', 'WorkoutFactory',
        function($scope, WorkoutTypeFactory, WorkoutFactory) {
            "use strict";

            $scope.workoutTypes = [];
            WorkoutTypeFactory.retrieveWorkoutTypes().then(function(response) {
                $scope.workoutTypes = response.data;
            });

            $scope.workouts = [];
            WorkoutFactory.retrieveWorkouts().then(function(response) {
                $scope.workouts = response.data;
            });

            $scope.workout = {"date": "", "description": "", "duration": "", "distance": "", "workoutType": {}};
            $scope.addWorkout = function(workout) {
                console.log(workout);
                /*WorkoutFactory.addWorkout(workout).then(function(response) {
                    $scope.workout = {"date": "", "description": "", "duration": "", "distance": "", "workoutType": {}};
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

    workoutApp.controller('AdminController', ['$scope', '$http', 'WorkoutTypeFactory',
        function($scope, $http, WorkoutTypeFactory) {
            "use strict";
            $scope.workoutTypes = [];
            WorkoutTypeFactory.retrieveWorkoutTypes().then(function(response) {
               $scope.workoutTypes = response.data;
            });

            $scope.workoutType = {"description": ""};
            $scope.addWorkoutType = function(workoutType) {
                WorkoutTypeFactory.addWorkoutType(workoutType).then(function(response) {
                   $scope.workoutTypes.push(response.data);
                   $scope.workoutType = {"description": ""}; //clear the form
               });
            }
        }
    ]);

    workoutApp.factory('WorkoutTypeFactory', ['$http',
        function($http) {
            return {
                retrieveWorkoutTypes: function() {
                    return $http.get("/workout/rest/workout-type");
                },
                addWorkoutType: function(workoutType) {
                    return $http.post("/workout/rest/workout-type", workoutType);
                }
            };
        }
    ]);

})();