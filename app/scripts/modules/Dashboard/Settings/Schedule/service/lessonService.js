/**
 * Created by trainee on 4/14/16.
 */
define(['../module', 'lodash'], function (module, _) {
    module.service('Dashboard.Settings.Schedule.LessonService', [
        '$http',
        '$q',
        'Endpoint',
        function ($http, $q, Endpoint) {
            var service = {};
            service.getSubjectsForTeacher = function (id) {
                return $http(Endpoint.teacher.getSubjects(id))
                    .then(function (data) {
                        return data.data;
                    })
                    .catch(function (err) {
                        $q.reject(err);
                    });
            };
            service.getNames = function (data) {
                return $http(Endpoint.name.get(data))
                    .then(function (data) {
                        return data.data;
                    })
                    .catch(function (err) {
                        return $q.reject(err);
                    });
            };
            service.getRoleNames = function () {
                return $http(Endpoint.name.role())
                    .then(function (data) {
                        return data.data.names;
                    })
                    .catch(function (err) {
                        return $q.reject(err);
                    });
            };
            service.getSubjectsNames = function (teacher) {
                return $http(Endpoint.name.subject(teacher))
                    .then(function (data) {
                        return data.data;
                    })
                    .catch(function (err) {
                        return $q.reject(err);
                    });
            };
            service.getTeachersNames = function (subject) {
                return $http(Endpoint.name.teacher(subject))
                    .then(function (data) {
                        return data.data;
                    })
                    .catch(function (err) {
                        return $q.reject(err);
                    });
            };
            service.createLesson = function (lesson) {
                return $http(Endpoint.lesson.post(lesson))
                    .then(function (data) {
                        return data.data;
                    })
                    .catch(function (err) {
                        return $q.reject(err);
                    });
            };
            service.updateLesson = function (lesson) {
                return $http(Endpoint.lesson.update(lesson))
                    .then(function (data) {
                        return data.data;
                    }, function (err) {
                        return $q.reject(err);
                    });
            };
            service.getLesson = function (lesson) {
                return $http(Endpoint.lesson.get(lesson))
                    .then(function (data) {
                        return data.data;
                    })
                    .catch(function (err) {
                        return $q.reject(err);
                    });
            };
            service.getLessonsByDay = function (day) {
                return $http(Endpoint.lesson.listByDay(day))
                    .then(function (data) {
                        return data.data;
                    })
                    .catch(function (err) {
                        return $q.reject(err);
                    });
            };
            service.deleteLesson = function (lesson) {
                return $http(Endpoint.lesson.delete(lesson))
                    .then(function (data) {
                        return data.data;
                    })
                    .catch(function (err) {
                        return $q.reject(err);
                    });
            };
            return service;
        }]);
});