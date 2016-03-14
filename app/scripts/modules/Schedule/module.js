/**
 * Created by sumragen on 2/27/16.
 */
define(['angular'],function(module){
    return module.module('ScheduleModule',[])
        .config(function ($stateProvider) {
            $stateProvider
                .state('dashboard.schedule', {
                    url: "/schedule",
                    templateUrl: './views/tabs/schedule.html',
                    controller: 'ScheduleController as controller'
                });
        });

});