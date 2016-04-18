/**
 * Created by trainee on 3/3/16.
 */
define(
    ['./App', './fakeDataSource'],
    function (module, fakeDataSource) {
        'use strict';
        module.run(['$httpBackend', '$q', function ($httpBackend) {
            var prefix = '/api';
            $httpBackend.whenPOST(prefix + '/login').respond(function (method, url, checkUser) {
                var user = fakeDataSource.checkCurrentUser(checkUser);
                if (user) {
                    return [200, {currentUser: user, sessionToken: 'simple sessionToken'}, {}];
                } else {
                    return [400, {errorCode: 1, message: 'Username or password is incorrect'}];
                }
            });
            $httpBackend.whenPOST(prefix + '/register').respond(function (method, url, data) {
                fakeDataSource.addUser(data);
                return [200, angular.fromJson(data), {}];
            });

        //Event
            $httpBackend.whenGET(prefix + '/events').respond(function (method, url) {
                var events = fakeDataSource.getEvents();
                if (events) {
                    return [200, {events: events}, {}];
                } else {
                    return [400, {errorCode: 2, message: 'Events not found'}];
                }
            });
            $httpBackend.whenPUT(/\/event\/(0-9)*/).respond(function (method, url, tempEvent) {
                var events = fakeDataSource.updateEvent(tempEvent);
                if (events) {
                    return [200, events, {}];
                } else {
                    return [400, {errorCode: 4, message: 'wrong update'}];
                }
            });
            $httpBackend.whenPOST(prefix + '/event').respond(function (method, url, data) {
                var event = fakeDataSource.addEvent(data);
                if (event) {
                    return [200, event, {}];
                } else {
                    return [400, {errorCode: 7, message: 'wrong add event'}];
                }
            });

        //Role
            $httpBackend.whenGET(prefix + '/roles').respond(function (method, url) {
                var roles = fakeDataSource.getRoles();
                if (roles) {
                    return [200, {roles: roles}, {}];
                } else {
                    return [400, {errorCode: 5, message: 'Roles not found'}];
                }
            });
            $httpBackend.whenPUT(/\/role\/(0-9)*/).respond(function (method, url, tempRole) {
                var role = fakeDataSource.updateRole(tempRole);
                if (role) {
                    return [200, role, {}];
                } else {
                    return [400, {errorCode: 4, message: 'wrong update'}];
                }
            });
            $httpBackend.whenDELETE(/\/role\/(0-9)*/).respond(function (method, url, tempRole) {
                var roles = fakeDataSource.deleteRole(tempRole);
                if (roles) {
                    return [200, roles, {}];
                } else {
                    return [400, {errorCode: 6, message: 'wrong delete'}];
                }
            });
            $httpBackend.whenPOST(prefix + '/role').respond(function (method, url, data) {
                var roles = fakeDataSource.addRole(data);
                if (roles) {
                    return [200, roles, {}];
                } else {
                    return [400, {errorCode: 7, message: 'wrong add role'}];
                }
            });

        //Lesson
            $httpBackend.whenGET(/\/lesson\/(0-9)*/).respond(function (method, url, data) {
                var lesson = fakeDataSource.getLesson(data);
                if (lesson) {
                    return [200, lesson, {}];
                } else {
                    return [400, {errorCode: 5, message: 'Lesson not found'}];
                }
            });
            $httpBackend.whenGET(prefix + '/lessons').respond(function (method, url, data) {
                var lessons = fakeDataSource.getLessons(data);
                if (lessons) {
                    return [200, {lessons: lessons}, {}];
                } else {
                    return [400, {errorCode: 5, message: 'Lessons not found'}];
                }
            });
            $httpBackend.whenPUT(/\/lesson\/(0-9)*/).respond(function (method, url, tempLesson) {
                var lesson = fakeDataSource.updateLesson(tempLesson);
                if (lesson) {
                    return [200, lesson, {}];
                } else {
                    return [400, {errorCode: 4, message: 'wrong update'}];
                }
            });
            $httpBackend.whenDELETE(/\/lesson\/(0-9)*/).respond(function (method, url, tempLesson) {
                var lessons = fakeDataSource.deleteLesson(tempLesson);
                if (lessons) {
                    return [200, lessons, {}];
                } else {
                    return [400, {errorCode: 6, message: 'wrong delete'}];
                }
            });
            $httpBackend.whenPOST(prefix + '/lesson').respond(function (method, url, data) {
                var lessons = fakeDataSource.createLesson(data);
                if (lessons) {
                    return [200, lessons, {}];
                } else {
                    return [400, {errorCode: 7, message: 'wrong add lesson'}];
                }
            });

        //Subject
            $httpBackend.whenGET(prefix + '/subjects').respond(function (method, url) {
                var subjects = fakeDataSource.getSubjects();
                if (subjects) {
                    return [200, {subjects: subjects}, {}];
                } else {
                    return [400, {errorCode: 5, message: 'Subject not found'}];
                }
            });
            $httpBackend.whenPUT(/\/subject\/(0-9)*/).respond(function (method, url, tempSubject) {
                var subject = fakeDataSource.updateSubject(tempSubject);
                if (subject) {
                    return [200, subject, {}];
                } else {
                    return [400, {errorCode: 4, message: 'wrong update'}];
                }
            });
            $httpBackend.whenDELETE(/\/subject\/(0-9)*/).respond(function (method, url, tempSubject) {
                var subjects = fakeDataSource.deleteSubject(tempSubject);
                if (subjects) {
                    return [200, subjects, {}];
                } else {
                    return [400, {errorCode: 6, message: 'wrong delete'}];
                }
            });
            $httpBackend.whenPOST(prefix + '/subject').respond(function (method, url, data) {
                var subjects = fakeDataSource.addSubject(data);
                if (subjects) {
                    return [200, subjects, {}];
                } else {
                    return [400, {errorCode: 7, message: 'wrong add subject'}];
                }
            });

        //Teacher
            $httpBackend.whenGET(prefix + '/teacher').respond(function (method, url, data) {
                var subjects = fakeDataSource.getSubjectsForTeacher(data);
                if (subjects) {
                    return [200, subjects, {}];
                } else {
                    return [400, {errorCode: 7, message: 'Subjects not found'}];
                }
            });
            $httpBackend.whenGET(prefix + '/teachers').respond(function (method, url) {
                var teachers = fakeDataSource.getTeacher();
                if (teachers) {
                    return [200, {teachers: teachers}, {}];
                } else {
                    return [400, {errorCode: 5, message: 'Teachers not found'}];
                }
            });
            $httpBackend.whenPUT(/\/teacher\/(0-9)*/).respond(function (method, url, tempTeacher) {
                var teacher = fakeDataSource.updateTeacher(tempTeacher);
                if (teacher) {
                    return [200, teacher, {}];
                } else {
                    return [400, {errorCode: 4, message: 'wrong update'}];
                }
            });
            $httpBackend.whenDELETE(/\/teacher\/(0-9)*/).respond(function (method, url, tempTeacher) {
                var teachers = fakeDataSource.deleteTeacher(tempTeacher);
                if (teachers) {
                    return [200, teachers, {}];
                } else {
                    return [400, {errorCode: 6, message: 'wrong delete'}];
                }
            });
            $httpBackend.whenPOST(prefix + '/teacher').respond(function (method, url, data) {
                var teachers = fakeDataSource.addTeacher(data);
                if (teachers) {
                    return [200, teachers, {}];
                } else {
                    return [400, {errorCode: 7, message: 'wrong add teacher'}];
                }
            });

        //Users
            $httpBackend.whenPUT(/\/user\/(0-9)*/).respond(function (method, url, tempUser) {
                var user = fakeDataSource.updateUser(tempUser);
                if (user) {
                    return [200, user, {}];
                } else {
                    return [400, {errorCode: 4, message: 'wrong update'}];
                }
            });
            $httpBackend.whenGET(/\/users\/\?offset=[0-9]*&limit=[0-9]*/).respond(function (method, url, amount) {
                var users = fakeDataSource.getUsers(amount);
                if (users) {
                    return [200, {users: users}, {}];
                } else {
                    return [400, {errorCode: 4, message: 'Users not found'}];
                }
            });

            $httpBackend.whenPUT(prefix + '/lesson').respond(function (method, url, tempLesson) {
                var lesson = fakeDataSource.updateLesson(tempLesson);
                if (lesson) {
                    return [200, lesson, {}];
                } else {
                    return [400, {errorCode: 4, message: 'wrong update'}];
                }
            });
            $httpBackend.whenGET(prefix + '/schedule').respond(function (method, url) {
                var schedule = fakeDataSource.getSchedule();
                if (schedule) {
                    return [200, {schedule: schedule}, {}];
                } else {
                    return [400, {errorCode: 3, message: 'Schedule not found'}];
                }
            });

            $httpBackend.whenGET(prefix + '/names').respond(function (method, url) {
                var names = fakeDataSource.getNames();
                if (names) {
                    return [200, {names: names}, {}];
                } else {
                    return [400, {errorCode: 3, message: 'Teachers or subjects not found'}];
                }
            });

            $httpBackend.whenGET(/\/stage\/[0-9]*/).respond(function (method, url, stageId) {
                var stage = fakeDataSource.getStageBySuffix(stageId);
                if (stage) {
                    return [200, {stage: stage}, {}];
                } else {
                    return [400, {errorCode: 3, message: 'Stage not found'}];
                }
            });
            $httpBackend.whenGET(prefix + '/stages').respond(function (method, url) {
                var stages = fakeDataSource.getStages();
                if (stages) {
                    return [200, {stages: stages}, {}];
                } else {
                    return [400, {errorCode: 3, message: 'Stages not found'}];
                }
            });

            $httpBackend.whenGET(/.*/).passThrough();
            $httpBackend.whenPOST(/.*/).passThrough();
        }]);
    });