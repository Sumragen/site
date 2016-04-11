/**
 * Created by trainee on 3/3/16.
 */
define(
    ['./App', './fakeDataSource'],
    function (module, fakeDataSource) {
        'use strict';
        module.run(['$httpBackend', '$q', function ($httpBackend) {
            var prefix = '/api';
            $httpBackend.whenPOST(prefix + '/login').respond(function (method, url, checkUser) {
                var user = fakeDataSource.checkCurrentUser(checkUser);
                if (user) {
                    return [200, {currentUser: user, sessionToken: 'simple sessionToken'}, {}];
                } else {
                    return [400, {errorCode: 1, message: 'Username or password is incorrect'}];
                }
            });
            $httpBackend.whenPUT(/\/user\/(0-9)*/).respond(function (method, url, tempUser) {
                var user = fakeDataSource.updateUser(tempUser);
                if (user) {
                    return [200, user, {}];
                } else {
                    return [400, {errorCode: 4, message: 'wrong update'}];
                }
            });
            $httpBackend.whenPUT(/\/event\/(0-9)*/).respond(function (method, url, tempEvent) {
                var events = fakeDataSource.updateEvent(tempEvent);
                if (events) {
                    return [200, events, {}];
                } else {
                    return [400, {errorCode: 4, message: 'wrong update'}];
                }
            });
            $httpBackend.whenGET(prefix + '/events').respond(function (method, url) {
                var events = fakeDataSource.getEvents();
                if (events) {
                    return [200, {events: events}, {}];
                } else {
                    return [400, {errorCode: 2, message: 'Events not found'}];
                }
            });
            $httpBackend.whenGET(prefix + '/schedule').respond(function (method, url) {
                var schedule = fakeDataSource.getSchedule();
                if (schedule) {
                    return [200, {schedule: schedule}, {}];
                } else {
                    return [400, {errorCode: 3, message: 'Schedule not found'}];
                }
            });
            $httpBackend.whenGET(/\/users\/\?offset=[0-9]*&limit=[0-9]*/).respond(function (method, url, amount) {
                var users = fakeDataSource.getUsers(amount);
                if (users) {
                    return [200, {users: users}, {}];
                } else {
                    return [400, {errorCode: 4, message: 'Users not found'}];
                }
            });
            $httpBackend.whenGET(prefix + '/roles').respond(function (method, url) {
                var roles = fakeDataSource.getRoles();
                if (roles) {
                    return [200, {roles: roles}, {}];
                } else {
                    return [400, {errorCode: 5, message: 'Roles not found'}];
                }
            });
            $httpBackend.whenPUT(/\/role\/(0-9)*/).respond(function (method, url, tempRole) {
                var role = fakeDataSource.updateRole(tempRole);
                if (role) {
                    return [200, role, {}];
                } else {
                    return [400, {errorCode: 4, message: 'wrong update'}];
                }
            });
            $httpBackend.whenDELETE(/\/role\/(0-9)*/).respond(function (method, url, tempRole) {
                var roles = fakeDataSource.deleteRole(tempRole);
                if (roles) {
                    return [200, roles, {}];
                } else {
                    return [400, {errorCode: 6, message: 'wrong delete'}];
                }
            });
            $httpBackend.whenPOST(prefix + '/role').respond(function (method, url, data) {
                var roles = fakeDataSource.addRole(data);
                if (roles) {
                    return [200, roles, {}];
                } else {
                    return [400, {errorCode: 7, message: 'wrong add role'}];
                }
            });
            $httpBackend.whenPOST(prefix + '/register').respond(function (method, url, data) {
                fakeDataSource.addUser(data);
                return [200, angular.fromJson(data), {}];
            });
            $httpBackend.whenGET(/.*/).passThrough();
            $httpBackend.whenPOST(/.*/).passThrough();
        }]);
    });