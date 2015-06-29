var workoutApp = angular.module('workoutApp', ['ngRoute', 'ngMessages', 'ui.bootstrap', 'ui.mask', 'daterangepicker']);

(function() {
    workoutApp.config(['$routeProvider', '$locationProvider',
        function($routeProvider, $locationProvider) {
            "use strict";

            angular.isUndefinedOrNullOrEmpty = function(val) {
                if (angular.isUndefined(val) || val === null) {
                    return true;
                }
                return val === '';
            };
            angular.isNotUndefinedOrNullOrEmpty = function(val) {
                return !angular.isUndefinedOrNullOrEmpty(val);
            };

            $routeProvider.when('/', {
                templateUrl: '/workout/static/html/login/login.html',
                controller: 'LoginController'
            }).when('/new-user', {
                templateUrl: '/workout/static/html/login/newUser.html',
                controller: 'NewUserController'
            }).when('/workoutCategory', {
                templateUrl: '/workout/static/html/workoutCategory/workoutCategory.html',
                controller: 'WorkoutCategoryController',
                resolve: {
                    workoutCategories:['WorkoutCategoryFactory', function(WorkoutCategoryFactory) {
                        return WorkoutCategoryFactory.retrieveWorkoutCategories();
                    }]
                }
            }).when('/workout-history', {
                templateUrl: '/workout/static/html/workout/workoutHistory.html',
                controller: 'WorkoutHistoryController',
                resolve: {
                    workouts:['WorkoutFactory', function(WorkoutFactory) {
                        return WorkoutFactory.retrieveWorkouts();
                    }]
                }
            }).otherwise({
                redirectTo: '/'
            });

            //Angular will use the HTML5 browser history when available, otherwise revert back to the
            //hashbang method maintaining browser history for non HTML 5 browser
            $locationProvider.html5Mode(true);
        }
    ]);

    workoutApp.controller('LoginController', ['$scope', '$location',
        function($scope) {
            "use strict";
            $scope.user = {
                userName: '',
                password: ''
            };

            $scope.login = function() {
                //TODO Call database and see if password is correct
                console.log("logging in with user:" + $scope.user.userName + " and password: " + $scope.user.password);
            };
        }
    ]);

    workoutApp.controller('NewUserController', ['$scope', '$location',
        function($scope) {
            "use strict";
            $scope.newUser = {
                userName: '',
                password: '',
                confirmPassword: '',
                email: '',
                phone: ''
            };

            $scope.register = function() {
                //TODO Call database and see if password is correct
                console.log("Adding user");
                console.log($scope.newUser);
            };
        }
    ]);

    workoutApp.controller('TabsController', ['$scope', '$location',
        function($scope, $location) {
            "use strict";

            $scope.tabs = [
                {link: '', label: 'Workout Categories', active: true},
                {link: 'workout-history', label: 'Workout History', active: false},
                {link: 'workout-progress', label: 'Workout Progress', active: false}
            ];

            $scope.setTabActive = function(link) {
                angular.forEach($scope.tabs, function(tab) {
                    tab.active = angular.equals(tab.link, link);
                });
            };

            $scope.navigateToTab = function(link) {
                $location.path(link);
            };
        }
    ]);

    workoutApp.controller('WorkoutCategoryController', ['$scope', '$http', '$filter', '$location', '$modal', 'WorkoutCategoryFactory', 'workoutCategories',
        function($scope, $http, $filter, $location, $modal, WorkoutCategoryFactory, workoutCategories) {
            "use strict";
            $scope.workoutCategories = workoutCategories;
            angular.forEach($scope.workoutCategories, function(workoutCategory) {
                workoutCategory.newWorkoutType = {"description": ""};
                workoutCategory.collapseTypes = true;
            });

            $scope.workoutCategory = {"description": ""};
            $scope.addWorkoutCategory = function(workoutCategory) {
                WorkoutCategoryFactory.addWorkoutCategory(workoutCategory).then(function(response) {
                   response.data.newWorkoutType = {"description": ""};
                   response.data.collapseTypes = true;
                   $scope.workoutCategories.push(response.data);
                   $scope.workoutCategory = {"description": ""}; //clear the form
               });
            };

            $scope.deleteWorkoutCategory = function(workoutCategory) {
                WorkoutCategoryFactory.deleteWorkoutCategory(workoutCategory).then(function(response) {
                    $scope.workoutCategories.splice($filter('findIndexById')($scope.workoutCategories, workoutCategory.id), 1);
                });
            };

            $scope.addWorkoutType = function(workoutCategory) {
                var workoutType = {"id": workoutCategory.workoutTypes.length + 1};
                workoutType.description = workoutCategory.newWorkoutType.description;
                workoutCategory.workoutTypes.push(workoutType);

                var submitWorkoutCategory = angular.copy(workoutCategory);
                delete submitWorkoutCategory.newWorkoutType;
                delete submitWorkoutCategory.collapseTypes;
                WorkoutCategoryFactory.updateWorkoutTypeToCategory(submitWorkoutCategory).then(
                    function(response) {
                        var workoutCategory = response.data;
                        workoutCategory.newWorkoutType = {"description": ""};
                        $scope.workoutCategories[$filter('findIndexById')($scope.workoutCategories, workoutCategory.id)] = workoutCategory;
                    });
            };
            $scope.deleteWorkoutType = function(workoutCategory, workoutType) {
                var workoutCategoryId = $filter('findIndexById')($scope.workoutCategories, workoutCategory.id);
                var workoutTypeId = $filter('findIndexById')($scope.workoutCategory.workoutTypes, workoutType.id);

                var submitWorkoutCategory = angular.copy(workoutCategory);
                delete submitWorkoutCategory.newWorkoutType;
                delete submitWorkoutCategory.collapseTypes;
                submitWorkoutCategory.workoutTypes.splice(workoutTypeId, 1);
                WorkoutCategoryFactory.updateWorkoutTypeToCategory(submitWorkoutCategory).then(
                    function(response) {
                        $scope.workoutCategories[workoutCategoryId].workoutTypes.splice(workoutTypeId, 1);
                    });
            };

            //Add work out modal
            $scope.openAddWorkoutModal = function (workoutCategory, workoutType) {
                $modal.open({
                    templateUrl: '/workout/static/html/workout/workout.html',
                    controller: 'WorkoutController',
                    size: 'lg',
                    resolve: {
                        workoutCategories:['WorkoutCategoryFactory', function(WorkoutCategoryFactory) {
                            return WorkoutCategoryFactory.retrieveWorkoutCategories();
                        }],
                        workoutCategory:[function(){ return workoutCategory.description }],
                        workoutType:[function(){ return workoutType.description }]
                    }
                });
            };
        }
    ]);

    workoutApp.factory('WorkoutCategoryFactory', ['$http', '$log', '$q',
        function($http, $log, $q) {
            var deferred = $q.defer();
            return {
                retrieveWorkoutCategories: function() {
                    $http.get("/workout/rest/workout-category")
                        .success(function(data) {
                            deferred.resolve(data);
                        }).error(function(msg, code) {
                            deferred.reject(msg);
                            $log.error(msg, code);
                        });
                    return deferred.promise;
                },
                addWorkoutCategory: function(workoutCategory) {
                    return $http.post("/workout/rest/workout-category", workoutCategory);
                },
                updateWorkoutTypeToCategory: function(workoutCategory) {
                    return $http.put("/workout/rest/workout-category/" + workoutCategory.id, workoutCategory);
                },
                deleteWorkoutCategory: function(workoutCategory) {
                    return $http.delete("/workout/rest/workout-category/" + workoutCategory.id);
                }
            };
        }
    ]);

    workoutApp.controller('WorkoutController', ['$scope', '$filter', '$routeParams', '$location', '$modalInstance', 'WorkoutCategoryFactory', 'WorkoutFactory', 'workoutCategories', 'workoutCategory', 'workoutType',
        function($scope, $filter, $routeParams, $location, $modalInstance, WorkoutCategoryFactory, WorkoutFactory, workoutCategories, workoutCategory, workoutType) {
            "use strict";
            $scope.workout = {"date": new Date(), "description": "", "duration": "", "distance": ""};
            $scope.workoutCategories = workoutCategories;
            $scope.workout.workoutCategory = $filter('findByDescription')($scope.workoutCategories, workoutCategory);
            $scope.workout.workoutType = $filter('findByDescription')($scope.workout.workoutCategory.workoutTypes, workoutType);

            $scope.strengthExercise = {"exercise": "", "reps": "", "sets": "", "maxOut": false};

            $scope.workout.strengthExercises = [];
            $scope.addExercise = function() {
                $scope.workout.strengthExercises.push(angular.copy($scope.strengthExercise));
            };
            $scope.addWorkout = function(workout) {
                var submitWorkout = angular.copy(workout);
                submitWorkout.workoutCategory = {id: workout.workoutCategory.id, description: workout.workoutCategory.description};
                submitWorkout.workoutType = {id: workout.workoutType.id, description: workout.workoutType.description};
                WorkoutFactory.addWorkout(submitWorkout)
                    .success(function(response) {
                        $modalInstance.close(response);
                        $scope.workout = {"date": new Date(), "description": "", "duration": "", "distance": ""};
                     })
                    .error(function(response) {
                        $scope.errors = response.data;
                    });
            };

            $scope.closeWorkoutModal = function() {
                $modalInstance.dismiss('cancel');
            };
        }
    ]);

    workoutApp.controller('WorkoutHistoryController', ['$scope', '$filter', 'WorkoutFactory', 'workouts',
        function($scope, $filter, WorkoutFactory, workouts) {
            "use strict";
            $scope.workouts = workouts;
            $scope.filteredWorkouts = angular.copy(workouts);

            $scope.viewByOptions = [{'display': 'Date', 'selected': true}, {'display': 'Workout Type', 'selected': false}];

            $scope.setViewBy = function(pViewByOption) {
                angular.forEach($scope.viewByOptions, function(viewByOption) {
                    viewByOption.selected = angular.equals(viewByOption, pViewByOption)
                })
            };

            $scope.dateRangeOptions = {
                ranges: {
                    'Last 3 Months':  [moment().startOf('month').subtract('months', 2),  moment().endOf('month')],
                    'Last 6 Months':  [moment().startOf('month').subtract('months', 5),  moment().endOf('month')],
                    'Last 12 Months': [moment().startOf('month').subtract('months', 11), moment().endOf('month')],
                    'This Year': [moment().startOf('year'), moment().endOf('year')],
                    'All' : [moment('01-01-2000', 'MM-DD-YYYY'), moment('12-31-2999', 'MM-DD-YYYY')]
                },
                format: 'MM-DD-YYYY',
                separator: ' to '
            };

            $scope.filters = {date: {startDate: null, endDate: null} };
            $scope.defaultFilters = angular.copy($scope.filters);
            $scope.$watch('filters',
                function (newFilters, oldFilters) {
                    if (angular.equals(newFilters, oldFilters)) { return; } //only filter if things actually changed

                    $scope.filteredWorkouts = angular.copy($scope.workouts);
                    $scope.filteredWorkouts = $filter('WorkoutFilter')($scope.filteredWorkouts, $scope.filters);
                },
                true
            );
            $scope.clearFilter = function(filterName) {
                $scope.filters[filterName] = $scope.defaultFilters[filterName];
            };
            $scope.isBeingFilteredBy = function(filterName) {
                return !angular.equals($scope.filters[filterName], $scope.defaultFilters[filterName]);
            };
        }
    ]);

    workoutApp.filter('WorkoutFilter', [
        function() {
            return function (workouts, filters) {
                if (angular.isNotUndefinedOrNullOrEmpty(filters.date.startDate) && angular.isNotUndefinedOrNullOrEmpty(filters.date.endDate)) {
                    var results = [];
                    angular.forEach(workouts, function(workout) {
                        //Subtract 1 day from the start and add 1 day to the end to make the range inclusive the selected date start and end dates
                        if (moment(workout.date).isAfter(moment(filters.date.startDate).subtract(1, 'day'), 'day') &&
                            moment(workout.date).isBefore(moment(filters.date.endDate).add(1, 'day'), 'day')) {
                            this.push(workout);
                        }
                    }, results);
                    return results;
                }
                return workouts;
            };
        }
    ]);

    workoutApp.factory('WorkoutFactory', ['$http', '$q', '$log',
        function($http, $q, $log) {
            var deferred = $q.defer();
            return {
                retrieveWorkouts: function() {
                    $http.get("/workout/rest/workout")
                        .success(function(data) {
                            deferred.resolve(data);
                        }).error(function(msg, code) {
                            deferred.reject(msg);
                            $log.error(msg, code);
                        });
                    return deferred.promise;
                },
                addWorkout: function(workout) {
                    return $http.post("/workout/rest/workout", workout);
                }
            };
        }
    ]);

    workoutApp.filter('findIndexById', [
        function() {
            var index = null;
            return function(collection, id) {
                angular.forEach(collection, function(item, i) {
                   if (angular.equals(item.id, id)) {
                       return index = i;
                   }
                });
                return index;
            };
        }
    ]);

    workoutApp.filter('findByDescription', [
        function() {
            var returnedItem = null;
            return function(collection, description) {
                angular.forEach(collection, function(item) {
                    if (angular.equals(item.description, description)) {
                        return returnedItem = item;
                    }
                });
                return returnedItem;
            };
        }
    ]);
})();