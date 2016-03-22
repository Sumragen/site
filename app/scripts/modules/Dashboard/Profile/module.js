/**
 * Created by sumragen on 2/27/16.
 */
define(['angular'],function(module){
    return module.module('Dashboard.Profile',[
            'schemaForm'
        ])
        .config(function ($stateProvider) {
            $stateProvider
                .state('dashboard.profile', {
                    url: "/profile",
                    templateUrl: './views/dashboard/profile/profile.html',
                    controller: 'Dashboard.Profile.ProfileController as controller'
                });
        });

});