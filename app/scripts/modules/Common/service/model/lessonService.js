/**
 * Created by trainee on 6/21/16.
 */
define(['../../module'], function (module) {
    module.service('Common.Model.LessonService', [
        '$http',
        '$q',
        'Endpoint',
        function ($http, $q, Endpoint) {
            var service = {};
            //CRUD
            service.createLesson = function () {
                return $http(Endpoint.lesson.post())
                    .then(function (res) {
                        return res.data;
                    }, function (err) {
                        return $q.reject(err);
                    });
            };
            service.getLessonById = function (id) {
                return $http(Endpoint.lesson.get(id))
                    .then(function (res) {
                        return res.data;
                    }, function (err) {
                        return $q.reject(err);
                    });
            };
            service.getLessons = function (offset, limit) {
                return $http(Endpoint.lesson.list(offset, limit))
                    .then(function (res) {
                        return res.data;
                    }, function (err) {
                        return $q.reject(err);
                    });
            };
            service.updateLesson = function (lesson) {
                return $http(Endpoint.lesson.put(lesson))
                    .then(function (res) {
                        return res.data;
                    }, function (err) {
                        return $q.reject(err);
                    });
            };
            service.deleteLesson = function (id) {
                return $http(Endpoint.lesson.delete(id))
                    .then(function (res) {
                        return res.data;
                    }, function (err) {
                        return $q.reject(err);
                    });
            };
            return service;
        }]);
});