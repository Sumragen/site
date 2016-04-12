/**
 * Created by trainee on 3/17/16.
 */
define(['angular'], function (module) {
    return module.module('Dashboard.Settings.Schedule.Edit', [])
        .config(function ($stateProvider) {
            $stateProvider
                .state('dashboard.settings.schedule.edit', {
                    url: "/edit",
                    abstract: true,
                    templateUrl: 'views/Dashboard/Settings/Schedule/Edit/master.html'
                })
                .state('dashboard.settings.schedule.edit.stage', {
                    url: "/stage",
                    templateUrl: 'views/Dashboard/Settings/Schedule/Edit/stage.html',
                    controller: 'Dashboard.Schedule.ScheduleController as controller',
                    params: {
                        stage : null
                    },
                    resolve: {
                        scheduleData: ['Dashboard.Schedule.ScheduleService',function (scheduleService) {
                            return scheduleService.getSchedule();
                        }]
                    }
                })
                .state('dashboard.settings.schedule.edit.day', {
                    url: "/day",
                    templateUrl: 'views/Dashboard/Settings/Schedule/Edit/day.html',
                    controller: 'Dashboard.Settings.Schedule.Edit.DayController as controller',
                    params: {
                        day : null
                    }
                });
        });
});