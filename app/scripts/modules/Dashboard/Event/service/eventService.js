/**
 * Created by trainee on 3/21/16.
 */
define(['../module'], function (module) {
    module.service('Dashboard.Event.EventService', [
        '$http',
        '$q',
        'Endpoint',
        function ($http, $q, Endpoint) {
            var service = {};

            service.loadEvents = function () {
                return $http(Endpoint.events.list())
                    .then(function (data) {
                        return data;
                    }, function (err) {
                        return $q.reject(err);
                    });
            };
            return service;
        }]);
});