/**
 * Created by trainee on 5/25/16.
 */
define(['../module'], function (module) {
    module.controller('Common.FileUploadingController', [
        '$scope',
        '$uibModalInstance',
        'Common.FileUploadingService',
        function ($scope, $uibModalInstance, fileUploadingService) {
            $scope.upload = function (files) {
                files = files || $scope.files || [];
                fileUploadingService.setFiles(files);
                $uibModalInstance.close();
            };
        }
    ]);
});