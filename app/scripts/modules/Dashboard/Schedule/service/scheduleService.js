/**
 * Created by trainee on 3/22/16.
 */
define(['../module', 'lodash'], function (module, _) {
    module.service('Dashboard.Schedule.ScheduleService', [
        '$http',
        '$q',
        'Endpoint',
        function ($http, $q, Endpoint) {
            var service = {};

            service.parseLessons = function(day) {
                var schedule = [null,null,null,null,null,null,null,null,null];
                _.each(day.lessons,function(lesson){
                    _.each(lesson.order,function(order){
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