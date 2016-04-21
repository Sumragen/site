/**
 * Created by trainee on 4/6/16.
 */
define(['../module', 'lodash'], function (module, _) {
    module.service('Dashboard.Schedule.ScheduleDataService', [
        'Common.SchedulingUtil',
        function (schedulingUtil) {
            var service = {};
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
                _.each(schedule, function (lesson) {
                    _.each(lesson.order, function (order) {
                        lesson.num = order;
                        parsedSchedule.push(lesson);
                    })
                });
                parsedSchedule.forEach(function (lesson) {
                    var lessonTime = schedulingUtil.getLesson(lesson.num);
                    events.push({
                        lessonId: lesson.id,
                        allDay: false,
                        dow : [days[lesson.day]],
                        start : lessonTime.from.hours() + ':' + lessonTime.from.minutes(),
                        end : lessonTime.to.hours() + ':' + lessonTime.to.minutes(),
                        num : lesson.num,
                        title : lesson.subject.name
                    })
                });
                return events;
            };
            service.parse = function (day){
                var schedule = [null, null, null, null, null, null, null, null, null];
                _.each(day.lessons, function (lesson) {
                    _.each(lesson.order, function (order) {
                        schedule[order] = angular.copy(lesson);
                        schedule[order].num = order;
                        schedule[order].day = day.name;
                    });
                });
                return schedule;
            };
            return service;
        }]);
});