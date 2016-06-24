/**
 * Created by trainee on 3/17/16.
 */
define(['angular'], function (module) {
    return module.module('Dashboard.Settings.Schedule', [])
        .config(function ($stateProvider) {
            $stateProvider
                .state('dashboard.settings.schedule', {
                    url: "/schedule",
                    abstract: true,
                    templateUrl: 'views/Dashboard/Settings/Schedule/master.html'
                })
                .state('dashboard.settings.schedule.selector', {
                    url: "/selector",
                    templateUrl: 'views/Dashboard/Settings/Schedule/selector.html',
                    controller: 'Dashboard.Settings.Schedule.selectorController as controller'
                })

                .state('dashboard.settings.schedule.edit', {
                    url: "/edit",
                    abstract: true,
                    templateUrl: 'views/Dashboard/Settings/Schedule/master.html'
                })
                .state('dashboard.settings.schedule.edit.stage', {
                    url: "/stage",
                    templateUrl: 'views/Dashboard/Settings/Schedule/stage.html',
                    controller: 'Dashboard.Schedule.ScheduleController as controller',
                    params: {
                        stage: null
                    },
                    resolve: {
                        scheduleData: ['Dashboard.Schedule.ScheduleService', function (scheduleService) {
                            return scheduleService.getSchedule();
                        }]
                    }
                })
                .state('dashboard.settings.schedule.edit.day', {
                    url: "/day",
                    templateUrl: 'views/Dashboard/Settings/Schedule/day.html',
                    controller: 'Dashboard.Settings.Schedule.DayController as controller',
                    params: {
                        day: null,
                        lessons: null
                    }
                });
        });
});