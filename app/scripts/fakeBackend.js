/**
 * Created by trainee on 3/3/16.
 */
define(
    ['./App'],
    function (module) {
        'use strict';
        module.run(['$httpBackend',function($httpBackend) {
            var users = [
                {
                    name: 'fake',
                    login: 'fake',
                    password: '0000'
                },{
                    name: 'root',
                    login: 'root',
                    password: 'root'
                }];

            $httpBackend.whenGET('/users').respond(users);
            $httpBackend.whenPOST('/users').respond(function(method, url, data) {
                var user = angular.fromJson(data);
                users.push(user);
                return [200, user, {}];
            });
            $httpBackend.whenGET(/.*/).passThrough();
            $httpBackend.whenPOST(/.*/).passThrough();
        }]);
    });