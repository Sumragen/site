/**
 * Created by sumragen on 2/27/16.
 */
define(['../module', 'lodash'], function (module, _) {
    module.controller('Dashboard.Settings.ManageRoles.ManageRolesController', [
        '$scope',
        '$http',
        '$timeout',
        'Endpoint',
        'Common.PermissionsService',
        'Dashboard.Settings.ManageRolesService',
        'rolesData',
        function ($scope, $http, $timeout, Endpoint, permissionService, manageRolesService, rolesData) {

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
                        $scope.toggleShowRoleEditor($scope.currentRole);
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
                    .then(function (res) {
                        _.find($scope.roles, function (role, index) {
                            if (role._id == res._id) {
                                $scope.roles[index] = res;
                            }
                        });
                        $scope.toggleShowRoleEditor($scope.currentRole);
                        return res;
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
                    .then(function (role) {
                        $scope.roles.push(role);
                        $scope.toggleShowRoleEditor($scope.currentRole);
                    })
                    .finally(function () {
                        $scope.busy = false;
                    });
            }
        }
    ]);
});