/**
 * Created by artem on 11/9/15.
 */
define(
    ['./modules/App', './globalConfig'],
    function (App, appConfig) {
        'use strict';

        /**
         * Setup HTTP provider
         */
        App.config([
            '$httpProvider',
            function ($httpProvider) {
                if(appConfig.useHeaderAuth){
                    $httpProvider.defaults.headers.common['X-Requested-By'] = 'DockerWebUI';
                    if (appConfig.useCookiesAuth) {
                        $httpProvider.defaults.withCredentials = true;
                    }
                }
                $httpProvider.interceptors.push(function ($q, $rootScope, $location, $injector) {
                    var $q = $injector.get('$q');
                    return {
                        'request': function (config) {
                            // handle on request action
                            if (config.apiName === 'DockerWebUI') {
                                if (appConfig.useFakeAPIService === false) {
                                    config.url = appConfig.apiUrl + config.url;
                                }
                            }
                            return config;
                        },
                        'requestError': function (rejection) {
                            return $q.reject(rejection);
                        }

                        ,
                        /**
                         * This function receives a response object as a parameter and has to return a response object
                         * or a promise. The response object includes the request configuration, headers, status and data
                         * that returned from the backend.
                         *
                         * A response status code between 200 and 299 is considered a success status and will result
                         * in the success callback being called.
                         * @param {{config: Object, data: Object|String, headers: function, status: integer}} response
                         * @returns {*}
                         */
                        'response': function (response) {
                            return response;
                        }

                        ,
                        'responseError': function (rejection) {

                            switch (rejection.status) {
                                case 401:
                                {
                                    //unauthorized
                                    break;
                                }
                                case 500:
                                {
                                    // handle error here
                                    break;
                                }
                                default:
                                {
                                    //return rejection.
                                }
                            }
                            return $q.reject(rejection);
                        }
                    };
                });
            }]);
    });