/**
 * Created by trainee on 3/7/16.
 */
define(['lodash'], function (_) {
    var dataSource = {};

    var AbstractUser = {
        id: 1,
        firstName: 'root',
        lastName: 'root',
        login: 'root',
        email: 'root@gmail.com',
        password: 'root'
    };
    var AbstractSubject = {
        id: 1,
        name: 'Literature',
        classRooms: [406, 317],
        allowedStages: [5, 6, 7, 8, 9, 10, 11],
        teachers: [1, 5, 189]
    };
    var defaultEvents = [
        {
            id: 1,
            name: 'Event 1',
            date: '01.03.2016',
            title: 'first event (test version)',
            streetView: true,
            latitude: 46.671627,
            longitude: 32.611214
        },
        {
            id: 2,
            name: 'Event 2',
            date: '09.23.2016',
            title: 'second event (test version)',
            streetView: false,
            latitude: 46.671637,
            longitude: 32.612014
        },
        {
            id: 3,
            name: 'Event 3',
            date: '08.07.2016',
            title: 'third event (test version)',
            streetView: true,
            latitude: 46.671647,
            longitude: 32.613014
        },
        {
            id: 4,
            name: 'Event 4',
            date: '18.05.2016',
            title: 'fourth event (test version)',
            streetView: true,
            latitude: 46.671657,
            longitude: 32.614014
        },
        {
            id: 5,
            name: 'Event 5',
            date: '05.01.2016',
            title: 'fifth event (test version)',
            streetView: false,
            latitude: 46.671667,
            longitude: 32.615014
        }
    ];
    var defaultSubjects = [
        {
            id: 1,
            name: 'Literature',
            classroom: [304],
            allowedStages: [5, 6, 7, 8, 9, 10, 11],
            teacher: [2, 5]
        },
        {
            id: 2,
            name: 'Mathematic',
            classroom: [516, 518, 522],
            allowedStages: [3, 4, 5, 6, 7, 8, 9, 10, 11],
            teacher: [1, 7]
        },
        {
            id: 3,
            name: 'Biology',
            classroom: [507, 511],
            allowedStages: [5, 6, 7, 8, 9, 10, 11],
            teacher: [4, 6]
        },
        {
            id: 4,
            name: 'DB',
            classroom: [522, 421, 404, 518],
            allowedStages: [5, 6, 7, 8, 9, 10, 11],
            teacher: [1, 6]
        },
        {
            id: 5,
            name: 'English',
            classroom: [516],
            allowedStages: [5, 6, 7, 8, 9, 10, 11],
            teacher: [8, 3]
        },
        {
            id: 6,
            name: 'Philosophy',
            classroom: [411, 516],
            allowedStages: [5, 6, 7, 8, 9, 10, 11],
            teacher: [5, 4]
        }
    ];
    //var defaultDays = [
    //    {
    //        name: 'Monday',
    //        lessons: [defaultLessons[1], defaultLessons[2], defaultLessons[1], null, null, null, null, null]
    //    },
    //    {
    //        name: 'Tuesday',
    //        lessons: [null, defaultLessons[1], defaultLessons[2], defaultLessons[3], null, null, null, null]
    //    },
    //    {
    //        name: 'Wednesday',
    //        lessons: [defaultLessons[4], defaultLessons[0], defaultLessons[3], null, null, null, null, null]
    //    },
    //    {
    //        name: 'Thursday',
    //        lessons: [null, defaultLessons[5], defaultLessons[4], defaultLessons[2], null, null, null, null]
    //    },
    //    {
    //        name: 'Friday',
    //        lessons: [defaultLessons[0], defaultLessons[1], defaultLessons[4], null, null, null, null, null]
        //}
    //];
    var defautlStage = {
        stage: 5,
        suffix: 'A',
        'form-master': {
            id: 19,
            name: 'Lisa Kuddrow'
        },
        schedule: [
            {
                name:  'Monday',
                lessons: [
                    {
                        lesson: 'History',
                        teacher: 'Victor Kotov',
                        classroom: 32,
                        order: [1, 4]
                    },
                    {
                        lesson: 'Math',
                        teacher: 'Demi Moor',
                        classroom: 12,
                        order: [3]
                    }
                ]
            },{
                name: 'Tuesday',
                lessons: [
                    {
                        lesson: 'OOP',
                        teacher: 'Alan Moor',
                        classroom: 32,
                        order: [0, 3]
                    },
                    {
                        lesson: 'Math',
                        teacher: 'Demi Moor',
                        classroom: 12,
                        order: [2]
                    },
                    {
                        lesson: 'Math',
                        teacher: 'Demi Moor',
                        classroom: 12,
                        order: [1]
                    }
                ]
            },{
                name: 'Wednesday',
                lessons: [
                    {
                        lesson: 'Litrature',
                        teacher: 'Alan Moor',
                        classroom: 32,
                        order: [2, 4]
                    },
                    {
                        lesson: 'Math',
                        teacher: 'Demi Moor',
                        classroom: 12,
                        order: [3]
                    }
                ]
            },{
                name: 'Thursday',
                lessons: [
                    {
                        lesson: 'Litrature',
                        teacher: 'Alan Moor',
                        classroom: 32,
                        order: [1, 3]
                    },
                    {
                        lesson: 'Math',
                        teacher: 'Demi Moor',
                        classroom: 12,
                        order: [2]
                    }
                ]
            },{
                name: 'Friday',
                lessons: [
                    {
                        lesson: 'Biology',
                        teacher: 'Alan Moor',
                        classroom: 32,
                        order: [1, 3]
                    },
                    {
                        lesson: 'Math',
                        teacher: 'Demi Moor',
                        classroom: 12,
                        order: [2]
                    }
                ]
            }
        ]
    };
    var data = {};

    if (localStorage.getItem("datasource")) {
        load();
    } else {
        localStorage.setItem("datasource", JSON.stringify({
            user: {
                objects: [
                    AbstractUser
                ],
                lastIndex: 1
            },
            event: {
                objects: defaultEvents,
                lastIndex: 0,
                //list: defaultEvents
            },
            stages: {
                objects: defautlStage,
                lastIndex: 0
            }
        }));
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
            if (tempUser.id === data.user.objects[i].id) {
                data.user.objects[i] = tempUser.user;
                commit();
                return data.user.objects[i];
            }
        }
    };
    dataSource.addUser = function (tempUser) {
        load();
        var user = angular.fromJson(tempUser);
        user.id = ++data.user.lastIndex;
        data.user.objects.push(user);
        commit();
    };

    dataSource.getEvents = function () {
        load();
        return data.event.objects;
    };

    dataSource.getSchedule = function () {
        load();
        return data.stages;
    };

    return dataSource;
});