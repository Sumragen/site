/**
 * Created by trainee on 3/7/16.
 */
define([], function () {
    var dataSource = {};
    var users = [{}];
    if (localStorage.getItem("usersLS")) {
        users = JSON.parse(localStorage.getItem("usersLS"));
    } else {
        var user = [{
            firstName: 'root',
            lastName: 'root',
            login: 'root',
            email: 'root@gmail.com',
            password: 'root'
        }];
        localStorage.setItem("usersLS", JSON.stringify(user))
    }
    var currentUser = null;
    var events = [{}];

    dataSource.setCurrentUser = function (data) {
        var i = 0;
        var tempUser = angular.fromJson(data);
        for (i; i < users.length; i++) {
            if (tempUser.login === users[i].login && tempUser.password === users[i].password) {
                currentUser = users[i];
                localStorage.setItem('currentUserLS', JSON.stringify(currentUser));
                break;
            }
        }
    };
    dataSource.setUsers = function (data) {
        var user = angular.fromJson(data);
        users.push(user);
        localStorage.setItem("usersLS", JSON.stringify(users));
    };
    dataSource.getCurrentUser = function () {
        return currentUser;
    };
    return dataSource;
});