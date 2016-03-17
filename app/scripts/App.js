/**
 * Created by sumragen on 2/29/16.
 */
define([
        'angular',
        'angular-ui-router',
        'logicify-gmap',
        'twitter-bootstrap',
        'angular-strap',
        'angular-strap-tpl',
        'angular-animate',
        'angular-mocks',
        'ui.bootstrap',
        'ui.bootstrap.tpls',
        'modules/Auth/index',
        'modules/Common/index',
        'modules/nonAuth/index',
        'modules/Event/index',
        'modules/Schedule/index',
        'modules/Location/index',
        'modules/Settings/index',
        'modules/Contacts/index',
        'modules/Profile/index'
    ],
    function(angular){
        var deps = [
            'ui.router',
            'ngMockE2E',
            'AuthModule',
            'Common',
            'LocationModule',
            'NonAuthModule',
            'ContactsModule',
            'EventModule',
            'ScheduleModule',
            'SettingsModule',
            'ProfileModule'
        ];
        var app = angular.module('MyApp', deps)
            .run([
                '$rootScope',
                '$state',
                '$stateParams',
                //'$uibModalStack',
                //'growl',
                function ($rootScope, $state, $stateParams, $uibModalStack, growl, apiRoutes, httpService) {
                    $rootScope.$on('$stateChangeStart', function (event, nextState, nextStateParams, curState, curStateParams) {
                        //$uibModalStack.dismissAll();
                        $rootScope.currentState = nextState;
                        //Redirect handling
                        if (nextState.data && nextState.data.redirect) {
                            if(typeof nextState.data.redirect === 'function'){
                                var redirect = nextState.data.redirect(localStorage.getItem('currentUserLS'));
                                if(redirect){
                                    event.preventDefault();
                                    $state.go(redirect);
                                    return false;
                                }
                            }else {
                                event.preventDefault();
                                $state.go(nextState.data.redirect);
                                return false;
                            }
                        }
                        return true;
                    });
                    $rootScope.stateMatch = function (inState) {
                        return ($rootScope.currentState && $rootScope.currentState.name && $rootScope.currentState.name.indexOf(inState) >= 0)
                    };
                }
            ])
            .config(function($stateProvider, $urlRouterProvider){
                $urlRouterProvider.otherwise("/404");
                $stateProvider
                    .state('root', {
                        url: '',
                        controller:'CommonController as controller',
                        data:{
                            redirect: 'dashboard.profile'
                        }
                    })
                    .state('404', {
                        templateUrl: "./views/404.html"
                    })
                    .state('accessDenied', {
                        templateUrl: "./views/accessDenied.html"
                    });
            });
        return app;
    });