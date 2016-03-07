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
                var user = [{name: 'root',login: 'root',password: 'root',avatar: null}];
                localStorage.setItem("usersLS",JSON.stringify(user))
            }

            var currentUser = null;

            $httpBackend.whenPOST('/signIn').respond(function (method,url,data) {
                var i = 0;
                var tempUser = angular.fromJson(data);
                for (i; i < users.length; i++) {
                    if (tempUser.login === users[i].login && tempUser.password === users[i].password) {
                        currentUser = users[i];
                        localStorage.setItem('currentUserLS',JSON.stringify(currentUser));
                        break;
                    }
                }
                if (localStorage.getItem('currentUserLS')){
                return [200, currentUser, {}];
                }else{
                    return [401];
                }
            });
            $httpBackend.whenGET('/getUser').respond(currentUser);
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