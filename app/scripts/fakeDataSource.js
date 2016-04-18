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
                            id: 1,
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

    var subjects = [
        {
            id: 1,
            name: 'History',
            teachers: [1, 5],
            classRooms: [202]
        },
        {
            id: 2,
            name: 'Mathematics',
            teachers: [1, 2],
            classRooms: [202]
        },
        {
            id: 3,
            name: 'Biology',
            teachers: [2, 3],
            classRooms: [202]
        },
        {
            id: 4,
            name: 'Astronomy',
            teachers: [3, 4],
            classRooms: [202]
        },
        {
            id: 5,
            name: 'Literature',
            teachers: [4, 5],
            classRooms: [202]
        }
    ];

    var teachers = [
        {
            id: 1,
            user: 1,
            subjects: [1, 2]
        },
        {
            id: 2,
            user: 2,
            subjects: [2, 3]
        },
        {
            id: 3,
            user: 3,
            subjects: [3, 4]
        },
        {
            id: 4,
            user: 4,
            subjects: [4, 5]
        },
        {
            id: 5,
            user: 5,
            subjects: [1, 5]
        }
    ];

    var lessons = [
        {
            id: 1,
            subject: {
                id: 1,
                name: 'History'
            },
            teacher: {
                id: 1,
                name: 'Kotov Viktor'
            },
            stage: '1',
            suffix: 'A',
            classroom: 220,
            day: 'Monday',
            order: [1, 3]
        },
        {
            id: 2,
            subject: {
                id: 2,
                name: 'Mathematics'
            },
            teacher: {
                id: 2,
                name: 'Artur Krenev'
            },
            stage: '4',
            suffix: 'A',
            classroom: 305,
            day: 'Tuesday',
            order: [2]
        },
        {
            id: 3,
            subject: {
                id: 5,
                name: 'Literature'
            },
            teacher: {
                id: 4,
                name: 'Leonid Kruglev'
            },
            stage: '2',
            suffix: 'A',
            classroom: 216,
            day: 'Wednesday',
            order: [1]
        },
        {
            id: 4,
            subject: {
                id: 1,
                name: 'History'
            },
            teacher: {
                id: 5,
                name: 'Elena Osipova'
            },
            stage: '11',
            suffix: 'A',
            classroom: 101,
            day: 'Thursday',
            order: [4]
        },
        {
            id: 5,
            subject: {
                id: 4,
                name: 'Astronomy'
            },
            teacher: {
                id: 3,
                name: 'Margarita Vishnevskaya'
            },
            stage: '8',
            suffix: 'A',
            classroom: 306,
            day: 'Friday',
            order: [1, 3]
        },
        {
            id: 6,
            subject: {
                id: 3,
                name: 'Biology'
            },
            teacher: {
                id: 2,
                name: 'Artur Krenev'
            },
            stage: '2',
            suffix: 'A',
            classroom: 106,
            day: 'Wednesday',
            order: [0,2]
        },
        {
            id: 7,
            subject: {
                id: 2,
                name: 'Mathematics'
            },
            teacher: {
                id: 1,
                name: defaultUsers[1].first_name
            },
            stage: '5',
            suffix: 'B',
            classroom: 207,
            day: 'Wednesday',
            order: [1,2]
        }
    ];

    function checkSubjectTeacher(subjectId, teacherId) {
        load();
        _.find(data.subject.objects, function (subject) {
            if (subject.id === subjectId) {
                if (function () {
                        var result = true;
                        _.find(subject.teachers, function (teacher) {
                            if (teacher.id === teacherId) {
                                result = false;
                            }
                        });
                        return result;
                    }) {
                    subject.teachers.push(teacherId);
                }
            }
        });
        commit();
    }

    dataSource.updateSubject = function (newSubject) {
        checkSubjectTeacher(newSubject.lesson, newSubject.teacher);
        load();
        var tempSubject = angular.fromJson(newSubject);
        return _.find(data.subject.objects, function (subject, index) {
            if (tempSubject.id === subject.id) {
                data.subject.objects[index] = tempSubject;
                commit();
                return subject;
            }
        });
    };
    //sent data
    var scheduledLesson = {
        lesson: 12,
        date: 'timestamp',
        teacher: 145,
        classroom: 32,
        order: [1, 4]
    };
    //returned data
    var receivedData = {
        id: 1,
        lesson: {id: 12, name: 'History'},
        teacher: {id: 134, name: 'Victor Kotov'},
        classroom: 32,
        date: '',
        order: [1, 4]
    };

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
            },
            subject: {
                objects: subjects,
                lastIndex: 5
            },
            teacher: {
                objects: teachers,
                lastIndex: 5
            },
            lesson: {
                objects: lessons,
                lastIndex: 6
            }
        }));
        //init random data
        load();
        _.each(_.range(20), function () {
            data.user.objects.push(generateRandomUser(student));
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

    //default schedule
    dataSource.getSchedule = function () {
        load();
        //temp
        return data.stages.objects[0];
    };

    //Event
    dataSource.getEvents = function () {
        load();
        return data.event.objects;
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
    dataSource.addEvent = function (tempEvent) {
        load();
        var event = angular.fromJson(tempEvent);
        event.id = ++data.event.lastIndex;
        event.location = {
            latitude: 46.6699334,
            longitude: 32.6169105
        };
        data.event.objects.push(event);
        commit();
        return data.event.objects;
    };

    //Stage
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

    //Lesson
    //sent data
    var scheduledLesson2 = {
        lesson: 12,
        date: 'timestamp',
        teacher: 145,
        classroom: 32,
        order: [1, 4]
    };
    //returned data
    var receivedData2 = {
        id: 1,
        lesson: {id: 12, name: 'History'},
        teacher: {id: 134, name: 'Victor Kotov'},
        classroom: 32,
        date: '',
        order: [1, 4]
    };
    dataSource.getLesson = function (dataLesson) {
        load();
        var tempLesson = angular.fromJson(dataLesson);
        return _.find(data.lesson.objects, function (lesson, index) {
            if (tempLesson.id === lesson.id) {
                return lesson;
            }
        });
    };
    // dataSource.getLessons = function () {
    //     load();
    //     return data.lesson.objects;
    // };
    dataSource.getLessons = function (dataDay) {
        load();
        var day = angular.fromJson(dataDay);
        var _lessons = [];
        _.each(data.lesson.objects, function (lesson) {
                if (lesson.day === day.title) {
                    _lessons.push(lesson);
                }
            }
        );
        return _lessons;
    };
    dataSource.updateLesson = function (dataLesson) {
        load();
        var tempLesson = angular.fromJson(dataLesson);
        _.find(data.lesson.objects, function (lesson, index) {
            if (tempLesson.id === lesson.id) {
                data.lesson.objects[index] = tempLesson;
                commit();
            }
        });
        return data.lesson.objects;
    };
    dataSource.addLesson = function (dataLesson) {
        load();
        var lesson = angular.fromJson(dataLesson);
        lesson.id = ++data.lesson.lastIndex;
        lesson.subject = _.find(data.subject.objects, function (subject) {
            if (lesson.subject === subject.id) {
                return {id: subject.id, name: subject.name};
            }
        });
        data.lesson.objects.push(lesson);
        commit();
        return data.lesson.objects;
    };
    dataSource.deleteLesson = function (dataLesson) {
        load();
        var tempLesson = angular.fromJson(dataLesson);
        _.find(data.lesson.objects, function (lesson, index) {
            if (tempLesson.id === lesson.id) {
                data.lesson.objects.splice(index, 1);
                commit();
            }
        });
        return data.lesson.objects;
    };

    //Subject
    dataSource.getSubjects = function () {
        load();
        return data.subject.objects;
    };
    dataSource.updateSubject = function (dataSubject) {
        load();
        var tempSubject = angular.fromJson(dataSubject);
        _.find(data.subject.objects, function (subject, index) {
            if (tempSubject.id === subject.id) {
                data.subject.objects[index] = tempSubject;
                commit();
            }
        });
        return data.subject.objects;
    };
    dataSource.addSubject = function (tempSubject) {
        load();
        var subject = angular.fromJson(tempSubject);
        subject.id = ++data.subject.lastIndex;
        data.subject.objects.push(subject);
        commit();
        return data.subject.objects;
    };
    dataSource.deleteSubject = function (dataSubject) {
        load();
        var tempSubject = angular.fromJson(dataSubject);
        _.find(data.subject.objects, function (subject, index) {
            if (tempSubject.id === subject.id) {
                data.subject.objects.splice(index, 1);
                commit();
            }
        });
        return data.subject.objects;
    };

    //Teacher
    dataSource.getSubjectsForTeacher = function (dataTeacher) {
        load();
        var teacherId = angular.fromJson(dataTeacher);
        var subjects = [];
        _.find(data.teacher.objects, function (teacher) {
            if (teacher.user === teacherId) {
                _.each(teacher.subjects, function (subjectId) {
                    _.find(data.subject.objects, function (subject) {
                        if (subject.id === subjectId) {
                            subjects.push({id: subject.id, name: subject.name});
                        }
                    })
                });
            }
        });
        return subjects;
    };
    dataSource.getTeacher = function () {
        load();
        return data.teacher.objects;
    };
    dataSource.updateTeacher = function (dataTeacher) {
        load();
        var tempTeacher = angular.fromJson(dataTeacher);
        _.find(data.teacher.objects, function (teacher, index) {
            if (tempTeacher.id === teacher.id) {
                data.teacher.objects[index] = tempTeacher;
                commit();
            }
        });
        return data.teacher.objects;
    };
    dataSource.addTeacher = function (tempTeacher) {
        load();
        var teacher = angular.fromJson(tempTeacher);
        teacher.id = ++data.teacher.lastIndex;
        data.teacher.objects.push(teacher);
        commit();
        return data.teacher.objects;
    };
    dataSource.deleteTeacher = function (dataTeacher) {
        load();
        var tempTeacher = angular.fromJson(dataTeacher);
        _.find(data.teacher.objects, function (teacher, index) {
            if (tempTeacher.id === teacher.id) {
                data.teacher.objects.splice(index, 1);
                commit();
            }
        });
        return data.teacher.objects;
    };

    //User
    dataSource.updateUser = function (dataUser) {
        load();
        var _subjects = [];
        var tempUser = angular.fromJson(dataUser);
        return _.find(data.user.objects, function (user, index) {
            if (tempUser.id === user.id) {

                _.find(data.teacher.objects, function (teacher, index) {
                    if (teacher.user === tempUser.id) {
                        _.each(tempUser.subjects, function (subject) {
                            _subjects.push(subject.id);
                        });
                        data.teacher.objects[index].subjects = _subjects;
                    }
                });

                data.user.objects[index] = tempUser;
                commit();
                return user;
            }
        });
    };
    dataSource.getUsers = function (tempAmount) {
        load();
        var amount = angular.fromJson(tempAmount);
        return data.user.objects.splice(amount.offset, amount.limit);
    };
    dataSource.addUser = function (tempUser) {
        load();
        var user = angular.fromJson(tempUser);
        user.id = ++data.user.lastIndex;
        user.roles = [student];
        data.user.objects.push(user);
        commit();
    };
    dataSource.checkCurrentUser = function (dataUser) {
        load();
        var tempUser = angular.fromJson(dataUser);
        return _.find(data.user.objects, function (item) {
            if (tempUser.username === item.username && tempUser.password === item.password) {
                return item;
            }
        });

    };

    //Role
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
    dataSource.getRoles = function () {
        load();
        return data.role.objects;
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

    dataSource.getNames = function () {
        load();
        var _teacher = [];
        var _subject = [];
        _.each(data.teacher.objects, function (teacher) {
            var _name = '';
            _.find(data.user.objects, function (user) {
                if(user.id === teacher.user){
                    _name = user.first_name + ' ' + user.last_name;
                }
            });
            _teacher.push({id: teacher.id, name: _name});
        });
        _.each(data.subject.objects, function (subject) {
            _subject.push({id: subject.id, name: subject.name});
        });
        return {teacher: _teacher, subject: _subject};
    };

    return dataSource;
});