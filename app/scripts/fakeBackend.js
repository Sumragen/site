/**
 * Created by trainee on 3/3/16.
 */
define(
    ['./App'],
    function (module) {
        'use strict';
        module.run(['$httpBackend',function($httpBackend) {
            var users = [{}];
            if(localStorage.getItem("usersLS")){
                users = JSON.parse(localStorage.getItem("usersLS"));
            }else{
                var user = [{name: 'root',login: 'root',password: 'root'}];
                localStorage.setItem("usersLS",JSON.stringify(user))
            }
            //var ;isAuth = false;
            //
            //$httpBackend.whenGET('/api/authenticate').respond(isAuth);
            //$httpBackend.whenPOST('/api/authenticate').respond(function (method, url, data) {
            //    isAuth = data;
            //    return [200, isAuth, {}];
            //});
            $httpBackend.whenGET('/users').respond(users);
            $httpBackend.whenPOST('/users').respond(function(method, url, data) {
                var user = angular.fromJson(data);
                users.push(user);
                localStorage.setItem("usersLS",JSON.stringify(users));
                return [200, user, {}];
            });
            $httpBackend.whenGET(/.*/).passThrough();
            $httpBackend.whenPOST(/.*/).passThrough();
        }]);
    });