/**
 * Created by trainee on 3/3/16.
 */
define(
    ['./App','./fakeDataSource'],
    function (module, fakeDataSource) {
        'use strict';
        module.run(['$httpBackend','$q',function($httpBackend) {
            $httpBackend.whenPOST('/signIn').respond(function (method,url,checkUser) {
                var user = fakeDataSource.checkCurrentUser(checkUser);
                if (user){
                    return [200, {currentUser: user, sessionToken: 'simple sessionToken'}, {}];
                }else{
                    return [400,{errorCode:1,message:'Username or password is incorrect'}];
                }
            });
            $httpBackend.whenPOST('/events').respond(function (method, url) {
                var events = fakeDataSource.getEvents();
                if (events){
                    return [200, {events: events}, {}];
                }else{
                    return [400,{errorCode:2,message:'Events not found'}];
                }
            });
            $httpBackend.whenPOST('/users').respond(function(method, url, data) {
                fakeDataSource.setUsers(data);
                return [200, angular.fromJson(data), {}];
            });
            $httpBackend.whenGET(/.*/).passThrough();
            $httpBackend.whenPOST(/.*/).passThrough();
        }]);
    });