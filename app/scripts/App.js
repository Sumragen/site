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
        'angular-moment',
        'angular-touch',
        'moment',
        'ui.bootstrap',
        'ui.bootstrap.tpls',
        'modules/Auth/index',
        'modules/Common/index',
        'modules/Dashboard/index'
    ],
    function (angular) {
        var deps = [
            'ui.router',
            'ngMockE2E',
            'ngTouch',
            'ngAnimate',
            'ui.bootstrap',
            'angularMoment',
            'AuthModule',
            'Common',
            'Dashboard'
        ];
        var app = angular.module('MyApp', deps)
            .run([
                '$rootScope',
                '$state',
                '$stateParams',
                'Common.SecurityContext',
                '$uibModal',
                '$uibModalStack',
                '$http',
                'Endpoint',
                function ($rootScope, $state, $stateParams, SecurityContext, $uibModal, $uibModalStack, $http, Endpoint) {

                    $rootScope.contextUser = SecurityContext.getPrincipal();
                    $rootScope.$on('securityContext:updated', function (e, user) {
                        $rootScope.contextUser = user;
                    });
                    $rootScope.getSchoolName = function () {
                        var user = JSON.parse(localStorage.getItem("currentUserLS"));
                        return 'School ' + '24';//+ user.school;
                    };

                    $rootScope.showSignInModal = function () {
                        var modalInstance = $uibModal.open({
                            animation: true,
                            templateUrl: "./views/auth/logIn.html",
                            controller: "AuthController as controller",
                            size: 'lg',
                            windowClass : 'custom-modal-auth'
                        });

                        modalInstance.result
                            .then(function () {
                                $state.go('dashboard.profile');
                            }, function () {
                                console.log('Modal dismissed');
                            });
                    };
                    $rootScope.showSignUpModal = function () {
                        var modalInstance = $uibModal.open({
                            animation: true,
                            templateUrl: "./views/auth/logUp.html",
                            controller: "AuthController as controller",
                            size: 'lg',
                            windowClass: 'custom-modal-auth'
                        });

                        modalInstance.result
                            .then(function () {
                                $state.go('dashboard.profile');
                            }, function () {
                                console.log('Modal dismissed');
                            });
                    };

                    $rootScope.logOut = function () {
                        $http(Endpoint.logOut.user())
                            .then(function () {
                                SecurityContext.setPrincipal(null);
                                $state.go('common.home');
                            });
                    };

                    $rootScope.$on('$stateChangeStart', function (event, nextState, nextStateParams, curState, curStateParams) {
                        $uibModalStack.dismissAll();
                        $rootScope.currentState = nextState;
                        //Redirect handling
                        if (nextState.data && nextState.data.redirect) {
                            if (typeof nextState.data.redirect === 'function') {
                                var redirect = nextState.data.redirect(SecurityContext.getPrincipal());
                                if (redirect) {
                                    event.preventDefault();
                                    $state.go(redirect);
                                    return false;
                                }
                            } else {
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
            .config(function ($stateProvider, $urlRouterProvider) {
                $urlRouterProvider.otherwise("/404");
                $stateProvider
                    .state('root', {
                        url: '',
                        data: {
                            redirect: 'dashboard.profile'
                        }
                    })
                    .state('404', {
                        templateUrl: "./404.html"
                    })
                    .state('accessDenied', {
                        templateUrl: "./accessDenied.html"
                    });
            });
        return app;
    });