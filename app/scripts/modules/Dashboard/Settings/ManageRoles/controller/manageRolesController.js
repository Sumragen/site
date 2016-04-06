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
        'rolesData',
        function ($scope, $http, $timeout, Endpoint, permissionService, rolesData) {
            var self = this;
            $scope.permissionSet = permissionService.getPermissionSet();

            $scope.permissions = [];

            $scope.togglePermissions = function(code) {
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

            $scope.updateRole = function () {
                $scope.currentRole.permissions = $scope.permissions.sort(function (a, b) {
                    return a - b;
                });
                return $http(Endpoint.role.update($scope.currentRole))
                    .then(function (data) {
                        _.find($scope.roles, function (role, index) {
                            if (role.id === $scope.currentRole.id) {
                                $scope.roles[index] = data.data;
                            }
                        });
                        $scope.toggleShowRoleEditor($scope.currentRole);
                        return data.data;
                    });
            };

            $scope.createRole = function () {
                $scope.currentRole.permissions = $scope.permissions.sort(function (a, b) {
                    return a - b;
                });
                return $http(Endpoint.role.post($scope.currentRole))
                    .then(function (role) {
                        $scope.roles.push(role.data);
                        $scope.toggleShowRoleEditor(role.data);
                    });
            }
        }
    ]);
});