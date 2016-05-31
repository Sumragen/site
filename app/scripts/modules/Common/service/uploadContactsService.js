/**
 * Created by trainee on 5/31/16.
 */
define(['../module'], function (module) {
    module.service('UploadContactsService', [
        '$q',
        '$uibModal',
        function ($q, $uibModal) {
            var service = {};
            service.openModal = function (providers) {
                var uploadContactsModal = $uibModal.open({
                    animation: true,
                    templateUrl: "views/Common/uploadSocialNetworkModal.html",
                    controller: "UploadContactsController",
                    resolve: {
                        providers: function () {
                            return providers;
                        }
                    }
                });
                return uploadContactsModal.result
                    .then(function (data) {
                        return data;
                    })
                    .catch(function (err) {
                        $q.reject(err);
                    })
            };
            return service;
        }
    ])
});