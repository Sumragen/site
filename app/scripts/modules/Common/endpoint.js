/**
 * Created by trainee on 3/15/16.
 */
define(['./module', 'lodash'], function (module, _) {
    module.factory('Endpoint', [
        function () {
            var METHODS = {
                GET: 'GET',
                POST: 'POST',
                PUT: 'PUT',
                DELETE: 'DELETE',
                PATCH: 'PATCH'
            };

            function API(options) {
                var prefix = '/api';
                options.url = prefix + options.url;
                this['isApiCall'] = true;
                this['headers'] = {
                    'Content-Type': 'application/json'
                };
                return _.merge(options, this);
            }

            var routes = {
                oauth: {
                    google: function (data) {
                        return new API({
                            method: METHODS.POST,
                            url: '/oauth/google',
                            data: data
                        })
                    },
                    facebook: function (data) {
                        return new API({
                            method: METHODS.POST,
                            url: '/oauth/facebook',
                            data: data
                        })
                    },
                    microsoft: function (data) {
                        return new API({
                            method: METHODS.POST,
                            url: '/oauth/microsoft',
                            data: data
                        })
                    }
                },
                auth: {
                    register: function (data) {
                        return new API({
                            method: METHODS.POST,
                            url: '/user/add',
                            data: data
                        })
                    },
                    login: function (user) {
                        return new API({
                            url: '/login',
                            dataType: 'json',
                            method: METHODS.POST,
                            data: {
                                username: user.username,
                                password: user.password
                            }
                        })
                    },
                    logout: function () {
                        return new API({
                            url: '/logout',
                            method: METHODS.POST
                        })
                    }
                },
                event: {
                    list: function () {
                        return new API({
                            method: METHODS.GET,
                            url: '/events'
                        })
                    },
                    get: function (id) {
                        return new API({
                            method: METHODS.GET,
                            url: '/event/' + id
                        })
                    },
                    put: function (event) {
                        return new API({
                            method: METHODS.POST,
                            url: '/event/' + event.id,
                            data: event
                        })
                    },
                    post: function (event) {
                        return new API({
                            method: METHODS.POST,
                            url: '/event/add',
                            data: event
                        })
                    },
                    delete: function (id) {
                        return new API({
                            method: METHODS.DELETE,
                            url: '/event/' + id
                        })
                    }
                },
                lesson: {
                    list: function () {
                        return new API({
                            method: METHODS.GET,
                            url: '/lessons'
                        })
                    },
                    get: function (id) {
                        return new API({
                            method: METHODS.GET,
                            url: '/lesson/' + id
                        })
                    },
                    getByStageId : function (id) {
                        return new API({
                            method: METHODS.GET,
                            url: '/lesson/stage/' + id
                        })
                    },
                    getByDay : function (day) {
                        return new API({
                            method: METHODS.GET,
                            url: '/lesson/day/' + day
                        })
                    },
                    put: function (lesson) {
                        return new API({
                            method: METHODS.POST,
                            url: '/lesson/' + lesson._id,
                            data: lesson
                        })
                    },
                    post: function (lesson) {
                        return new API({
                            method: METHODS.POST,
                            url: '/lesson/add',
                            data: lesson
                        })
                    },
                    delete: function (id) {
                        return new API({
                            method: METHODS.DELETE,
                            url: '/lesson/' + id
                        })
                    },
                    listByDay: function (day) {
                        return new API({
                            method: METHODS.GET,
                            url: '/lessonsByDay',
                            data: day
                        })
                    },
                    listByStage: function (stage) {
                        return new API({
                            method: METHODS.GET,
                            url: '/lessonsByStage',
                            data: stage
                        })
                    },
                    updateDow: function (data) {
                        return new API({
                            method: METHODS.PUT,
                            url: '/lesson',
                            data: data
                        })
                    },
                    updateList: function (lessons) {
                        return new API({
                            method: METHODS.PUT,
                            url: '/lessons',
                            data: lessons
                        })
                    },
                    update: function (lesson) {
                        return new API({
                            method: METHODS.PUT,
                            url: '/lesson/' + lesson.id,
                            data: lesson
                        })
                    }
                },
                role: {
                    list: function () {
                        return new API({
                            method: METHODS.GET,
                            url: '/roles'
                        })
                    },
                    get: function (id) {
                        return new API({
                            method: METHODS.GET,
                            url: '/role/' + id
                        })
                    },
                    put: function (role) {
                        return new API({
                            method: METHODS.POST,
                            url: '/role/' + role.id,
                            data: role
                        })
                    },
                    post: function (role) {
                        return new API({
                            method: METHODS.POST,
                            url: '/role/add',
                            data: role
                        })
                    },
                    delete: function (id) {
                        return new API({
                            method: METHODS.DELETE,
                            url: '/role/' + id
                        })
                    }
                },
                stage: {
                    updateList: function (stages) {
                        return new API({
                            method: METHODS.PUT,
                            url: '/stages',
                            data: stages
                        })
                    },
                    list: function () {
                        return new API({
                            method: METHODS.GET,
                            url: '/stages'
                        })
                    },
                    get: function (id) {
                        return new API({
                            method: METHODS.GET,
                            url: '/stage/' + id
                        })
                    },
                    put: function (stage) {
                        return new API({
                            method: METHODS.POST,
                            url: '/stage/' + stage._id,
                            data: stage
                        })
                    },
                    post: function (stage) {
                        return new API({
                            method: METHODS.POST,
                            url: '/stage/add',
                            data: stage
                        })
                    },
                    delete: function (id) {
                        return new API({
                            method: METHODS.DELETE,
                            url: '/stage/' + id
                        })
                    }
                },
                subject: {
                    list: function () {
                        return new API({
                            method: METHODS.GET,
                            url: '/subjects'
                        })
                    },
                    get: function (id) {
                        return new API({
                            method: METHODS.GET,
                            url: '/subject/' + id
                        })
                    },
                    put: function (subject) {
                        return new API({
                            method: METHODS.POST,
                            url: '/subject/' + subject.id,
                            data: subject
                        })
                    },
                    post: function (subject) {
                        return new API({
                            method: METHODS.POST,
                            url: '/subject/add',
                            data: subject
                        })
                    },
                    delete: function (id) {
                        return new API({
                            method: METHODS.DELETE,
                            url: '/subject/' + id
                        })
                    }
                },
                teacher: {
                    list: function () {
                        return new API({
                            method: METHODS.GET,
                            url: '/teachers'
                        })
                    },
                    get: function (id) {
                        return new API({
                            method: METHODS.GET,
                            url: '/teacher/' + id
                        })
                    },
                    put: function (teacher) {
                        return new API({
                            method: METHODS.POST,
                            url: '/teacher/' + teacher.id,
                            data: teacher
                        })
                    },
                    post: function (teacher) {
                        return new API({
                            method: METHODS.POST,
                            url: '/teacher/add',
                            data: teacher
                        })
                    },
                    delete: function (id) {
                        return new API({
                            method: METHODS.DELETE,
                            url: '/teacher/' + id
                        })
                    },
                    getSubjects: function (id) {
                        return new API({
                            method: METHODS.GET,
                            url: '/subject/teacher/' + id
                        })
                    }
                },
                user: {
                    list: function (offset, limit) {
                        return new API({
                            method: METHODS.GET,
                            url: '/users?offset=' + offset + '&limit=' + limit
                        })
                    },
                    get: function (id) {
                        return new API({
                            method: METHODS.GET,
                            url: '/user/' + id
                        })
                    },
                    put: function (user) {
                        return new API({
                            method: METHODS.POST,
                            url: '/user/' + user.id,
                            data: user
                        })
                    },
                    post: function (user) {
                        return new API({
                            method: METHODS.POST,
                            url: '/user/add',
                            data: user
                        })
                    },
                    delete: function (id) {
                        return new API({
                            method: METHODS.DELETE,
                            url: '/user/' + id
                        })
                    }
                },
                events: {
                    updateList: function (events) {
                        return new API({
                            method: METHODS.PUT,
                            url: '/events',
                            data: events
                        })
                    },
                    list: function () {
                        return new API({
                            method: METHODS.GET,
                            url: '/events'
                        })
                    },
                    update: function (event) {
                        return new API({
                            method: METHODS.PUT,
                            url: '/event/' + event.id,
                            data: event
                        })
                    },
                    remove: function (event) {
                        return new API({
                            method: METHODS.DELETE,
                            url: '/event/' + event.id,
                            data: event
                        })
                    },
                    post: function (data) {
                        return new API({
                            method: METHODS.POST,
                            url: '/event',
                            data: data
                        })
                    }
                },
                schedule: {
                    list: function () {
                        return new API({
                            method: METHODS.GET,
                            url: '/schedule'
                        })
                    }
                },
                name: {
                    teacher: function (subject) {
                        return new API({
                            method: METHODS.GET,
                            url: '/teacherName',
                            data: subject
                        })
                    }
                }
            };
            return routes;
        }
    ]);
});