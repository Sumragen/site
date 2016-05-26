/**
 * Created by trainee on 5/25/16.
 */
define(['../module'], function (module) {
    module.controller('Common.FileUploadingController', [
        '$scope',
        'Common.FileUploadingService',
        function ($scope, fileUploadingService) {
            $scope.upload = function (files) {
                files = files || $scope.files || [];
                fileUploadingService.setFiles(files);
            };
        }]);
});