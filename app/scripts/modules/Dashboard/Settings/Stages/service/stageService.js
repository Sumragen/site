/**
 * Created by trainee on 4/25/16.
 */
define(['../module', 'lodash'], function (module, _) {
    module.service('Dashboard.Settings.Stages.StageService', [
        '$http',
        '$q',
        'Endpoint',
        function ($http, $q, Endpoint) {
            var service = {};

            service.getTeachersName = function (stage) {
                return $http(Endpoint.name.teacher(stage))
                    .then(function (data) {
                        return data.data.names;
                    })
                    .catch(function (err) {
                        return $q.reject(err);
                    });
            };
            service.updateStage = function (stage) {
                return $http(Endpoint.stage.update(stage))
                    .then(function (data) {
                        return data;
                    })
                    .catch(function (err) {
                        return $q.reject(err);
                    });
            };
            service.createStage = function (stage) {
                return $http(Endpoint.stage.post(stage))
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