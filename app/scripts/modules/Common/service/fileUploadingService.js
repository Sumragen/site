/**
 * Created by trainee on 5/25/16.
 */
define(['../module'], function (module) {
    module.service('Common.FileUploadingService', [
        function () {
            var service = {};
            var files = [];
            service.getFiles = function(){
                return files || null;
            };
            service.setFiles = function (data) {
                files = data;
            };
            return service;
        }])
});