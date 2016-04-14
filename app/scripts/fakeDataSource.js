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

    var data = {};
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

    function randomWord(strLengt) {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < strLengt; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }

    function generateRandomUser(role) {
        return {
            id: ++data.user.lastIndex,
            first_name: randomWord(7),
            last_name: randomWord(9),
            username: randomWord(9),
            email: randomWord(4) + '@' + randomWord(5) + '.com',
            password: 'password',
            roles: [role]
        }
    }

    function generateRandomEvent() {
        var mounts = ['January', 'February', 'March', 'April', 'May',
            'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        var dayTime = ['AM', 'PM'];
        return {
            id: ++data.event.lastIndex,
            name: randomWord(6),
            date: mounts[Math.floor(Math.random() * 12)] + ' ' + Math.floor(Math.random() * 30) + ', ' +
            Math.floor(Math.random() * 2000 + 20) + ' ' + Math.floor(Math.random() * 12) + ':' + Math.floor(Math.random() * 59) + +' ' + dayTime[Math.floor(Math.random() * 2)],
            description: randomWord(20),
            location: {
                latitude: Math.random() * 100,
                longitude: Math.random() * 100
            }
        }
    }

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
        }
    ];

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
    var defaultStages = [
        {
            id: 1,
            stage: 5,
            suffix: 'A',
            formMaster: {
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
        },
        {
            id: 2,
            stage: 11,
            suffix: 'A',
            formMaster: {
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
                        }
                    ]
                }
            ]
        },
        {
            id: 3,
            stage: 11,
            suffix: 'B',
            formMaster: {
                id: 19,
                name: 'Lisa Kuddrow'
            },
            schedule: [
                {
                    name: 'Monday',
                    lessons: [
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
                            order: [1]
                        }
                    ]
                }, {
                    name: 'Wednesday',
                    lessons: [
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
                            order: [2, 4]
                        }
                    ]
                }, {
                    name: 'Friday',
                    lessons: [
                        {
                            lesson: 'Biology',
                            teacher: 'Alan Moor',
                            classroom: 32,
                            order: [5, 6]
                        }
                    ]
                }
            ]
        },
        {
            id: 4,
            stage: 1,
            suffix: 'A',
            formMaster: {
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
                            order: [0, 2]
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
                            order: [1, 2]
                        },
                        {
                            lesson: 'Math',
                            teacher: 'Demi Moor',
                            classroom: 12,
                            order: [4]
                        }
                    ]
                }, {
                    name: 'Wednesday',
                    lessons: [
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
                            order: [2, 3]
                        },
                        {
                            lesson: 'Math',
                            teacher: 'Demi Moor',
                            classroom: 12,
                            order: [0, 1]
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
                            order: [4, 2]
                        }
                    ]
                }
            ]
        },
        {
            id: 5,
            stage: 2,
            suffix: 'A',
            formMaster: {
                id: 19,
                name: 'Lisa Kuddrow'
            },
            schedule: [
                {
                    name: 'Monday',
                    lessons: [
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
                    ]
                }, {
                    name: 'Friday',
                    lessons: [
                        {
                            lesson: 'Biology',
                            teacher: 'Alan Moor',
                            classroom: 32,
                            order: [1, 3]
                        }
                    ]
                }
            ]
        },
        {
            id: 6,
            stage: 3,
            suffix: 'A',
            formMaster: {
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
                        }
                    ]
                }
            ]
        },
        {
            id: 7,
            stage: 4,
            suffix: 'A',
            formMaster: {
                id: 19,
                name: 'Lisa Kuddrow'
            },
            schedule: [
                {
                    name: 'Monday',
                    lessons: [
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
                            order: [1]
                        }
                    ]
                }, {
                    name: 'Wednesday',
                    lessons: [
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
                        }
                    ]
                }, {
                    name: 'Friday',
                    lessons: [
                        {
                            lesson: 'Math',
                            teacher: 'Demi Moor',
                            classroom: 12,
                            order: [2]
                        }
                    ]
                }
            ]
        },
        {
            id: 8,
            stage: 5,
            suffix: 'B',
            formMaster: {
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
                        }
                    ]
                }, {
                    name: 'Tuesday',
                    lessons: [
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
                        }
                    ]
                }, {
                    name: 'Friday',
                    lessons: [
                        {
                            lesson: 'Math',
                            teacher: 'Demi Moor',
                            classroom: 12,
                            order: [2]
                        }
                    ]
                }
            ]
        },
        {
            id: 9,
            stage: 6,
            suffix: 'A',
            formMaster: {
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
        },
        {
            id: 10,
            stage: 7,
            suffix: 'A',
            formMaster: {
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
        },
        {
            id: 11,
            stage: 8,
            suffix: 'A',
            formMaster: {
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
        },
        {
            id: 12,
            stage: 9,
            suffix: 'A',
            formMaster: {
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
        },
        {
            id: 13,
            stage: 10,
            suffix: 'A',
            formMaster: {
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
        }
    ];


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
                lastIndex: 3
            },
            stages: {
                objects: defaultStages,
                lastIndex: 13
            },
            role: {
                objects: [admin, teacher, student],
                lastIndex: 3
            }
        }));
        //init random data
        load();
        _.each(_.range(20), function () {
            data.user.objects.push(generateRandomUser(teacher));
            data.event.objects.push(generateRandomEvent())
        });
        commit();
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
    dataSource.addEvent = function (tempEvent) {
        load();
        var event = angular.fromJson(tempEvent);
        event.id = ++data.event.lastIndex;
        data.event.objects.push(event);
        commit();
        return data.event.objects;
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
        //temp
        return data.stages.objects[0];
    };
    dataSource.getStageBySuffix = function (tempData) {
        load();
        var stageId = angular.fromJson(tempData);
        return _.find(data.stages.objects, function (stage) {
            if (stageId === stage.id) {
                return stage;
            }
        })
    };

    dataSource.getStages = function () {
        load();
        return data.stages.objects;
    };


    dataSource.deleteRole = function (dataRole) {
        load();
        var tempRole = angular.fromJson(dataRole);
        _.find(data.role.objects, function (role, index) {
            if (tempRole.id === role.id) {
                data.role.objects.splice(index, 1);
                commit();
            }
        });
        return data.role.objects;
    };
    return dataSource;
});