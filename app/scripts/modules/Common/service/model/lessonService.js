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
            service.createLesson = function (lesson) {
                return $http(Endpoint.lesson.post(lesson))
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
            service.getLessonsByStageId = function (id) {
                return $http(Endpoint.lesson.getByStageId(id))
                    .then(function (res) {
                        return res.data;
                    })
                    .catch(function (err) {
                        return $q.reject(err);
                    })
            };
            service.getLessonsByDay = function (day) {
                return $http(Endpoint.lesson.getByDay(day))
                    .then(function (res) {
                        return res.data;
                    })
                    .catch(function (err) {
                        return $q.reject(err);
                    })
            };
            service.updateLesson = function (lesson) {
                return $http(Endpoint.lesson.put(lesson))
                    .then(function (res) {
                        return res.data;
                    }, function (err) {
                        return $q.reject(err);
                    });
            };
            service.updateLessonList = function (lessons) {
                return $http(Endpoint.lesson.updateList(lessons))
                    .then(function (res) {
                        if (res.data.isError) {
                            return $q.reject(res.data);
                        } else {
                            return res.data;
                        }
                    })
                    .catch(function (err) {
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