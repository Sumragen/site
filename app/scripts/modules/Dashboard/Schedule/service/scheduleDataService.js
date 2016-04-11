/**
 * Created by trainee on 4/6/16.
 */
define(['../module', 'lodash'], function (module, _) {
    module.service('Dashboard.Schedule.ScheduleDataService', [
        function () {
            var service = {};
            service.parseLessons = function (day) {
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