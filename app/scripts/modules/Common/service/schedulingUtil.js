/**
 * Created by artem on 3/28/16.
 */
define(
    ['../module', 'lodash', 'tv4', 'moment'],
    function (module, _, tv4, moment) {
        'use strict';
        var lessonsBeginningTime = moment().hour(7).minute(30);
        var lessonDuration = 45;
        var timeBreaks = [15, 10, 10, 20, 15, 10, 5, 5];
        var BASE_LESSONS_SCHEDULE = [];

        function init(lessonsBeginningTime) {
            _.each([0, 1, 2, 3, 4, 5, 6, 7, 8], function (lesson) {
                if (lesson === 0) {
                    BASE_LESSONS_SCHEDULE.push({
                        from: lessonsBeginningTime,
                        to: lessonsBeginningTime.clone().minutes(lessonsBeginningTime.minutes() + lessonDuration)
                    });
                } else {
                    var previous = BASE_LESSONS_SCHEDULE[lesson - 1].to.clone();
                    var next = previous.minutes(previous.minutes() + timeBreaks[lesson - 1]);
                    BASE_LESSONS_SCHEDULE.push({
                        from: next,
                        to: next.clone().minutes(next.minutes() + lessonDuration)
                    });
                }
            });
            return BASE_LESSONS_SCHEDULE;
        }

        module.factory('Common.SchedulingUtil',
            [
                '$log',
                function ($log) {
                    var service = {};
                    var _timeShift = 0;
                    var _timeBreaks = timeBreaks;
                    var _cache = {};

                    service.setTimeBreaks = function (timeBreaks) {
                        if (timeBreaks != null && timeBreaks.value === 8) {
                            _timeBreaks = timeBreaks;
                            _cache['TIME_BREAKS'] = _timeBreaks;
                            _.each(_cache['TIME_BREAKS'], function (timeBreak, index) {
                                var from = _cache['BASE_LESSONS_SCHEDULE'][index].from;
                                var to = _cache['BASE_LESSONS_SCHEDULE'][parseInt(index) + 1].to;
                                var difference = to.diff(from) / (60 * 1000);
                                _cache['TIME_BREAKS'][index] = difference > 5 ? difference : 5;
                            });
                        }
                    };
                    service.setLessonsDuration = function (duration) {
                        if (duration > 0 && angular.isNumber(duration)) {
                            lessonDuration = duration;
                            lessonsBeginningTime = moment().hour(7).minute(30);
                            _cache['BASE_LESSONS_SCHEDULE'] = angular.copy(init(lessonsBeginningTime));
                            _timeBreaks = timeBreaks;
                            _cache['TIME_BREAKS'] = _timeBreaks;
                            _.each(_cache['TIME_BREAKS'], function (timeBreak, index) {
                                var from = _cache['BASE_LESSONS_SCHEDULE'][index].to;
                                var to = _cache['BASE_LESSONS_SCHEDULE'][parseInt(index) + 1].from;
                                _cache['TIME_BREAKS'][index] = to.diff(from) / (60 * 1000);
                            });
                        }
                    };
                    service.setLessonsDuration(lessonDuration);
                    service.getCache = function () {
                        //return angular.copy(_cache['BASE_LESSONS_SCHEDULE']);
                        return angular.copy(_cache['TIME_BREAKS']);
                    };
                    service.getTimeShift = function () {
                        return _timeShift;
                    };
                    service.getLesson = function (lesson) {
                        if (lesson != null) {
                            //single lesson
                            return angular.copy(_cache['BASE_LESSONS_SCHEDULE'][lesson]);
                        } else {
                            //all of them
                            return angular.copy(_cache['BASE_LESSONS_SCHEDULE']);
                        }

                    };
                    return service;
                }
            ]
        );
    }
);