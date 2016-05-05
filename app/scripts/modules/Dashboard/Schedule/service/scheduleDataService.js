/**
 * Created by trainee on 4/6/16.
 */
define(['../module', 'lodash'], function (module, _) {
    module.service('Dashboard.Schedule.ScheduleDataService', [
        '$uibModal',
        'ScheduleConstants',
        'Common.SchedulingUtil',
        'Dashboard.Schedule.ScheduleService',
        function ($uibModal,scheduleConstants, schedulingUtil, scheduleService) {
            var service = {};

            service.getStages = function () {
                return scheduleService.getStages()
                    .then(function (data) {
                        var stages = [];

                        var maxAmount = 0;
                        _.each(data, function (stage) {
                            if (maxAmount < stage.stage) {
                                maxAmount = stage.stage;
                            }
                        });

                        _.each(data, function (stage) {
                            _.each(_.range(maxAmount), function (index) {
                                if (stage.stage === index + 1) {
                                    stages.push(stage);
                                }
                            });
                        });
                        return stages;
                    });
            };

            service.parseLessons = function (schedule) {
                var step = 0;
                var events = [];
                schedule.forEach(function (day) {
                    step++;
                    self.tempSchedule = service.parse(day);
                    self.tempSchedule.forEach(function (lesson) {
                        if (lesson) {
                            var lessonTime = schedulingUtil.getLesson(lesson.num);
                            events.push({
                                title: lesson.lesson,
                                start: lessonTime.from.hours() + ':' + lessonTime.from.minutes(),
                                end: lessonTime.to.hours() + ':' + lessonTime.to.minutes(),
                                allDay: false,
                                dow: [step],
                                num: lesson.num
                            });
                        }
                    });
                });
                return events;
            };
            service.parseNewLessons = function (schedule) {
                var days = {
                    'Monday': 1,
                    'Tuesday': 2,
                    'Wednesday': 3,
                    'Thursday': 4,
                    'Friday': 5,
                    'Sunday': 6,
                    'Saturday': 7
                };
                var parsedSchedule = [];
                var events = [];
                var _id = 0;
                _.each(schedule, function (lesson) {
                    _.each(lesson.order, function (order) {
                        lesson.num = order;
                        parsedSchedule.push(angular.copy(lesson));
                    })
                });
                parsedSchedule.forEach(function (lesson) {
                    var lessonTime = schedulingUtil.getLesson(lesson.num);
                    events.push({
                        id: _id++,
                        allDay: false,
                        dow: [days[lesson.day]],
                        start: lessonTime.from.hours() + ':' + lessonTime.from.minutes(),
                        end: lessonTime.to.hours() + ':' + lessonTime.to.minutes(),
                        num: lesson.num,
                        title: lesson.subject.name,
                        lessonId: lesson.id
                    })
                });
                return events;
            };
            service.parse = function (day) {
                var schedule = [];
                _.each(_.range(9), function (index) {
                    if (_.every(day, function (lesson) {
                            return _.every(lesson.order, function (order) {
                                if (order === index) {
                                    schedule.push(angular.copy(lesson));
                                    schedule[index].order = order;
                                    return false;
                                }
                                return true;
                            })
                        })) {
                        schedule.push(null);
                    }
                });
                return schedule;
            };
            service.showDayModal = function (scheduleData, stage, date) {
                $uibModal.open({
                    animation: true,
                    templateUrl: 'views/Dashboard/Schedule/day.html',
                    controller: "Dashboard.Schedule.DayController as controller",
                    size: 'lg',
                    windowClass: 'custom-modal-day',
                    resolve: {
                        currentSchedule: function () {
                            return scheduleData || {};
                        },
                        currentStage: stage,
                        date: date
                    }
                });
            };
            service.checkOnOverlap = function (events, id, delta, order, dow) {
                return !_.every(events, function (exEvent, index) {
                    if (exEvent.num === order
                        && !_.every(exEvent.dow, function (exDow) {
                            return _.every(dow, function (newDow) {
                                return !(exDow === newDow + delta);
                            });
                        })
                        && exEvent.id !== id) {
                        events[index] = service.highlight(exEvent, scheduleConstants.color.error.background, scheduleConstants.color.error.border);
                        return false;
                    }
                    return true;
                })
            };
            service.addToOverlappedEvents = function (overlappedEvents, event) {
                if (_.every(overlappedEvents, function (oEvent) {
                        return !(oEvent === event);
                    })) {
                    overlappedEvents.push(event);
                }
                return overlappedEvents;
            };
            service.removeOverlappedEvent = function (overlappedEvents, id) {
                _.every(overlappedEvents, function (oEventId, ind) {
                    if (oEventId === id) {
                        overlappedEvents.splice(ind, 1);
                        return false;
                    }
                    return true;
                });
                return overlappedEvents;
            };
            service.highlight = function (event, backgroundColor, borderColor, myDow) {
                return {
                    allDay: event.allDay,
                    lessonId: event.lessonId,
                    num: event.num,
                    id: event.id,
                    title: event.title + ' ',
                    dow: myDow ? [myDow] : event.dow,
                    start: event.start,
                    end: event.end,
                    backgroundColor: backgroundColor,
                    borderColor: borderColor
                };
            };
            service.addToEventChangedList = function (event, delta, overlappedEvents, events) {
                var myDelta = event.dow[0] + delta._days % 7;
                var myDow = myDelta >= 7
                    ? myDelta % 7
                    : myDelta < 0
                    ? 7 + myDelta
                    : myDelta;
                if (service.checkOnOverlap(events, event.id, delta._days % 7, event.num, event.dow)) {
                    overlappedEvents = service.addToOverlappedEvents(overlappedEvents, event.id);
                    _.every(events, function (exEvent, index) {
                        if (exEvent.id === event.id) {
                            overlappedEvents = service.addToOverlappedEvents(overlappedEvents, exEvent.id);
                            events[index] = service.highlight(exEvent, scheduleConstants.color.error.background, scheduleConstants.color.error.border, myDow);
                            return false;
                        }
                        return true;
                    })
                } else {
                    _.every(events, function (exEvent, index) {
                        if (event.id === exEvent.id) {
                            overlappedEvents = service.removeOverlappedEvent(overlappedEvents, event.lessonId);
                            events[index] = service.highlight(event, scheduleConstants.color.default.background, scheduleConstants.color.default.border, myDow);
                            return false;
                        }
                        return true;
                    });
                }

                _.each(events, function (exEvent, index) {
                    if (!service.checkOnOverlap(events, exEvent.id, 0, exEvent.num, exEvent.dow)) {
                        overlappedEvents = service.removeOverlappedEvent(overlappedEvents, exEvent.id);
                        events[index] = service.highlight(exEvent, scheduleConstants.color.default.background, scheduleConstants.color.default.border);
                    }
                });
                return {overlappedEvents: overlappedEvents, events: events};
            };
            return service;
        }]);
});