/**
 * Created by artem on 3/28/16.
 */
define(
    ['../module', 'lodash', 'tv4'],
    function (module, _, tv4) {
        'use strict';
        var BASE_LESSONS_SCHEDULE = {
            0: {
                from: {h: 7, m: 30},
                to: {h: 8, m: 15}
            },
            1: {
                from: {h: 8, m: 30},
                to: {h: 9, m: 15}
            },
            2: {
                from: {h: 9, m: 25},
                to: {h: 10, m: 10}
            },
            3: {
                from: {h: 10, m: 30},
                to: {h: 11, m: 15}
            },
            4: {
                from: {h: 11, m: 30},
                to: {h: 12, m: 15}
            },
            5: {
                from: {h: 12, m: 25},
                to: {h: 13, m: 10}
            },
            6: {
                from: {h: 13, m: 20},
                to: {h: 14, m: 5}
            },
            7: {
                from: {h: 14, m: 10},
                to: {h: 14, m: 55}
            },
            8: {
                from: {h: 15, m: 0},
                to: {h: 15, m: 45}
            }
        };
        module.service('Common.SchedulingUtil',
            [
                function () {
                    var service = {};
                    service.getLesson = function (lesson, timeShift, timeBreaks) {
                        if (!timeShift) {
                            return angular.copy(BASE_LESSONS_SCHEDULE[lesson]);
                        } else {
                            var tempLesson = angular.copy(BASE_LESSONS_SCHEDULE[lesson]);

                            //from
                            if (tempLesson.from.m - (lesson === 0 ? Math.abs(timeShift) : lesson * Math.abs(timeShift)) < 0) {
                                tempLesson.from.h = tempLesson.from.h - 1;
                                tempLesson.from.m = tempLesson.from.m + 60 - Math.abs(timeShift);
                            } else {
                                tempLesson.from.m = tempLesson.from.m - Math.abs(timeShift);
                            }

                            //to
                            if (tempLesson.to.m - lesson * Math.abs(timeShift) < 0) {
                                tempLesson.to.h = tempLesson.to.h - 1;
                                tempLesson.to.m = tempLesson.to.m + 60 - Math.abs(timeShift);
                            } else {
                                tempLesson.to.m = tempLesson.to.m - Math.abs(timeShift);
                            }
                            return tempLesson;
                        }
                    };
                    service.getLessonsScheduling = function (lesson, timeshift, timeBreaks) {
                        if (lesson != null) {
                            //single lesson
                            return service.getLesson(lesson, timeshift, timeBreaks);
                        } else {
                            //all of them
                            var tempLessons = [];
                            for(lesson = 0; lesson < 9; lesson++){
                                tempLessons.push(service.getLesson(lesson, timeshift, timeBreaks));
                            }
                            return tempLessons;
                        }
                    };
                    return service;
                }
            ]
        );
    }
);