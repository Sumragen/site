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

                    };
                    service.getLessonsScheduling = function (lesson, timeshift, timeBreaks) {
                        if (lesson != null) {
                            //single lesson
                            return service.getLesson(lesson, timeshift, timeBreaks);
                        } else {
                            //all of them
                            //return angular.copy()
                        }
                    };
                    return service;
                }
            ]
        );
    }
);