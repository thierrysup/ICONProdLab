(function() {
    'use strict';

    var jhiAlertError = {
        template: '<div class="alerts" ng-cloak="">' +
                        '<div ng-repeat="alert in $ctrl.alerts" ng-class="[alert.position, {\'toast\': alert.toast}]">' +
                            '<uib-alert ng-cloak="" type="{{alert.type}}" close="alert.close($ctrl.alerts)"><pre>{{ alert.msg }}</pre></uib-alert>' +
                        '</div>' +
                  '</div>',
        controller: jhiAlertErrorController
    };

    angular
        .module('iconlabApp')
        .component('jhiAlertError', jhiAlertError);

        angular
        .module('iconlabApp')
        .directive('dateAfter', dateAfter);




angular
        .module('iconlabApp').directive("dateGreater", function () {
    return {
        restrict: 'A', // only activate on element attribute
        require: '?ngModel', // get a hold of NgModelController

        link: function (scope, elem, attrs, ngModel) {
            if (!ngModel) return; // do nothing if no ng-model

            // watch own value and re-validate on change
            scope.$watch(attrs.ngModel, function () {
                validate();
            });

            // observe the other value and re-validate on change
            attrs.$observe('dateGreater', function (val) {
                validate();
            });

            var validate = function () {
                // values
                var dateTo = angular.isDefined(ngModel.$viewValue) === true && !_.isNull(ngModel.$viewValue) ? moment(ngModel.$viewValue).toDate() : null;
                var dateFrom = attrs.dateGreater !== "" ? moment(attrs.dateGreater.replace('"', '').replace('\\', '').replace('"', '')).toDate() : null;
                //passing date with braces around it causes and issue therfore we need to use replace

            };
        }
    }

});












        function dateAfter(){
            return {
      
      require: 'ngModel',
      
      link: function (scope, element, attrs, ngModelCtrl) {
        var date, otherDate;
        scope.$watch(attrs.dateAfter, function (value) {
          otherDate = value;
          validate();
        });
        scope.$watch(attrs.ngModel, function (value) {
          date = value;
          validate();
        });
        function validate() {
          ngModelCtrl.$setValidity('dateAfter', !date || !otherDate || date >= otherDate);
        }        
      }
      
    };

        }

        angular
        .module('iconlabApp').directive('textare', [function () {

    return {
        restrict: 'AEC',
        link: function (scope, element, attrs) {

        $('element').wysihtml5();
    }
}}]);


    jhiAlertErrorController.$inject = ['$scope', 'AlertService', '$rootScope'];

    function jhiAlertErrorController ($scope, AlertService, $rootScope) {
        var vm = this;

        vm.alerts = [];

        function addErrorAlert (message, key, data) {
            vm.alerts.push(
                AlertService.add(
                    {
                        type: 'danger',
                        msg: message,
                        timeout: 5000,
                        toast: AlertService.isToast(),
                        scoped: true
                    },
                    vm.alerts
                )
            );
        }

        var cleanHttpErrorListener = $rootScope.$on('iconlabApp.httpError', function (event, httpResponse) {
            var i;
            event.stopPropagation();
            switch (httpResponse.status) {
            // connection refused, server not reachable
            case 0:
                addErrorAlert('Server not reachable','error.server.not.reachable');
                break;

            case 400:
                var errorHeader = httpResponse.headers('X-iconlabApp-error');
                var entityKey = httpResponse.headers('X-iconlabApp-params');
                if (errorHeader) {
                    var entityName = entityKey;
                    addErrorAlert(errorHeader, errorHeader, {entityName: entityName});
                } else if (httpResponse.data && httpResponse.data.fieldErrors) {
                    for (i = 0; i < httpResponse.data.fieldErrors.length; i++) {
                        var fieldError = httpResponse.data.fieldErrors[i];
                        // convert 'something[14].other[4].id' to 'something[].other[].id' so translations can be written to it
                        var convertedField = fieldError.field.replace(/\[\d*\]/g, '[]');
                        var fieldName = convertedField.charAt(0).toUpperCase() + convertedField.slice(1);
                        addErrorAlert('Field ' + fieldName + ' cannot be empty', 'error.' + fieldError.message, {fieldName: fieldName});
                    }
                } else if (httpResponse.data && httpResponse.data.message) {
                    addErrorAlert(httpResponse.data.message, httpResponse.data.message, httpResponse.data);
                } else {
                    addErrorAlert(httpResponse.data);
                }
                break;

            case 404:
                addErrorAlert('Not found','error.url.not.found');
                break;

            default:
                if (httpResponse.data && httpResponse.data.message) {
                    addErrorAlert(httpResponse.data.message);
                } else {
                    addErrorAlert(angular.toJson(httpResponse));
                }
            }
        });

        $scope.$on('$destroy', function () {
            if(angular.isDefined(cleanHttpErrorListener) && cleanHttpErrorListener !== null){
                cleanHttpErrorListener();
                vm.alerts = [];
            }
        });
    }
})();
