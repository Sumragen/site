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
    var SimpleEvents = [
        {
            name: 'Event 1',
            date: '01.03.2016'
        },
        {
            name: 'Event 2',
            date: '09.23.2016'
        },
        {
            name: 'Event 3',
            date: '08.07.2016'
        },
        {
            name: 'Event 4',
            date: '18.05.2016'
        },
        {
            name: 'Event 5',
            date: '05.01.2016'
        }
    ];
    var data = {};
    {
        if (localStorage.getItem("datasource")) {
            load();
        } else {
            localStorage.setItem("datasource", JSON.stringify({user: {objects: [AbstractUser] },event: {list: SimpleEvents }}));
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
    dataSource.addUser = function (tempUser) {
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