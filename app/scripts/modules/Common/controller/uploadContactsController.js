/**
 * Created by trainee on 5/31/16.
 */
define(['../module', 'lodash'], function (module, _) {
    module.controller('UploadContactsController', [
        '$scope',
        '$timeout',
        '$uibModalInstance',
        'providers',
        function ($scope, $timeout, $uibModalInstance, providers) {
            $scope.selected = [];
            $scope.providers = providers;
            $scope.setCurrentProvider = function(id){
                $scope.busy = true;
                $scope.currentProvider = id;
                if(!_.every($scope.providers, function (provider) {
                    if(provider.id == id){
                        provider.upload()
                            .then(function (data) {
                                $scope.contacts = data;
                            })
                            .catch(function (err) {
                                //display error
                            })
                            .finally(function () {
                                $scope.busy = false;
                            });
                        return false;
                    }
                    return true;
                })){
                    $scope.busy = false;
                }
            };
            $timeout($scope.setCurrentProvider(1));

            $scope.isSelectedProvider = function (id) {
                return id == $scope.currentProvider;
            };

            $scope.addUser = function(id){
                var idx = $scope.selected.indexOf(id);

                if (idx > -1) {
                    $scope.selected.splice(idx, 1);
                } else {
                    $scope.selected.push(id);
                }
            };
            $scope.addAllUsers = function () {
                if($scope.selected.length != $scope.contacts.length){
                    $scope.selected = [];
                    _.each($scope.contacts, function (user) {
                        $scope.selected.push(user.socialId);
                    })
                }else{
                    $scope.selected = [];
                }
            };
            $scope.upload = function () {
                var result = [];
                _.each($scope.contacts, function (user) {
                    if($scope.selected.indexOf(user.socialId) > -1){
                        result.push(user);
                    }
                });
                $uibModalInstance.close(result);
            };
            $scope.cancel = function () {
                $uibModalInstance.close(null);
            };
        }
    ])
});