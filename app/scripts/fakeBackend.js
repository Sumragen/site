/**
 * Created by trainee on 3/3/16.
 */
define(
    ['./App','./fakeDataSource'],
    function (module, fakeDataSource) {
        'use strict';
        module.run(['$httpBackend','$q',function($httpBackend, $q) {
            //var users = [{}];
            //if(localStorage.getItem("usersLS")){
            //    users = JSON.parse(localStorage.getItem("usersLS"));
            //}else{
            //    var user = [{
            //        firstName : 'root',
            //        lastName : 'root',
            //        login : 'root',
            //        email : 'root@gmail.com',
            //        password : 'root'
            //    }];
            //    localStorage.setItem("usersLS",JSON.stringify(user))
            //}
            //
            //var currentUser = null;

            $httpBackend.whenPOST('/signIn').respond(function (method,url,data) {
                fakeDataSource.setCurrentUser(data);
                if (fakeDataSource.getCurrentUser()){
                    return [200, fakeDataSource.getCurrentUser(), {}];
                }else{
                    return [400,{errorCode:1,message:'Username or password is incorrect'}];
                }
            });
            $httpBackend.whenGET('/getUser').respond(fakeDataSource.getCurrentUser());
            $httpBackend.whenPOST('/users').respond(function(method, url, data) {
                fakeDataSource.setUsers(data);
                return [200, angular.fromJson(data), {}];
            });
            $httpBackend.whenGET(/.*/).passThrough();
            $httpBackend.whenPOST(/.*/).passThrough();
        }]);
    });