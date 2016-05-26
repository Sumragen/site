/**
 * Created by trainee on 5/25/16.
 */
define(['../module'], function (module) {
    module.controller('Common.FileUploadingController', [
        '$scope',
        '$uibModalInstance',
        function ($scope, $uibModalInstance) {
            $scope.upload = function (files) {
                files = files || $scope.files || null;
                $uibModalInstance.close(files);
            };
            $scope.clear = function(){
                $scope.files = null;
            }
        }
    ]);
});