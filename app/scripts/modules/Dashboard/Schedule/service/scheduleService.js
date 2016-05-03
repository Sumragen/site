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
            service.updateLessonById = function (lesson) {
                return $http(Endpoint.lesson.updateDow(lesson))
                    .then(function (data) {
                        return data.data;
                    })
                    .catch(function (err) {
                        return $q.reject(err);
                    })
            };
            service.updateLessonList = function (lessons) {
                return $http(Endpoint.lesson.updateList(lessons))
                    .then(function (data) {
                        return data.data;
                    })
                    .catch(function (err) {
                        return $q.reject(err.data);
                    })
            };
            service.getLessonsByStage = function (stage) {
                return $http(Endpoint.lesson.listByStage(stage))
                    .then(function (data) {
                        return data.data.lessons;
                    })
                    .catch(function (err) {
                        return $q.reject(err);
                    })
            };
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
            service.getStageBySuffix = function (id) {
                return $http(Endpoint.stage.get(id))
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