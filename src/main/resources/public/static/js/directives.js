    workoutApp.directive("inputField", function () {
        return {
            template: '<div ng-form name="inputform">' +
            '   <div data-ng-if="ngModel !== undefined || inputform.inputname.$error.compareTo || inputform.inputname.$error.required" data-ng-class="{\'required-container\' : $parent.required, \'has-error has-feedback\' : $parent.messages.length >= 1, \'form-group\' : !$parent.inline}">' +
            '	    <label for="{{$parent.id}}" class="control-label" data-ng-class="$parent.labelClass">{{$parent.inputLabel}}</label>' +
            '	    <div data-ng-class="$parent.inputContainerClass" ng-switch on="$parent.inputMask">' +
            '		    <input ng-switch-when="date" maxlength="10" class="date-mask form-control" placeholder="MM-DD-YYYY" id="{{$parent.$parent.id}}" name="inputname" ' +
            '               data-ng-model="$parent.$parent.ngModel" type="{{$parent.$parent.inputType}}" data-ng-reguired="$parent.$parent.required" ' +
            '               data-ng-disabled="$parent.$parent.disabled" data-ng-enter="$parent.$parent.enter();" data-ng-change="$parent.$parent.ngChange()" ' +
            '               data-ng-model-options="{\'updateOn\': $parent.$parent.ngModelOptionOnBlur, \'debounce\': $parent.$parent.ngModelOptionDebounce}">' +

            '		    <input ng-switch-when="password" class="form-control" id="{{$parent.$parent.id}}"  name="inputname" ' +
            '               data-ng-model="$parent.$parent.ngModel" type="password" data-ng-reguired="$parent.$parent.required" ' +
            '               data-ng-disabled="$parent.$parent.disabled" data-ng-enter="$parent.$parent.enter();" data-ng-change="$parent.$parent.ngChange()" ' +
            '               data-ng-model-options="{\'updateOn\': $parent.$parent.ngModelOptionOnBlur, \'debounce\': $parent.$parent.ngModelOptionDebounce}">' +

            '		    <input ng-switch-when="confirmPassword" class="form-control" id="{{$parent.$parent.id}}" name="inputname" ' +
            '               data-ng-model="$parent.$parent.ngModel" type="password" data-ng-reguired="$parent.$parent.required" data-compare-to="$parent.$parent.passwordModel"' +
            '               data-ng-disabled="$parent.$parent.disabled" data-ng-enter="$parent.$parent.enter();" data-ng-change="$parent.$parent.ngChange()" ' +
            '               data-ng-model-options="{\'updateOn\': $parent.$parent.ngModelOptionOnBlur, \'debounce\': $parent.$parent.ngModelOptionDebounce}">' +

            '		    <input ng-switch-default class="form-control {{$parent.$parent.inputSizeClass}}" id="{{$parent.$parent.id}}" name="inputname" data-ng-class="{\'loading\':$parent.$parent.isLoading}" ' +
            '               data-ng-model="$parent.$parent.ngModel" type="{{$parent.$parent.inputType}}" data-ng-reguired="$parent.$parent.required" ' +
            '               data-ng-disabled="$parent.$parent.disabled" maxlength="{{$parent.$parent.inputMaxlength}}" max="{{$parent.$parent.inputMax}}" ' +
            '               min="{{$parent.$parent.inputMin}}" data-ng-enter="$parent.$parent.enter();"  data-ng-change="$parent.$parent.ngChange()" ' +
            '               data-ng-model-options="{\'updateOn\': $parent.$parent.ngModelOptionOnBlur, \'debounce\': $parent.$parent.ngModelOptionDebounce}" data-focus-me="$parent.$parent.focusWhen" >' +
            '		    <span class="glyphicon form-control-feedback" data-ng-class="{\'glyphicon-remove\' : $parent.messages.length >= 1}" aria-hidden="true"></span>' +
            '		    <div ng-show="$parent.messages.length >= 1" class="alert alert-danger margin-top remove-margin-bottom"><p data-ng-repeat="message in $parent.messages">{{message}}</p></div>' +
            '           <div ng-messages="inputform.inputname.$error" class="messages">' +
            '               <div ng-message="compareTo" class="alert alert-danger">Must match the password.</div>' +
            '           </div>' +
            '	    </div>' +
            '   </div>' +
            '</div>',
            replace: true,
            restrict: "A",
            scope: {
                ngModel: "=", //Required - Two Way: object.property
                inputLabel: "@", //Optional: 'string'
                id: "=?", //Optional: 'string'
                inputType: "@?", //Optional: 'string'
                inputMaxlength: "=?", //Optional: 'string'
                inputMin: "=?", //Optional: 'string'
                inputMax: "=?", //Optional: 'string',
                inputSizeClass: '=?', //Optional 'string'
                labelClass: "=?", //Optional: 'string'
                inputContainerClass: "=?", //Optional: 'string'
                required: "=?", //Optional Bool
                disabled: "=?", //Optional Bool,
                inline: "=?", //Optional Bool
                inputMask: "@",
                messages: "=?", //Optional array of messages
                onEnter: '&?', //Optional on enter function
                ngChange: "&?", //optional function to run on-change
                ngModelOptionOnBlur: "=?", //Optional object
                ngModelOptionDebounce: "=?", //Optional object
                isLoading: "=?", //Optional object that will trigger a loading state class on an input,
                focusWhen: "=?", //Optional object that indicates when focus should be set to the input field
                passwordModel: "=?"
            },
            link: function ($scope, element, attrs) {
                $scope.inputType = $scope.inputType || 'text';  //Default input Type to 'text'
                $scope.id = $scope.name || "input-" + Math.floor((Math.random() * 300000) + 1);
                $scope.labelClass = $scope.labelClass || 'col-sm-4'; //4 col default
                $scope.inputContainerClass = $scope.inputContainerClass || 'col-sm-8'; //8 col default
                $scope.enter = function () {
                    $scope.onEnter();
                }
            }
        }

    })
    .directive("textareaField", function () {
        return {
            template: '<div class="form-group" data-ng-if="ngModel !== undefined" data-ng-class="{\'required-container\' : $parent.required, \'has-error has-feedback\' : $parent.messages.length >= 1}">' +
            '	<label for="{{$parent.id}}" class="control-label" data-ng-class="$parent.labelClass">{{$parent.inputLabel}}</label>' +
            '	<div data-ng-class="$parent.inputContainerClass">' +
            '		<textarea class="form-control" id="{{$parent.id}}" data-ng-model="$parent.ngModel" type="{{$parent.inputType}}" data-ng-reguired="$parent.required" data-ng-disabled="$parent.disabled" rows="{{$parent.inputRows}}" maxlength="{{$parent.inputMaxlength}}"></textarea>' +
            '		<span class="glyphicon form-control-feedback" data-ng-class="{\'glyphicon-remove\' : $parent.messages.length >= 1}" aria-hidden="true"></span>' +
            '		<div ng-show="$parent.messages.length >= 1" class="alert alert-danger margin-top remove-margin-bottom"><p data-ng-repeat="message in $parent.messages">{{message}}</p></div>' +
            '	</div>' +
            '</div>',
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
                required: "=?", //Optional Bool
                disabled: "=?", //Optional Bool
                messages: "=?" //Optiona array of messages
            },
            link: function ($scope, element, attrs) {
                $scope.inputRows = $scope.inputRows || '4';  //Default textarea to 4 rows
                $scope.id = $scope.name || "input-" + Math.floor((Math.random() * 300000) + 1);
                $scope.labelClass = $scope.labelClass || 'col-sm-4'; //4 col default
                $scope.inputContainerClass = $scope.inputContainerClass || 'col-sm-8'; //8 col default
            }
        }
    })
    //example: <div data-select-field data-input-label="Resolution Reason" data-ng-model="caseInformation.resolutionReason" data-options="data.resolutionReasons" data-null-option-label="-- Resolution Reason --"></div>
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
    }).directive("compareTo", function() {
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
    });