/**
 * Created by trainee on 3/7/16.
 */
define(['lodash'], function (_) {
    var dataSource = {};

    var AbstractUser = {
        firstName: 'root',
        lastName: 'root',
        login: 'root',
        email: 'root@gmail.com',
        password: 'root'
    };
    var data = {};
    {
        if (localStorage.getItem("datasource")) {
            load();
        } else {
            localStorage.setItem("datasource", JSON.stringify({user: {objects: [AbstractUser] },event: {list: [{name : 'Simple event',date: '01.30'}]} }));
        }
    }
    //example
    //var user = _.merge(AbstractUser, {user: 'user', password: 'pass'});
    //data.user.objects = [user];
    //data.user.lastIndex = 0;

    function commit() {
        localStorage.setItem('datasource', JSON.stringify(data));
    }

    function load() {
        data = JSON.parse(localStorage.getItem('datasource'));
    }

    dataSource.checkCurrentUser = function (dataUser) {
        load();
        var i = 0;
        var tempUser = angular.fromJson(dataUser);
        for (i; i < data.user.objects.length; i++) {
            if (tempUser.login === data.user.objects[i].login && tempUser.password === data.user.objects[i].password) {
                return data.user.objects[i];
            }
        }
    };
    dataSource.setUsers = function (tempUser) {
        load();
        var user = angular.fromJson(tempUser);
        data.user.objects.push(user);
        commit();
    };

    dataSource.getEvents = function () {
        load();
        return data.event.list;
    };

    return dataSource;
});