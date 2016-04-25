/**
 * Created by sumragen on 2/27/16.
 */
define(['angular'],function(module){
    return module.module('Dashboard.Settings.Stages',[])
        .config(function ($stateProvider) {
            $stateProvider
                .state('dashboard.settings.stages', {
                    url: "/stages",
                    templateUrl: 'views/Dashboard/Settings/Stages/stages.html',
                    controller: 'Dashboard.Settings.Stages.StagesController as controller',
                    resolve: {
                        stagesData: function (Endpoint, $http, $q) {
                            return $http(Endpoint.stage.list())
                                .then(function (data) {
                                    return data.data.stages;
                                }, function (err) {
                                    return $q.reject(err);
                                });
                        }
                    }
                });
        });
});