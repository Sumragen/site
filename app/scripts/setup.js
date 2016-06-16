/**
 * Created by artem on 11/9/15.
 */
define(
    ['./App', './globalConfig'],
    function (App, appConfig) {
        'use strict';

        /**
         * Setup HTTP provider
         */
        App.config([
            '$httpProvider',
            function ($httpProvider) {
                if (appConfig.useHeaderAuth) {
                    $httpProvider.defaults.headers.common['X-Requested-By'] = 'DockerWebUI';
                    if (appConfig.useCookiesAuth) {
                        $httpProvider.defaults.withCredentials = true;
                    }
                }
                $httpProvider.interceptors.push(function ($q, $rootScope, $location, $injector) {
                    var $q = $injector.get('$q');
                    var growl = $injector.get('growl');
                    var securityContext = $injector.get('Common.SecurityContext');
                    return {
                        'request': function (config) {
                            // growl.success('Request without errors', 'Done');
                            // handle on request action
                            if (appConfig.useFakeAPIService === false && config.isApiCall === true) {
                                config.url = appConfig.apiUrl + config.url;
                            }
                            config.headers['x-sessionID'] = securityContext.getSessionID() || '';
                            return config;
                        },
                        'requestError': function (rejection) {
                            growl.error(rejection.message || 'Return rejection on request', 'Error');
                            return $q.reject(rejection);
                        },
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
                            // growl.success('Response without errors', 'Done');
                            return response;
                        }

                        ,
                        'responseError': function (rejection) {

                            switch (rejection.status) {
                                case 401:
                                {
                                    growl.error(rejection.data.message || 'Code 401', 'Error');
                                    //unauthorized
                                    break;
                                }
                                case 500:
                                {
                                    growl.error(rejection.data.message || 'Code 500', 'Error');
                                    // handle error here
                                    break;
                                }
                                case 404: {
                                    growl.error(rejection.data.message || 'Not found', 'Error');
                                    break;
                                }
                                default:
                                {
                                    growl.error((rejection.data) ? rejection.data.message || 'Return rejection on response' : rejection.error || 'Message does not found!', 'Error');
                                    //return rejection.
                                }
                            }
                            return $q.reject(rejection);
                        }
                    };
                });
            }]);
    });