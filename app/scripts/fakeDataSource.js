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
    var defaultEvents = [
        {
            id: 1,
            name: 'Event 1',
            date: '01.03.2016',
            title: 'first event (test version)',
            positionX: 46.671627,
            positionY: 32.611214
        },
        {
            id: 2,
            name: 'Event 2',
            date: '09.23.2016',
            title: 'second event (test version)',
            positionX: 46.671637,
            positionY: 32.612014
        },
        {
            id: 3,
            name: 'Event 3',
            date: '08.07.2016',
            title: 'third event (test version)',
            positionX: 46.671647,
            positionY: 32.613014
        },
        {
            id: 4,
            name: 'Event 4',
            date: '18.05.2016',
            title: 'fourth event (test version)',
            positionX: 46.671657,
            positionY: 32.614014
        },
        {
            id: 5,
            name: 'Event 5',
            date: '05.01.2016',
            title: 'fifth event (test version)',
            positionX: 46.671667,
            positionY: 32.615014
        }
    ];
    var defaultLessons = [
        {
            name: 'Literature',
            classroom: 304,
            teacher: 'Romanovich'
        },
        {
            name: 'Mathematic',
            classroom: 516,
            teacher: 'Peregnyak'
        },
        {
            name: 'OOP',
            classroom: 507,
            teacher: 'Blinov'
        },
        {
            name: 'DB',
            classroom: 522,
            teacher: 'Klenov'
        },
        {
            name: 'English',
            classroom: 516,
            teacher: 'Moontyan'
        },
        {
            name: 'Philosophy',
            classroom: 411,
            teacher: 'Grishanov'
        }
    ];
    var defaultDays = [
        {
            name: 'Monday',
            lessons: [defaultLessons[0], defaultLessons[2], defaultLessons[1], null, null, null, null, null]
        },
        {
            name: 'Tuesday',
            lessons: [null, defaultLessons[1], defaultLessons[2], defaultLessons[3], null, null, null, null]
        },
        {
            name: 'Wednesday',
            lessons: [defaultLessons[4], defaultLessons[0], defaultLessons[3], null, null, null, null, null]
        },
        {
            name: 'Thursday',
            lessons: [null, defaultLessons[5], defaultLessons[4], defaultLessons[2], null, null, null, null]
        },
        {
            name: 'Friday',
            lessons: [defaultLessons[0], defaultLessons[1], defaultLessons[4], null, null, null, null, null]
        }
    ];
    var data = {};
    {
        if (localStorage.getItem("datasource")) {
            load();
        } else {
            localStorage.setItem("datasource", JSON.stringify({
                user: {
                    objects: [
                        AbstractUser
                    ]
                },
                event: {
                    list: defaultEvents
                },
                schedule: {
                    lessons: defaultLessons,
                    days: defaultDays
                }
            }));
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
    dataSource.updateUser = function (dataUser) {
        load();
        var i = 0;
        var tempUser = angular.fromJson(dataUser);
        for (i; i < data.user.objects.length; i++) {
            if (tempUser.currentData.login === data.user.objects[i].login && tempUser.currentData.email === data.user.objects[i].email) {
                data.user.objects[i] = tempUser.user;
                commit();
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

    dataSource.getSchedule = function () {
        load();
        return data.schedule;
    };

    return dataSource;
});