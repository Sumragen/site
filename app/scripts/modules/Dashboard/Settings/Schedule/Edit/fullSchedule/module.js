/**
 * Created by trainee on 3/17/16.
 */
define(['angular'], function (module) {
    return module.module('Dashboard.Settings.Schedule.Edit.FullSchedule', [])
        .config(function ($stateProvider) {
            $stateProvider
                .state('dashboard.settings.schedule.edit.fullSchedule', {
                    url: "/fullSchedule",
                    templateUrl: 'views/Dashboard/Settings/Schedule/Edit/fullSchedule.html'
                });
        });
});