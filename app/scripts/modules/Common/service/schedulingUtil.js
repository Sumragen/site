/**
 * Created by artem on 3/28/16.
 */
define(
    ['../module', 'lodash', 'tv4', 'moment'],
    function (module, _, tv4, moment) {
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
        module.factory('Common.SchedulingUtil',
            [
                '$log',
                function ($log) {
                    var service = {};
                    var _timeShift = 0;
                    var _cache = {};
                    service.setTimeShift = function (timeShift) {
                        if (angular.isNumber(timeShift) && !isNaN(timeShift)) {
                            _timeShift = timeShift;
                            _cache['BASE_LESSONS_SCHEDULE'] = angular.copy(BASE_LESSONS_SCHEDULE);
                            _.each(_cache['BASE_LESSONS_SCHEDULE'], function (lesson,index) {
                                var from = moment();
                                from.hours(lesson.from.h);
                                from.minutes(lesson.from.m);
                                var to = moment();
                                to.hours(lesson.to.h);
                                to.minutes(lesson.to.m);
                                from.minutes(from.minutes() + (index === 0 ?  _timeShift : ((index - 1 )* _timeShift)));
                                to.minutes(to.minutes() + (index === 0 ?  _timeShift : ((index - 1 )* _timeShift)));
                                lesson.from = {h: from.hours(), m: from.minutes()};
                                lesson.to = {h: to.hours(), m: to.minutes()};
                            })
                        } else {
                            $log.error('Time shift wrong format. Number expected.');
                        }
                    };
                    service.getCache = function () {
                        return angular.copy(_cache['BASE_LESSONS_SCHEDULE']);
                    };
                    service.getTimeShift = function () {
                        return _timeShift;
                    };
                    service.getLesson = function (lesson, timeShift, timeBreaks) {
                        return angular.copy(_cache['BASE_LESSONS_SCHEDULE'][lesson]);
                    };
                    service.getLessonsScheduling = function (lesson, timeshift, timeBreaks) {
                        if (lesson != null) {
                            //single lesson
                            return service.getLesson(lesson, timeshift, timeBreaks);
                        } else {
                            //all of them
                            var tempLessons = [];
                            for (lesson = 0; lesson < 9; lesson++) {
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