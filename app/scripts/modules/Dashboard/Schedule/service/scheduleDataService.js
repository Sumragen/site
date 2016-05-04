/**
 * Created by trainee on 4/6/16.
 */
define(['../module', 'lodash'], function (module, _) {
    module.service('Dashboard.Schedule.ScheduleDataService', [
        '$uibModal',
        'Common.SchedulingUtil',
        'Dashboard.Schedule.ScheduleService',
        function ($uibModal, schedulingUtil,scheduleService) {
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
                    'Monday' : 1,
                    'Tuesday' : 2,
                    'Wednesday' : 3,
                    'Thursday' : 4,
                    'Friday' : 5,
                    'Sunday' : 6,
                    'Saturday' : 7
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
                        dow : [days[lesson.day]],
                        start : lessonTime.from.hours() + ':' + lessonTime.from.minutes(),
                        end : lessonTime.to.hours() + ':' + lessonTime.to.minutes(),
                        num : lesson.num,
                        title : lesson.subject.name,
                        lessonId: lesson.id
                    })
                });
                return events;
            };
            service.parse = function (day){
                var schedule = [];
                _.each(_.range(9), function (index) {
                    if(_.every(day, function (lesson) {
                        return _.every(lesson.order, function (order) {
                            if(order === index){
                                schedule.push(angular.copy(lesson));
                                schedule[index].order = order;
                                return false;
                            }
                            return true;
                        })
                    })){
                        schedule.push(null);
                    }
                });
                return schedule;
            };
            service.showDayModal = function (scheduleData, stage, date){
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
            return service;
        }]);
});