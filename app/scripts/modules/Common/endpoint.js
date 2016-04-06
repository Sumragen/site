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
                    get: function () {
                    },
                    list: function () {
                        return new API({
                            method: METHODS.GET,
                            url: '/users'
                        })
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
                role:{
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
                }
            };
            return routes;
        }
    ]);
});