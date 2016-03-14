/**
 * Created by sumragen on 2/27/16.
 */
define(['angular', 'angular-ui-calendar'],function(module){
    return module.module('ScheduleModule',['ui.calendar'])
        .config(function ($stateProvider) {
            $stateProvider
                .state('dashboard.schedule', {
                    url: "/schedule",
                    templateUrl: './views/tabs/schedule.html',
                    controller: 'ScheduleController as controller'
                });
        });

});