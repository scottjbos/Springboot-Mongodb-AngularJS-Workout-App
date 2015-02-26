    workoutApp.directive("inputField", function () {
        return {
            template: '<div class="form-group" data-ng-if="ngModel !== undefined" data-ng-class="{\'required-container\' : $parent.required, \'has-error has-feedback\' : $parent.messages.length >= 1}">' +
            '	<label for="{{$parent.id}}" class="control-label" data-ng-class="$parent.labelClass">{{$parent.inputLabel}}</label>' +
            '	<div data-ng-class="$parent.inputContainerClass" ng-switch on="$parent.inputMask">' +
            '		<input ng-switch-when="date" maxlength="10" class="date-mask form-control" placeholder="MM-DD-YYYY" id="{{$parent.$parent.id}}" data-ng-model="$parent.$parent.ngModel" type="{{$parent.$parent.inputType}}" data-ng-reguired="$parent.$parent.required" data-ng-disabled="$parent.$parent.disabled" data-ng-enter="$parent.$parent.enter();" data-ng-change="$parent.$parent.ngChange()" data-ng-model-options="{\'updateOn\': $parent.$parent.ngModelOptionOnBlur, \'debounce\': $parent.$parent.ngModelOptionDebounce}">' +
            '		<input ng-switch-default class="form-control" id="{{$parent.$parent.id}}" data-ng-class="{\'loading\':$parent.$parent.isLoading}" data-ng-model="$parent.$parent.ngModel" type="{{$parent.$parent.inputType}}" data-ng-reguired="$parent.$parent.required" data-ng-disabled="$parent.$parent.disabled" maxlength="{{$parent.$parent.inputMaxlength}}" data-ng-enter="$parent.$parent.enter();"  data-ng-change="$parent.$parent.ngChange()" data-ng-model-options="{\'updateOn\': $parent.$parent.ngModelOptionOnBlur, \'debounce\': $parent.$parent.ngModelOptionDebounce}" data-focus-me="$parent.$parent.focusWhen" >' +
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
                inputType: "@?", //Optional: 'string'
                inputMaxlength: "=?", //Optional: 'string'
                labelClass: "=?", //Optional: 'string'
                inputContainerClass: "=?", //Optional: 'string'
                required: "=?", //Optional Bool
                disabled: "=?", //Optional Bool
                inputMask: "@",
                messages: "=?", //Optional array of messages
                onEnter: '&?', //Optional on enter function
                ngChange: "&?", //optional function to run on-change
                ngModelOptionOnBlur: "=?", //Optional object
                ngModelOptionDebounce: "=?", //Optional object
                isLoading: "=?", //Optional object that will trigger a loading state class on an input,
                focusWhen: "=?" //Optional object that indicates when focus should be set to the input field
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
    })