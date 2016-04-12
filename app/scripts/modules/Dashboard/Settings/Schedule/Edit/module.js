/**
 * Created by trainee on 3/17/16.
 */
define(['angular'], function (module) {
    return module.module('Dashboard.Settings.Schedule.Edit', [
            'Dashboard.Settings.Schedule.Edit.SingleClass',
            'Dashboard.Settings.Schedule.Edit.FullSchedule'
    ])
        .config(function ($stateProvider) {
            $stateProvider
                .state('dashboard.settings.schedule.edit', {
                    url: "/edit",
                    abstract: true,
                    templateUrl: 'views/Dashboard/Settings/Schedule/Edit/master.html'
                });
        });
});