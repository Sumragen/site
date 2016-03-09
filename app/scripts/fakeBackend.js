/**
 * Created by trainee on 3/3/16.
 */
define(
    ['./App'],
    function (module) {
        'use strict';
        module.run(['$httpBackend','$q',function($httpBackend, $q) {
            var users = [{}];
            if(localStorage.getItem("usersLS")){
                users = JSON.parse(localStorage.getItem("usersLS"));
            }else{
                var user = [{
                    firstName : 'root',
                    lastName : 'root',
                    login : 'root',
                    email : 'root@gmail.com',
                    password : 'root'
                }];
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
                    return [400,{errorCode:1,message:'Username or password is incorrect'}];
                }
            });
            $httpBackend.whenGET('/getUser').respond(currentUser);
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