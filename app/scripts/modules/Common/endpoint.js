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
                return _.merge(options, this);
            }

            var routes = {
                auth: {
                    register: function (data) {
                        return new API({
                            method: METHODS.POST,
                            url: '/register',
                            data: data
                        })
                    },
                    login: function (user) {
                        return new API({
                            method: METHODS.POST,
                            url: '/login',
                            data: {
                                username: user.username,
                                password: user.password
                            }
                        })
                    },
                    logOut: function (user) {
                        return {
                            method: METHODS.POST,
                            url: '/logOut'
                        }
                    }
                },
                user: {
                    list: function (offset, limit) {
                        return new API({
                            method: METHODS.GET,
                            url: '/users/?offset=' + offset + '&limit=' + limit,
                            data: {
                                offset: offset,
                                limit: limit
                            }
                        })
                    },
                    get: function () {
                    },
                    update: function (user) {
                        return new API({
                            method: METHODS.PUT,
                            url: '/user/' + user.id,
                            data: user
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
                stage: {
                    updateList: function (stages) {
                        return new API({
                            method: METHODS.PUT,
                            url: '/stages',
                            data: stages
                        })
                    },
                    post: function (data) {
                        return new API({
                            method: METHODS.POST,
                            url: '/stage',
                            data: data
                        })
                    },
                    update: function (stage) {
                        return new API({
                            method: METHODS.PUT,
                            url: '/stage/' + stage.id,
                            data: stage
                        })
                    },
                    get: function (id) {
                        return new API({
                            method: METHODS.GET,
                            url: '/stage/' + id,
                            data: id
                        })
                    },
                    list: function () {
                        return new API({
                            method: METHODS.GET,
                            url: '/stages'
                        })
                    }
                },
                role: {
                    delete: function (role) {
                        return new API({
                            method: METHODS.DELETE,
                            url: '/role/' + role.id,
                            data: role
                        })
                    },
                    list: function () {
                        return new API({
                            method: METHODS.GET,
                            url: '/roles'
                        })
                    },
                    post: function (data) {
                        return new API({
                            method: METHODS.POST,
                            url: '/role',
                            data: data
                        })
                    },
                    update: function (role) {
                        return new API({
                            method: METHODS.PUT,
                            url: '/role/' + role.id,
                            data: role
                        })
                    }
                },
                teacher: {
                    delete: function (teacher) {
                        return new API({
                            method: METHODS.DELETE,
                            url: '/teacher/' + teacher.id,
                            data: teacher
                        })
                    },
                    list: function () {
                        return new API({
                            method: METHODS.GET,
                            url: '/teachers'
                        })
                    },
                    post: function (data) {
                        return new API({
                            method: METHODS.POST,
                            url: '/teacher',
                            data: data
                        })
                    },
                    update: function (teacher) {
                        return new API({
                            method: METHODS.PUT,
                            url: '/teacher/' + teacher.id,
                            data: teacher
                        })
                    },
                    getSubjects: function (id) {
                        return new API({
                            method: METHODS.GET,
                            url: '/teacher',
                            data: id
                        })
                    }
                },
                subject: {
                    delete: function (subject) {
                        return new API({
                            method: METHODS.DELETE,
                            url: '/subject/' + subject.id,
                            data: subject
                        })
                    },
                    list: function () {
                        return new API({
                            method: METHODS.GET,
                            url: '/subjects'
                        })
                    },
                    post: function (data) {
                        return new API({
                            method: METHODS.POST,
                            url: '/subject',
                            data: data
                        })
                    },
                    update: function (subject) {
                        return new API({
                            method: METHODS.PUT,
                            url: '/subject/' + subject.id,
                            data: subject
                        })
                    }
                },
                lesson: {
                    get: function (lesson) {
                        return new API({
                            method: METHODS.GET,
                            url: '/lesson/' + lesson.id,
                            data: lesson
                        })
                    },
                    delete: function (lesson) {
                        return new API({
                            method: METHODS.DELETE,
                            url: '/lesson/' + lesson.id,
                            data: lesson
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
                    post: function (data) {
                        return new API({
                            method: METHODS.POST,
                            url: '/lesson',
                            data: data
                        })
                    },
                    updateDow: function (data) {
                        return new API({
                            method: METHODS.PUT,
                            url: '/lesson',
                            data: data
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