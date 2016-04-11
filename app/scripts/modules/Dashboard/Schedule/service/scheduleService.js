/**
 * Created by trainee on 3/22/16.
 */
define(['../module', 'lodash'], function (module, _) {
    module.service('Dashboard.Schedule.ScheduleService', [
        '$http',
        '$q',
        'Endpoint',
        function ($http, $q, Endpoint) {
            var service = {};
            service.getSchedule = function () {
                return $http(Endpoint.schedule.list())
                    .then(function (data) {
                        return data.data.schedule;
                    }, function (err) {
                        return $q.reject(err);
                    });
            };
            service.getStages = function () {
                return $http(Endpoint.stage.list())
                    .then(function (data) {
                        return data.data.stages;
                    });
            };
            service.getStageBySuffix = function (stage, suffix) {
                return $http(Endpoint.stage.get({stage: stage, suffix: suffix}))
                    .then(function (data) {
                        return data;
                    })
                    .catch(function (err) {
                        return $q.reject(err);
                    });
            };
            return service;
        }]);
});