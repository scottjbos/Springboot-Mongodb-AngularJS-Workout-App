    workoutApp.directive("inputField", function () {
        return {
            template:'<div ng-form name="inputform">' +
            '   <div data-ng-class="{\'required-container\' : required, \'has-error has-feedback\' : messages.length >= 1 || (inputform.inputname.$invalid && inputform.inputname.$dirty), \'form-group\' : !inline,  \'has-success has-feedback\': showFeedBack && inputform.inputname.$valid && inputform.inputname.$dirty && ngModel !== \'\'}">' +
            '	    <label for="{{id}}" class="control-label" data-ng-class="labelClass">{{inputLabel}}</label>' +
            '	    <div data-ng-class="inputContainerClass" ng-switch on="inputMask">' +
            '		    <input ng-switch-when="date" maxlength="10" class="date-mask form-control" placeholder="MM-DD-YYYY" id="{{$parent.id}}" name="inputname" ' +
            '               data-ng-model="$parent.ngModel" type="{{$parent.inputType}}" data-ng-reguired="$parent.required" data-ng-enter="$parent.enter();"' +
            '               data-ng-disabled="$parent.disabled" data-ng-change="$parent.ngChange()" ng-minlength="$parent.inputMin" ' +
            '               data-ng-model-options="{\'updateOn\': $parent.ngModelOptionOnBlur, \'debounce\': $parent.ngModelOptionDebounce}"/>' +

            '		    <input ng-switch-when="password" class="form-control" id="{{$parent.id}}"  name="inputname" ' +
            '               data-ng-model="$parent.ngModel" type="password" data-ng-reguired="$parent.required" data-ng-enter="$parent.enter();"' +
            '               data-ng-disabled="$parent.disabled" data-ng-change="$parent.ngChange()" ng-minlength="$parent.inputMin" ' +
            '               data-ng-model-options="{\'updateOn\': $parent.ngModelOptionOnBlur, \'debounce\': $parent.ngModelOptionDebounce}"/>' +

            '		    <input ng-switch-when="confirmPassword" class="form-control" id="{{$parent.id}}" name="inputname" ' +
            '               data-ng-model="$parent.ngModel" type="password" data-ng-reguired="$parent.required" data-compare-to="$parent.passwordModel" data-ng-enter="$parent.enter();"' +
            '               data-ng-disabled="$parent.disabled" data-ng-change="$parent.ngChange()" ng-minlength="$parent.inputMin" ' +
            '               data-ng-model-options="{\'updateOn\': $parent.ngModelOptionOnBlur, \'debounce\': $parent.ngModelOptionDebounce}"/>' +

            '		    <input ng-switch-when="telephone" class="form-control" id="{{$parent.id}}" name="inputname" placeholder="(999) 999-9999" ui-mask="(999) 999-9999" ' +
            '               data-ng-model="$parent.ngModel" type="text" data-ng-reguired="$parent.required" data-ng-enter="$parent.enter();"' +
            '               data-ng-disabled="$parent.disabled" data-ng-change="$parent.ngChange()" ng-minlength="$parent.inputMin" ' +
            '               data-ng-model-options="{\'updateOn\': $parent.ngModelOptionOnBlur, \'debounce\': $parent.ngModelOptionDebounce}"/>' +

            '		    <input ng-switch-default class="form-control {{$parent.inputSizeClass}}" id="{{$parent.id}}" name="inputname" data-ng-class="{\'loading\':$parent.isLoading}" ' +
            '               data-ng-model="$parent.ngModel" type="{{$parent.inputType}}" data-ng-reguired="$parent.required" ' +
            '               data-ng-disabled="$parent.disabled" maxlength="{{$parent.inputMax}}" data-ng-enter="$parent.enter();" ' +
            '               ng-minlength="$parent.inputMin" data-ng-change="$parent.ngChange()" ' +
            '               data-ng-model-options="{\'updateOn\': $parent.ngModelOptionOnBlur, \'debounce\': $parent.ngModelOptionDebounce}"/>' +
            '			<span class="form-control-feedback" aria-hidden="true" data-ng-show="showFeedBack">' +
            '				<i class="glyphicon" data-ng-class="{\'glyphicon-remove\' : inputform.inputname.$error.compareTo || inputform.inputname.$error.email || inputform.inputname.$error.mask, \'glyphicon-ok\': inputform.inputname.$valid && inputform.inputname.$dirty && ngModel !== \'\'}"></i>' +
            '			</span>' +
            '		    <div ng-show="messages.length >= 1" class="alert alert-danger margin-top remove-margin-bottom"><p data-ng-repeat="message in messages">{{message}}</p></div>' +
            '           <div ng-messages="inputform.inputname.$error" class="messages">' +
            '               <div ng-message="compareTo" class="alert alert-danger margin-top remove-margin-bottom">Must match the password.</div>' +
            '               <div ng-message="email" class="alert alert-danger margin-top remove-margin-bottom">Invalid Email.</div>' +
            '               <div ng-message="mask" class="alert alert-danger margin-top remove-margin-bottom">Invalid Phone Number.</div>' +
            '				<div ng-message="minlength" class="alert alert-danger margin-top remove-margin-bottom">{{$parent.inputLabel}} too short.</div>' +
            '           </div>' +
            '	    </div>' +
            '   </div>' +
            '</div>',
            require: '^?bosForm', //Optionally require a form directive
            replace: true,
            restrict: "A",
            scope: {
                ngModel: "=", //Required - Two Way: object.property
                inputLabel: "@", //Optional: 'string'
                id: "=?", //Optional: 'string'
                name: "@?", //Optional: 'string'
                inputType: "@?", //Optional: 'string'
                inputName: "@?", //Optional: 'string'
                inputMaxlength: "=?", //Optional: 'string'
                inputMin: "=?", //Optional: 'string'
                inputMax: "=?", //Optional: 'string',
                inputSizeClass: '=?', //Optional 'string'
                labelClass: "=?", //Optional: 'string'
                inputContainerClass: "=?", //Optional: 'string'
                onEnter: '&?', //Optional on enter function
                required: "=?", //Optional Bool
                disabled: "=?", //Optional Bool,
                inline: "=?", //Optional Bool
                inputMask: "@",
                messages: "=?", //Optional array of messages
                ngChange: "&?", //optional function to run on-change
                ngModelOptionOnBlur: "=?", //Optional object
                ngModelOptionDebounce: "=?", //Optional object
                isLoading: "=?", //Optional object that will trigger a loading state class on an input,
                focusWhen: "=?", //Optional object that indicates when focus should be set to the input field
                passwordModel: "=?"
            },
            link: function ($scope, element, attrs, formController) {
                $scope.inputType = $scope.inputType || 'text';  //Default input Type to 'text'
                $scope.inputName = $scope.inputName || "input-" + Math.floor((Math.random() * 300000) + 1);
                $scope.errorMessageString = "formname." + $scope.inputName + ".$error";
                $scope.id = $scope.inputName;
                $scope.labelClass = $scope.labelClass || 'col-sm-4'; //4 col default
                $scope.inputContainerClass = $scope.inputContainerClass || 'col-sm-8'; //8 col default
                //$scope.inputErrorMessage = 'inputform.' + $scope.inputName + '.$error';

                $scope.enter = function() {
                    //If on Enter is defined for input use that
                    if (angular.isFunction($scope.onEnter)) {
                        $scope.onEnter();
                    } else if (angular.isFunction(formController.submitForm)) {
                        formController.submitForm();
                    }
                };
                $scope.showFeedBack = angular.equals($scope.inputType, 'email') ||
                    angular.equals($scope.inputMask, 'password') ||
                    angular.equals($scope.inputMask, 'confirmPassword') ||
                    angular.equals($scope.inputMask, 'telephone') ||
                    angular.isNotUndefinedOrNullOrEmpty($scope.inputMin)
            }
        }

    })
    .directive("textareaField", function () {
        return {
            template: '<div class="form-group" data-ng-class="{\'required-container\' : $parent.required, \'has-error has-feedback\' : messages.length >= 1}">' +
            '	<label for="{{id}}" class="control-label" data-ng-class="labelClass">{{inputLabel}}</label>' +
            '	<div data-ng-class="inputContainerClass">' +
            '		<textarea class="form-control" id="{{id}}" data-ng-model="ngModel" type="{{inputType}}" data-ng-reguired="required" data-ng-disabled="disabled" rows="{{inputRows}}" maxlength="{{inputMaxlength}}" data-ng-enter="enter()" ></textarea>' +
            '		<span class="glyphicon form-control-feedback" data-ng-class="{\'glyphicon-remove\' : messages.length >= 1}" aria-hidden="true"></span>' +
            '		<div ng-show="messages.length >= 1" class="alert alert-danger margin-top remove-margin-bottom"><p data-ng-repeat="message in messages">{{message}}</p></div>' +
            '	</div>' +
            '</div>',
            require: '^?bosForm', //Optionally require a form directive
            replace: true,
            restrict: "A",
            scope: {
                ngModel: "=", //Required - Two Way: object.property
                inputLabel: "@", //Optional: 'string'
                id: "=?", //Optional: 'string'
                inputRows: "=?", //Optional: 'string'
                inputMaxlength: "=?", //Optional: 'string'
                labelClass: "=?", //Optional: 'string'
                inputContainerClass: "=?", //Optional: 'string'
                onEnter: '&?', //Optional on enter function
                required: "=?", //Optional Bool
                disabled: "=?", //Optional Bool
                messages: "=?" //Optiona array of messages
            },
            link: function ($scope, element, attrs, formController) {
                $scope.inputRows = $scope.inputRows || '4';  //Default textarea to 4 rows
                $scope.id = $scope.name || "input-" + Math.floor((Math.random() * 300000) + 1);
                $scope.labelClass = $scope.labelClass || 'col-sm-4'; //4 col default
                $scope.inputContainerClass = $scope.inputContainerClass || 'col-sm-8'; //8 col default

                $scope.enter = function() {
                    //If on Enter is defined for input use that
                    if (angular.isFunction($scope.onEnter)) {
                        $scope.onEnter();
                    } else if (angular.isFunction(formController.submitForm)) {
                        formController.submitForm();
                    }
                };
            }
        }
    })
    .directive("selectField", function () {
        return {
            template: '<div class="form-group" data-ng-class="{\'required-container\' : required, \'has-error has-feedback\' : messages.length >= 1}">' +
            '	<label class="control-label" data-ng-class="labelClass">{{inputLabel}}</label>' +
            '	<div data-ng-class="inputContainerClass">' +
            '       <select class="form-control" id="id" data-ng-model="ngModel" data-ng-init="ngModel = ngModel || options[0]" data-ng-options="option[optionLabel] for option in options | orderBy:optionLabel track by option[optionId]" data-ng-reguired="required" data-ng-disabled="disabled">' +
            '			<option value="" data-ng-cloak>{{nullOptionLabel}}</option>' +
            '		</select>' +
            '		<span class="glyphicon form-control-feedback inset-control-feedback" data-ng-class="{\'glyphicon-remove\' : messages.length >= 1}" aria-hidden="true"></span>' +
            '		<div ng-show="messages.length >= 1" class="alert alert-danger margin-top remove-margin-bottom"><p data-ng-repeat="message in messages">{{message}}</p></div>' +
            '	</div>' +
            '</div>',
            restrict: "A",
            replace: true,
            scope: {
                ngModel: "=", //Required - Two Way
                options: "=", //Object
                optionId: "@",
                optionLabel: "@",
                nullOptionLabel: "@", //Optional
                inputLabel: "@", //Optional
                id: "=?", //Optional: 'string'
                inputType: "@", //Optional
                labelClass: "=?", //Optional String
                inputContainerClass: "=?", //Optional String
                required: "=?",
                disabled: "=?",
                messages: "=?"
            },
            link: function ($scope) {
                $scope.id = $scope.id || "input-" + Math.floor((Math.random() * 300000) + 1);
                $scope.labelClass = $scope.labelClass || 'col-sm-4'; //4 col default
                $scope.optionId = $scope.optionId || 'id'; //tracking the collection by the id property
                $scope.inputContainerClass = $scope.inputContainerClass || 'col-sm-8'; //8 col default
            }
        }
    }).directive("checkboxField", function () {
        return {
            template: '<div data-ng-if="ngModel !== undefined" data-ng-class="{\'required-container\' : $parent.required, \'has-error has-feedback\' : $parent.messages.length >= 1, \'form-group\' : !$parent.inline}">' +
            '	<div class="checkbox" data-ng-class="$parent.inputContainerClass">' +
            '	    <label> ' +
            '			<input id="{{$parent.id}}" data-ng-class="{\'loading\':$parent.isLoading}" ' +
            '           	data-ng-model="$parent.ngModel" type="checkbox" data-ng-reguired="$parent.required" ' +
            '           	data-ng-disabled="$parent.disabled" data-ng-change="$parent.ngChange()" ' +
            '           	data-focus-me="$parent.focusWhen" />' +
            '           {{$parent.inputLabel}}' +
            '      </label> ' +
            '		<span class="glyphicon form-control-feedback" data-ng-class="{\'glyphicon-remove\' : $parent.messages.length >= 1}" aria-hidden="true"></span>' +
            '		<div ng-show="$parent.messages.length >= 1" class="alert alert-danger margin-top remove-margin-bottom"><p data-ng-repeat="message in $parent.messages">{{message}}</p></div>' +
            '	</div>' +
            '</div>',
            restrict: "A",
            replace: true,
            scope: {
                ngModel: "=", //Required - Two Way
                options: "=", //Object
                optionId: "@",
                optionLabel: "@",
                nullOptionLabel: "@", //Optional
                inputLabel: "@", //Optional
                inline: "=?", //Optional Bool
                id: "=?", //Optional: 'string'
                inputType: "@", //Optional
                labelClass: "=?", //Optional String
                inputContainerClass: "=?", //Optional String
                required: "=?",
                disabled: "=?",
                messages: "=?"
            },
            link: function ($scope) {
                $scope.id = $scope.id || "input-" + Math.floor((Math.random() * 300000) + 1);
                $scope.optionId = $scope.optionId || 'id'; //tracking the collection by the id property
                $scope.inputContainerClass = $scope.inputContainerClass || 'col-sm-3 col-md-3'; //8 col default
            }
        }
    })
    .directive("compareTo", function() {
            return {
                require: "ngModel",
                scope: {
                    otherModelValue: "=compareTo"
                },
                link: function(scope, element, attributes, ngModel) {

                    ngModel.$validators.compareTo = function(modelValue) {
                        return modelValue == scope.otherModelValue;
                    };

                    scope.$watch("otherModelValue", function() {
                        ngModel.$validate();
                    });
                }
            };
    })
    .directive('ngEnter', [
        function () {
            return {
                controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {
                    $element.bind("keydown keypress", function (event) {
                        if (event.which === 13) {
                            $scope.$apply(function () {
                                $scope.$eval($attrs.ngEnter, {'event': event});
                            });
                            event.preventDefault();
                        }
                    });
                }]
            }
        }
    ])
    .directive('bosForm', [
        function () {
            return {
                restrict: 'A',
                scope: {
                    formName: '@', //Required form name
                    onFormSubmit: '&' //Required on form submit function
                },
                controller: function($scope) {
                    this.submitForm = function() {
                        if (angular.isFunction($scope.onFormSubmit)) {
                            $scope.onFormSubmit();
                        }
                    }
                }
            };
        }
    ])
    .directive('submitButton', [
        function() {
            return {
                require: '^?bosForm', //Optionally require a form directive
                scope: {
                    buttonText: '@',
                    disableButton: '=?'
                },
                template:
                '<button class="btn btn-primary" data-ng-disabled="disableButton" data-ng-click="submit()">{{buttonText}}</button>',
                link: function ($scope, element, attrs, formController) {
                    $scope.formName = formController.formName;
                    $scope.submit = function() {
                        if (angular.isFunction(formController.submitForm)) {
                            formController.submitForm();
                        }
                    };
                }
            };
        }
    ]);