/**
 * Created by sumragen on 3/18/16.
 */
define(['../module'], function (module) {
    module.controller('Dashboard.Schedule.DayController', [
        '$scope',
        '$rootScope',
        'close',
        function ($scope, $rootScope, close) {
            var self = this;

            self.close = function () {
                close();
            };
            self.currentDay = {dayOff: 'day off'};
            var lessons = [
                {
                    name: 'Literature',
                    classroom: 304,
                    teacher: 'Romanovich'
                },
                {
                    name: 'Mathematic',
                    classroom: 516,
                    teacher: 'Peregnyak'
                },
                {
                    name: 'OOP',
                    classroom: 507,
                    teacher: 'Blinov'
                },
                {
                    name: 'DB',
                    classroom: 522,
                    teacher: 'Klenov'
                },
                {
                    name: 'English',
                    classroom: 516,
                    teacher: 'Moontyan'
                },
                {
                    name: 'Philosophy',
                    classroom: 411,
                    teacher: 'Grishanov'
                }
            ];
            var days = [
                {
                    name: 'Monday',
                    lessons: [lessons[0], lessons[2], lessons[1], null, null]
                },
                {
                    name: 'Tuesday',
                    lessons: [null, lessons[1], lessons[2], lessons[3], null]
                },
                {
                    name: 'Wednesday',
                    lessons: [lessons[4], lessons[0], lessons[3], null, null]
                },
                {
                    name: 'Thursday',
                    lessons: [null, lessons[5], lessons[4], lessons[2], null]
                },
                {
                    name: 'Friday',
                    lessons: [lessons[0], lessons[1], lessons[4], null, null]
                }
            ];
            for (i = 0; i < days.length; i ++){
                if ($rootScope.selectedDate === days[i].name){
                    self.currentDay = days[i];
                    return;
                }
            }
            //
        }
    ]);
});