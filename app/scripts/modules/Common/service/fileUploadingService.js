/**
 * Created by trainee on 5/25/16.
 */
define(['../module'], function (module) {
    module.service('Common.FileUploadingService', [
        '$uibModal',
        function ($uibModal) {
            var service = {};
            var files = [];
            service.openModal = function () {
                var fileUploadModal = $uibModal.open({
                    animation: true,
                    templateUrl: "views/Common/fileUploadingModal.html",
                    controller: "Common.FileUploadingController as controller"
                });
                return fileUploadModal.result
                    .then(function (data) {
                        return data;
                    })
                    .catch(function (err) {
                        return err;
                    });
            };
            return service;
        }])
});