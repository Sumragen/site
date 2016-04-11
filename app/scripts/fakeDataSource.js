/**
 * Created by trainee on 3/7/16.
 */
define(['lodash'], function (_) {
    var dataSource = {};

    var permissionSet = {
        'isTeacher': 0x001,
        'hasAdminRights': 0x002,
        'canViewUsers': 0x003,
        'canEditUser': 0x004,
        'canAddUsers': 0x005,
        'canDeleteUsers': 0x006,
        'canViewSchedule': 0x007,
        'canEditSchedule': 0x008,
        'canAddSchedule': 0x009,
        'canDeleteSchedule': 0x00a,
        'canViewEvents': 0x00b,
        'canEditEvents': 0x00c,
        'canAddEvents': 0x00d,
        'canDeleteEvents': 0x00e
    };

    var p = permissionSet;
    var admin = {
        id: 1,
        name: 'admin',
        description: 'admin rights',
        permissions: [p.isTeacher, p.hasAdminRights, p.canViewUsers, p.canEditUser, p.canAddUsers,
            p.canDeleteUsers, p.canViewSchedule, p.canEditSchedule, p.canAddSchedule, p.canDeleteSchedule,
            p.canViewEvents, p.canEditEvents, p.canAddEvents, p.canDeleteEvents]
    };
    var teacher = {
        id: 2,
        name: 'teacher',
        description: 'teacher rights',
        permissions: [p.isTeacher,
            p.canViewUsers, p.canEditUser, p.canViewSchedule, p.canViewEvents, p.canEditEvents, p.canAddEvents, p.canDeleteEvents]
    };
    var student = {
        id: 3,
        name: 'student',
        description: 'student rights',
        permissions: [p.canViewUsers,
            p.canEditUser, p.canViewSchedule, p.canViewEvents]
    };

    var defaultUsers = [
        {
            id: 1,
            first_name: 'Eric',
            last_name: 'Tituashvili',
            username: 'admin',
            email: 'Davidich@smotra.ru',
            password: 'admin',
            roles: [admin]
        },
        {
            id: 2,
            first_name: 'Aleksey',
            last_name: 'Zarrubin',
            username: 'teacher',
            email: 'zarrubin@24auto.ru',
            password: 'teacher',
            roles: [teacher]
        },
        {
            id: 3,
            first_name: 'George',
            last_name: 'Chivchan',
            username: 'student',
            email: 'Gocha@gmail.com',
            password: 'student',
            roles: [student]
        },
        {
            id: 3,
            first_name: 'George',
            last_name: 'Chivchan',
            username: 'student',
            email: 'Gocha@gmail.com',
            password: 'student',
            roles: [student]
        },
        {
            id: 3,
            first_name: 'George',
            last_name: 'Chivchan',
            username: 'student',
            email: 'Gocha@gmail.com',
            password: 'student',
            roles: [student]
        },
        {
            id: 3,
            first_name: 'George',
            last_name: 'Chivchan',
            username: 'student',
            email: 'Gocha@gmail.com',
            password: 'student',
            roles: [student]
        },
        {
            id: 3,
            first_name: 'George',
            last_name: 'Chivchan',
            username: 'student',
            email: 'Gocha@gmail.com',
            password: 'student',
            roles: [student]
        },
        {
            id: 3,
            first_name: 'George',
            last_name: 'Chivchan',
            username: 'student',
            email: 'Gocha@gmail.com',
            password: 'student',
            roles: [student]
        },
        {
            id: 3,
            first_name: 'George',
            last_name: 'Chivchan',
            username: 'student',
            email: 'Gocha@gmail.com',
            password: 'student',
            roles: [student]
        },
        {
            id: 3,
            first_name: 'George',
            last_name: 'Chivchan',
            username: 'student',
            email: 'Gocha@gmail.com',
            password: 'student',
            roles: [student]
        },
        {
            id: 3,
            first_name: 'George',
            last_name: 'Chivchan',
            username: 'student',
            email: 'Gocha@gmail.com',
            password: 'student',
            roles: [student]
        },
        {
            id: 3,
            first_name: 'George',
            last_name: 'Chivchan',
            username: 'student',
            email: 'Gocha@gmail.com',
            password: 'student',
            roles: [student]
        },
        {
            id: 3,
            first_name: 'George',
            last_name: 'Chivchan',
            username: 'student',
            email: 'Gocha@gmail.com',
            password: 'student',
            roles: [student]
        },
        {
            id: 3,
            first_name: 'George',
            last_name: 'Chivchan',
            username: 'student',
            email: 'Gocha@gmail.com',
            password: 'student',
            roles: [student]
        },
        {
            id: 2,
            first_name: 'Aleksey',
            last_name: 'Zarrubin',
            username: 'teacher',
            email: 'zarrubin@24auto.ru',
            password: 'teacher',
            roles: [teacher]
        },
        {
            id: 2,
            first_name: 'Aleksey',
            last_name: 'Zarrubin',
            username: 'teacher',
            email: 'zarrubin@24auto.ru',
            password: 'teacher',
            roles: [teacher]
        },
        {
            id: 2,
            first_name: 'Aleksey',
            last_name: 'Zarrubin',
            username: 'teacher',
            email: 'zarrubin@24auto.ru',
            password: 'teacher',
            roles: [teacher]
        },
        {
            id: 2,
            first_name: 'Aleksey',
            last_name: 'Zarrubin',
            username: 'teacher',
            email: 'zarrubin@24auto.ru',
            password: 'teacher',
            roles: [teacher]
        },
        {
            id: 2,
            first_name: 'Aleksey',
            last_name: 'Zarrubin',
            username: 'teacher',
            email: 'zarrubin@24auto.ru',
            password: 'teacher',
            roles: [teacher]
        },
        {
            id: 2,
            first_name: 'Aleksey',
            last_name: 'Zarrubin',
            username: 'teacher',
            email: 'zarrubin@24auto.ru',
            password: 'teacher',
            roles: [teacher]
        },
        {
            id: 2,
            first_name: 'Aleksey',
            last_name: 'Zarrubin',
            username: 'teacher',
            email: 'zarrubin@24auto.ru',
            password: 'teacher',
            roles: [teacher]
        },
        {
            id: 2,
            first_name: 'Aleksey',
            last_name: 'Zarrubin',
            username: 'teacher',
            email: 'zarrubin@24auto.ru',
            password: 'teacher',
            roles: [teacher]
        },
        {
            id: 2,
            first_name: 'Aleksey',
            last_name: 'Zarrubin',
            username: 'teacher',
            email: 'zarrubin@24auto.ru',
            password: 'teacher',
            roles: [teacher]
        },
        {
            id: 2,
            first_name: 'Aleksey',
            last_name: 'Zarrubin',
            username: 'teacher',
            email: 'zarrubin@24auto.ru',
            password: 'teacher',
            roles: [teacher]
        },
        {
            id: 2,
            first_name: 'Aleksey',
            last_name: 'Zarrubin',
            username: 'teacher',
            email: 'zarrubin@24auto.ru',
            password: 'teacher',
            roles: [teacher]
        },
        {
            id: 2,
            first_name: 'Aleksey',
            last_name: 'Zarrubin',
            username: 'teacher',
            email: 'zarrubin@24auto.ru',
            password: 'teacher',
            roles: [teacher]
        },
        {
            id: 2,
            first_name: 'Aleksey',
            last_name: 'Zarrubin',
            username: 'teacher',
            email: 'zarrubin@24auto.ru',
            password: 'teacher',
            roles: [teacher]
        },
        {
            id: 2,
            first_name: 'Aleksey',
            last_name: 'Zarrubin',
            username: 'teacher',
            email: 'zarrubin@24auto.ru',
            password: 'teacher',
            roles: [teacher]
        },
        {
            id: 2,
            first_name: 'Aleksey',
            last_name: 'Zarrubin',
            username: 'teacher',
            email: 'zarrubin@24auto.ru',
            password: 'teacher',
            roles: [teacher]
        },
        {
            id: 2,
            first_name: 'Aleksey',
            last_name: 'Zarrubin',
            username: 'teacher',
            email: 'zarrubin@24auto.ru',
            password: 'teacher',
            roles: [teacher]
        },
        {
            id: 2,
            first_name: 'Aleksey',
            last_name: 'Zarrubin',
            username: 'teacher',
            email: 'zarrubin@24auto.ru',
            password: 'teacher',
            roles: [teacher]
        },
        {
            id: 2,
            first_name: 'Aleksey',
            last_name: 'Zarrubin',
            username: 'teacher',
            email: 'zarrubin@24auto.ru',
            password: 'teacher',
            roles: [teacher]
        },
        {
            id: 2,
            first_name: 'Aleksey',
            last_name: 'Zarrubin',
            username: 'teacher',
            email: 'zarrubin@24auto.ru',
            password: 'teacher',
            roles: [teacher]
        },
        {
            id: 2,
            first_name: 'Aleksey',
            last_name: 'Zarrubin',
            username: 'teacher',
            email: 'zarrubin@24auto.ru',
            password: 'teacher',
            roles: [teacher]
        },
        {
            id: 2,
            first_name: 'Aleksey',
            last_name: 'Zarrubin',
            username: 'teacher',
            email: 'zarrubin@24auto.ru',
            password: 'teacher',
            roles: [teacher]
        },
        {
            id: 2,
            first_name: 'Aleksey',
            last_name: 'Zarrubin',
            username: 'teacher',
            email: 'zarrubin@24auto.ru',
            password: 'teacher',
            roles: [teacher]
        },
        {
            id: 2,
            first_name: 'Aleksey',
            last_name: 'Zarrubin',
            username: 'teacher',
            email: 'zarrubin@24auto.ru',
            password: 'teacher',
            roles: [teacher]
        },
        {
            id: 2,
            first_name: 'Aleksey',
            last_name: 'Zarrubin',
            username: 'teacher',
            email: 'zarrubin@24auto.ru',
            password: 'teacher',
            roles: [teacher]
        },
        {
            id: 5,
            first_name: 'Sumragen',
            last_name: 'Get Fly',
            username: 'Sumragen',
            email: 'zarrubin@24auto.ru',
            password: 'teacher',
            roles: [teacher]
        }
    ];
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
            date: 'February 19, 2016 11:50 AM',
            description: 'first event (test version)',
            location: {
                latitude: 46.6699334,
                longitude: 32.6169105
            }
        },
        {
            id: 2,
            name: "Children's hospital",
            date: 'September 23, 2016 2:30 PM',
            description: 'Medical inspection',
            location: {
                latitude: 46.6676171,
                longitude: 32.6100075
            }
        },
        {
            id: 3,
            name: 'spring ball',
            date: 'April 15, 2016 4:00 PM',
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
                objects: defaultUsers,
                lastIndex: 3
            },
            event: {
                objects: defaultEvents,
                lastIndex: 0
            },
            stages: {
                objects: defautlStage,
                lastIndex: 0
            },
            role: {
                objects: [admin, teacher, student],
                lastIndex: 3
            }
        }));
    }

    function commit() {
        localStorage.setItem('datasource', JSON.stringify(data));
    }

    function load() {
        data = JSON.parse(localStorage.getItem('datasource'));
    }

    dataSource.checkCurrentUser = function (dataUser) {
        load();
        var tempUser = angular.fromJson(dataUser);
        return _.find(data.user.objects, function (item) {
            if (tempUser.username === item.username && tempUser.password === item.password) {
                return item;
            }
        });

    };
    dataSource.updateUser = function (dataUser) {
        load();
        var tempUser = angular.fromJson(dataUser);
        return _.find(data.user.objects, function (user, index) {
            if (tempUser.id === user.id) {
                data.user.objects[index] = tempUser;
                commit();
                return user;
            }
        });
    };
    dataSource.updateEvent = function (dataEvent) {
        load();
        var tempEvent = angular.fromJson(dataEvent);
        _.find(data.event.objects, function (event, index) {
            if (tempEvent.id === event.id) {
                data.event.objects[index] = tempEvent;
                commit();
            }
        });
        return data.event.objects;
    };
    dataSource.updateRole = function (dataRole) {
        load();
        var tempRole = angular.fromJson(dataRole);
        return _.find(data.role.objects, function (role, index) {
            if (tempRole.id === role.id) {
                data.role.objects[index] = tempRole;
                commit();
                return role;
            }
        });
    };
    dataSource.addRole = function (tempRole) {
        load();
        var role = angular.fromJson(tempRole);
        role.id = ++data.role.lastIndex;
        data.role.objects.push(role);
        commit();
        return data.role.objects;
    };
    dataSource.addUser = function (tempUser) {
        load();
        var user = angular.fromJson(tempUser);
        user.id = ++data.user.lastIndex;
        user.roles = [student];
        data.user.objects.push(user);
        commit();
    };

    dataSource.getRoles = function () {
        load();
        return data.role.objects;
    };

    dataSource.getUsers = function (tempAmount) {
        load();
        var amount = angular.fromJson(tempAmount);
        return data.user.objects.splice(amount.offset, amount.limit);
    };

    dataSource.getEvents = function () {
        load();
        return data.event.objects;
    };

    dataSource.getSchedule = function () {
        load();
        return data.stages;
    };

    dataSource.deleteRole = function (dataRole) {
        load();
        var tempRole = angular.fromJson(dataRole);
        _.find(data.role.objects, function (role, index) {
            if (tempRole.id === role.id) {
                data.role.objects.splice(index,1);
                commit();
            }
        });
        return data.role.objects;
    };
    return dataSource;
});