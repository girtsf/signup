(function(angular) {
    'use strict';

    angular.module('signup.common.controllers.ShiftCtrl', [
        'ngResource',
        'ui.bootstrap',
        'xeditable',
        'signup.common',
    ])

    /*
     * Main controller
     */
    .controller('common.ShiftCtrl', [
        '$scope',
        '$stateParams',
        '$location',
        '$log',
        '$q',
        'common.Shift',
        function MainCtrl($scope, $stateParams, $location, $log, $q, Shift) {
            $scope.$log = $log;
            $scope.saveSuccess = false;
            $scope.removeSuccess = false;
            $scope.saveError = false;
            $scope.removeError = false;

            Shift.get({'id': $stateParams.shiftId}).$promise.then(function(shift) {
                $scope.shift = shift.shift;
                $scope.shift.change = true;
            });

            $scope.cancel = function() {
                $location.path('/signup');
            };

            $scope.removeShift = function() {
                var deferred = $q.defer();
                Shift.remove({'id': $stateParams.shiftId}).$promise.then(function(shift) {
                    $scope.removeError = false;
                    $scope.removeSuccess = true;
                    deferred.resolve();
                }, function(res) {
                    if (res.status === 500) {
                        $scope.removeError = 'Unexpected server error, please try again.';
                        $log.error(res);
                    } else {
                        $scope.removeError = res.data.error;
                    }
                    deferred.reject();
                });
                return deferred.promise;
            };

            $scope.postShift = function() {
                var deferred = $q.defer();
                Shift.update({'id': $stateParams.shiftId}, $scope.shift).$promise.then(function(shift) {
                    $scope.saveError = false;
                    $scope.saveSuccess = true;
                    deferred.resolve();
                }, function(res) {
                    if (res.status === 500) {
                        $scope.saveError = 'Unexpected server error, please try again.';
                        $log.error(res);
                    } else {
                        $scope.saveError = res.data.error;
                    }
                    deferred.reject();
                });
                return deferred.promise;
            };

    }])

    ;
}(window.angular));
