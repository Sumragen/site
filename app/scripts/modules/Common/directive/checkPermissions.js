/**
 * Created by trainee on 5/13/16.
 */
define(['../module', 'lodash'], function (module, _) {
    'use strict';
    module.directive('sCheckPermissions', [
        '$parse',
        '$http',
        'Endpoint',
        'Common.SecurityContext',
        'ScheduleConstants',
        function ($parse, $http, Endpoint, securityContext, scheduleConstants) {
            return {
                restrict: 'A',
                link: function (scope, element, attrs) {
                    var currentUser = securityContext.getPrincipal();
                    var listOfPermissions = attrs.sCheckPermissions.replace(/\s/g, '').split(',');
                    var confAction = $parse(attrs.sConfirmAction) || null;
                    var confArg = scope.$eval(attrs.sConfirmActionArg) || null;
                    var checkUser = scope.$eval(attrs.sCheckUser) || null;

                    function setEventOnClick(item) {
                        $(element).click(function () {
                            confAction(scope, {param: item || null});
                        });
                    }

                    function setElementDisabled() {
                        element.addClass('disabled');
                        element.css({
                            opacity: attrs.sDisabledOpacity || '0.3',
                            cursor: 'default'
                        });
                    }

                    /**
                     * Check permissions of current user and specified permissions in directive
                     */
                    if (!_.every(listOfPermissions, function (checkPermission) {
                            if (_.every(currentUser.role.permissions, function (permission) {
                                    if (typeof permission == 'object') {
                                        return !(scheduleConstants.PERMISSION[checkPermission] === permission.id);
                                    } else {
                                        return !(scheduleConstants.PERMISSION[checkPermission] === permission);
                                    }
                                }))
                                return true;
                        })) {
                        /**
                         * Current user has confirmed check permission
                         */
                        if (confAction) {
                            if (confArg) {
                                setEventOnClick(confArg);
                            } else {
                                if (checkUser) {
                                    if (checkUser.role_id) {
                                        if (checkUser.id == currentUser.id
                                            || (checkUser.id != currentUser.id && currentUser.role.weight > checkUser.role.weight)) {
                                            setEventOnClick(checkUser);
                                        } else {
                                            setElementDisabled();
                                        }
                                    } else {
                                        $http(Endpoint.role.get(checkUser.role))
                                            .then(function (res) {
                                                if (checkUser.id == currentUser.id
                                                    || (checkUser.id != currentUser.id && currentUser.role.weight > res.data.weight)) {
                                                    setEventOnClick(checkUser);
                                                } else {
                                                    setElementDisabled();
                                                }
                                            });
                                    }
                                } else {
                                    setEventOnClick();
                                }
                            }
                        }
                    } else {
                        setElementDisabled();
                    }
                }
            }
        }
    ])
});