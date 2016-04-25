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
                id: 1,
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
                id: 2,
                name: 'Lisa Kuddrow'
            }
        },
        {
            id: 3,
            stage: 11,
            suffix: 'B',
            formMaster: {
                id: 3,
                name: 'Lisa Kuddrow'
            }
        },
        {
            id: 4,
            stage: 1,
            suffix: 'A',
            formMaster: {
                id: 4,
                name: 'Lisa Kuddrow'
            }
        },
        {
            id: 5,
            stage: 2,
            suffix: 'A',
            formMaster: {
                id: 2,
                name: 'Lisa Kuddrow'
            }
        },
        {
            id: 6,
            stage: 3,
            suffix: 'A',
            formMaster: {
                id: 1,
                name: 'Lisa Kuddrow'
            }
        },
        {
            id: 7,
            stage: 4,
            suffix: 'A',
            formMaster: {
                id: 5,
                name: 'Lisa Kuddrow'
            }
        },
        {
            id: 8,
            stage: 5,
            suffix: 'B',
            formMaster: {
                id: 1,
                name: 'Lisa Kuddrow'
            }
        },
        {
            id: 9,
            stage: 6,
            suffix: 'A',
            formMaster: {
                id: 5,
                name: 'Lisa Kuddrow'
            }
        },
        {
            id: 10,
            stage: 7,
            suffix: 'A',
            formMaster: {
                id: 3,
                name: 'Lisa Kuddrow'
            }
        },
        {
            id: 11,
            stage: 8,
            suffix: 'A',
            formMaster: {
                id: 2,
                name: 'Lisa Kuddrow'
            }
        },
        {
            id: 12,
            stage: 9,
            suffix: 'A',
            formMaster: {
                id: 4,
                name: 'Lisa Kuddrow'
            }
        },
        {
            id: 13,
            stage: 10,
            suffix: 'A',
            formMaster: {
                id: 2,
                name: 'Lisa Kuddrow'
            }
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
        },
        {
            id: 6,
            user: 6,
            subjects: [1, 2, 4, 5]
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
                name: defaultUsers[0].first_name + ' ' + defaultUsers[0].last_name
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
                name: defaultUsers[1].first_name + ' ' + defaultUsers[1].last_name
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
                id: 2,
                name: defaultUsers[1].first_name + ' ' + defaultUsers[1].last_name
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
                id: 3,
                name: defaultUsers[2].first_name + ' ' + defaultUsers[2].last_name
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
                name: defaultUsers[2].first_name + ' ' + defaultUsers[2].last_name
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
                name: defaultUsers[1].first_name + ' ' + defaultUsers[1].last_name
            },
            stage: '2',
            suffix: 'A',
            classroom: 106,
            day: 'Wednesday',
            order: [0, 2]
        },
        {
            id: 7,
            subject: {
                id: 2,
                name: 'Mathematics'
            },
            teacher: {
                id: 1,
                name: defaultUsers[0].first_name + ' ' + defaultUsers[0].last_name
            },
            stage: '5',
            suffix: 'B',
            classroom: 207,
            day: 'Wednesday',
            order: [1, 2]
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
            stage: {
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
                lastIndex: 6
            },
            lesson: {
                objects: lessons,
                lastIndex: 7
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
        return data.stage.objects[0];
    };

    //Event
    dataSource.getEvents = function () {
        load();
        return data.event.objects;
    };
    dataSource.updateEventList = function (dataEvents) {
        load();
        var tempEvents = angular.fromJson(dataEvents);
        data.event.objects = tempEvents;
        commit();
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
        return _.find(data.stage.objects, function (stage) {
            if (stageId === stage.id) {
                return stage;
            }
        })
    };
    dataSource.getStages = function () {
        load();
        return data.stage.objects;
    };

    //Lesson
    dataSource.getLesson = function (dataLesson) {
        load();
        var tempLesson = angular.fromJson(dataLesson);
        return _.find(data.lesson.objects, function (lesson) {
            if (tempLesson.id === lesson.id) {
                return lesson;
            }
        });
    };
    dataSource.getLessonsByDay = function (dataDay) {
        load();
        var day = angular.fromJson(dataDay);
        var lessons = [];
        _.each(data.lesson.objects, function (lesson) {
                if (day && lesson.day === day.title) {
                    lessons.push(lesson);
                }
            }
        );
        return lessons;
    };
    dataSource.getLessonsByStage = function (dataStage) {
        load();
        var stage = angular.fromJson(dataStage);
        var lessons = [];
        _.each(data.lesson.objects, function (lesson) {
                if (stage && Number(lesson.stage) === stage.stage && lesson.suffix === stage.suffix) {
                    lessons.push(lesson);
                }
            }
        );
        return lessons;
    };
    dataSource.updateLessonById = function (dataLesson) {
        load();
        var tempLesson = angular.fromJson(dataLesson);
        var days = {
            1: 'Monday',
            2: 'Tuesday',
            3: 'Wednesday',
            4: 'Thursday',
            5: 'Friday',
            6: 'Sunday',
            7: 'Saturday'
        };
        _.every(data.lesson.objects, function (lesson, index) {
            if (tempLesson.id === lesson.id) {
                if (lesson.order.length > 1) {
                    _.every(lesson.order, function (order, iter) {
                        if (order === tempLesson.order) {
                            data.lesson.objects[index].order.splice(iter, 1);
                            return false;
                        }
                        return true;
                    });
                    var newLesson = angular.copy(data.lesson.objects[index]);
                    newLesson.id = ++data.lesson.lastIndex;
                    newLesson.order = [tempLesson.order];
                    newLesson.day = days[Math.abs(tempLesson.dow)];
                    data.lesson.objects.push(newLesson)
                } else {
                    data.lesson.objects[index].day = days[Math.abs(tempLesson.dow)];
                }
                return false;
            }
            return true;
        });
        commit();
        return data.lesson.objects;
    };
    dataSource.updateLesson = function (dataLesson) {
        load();
        var tempLesson = angular.fromJson(dataLesson);
        var createNew = false;
        data.lesson.objects.every(function (lesson, index) {
            if (tempLesson.id === lesson.id) {
                data.lesson.objects[index].order.every(function (order, iter) {
                    if (order === tempLesson.order) {
                        createNew = true;
                        data.lesson.objects[index].order.splice(iter, 1);
                        return false;
                    }
                    return true;
                });
                tempLesson.order = [tempLesson.order];

                data.subject.objects.every(function (subject) {
                    if (subject.id === tempLesson.subject) {
                        tempLesson.subject = {id: subject.id, name: subject.name};
                        return false;
                    }
                    return true;
                });
                data.teacher.objects.every(function (teacher) {
                    if (teacher.id === tempLesson.teacher) {
                        var tempUser = {};
                        data.user.objects.every(function (user) {
                            if (teacher.user === user.id) {
                                tempUser = user;
                                return false;
                            }
                            return true;
                        });
                        tempLesson.teacher = {id: tempUser.id, name: tempUser.first_name + ' ' + tempUser.last_name};
                        return false;
                    }
                    return true;
                });
                if (createNew) {
                    tempLesson.id = ++data.lesson.lastIndex;
                    data.lesson.objects.push(tempLesson);
                } else {
                    data.lesson.objects[index] = tempLesson;
                }
                commit();
                return false;
            }
            return true;
        });
        var arrOfLessons = [];
        _.each(data.lesson.objects, function (lesson) {
            if (lesson.day === tempLesson.day) {
                arrOfLessons.push(lesson);
            }
        });
        return arrOfLessons;
    };
    dataSource.createLesson = function (dataLesson) {
        load();
        var lesson = angular.fromJson(dataLesson);
        data.subject.objects.every(function (subject) {
            if (subject.id === lesson.subject) {
                lesson.subject = {id: subject.id, name: subject.name};
                return false;
            }
            return true;
        });
        data.teacher.objects.every(function (teacher) {
            if (teacher.id === lesson.teacher) {
                return data.user.objects.every(function (user) {
                    if (user.id === teacher.user) {
                        lesson.teacher = {id: user.id, name: user.first_name + ' ' + user.last_name};
                        return false;
                    }
                    return true;
                })
            }
            return true;
        });

        var createNew = true;
        var ind = -1;
        data.lesson.objects.every(function (tempLesson, index) {
            if (tempLesson.classroom === lesson.classroom
                && tempLesson.day === lesson.day
                && tempLesson.stage === lesson.stage
                && tempLesson.suffix === lesson.suffix
                && tempLesson.teacher.id === lesson.teacher.id
                && tempLesson.subject.id === lesson.subject.id) {
                tempLesson.order.push(lesson.order);
                lesson.order = tempLesson.order;
                ind = index;
                createNew = false;
            }
            return true;
        });
        if (createNew) {
            lesson.id = ++data.lesson.lastIndex;
            lesson.order = [lesson.order];
            data.lesson.objects.push(lesson);
        } else {
            lesson.id = data.lesson.objects[ind].id;
            data.lesson.objects[ind] = lesson;
        }
        commit();
        var arrOfLessons = [];
        _.each(data.lesson.objects, function (tempLesson) {
            if (lesson.day === tempLesson.day) {
                arrOfLessons.push(tempLesson);
            }
        });
        return arrOfLessons;
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
        var subjects = [];
        var tempUser = angular.fromJson(dataUser);
        var result = {};
        _.every(data.user.objects, function (user, index) {
            if (tempUser.id === user.id) {
                _.every(data.teacher.objects, function (teacher, index) {
                    if (teacher.user === tempUser.id) {
                        _.each(tempUser.subjects, function (subject) {
                            subjects.push(subject.id);
                        });
                        var tempRole = {};
                        _.every(data.role.objects, function (role) {
                            if(role.id === tempUser.role){
                                tempRole = role;
                                return false;
                            }
                            return true;
                        });
                        tempUser.roles[0] = tempRole;
                        data.teacher.objects[index].subjects = subjects;
                        return false;
                    }
                    return true;
                });

                data.user.objects[index] = tempUser;
                commit();
                data.user.objects.splice(10);
                result = {user: tempUser, users : data.user.objects};
                return false;
            }
            return true;
        });
        return result;
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
        _.every(data.role.objects, function (role, index) {
            if (tempRole.id === role.id) {
                data.role.objects.splice(index, 1);
                commit();
                return false;
            }
            return true;
        });
        return data.role.objects;
    };


    //Stage
    function getFormMasterName(id) {
        load();
        var formMaster = {};
        _.every(data.user.objects, function (user) {
            if (user.id === id) {
                formMaster = {id: user.id, name: user.first_name + ' ' + user.last_name};
                return false;
            }
            return true;
        });
        return formMaster;
    }

    dataSource.getStages = function () {
        load();
        return data.stage.objects;
    };
    dataSource.updateStagesList = function (dataStages) {
        load();
        var tempStages = angular.fromJson(dataStages);
        data.stage.objects = tempStages;
        commit();
        return data.stage.objects;
    };
    dataSource.updateStage = function (dataStage) {
        load();
        var formMaster = null;
        var tempStage = angular.fromJson(dataStage);
        _.find(data.stage.objects, function (stage, index) {
            if (tempStage.id === stage.id) {
                tempStage.formMaster = getFormMasterName(tempStage.formMaster);
                data.stage.objects[index] = tempStage;
                commit();
            }
        });
        return data.stage.objects;
    };
    dataSource.addStage = function (tempStage) {
        load();
        var stage = angular.fromJson(tempStage);
        stage.id = ++data.stage.lastIndex;
        stage.formMaster = getFormMasterName(stage.formMaster);
        if (_.every(data.stage.objects, function (checkStage) {
                return !(checkStage.stage === stage.stage && checkStage.suffix === stage.suffix)
            })
        ) {
            data.stage.objects.push(stage);
        }
        commit();
        return data.stage.objects;
    };

    function compare(a, b) {
        if (a.name < b.name)
            return -1;
        else if (a.name > b.name)
            return 1;
        else
            return 0;
    }

    dataSource.getSubjectNames = function () {
        load();
        var tempSubject = [];
        _.each(data.subject.objects, function (subject) {
            tempSubject.push({id: subject.id, name: subject.name});
        });
        return tempSubject;
    };
    function getTeacherNameByUserId(id) {
        load();
        var teacherName = null;
        _.every(data.user.objects, function (user) {
            if (user.id === id) {
                teacherName = user.first_name + ' ' + user.last_name;
                return false;
            }
            return true;
        });
        return teacherName;
    }

    dataSource.getRoleNames = function () {
        load();
        var tempRole = [];
        _.each(data.role.objects, function (role) {
            tempRole.push({id: role.id, name :role.name});
        });
        return tempRole;
    };
    dataSource.getTeacherNames = function (dataStage) {
        load();
        var selectedStage = angular.fromJson(dataStage);
        var tempTeachers = [];
        _.each(data.teacher.objects, function (teacher) {
            if (_.every(data.stage.objects, function (stage) {
                    return !(stage.formMaster.id === teacher.id);
                })) {
                tempTeachers.push({id: teacher.id, name: getTeacherNameByUserId(teacher.user)});
            }
        });
        if(selectedStage){
            tempTeachers.push(selectedStage.formMaster);
        }
        return tempTeachers;
    };
    dataSource.getNames = function (tempData) {
        load();
        var selectedLesson = angular.fromJson(tempData);
        var tempTeacher = [];
        var tempSubject = [];
        _.each(data.teacher.objects, function (teacher) {
            _.every(data.user.objects, function (user) {
                if (user.id === teacher.user) {
                    if (_.every(data.lesson.objects, function (lesson) {
                            if (lesson.day === selectedLesson.day && !_.every(lesson.order, function (order) {
                                    return !(order === selectedLesson.order);
                                })) {
                                return !(lesson.teacher.id === teacher.user)
                            }
                            return true;
                        })) {
                        tempTeacher.push({id: teacher.user, name: user.first_name + ' ' + user.last_name});
                        return false;
                    }
                }
                return true;
            });
        });
        if (selectedLesson.lesson) {
            _.every(data.lesson.objects, function (lesson) {
                if (Number(lesson.stage) === Number(selectedLesson.lesson.stage)
                    && lesson.suffix === selectedLesson.lesson.suffix
                    && lesson.day === selectedLesson.day
                    && !_.every(lesson.order, function (order) {
                        return !(order === selectedLesson.order);
                    })) {
                    tempTeacher.push({id: lesson.teacher.id, name: lesson.teacher.name});
                    return false;
                }
                return true;
            })
        }
        _.each(data.subject.objects, function (subject) {
            tempSubject.push({id: subject.id, name: subject.name});
        });
        return {teacher: tempTeacher.sort(compare), subject: tempSubject.sort(compare)};
    };

    return dataSource;
});