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
                address: {
                    country:randomWord(8),
                    city: randomWord(6)
                },
                location: {
                    latitude: Math.random() * 5 + 44,
                    longitude: Math.random() * 5 + 29
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
                address:{
                    city: 'Kherson',
                    country: 'Ukraine'
                },
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
                address:{
                    city: 'Kherson',
                    country: 'Ukraine'
                },
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
                address:{
                    city: 'Kherson',
                    country: 'Ukraine'
                },
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
                teachers: [1, 5, 6],
                classRooms: [202]
            },
            {
                id: 2,
                name: 'Mathematics',
                teachers: [1, 2, 6],
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
                teachers: [3, 4, 6],
                classRooms: [202]
            },
            {
                id: 5,
                name: 'Literature',
                teachers: [4, 5, 6],
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
            _.each(_.range(25), function () {
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
            data.event.objects.push(event);
            commit();
            return event;
        };
        dataSource.deleteEvent = function (dataEvent) {
            load();
            var tempEvent = angular.fromJson(dataEvent);
            _.every(data.event.objects, function (event, index) {
                if (tempEvent.id === event.id) {
                    data.event.objects.splice(index, 1);
                    commit();
                    return false;
                }
                return true;
            });
            return data.event.objects;
        };

        //Stage
        dataSource.getLessonsByStageId = function (tempData) {
            load();
            var tempStage = angular.fromJson(tempData);
            var result = {stage: null, lessons: []};
            _.every(data.stage.objects, function (stage) {
                if (stage.id === tempStage) {
                    result.stage = stage;
                    _.each(data.lesson.objects, function (lesson) {
                        if (lesson.stage == stage.stage && lesson.suffix === stage.suffix) {
                            result.lessons.push(lesson);
                        }
                    });
                    return false;
                }
                return true;
            });
            return result;
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
                    if (stage && lesson.stage == stage.stage && lesson.suffix === stage.suffix) {
                        lessons.push(lesson);
                    }
                }
            );
            return lessons;
        };
        var days = {
            1: 'Monday',
            2: 'Tuesday',
            3: 'Wednesday',
            4: 'Thursday',
            5: 'Friday',
            6: 'Sunday',
            7: 'Saturday'
        };
        dataSource.updateLessonById = function (dataLesson) {
            load();
            var tempLesson = angular.fromJson(dataLesson);
            var newLesson = {};
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
                        newLesson = angular.copy(data.lesson.objects[index]);
                        newLesson.id = ++data.lesson.lastIndex;
                        newLesson.order = [tempLesson.order];
                        newLesson.day = days[Math.abs(tempLesson.dow)];
                        data.lesson.objects.push(newLesson)
                    } else {
                        data.lesson.objects[index].day = days[Math.abs(tempLesson.dow)];
                        newLesson = data.lesson.objects[index];
                    }
                    return false;
                }
                return true;
            });
            commit();
            return newLesson;
        };
        dataSource.updateLessons = function (dataLessons) {
            load();
            var tempLessons = angular.fromJson(dataLessons);
            var result = {isError: false, objects: []};
            _.each(tempLessons.objects, function (tempLesson) {
                _.every(data.lesson.objects, function (toCheckLesson) {
                    if (toCheckLesson.id === tempLesson.id
                        && toCheckLesson.stage == tempLessons.stage.stage
                        && toCheckLesson.suffix === tempLessons.stage.suffix) {
                        _.every(data.lesson.objects, function (checkLesson) {
                            if (tempLesson.id !== checkLesson.id
                                && days[tempLesson.dow] === checkLesson.day
                                && toCheckLesson.teacher.id === checkLesson.teacher.id
                                && !_.every(checkLesson.order, function (checkOrder) {
                                    return _.every(toCheckLesson.order, function (toCheckOrder) {
                                        return !(checkOrder === toCheckOrder);
                                    })
                                })) {
                                result.isError = true;
                                result.objects.push(toCheckLesson.id);
                                return false;
                            }
                            return true;
                        });
                        return false;
                    }
                    return true;
                })
            });
            if (!result.isError) {
                _.each(tempLessons.objects, function (lesson) {
                    dataSource.updateLessonById(lesson);
                });
                result.objects = _.filter(data.lesson.objects, function (lesson) {
                    return lesson.stage == tempLessons.stage.stage && lesson.suffix === tempLessons.stage.suffix;
                });
            }
            commit();
            return result;
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
                        if (teacher.user === tempLesson.teacher) {
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
                if (teacher.user === lesson.teacher) {
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
            var tempUser = angular.fromJson(dataUser);
            var result = {};
            _.every(data.user.objects, function (user, index) {
                if (tempUser.id === user.id) {
                    _.every(data.role.objects, function (role) {
                        if (tempUser.role === role.id) {
                            tempUser.roles[0] = role;
                            if (role.name === 'teacher' || role.name === 'admin') {
                                if (_.every(data.teacher.objects, function (teacher, ind) {
                                        if (teacher.user === tempUser.id) {
                                            data.teacher.objects[ind].subjects = _.map(tempUser.subjects, 'id');
                                            return false;
                                        }
                                        return true;
                                    })) {
                                    data.teacher.objects.push({
                                        id: ++data.teacher.lastIndex,
                                        user: tempUser.id,
                                        subjects: _.map(tempUser.subjects, 'id')
                                    })
                                }
                                _.each(data.subject.objects, function (subject, i) {
                                    _.every(subject.teachers, function (teacher, index) {
                                        if (teacher === tempUser.id) {
                                            if (_.every(tempUser.subjects, function (userSubject) {
                                                    return !(userSubject.id === subject.id);
                                                })) {
                                                data.subject.objects[i].teachers.splice(index, 1);
                                                return false;
                                            }
                                            return false;
                                        } else {
                                            if (!_.every(tempUser.subjects, function (userSubject) {
                                                    return !(userSubject.id === subject.id);
                                                })) {
                                                data.subject.objects[i].teachers.push(tempUser.id);
                                                return false;
                                            }
                                        }
                                        return true;
                                    })
                                })
                            }
                            return false;
                        }
                        return true;
                    });
                    delete tempUser.subjects;
                    delete tempUser.role;
                    tempUser.password ? tempUser.passwordUndefined = false : tempUser.passwordUndefined = true;
                    data.user.objects[index] = tempUser;
                    commit();
                    if(!tempUser.passwordUndefined){
                        delete tempUser.password;
                    }
                    result = tempUser;
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
        dataSource.getUser = function (userId) {
            load();
            var result = null;
            _.every(data.user.objects, function (user) {
                if(user.id == userId){
                    result = angular.copy(user);
                    if(result.password){
                        result.passwordUndefined = true;
                        delete result.password;
                    }
                    return false;
                }
                return true;
            });
            return result;
        };
        dataSource.addUser = function (tempUser) {
            load();
            var user = angular.fromJson(tempUser);
            user.id = ++data.user.lastIndex;
            user.roles = [student];
            data.user.objects.push(user);
            commit();
            return user;
        };
        dataSource.checkCurrentUser = function (dataUser) {
            load();
            var tempUser = angular.fromJson(dataUser);
            var result = null;
            if (_.every(data.user.objects, function (user) {
                    if (tempUser.username.toLowerCase() === user.username.toLowerCase() || tempUser.username.toLowerCase() === user.email.toLowerCase()) {
                        if (tempUser.password === user.password) {
                            result = angular.copy(user);
                            delete result.password;
                        } else {
                            if(!user.password){
                                result = {error: 'User without password. Please, sign in with social network and set your password in profile settings page.'}
                            }else{
                                return true;
                            }
                        }
                        return false;
                    }
                    return true;
                })) {
                result = {error: 'Username or password is incorrect'};
            }
            return result;
        };
        //oauth
        dataSource.checkGoogleUserData = function (googleUserData) {
            load();
            var googleUser = angular.fromJson(googleUserData);
            var result = null;
            _.every(data.user.objects, function (user) {
                return _.every(googleUser.emails, function (email) {
                    if (user.email === email.value) {
                        _.merge(user, {
                            google: {
                                id: googleUser.id,
                                accessToken: googleUser.accessToken,
                                expiresAt: googleUser.expiresAt,
                                expiresIn: googleUser.expiresIn
                            }
                        });
                        result = {
                            user: angular.copy(user),
                            accessToken: googleUser.accessToken
                        };
                        return false;
                    }
                    return true;
                })
            });
            if(result){
                delete result.user.password;
            }
            return result;
        };
        dataSource.checkFacebookUserData = function (facebookUserData) {
            load();
            var facebookUser = angular.fromJson(facebookUserData);
            var result = null;
            _.every(data.user.objects, function (user) {
                if (user.email === facebookUser.email) {
                    _.merge(user, {
                        facebook: {
                            id: facebookUser.id,
                            accessToken: facebookUser.accessToken,
                            expiresIn: facebookUser.expiresIn
                        }
                    });
                    result = {
                        user: angular.copy(user),
                        accessToken: facebookUser.accessToken
                    };
                    return false;
                }
                return true;
            });
            if(result){
                delete result.user.password;
            }
            return result;
        };
        dataSource.checkMicrosoftUserData = function (microsoftUserData) {
            load();
            var microsoftUser = angular.fromJson(microsoftUserData);
            var result = null;
            _.every(data.user.objects, function (user) {
                if (user.email === microsoftUser.emails.account) {
                    _.merge(user, {
                        microsoft: {
                            id: microsoftUser.id,
                            accessToken: microsoftUser.accessToken,
                            expiresAt: microsoftUser.expiresAt,
                            expiresIn: microsoftUser.expiresIn
                        }
                    });
                    result = {
                        user: angular.copy(user),
                        accessToken: microsoftUser.accessToken
                    };
                    return false;
                }
                return true;
            });
            if(result){
                delete result.user.password;
            }
            return result;
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

        dataSource.getSubjectNames = function () {
            load();
            return _.map(data.subject.objects, function (subject) {
                return {id: subject.id, name: subject.name}
            }).sort(compare);
        };

        dataSource.getTeacherNames = function (subjectData) {
            load();
            var selectedSubject = angular.fromJson(subjectData);
            var tempTeachers = [];
            if ((selectedSubject) ? selectedSubject.subjectId || null : false) {
                _.each(data.teacher.objects, function (teacher) {
                    _.every(teacher.subjects, function (subject) {
                        if (subject === selectedSubject.subjectId) {
                            if (_.every(data.lesson.objects, function (lesson) {
                                    if (lesson.day === selectedSubject.day
                                        && !_.every(lesson.order, function (order) {
                                            return !(order === selectedSubject.order);
                                        })) {
                                        return !(lesson.teacher.id === teacher.user)
                                    }
                                    return true;
                                })) {
                                tempTeachers.push({id: teacher.user, name: getTeacherNameByUserId(teacher.user)});
                                return false;
                            }
                            return false;
                        }
                        return true;
                    });
                });
                if (selectedSubject.lesson) {
                    _.every(data.lesson.objects, function (lesson) {
                        if (lesson.stage == selectedSubject.lesson.stage
                            && lesson.suffix === selectedSubject.lesson.suffix
                            && lesson.day === selectedSubject.day
                            && !_.every(lesson.order, function (order) {
                                return !(order === selectedSubject.order);
                            })
                            && selectedSubject.subjectId === lesson.subject.id) {
                            tempTeachers.push({id: lesson.teacher.id, name: lesson.teacher.name});
                            return false;
                        }
                        return true;
                    })
                }
            } else {
                if ((selectedSubject) ? selectedSubject.isFormMasterData || false : false) {
                    _.each(data.teacher.objects, function (teacher) {
                        if (_.every(data.stage.objects, function (stage) {
                                return !(stage.formMaster.id === teacher.user);
                            })) {
                            tempTeachers.push({id: teacher.user, name: getTeacherNameByUserId(teacher.user)});
                        }
                    });
                    if (selectedSubject.formMaster) {
                        _.every(data.stage.objects, function (stage) {
                            if (stage.formMaster.id === selectedSubject.formMaster.id) {
                                tempTeachers.push({
                                    id: stage.formMaster.id,
                                    name: getTeacherNameByUserId(stage.formMaster.id)
                                });
                                return false;
                            }
                            return true;
                        })
                    }
                } else {
                    tempTeachers = _.map(_.filter(data.teacher.objects, function (teacher) {
                            return _.every(data.lesson.objects, function (lesson) {
                                if (lesson.day === selectedSubject.day
                                    && !_.every(lesson.order, function (order) {
                                        return !(order === selectedSubject.order);
                                    })) {
                                    return !(lesson.teacher.id === teacher.user)
                                }
                                return true;
                            })
                        }), function (teacher) {
                            return {id: teacher.user, name: getTeacherNameByUserId(teacher.user)}
                        }
                    );
                }
            }
            return tempTeachers.sort(compare);
        };

        return dataSource;
    }
);