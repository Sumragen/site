/**
 * Created by trainee on 4/14/16.
 */
define(['../module', 'lodash'], function (module, _) {
    module.service('Dashboard.Settings.Schedule.LessonService', [
        '$http',
        '$q',
        'Common.SecurityContext',
        'Endpoint',
        function ($http, $q, securityContext, Endpoint) {
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
            service.getRoleNames = function (selectedUserId) {
                return $http(Endpoint.role.list())
                    .then(function (data) {
                        var currentUser = securityContext.getPrincipal();
                        var rolesMoreLessThanUserRole = _.filter(data.data.roles, function (role) {
                            return role.id > currentUser.roles[0].id || (selectedUserId == currentUser.id && role.id == currentUser.roles[0].id);
                        });
                        return _.map(rolesMoreLessThanUserRole, function (role) {
                            return {value: role.id, name: role.name}
                        });
                    })
                    .catch(function (err) {
                        return $q.reject(err);
                    });
            };
            service.getSubjectsNames = function () {
                return $http(Endpoint.subject.list())
                    .then(function (data) {
                        return _.map(data.data.subjects, function (subject) {
                            return {id: subject.id, name: subject.name}
                        });
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