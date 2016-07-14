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
        'Common.PermissionsService',
        'ScheduleConstants',
        function ($parse, $http, Endpoint, securityContext, permissionsService, scheduleConstants) {
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
                    if (typeof currentUser.role.permissions[0] == 'object') {
                        currentUser.role.permissions = _.map(currentUser.role.permissions, function (p) {
                            return p.id;
                        });
                    }
                    currentUser.role.permissions = currentUser.role.permissions.sort(function (a, b) {
                        return a - b;
                    });
                    permissionsService.getPermissionSet()
                        .then(function (defPermissions) {
                            if (!_.every(listOfPermissions, function (checkPermission) {
                                    return !(currentUser.role.permissions.indexOf(defPermissions[checkPermission].value) >= 0);
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
                        });
                }
            }
        }
    ])
});