/**
 * Created by sumragen on 3/18/16.
 */
define(['../module'], function (module) {
    module.controller('Dashboard.Schedule.DayController', [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        'currentSchedule',
        'moment',
        'date',
        '$filter',
        function ($scope, $rootScope, $uibModalInstance, currentSchedule, moment, date, $filter) {
            var self = this;

            self.close = function () {
                $uibModalInstance.close();
            };

            //var selectedDate = moment(date).format('dddd');
            var selectedDay = $filter('date')(moment(date).format('dddd'), 'dddd');

            function parseLessons(day) {
                var schedule = [null,null,null,null,null,null,null,null,null];
                for(i = 0; i<day.lessons.length; i++){
                    for (j = 0; j < day.lessons[i].order.length; j++){
                        schedule[day.lessons[i].order[j]] = day.lessons[i];
                    }
                }
                  return schedule;
            }

            var tempSchedule = currentSchedule.objects.schedule;
            for (i = 0; i < tempSchedule.length; i++) {
                if (selectedDay === tempSchedule[i].name) {
                    self.currentDay = parseLessons(tempSchedule[i]);
                    return;
                }
            }
            self.currentDay = {dayOff: 'day off'};
        }
    ]);
});