/**
 * Created by sumragen on 2/27/16.
 */
define(['../module', 'lodash'], function (module, _) {
    module.controller('Dashboard.Settings.ManageRoles.ManageRolesController', [
        '$scope',
        '$http',
        '$timeout',
        'Endpoint',
        'Common.NotificationService',
        'Common.PermissionsService',
        'Dashboard.Settings.ManageRolesService',
        'rolesData',
        function ($scope, $http, $timeout, Endpoint, notificationService, permissionService, manageRolesService, rolesData) {

            $scope.permissionSet = permissionService.getPermissionSet();

            $scope.permissions = [];

            $scope.togglePermissions = function (code) {
                var idx = $scope.permissions.indexOf(code);

                if (idx > -1) {
                    $scope.permissions.splice(idx, 1);
                } else {
                    $scope.permissions.push(code);
                }
            };

            $scope.showRoleEditor = false;
            $scope.toggleShowRoleEditor = function (role) {
                $timeout(function () {
                    $scope.currentRole = role;
                    $scope.permissions = (role) ? $scope.currentRole.permissions : [];
                    $scope.isExist = (role) ? true : false;
                    $scope.showRoleEditor = !$scope.showRoleEditor;
                });
            };

            $scope.roles = rolesData;

            $scope.deleteRole = function () {
                $scope.busy = true;
                manageRolesService.deleteRole($scope.currentRole)
                    .then(function (data) {
                        $scope.roles = data;
                        notificationService.showMessage('Role was deleted','success','Done!');
                        $scope.toggleShowRoleEditor($scope.currentRole);
                    })
                    .catch(function (err) {
                        notificationService.showMessage(err.message, 'error');
                    })
                    .finally(function () {
                        $scope.busy = false;
                    });
            };

            $scope.updateRole = function () {
                $scope.busy = true;
                $scope.currentRole.permissions = $scope.permissions.sort(function (a, b) {
                    return a - b;
                });
                manageRolesService.updateRole($scope.currentRole)
                    .then(function (data) {
                        _.find($scope.roles, function (role, index) {
                            if (role.id === $scope.currentRole.id) {
                                $scope.roles[index] = data;
                            }
                        });
                        notificationService.showMessage('Role was updated', 'success', 'Done!');
                        $scope.toggleShowRoleEditor($scope.currentRole);
                        return data;
                    })
                    .catch(function (err) {
                        notificationService.showMessage(err.message, 'error');
                    })
                    .finally(function () {
                        $scope.busy = false;
                    });
            };

            $scope.createRole = function () {
                $scope.busy = true;
                $scope.currentRole.permissions = $scope.permissions.sort(function (a, b) {
                    return a - b;
                });
                manageRolesService.createRole($scope.currentRole)
                    .then(function (roles) {
                        $scope.roles = roles;
                        notificationService.showMessage('Role was created', 'success', 'done');
                        $scope.toggleShowRoleEditor($scope.currentRole);
                    })
                    .catch(function (err) {
                        notificationService.showMessage(err.message, 'error');
                    })
                    .finally(function () {
                        $scope.busy = false;
                    });
            }
        }
    ]);
});