/**
 * Created by trainee on 3/7/16.
 */
define(['lodash'], function (_) {
    var dataSource = {};

    var AbstractUser = {
        id: 1,
        first_name: 'root',
        last_name: 'root',
        username: 'root',
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
            name: 'Rest',
            date: '01.03.2016',
            description: 'first event (test version)',
            location: {
                latitude: 46.6699334,
                longitude: 32.6169105
            }
        },
        {
            id: 2,
            name: "Children's hospital",
            date: '09.23.2016',
            description: 'Medical inspection',
            location: {
                latitude: 46.6676171,
                longitude: 32.6100075
            }
        },
        {
            id: 3,
            name: 'spring ball',
            date: '08.07.2016',
            description: 'spring ball',
            location: {
                latitude: 46.6716115,
                longitude: 32.6100684
            }
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
    var defautlStage = {
        stage: 5,
        suffix: 'A',
        'form-master': {
            id: 19,
            name: 'Lisa Kuddrow'
        },
        schedule: [
            {
                name: 'Monday',
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
            }, {
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
            }, {
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
            }, {
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
            }, {
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
                lastIndex: 0
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
        var tempUser = angular.fromJson(dataUser);
        return _.find(data.user.objects,function (item) {
            if (tempUser.username === item.username && tempUser.password === item.password) {
                return item;
            }
        });

    };
    dataSource.updateUser = function (dataUser) {
        load();
        var i = 0;
        var _user = null;
        var tempUser = angular.fromJson(dataUser);
        return _.find(data.user.objects, function (user, index) {
            if (tempUser.id === user.id) {
                data.user.objects[index] = tempUser;
                commit();
                return user;
            }
        });
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