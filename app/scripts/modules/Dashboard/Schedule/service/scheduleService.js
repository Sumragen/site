/**
 * Created by trainee on 3/22/16.
 */
define(['../module'], function (module) {
    module.service('Dashboard.Schedule.ScheduleService', [
        '$http',
        '$q',
        'Endpoint',
        function ($http, $q, Endpoint) {
            var service = {};

            service.loadSchedule = function () {
                return $http(Endpoint.schedule.list())
                    .then(function (data) {
                        return data;
                    }, function (err) {
                        return $q.reject(err);
                    });
            };
            return service;
        }]);
});