/**
 * Created by sumragen on 2/27/16.
 */
define(['../module','lodash'], function (module,_) {
    module.controller('Dashboard.Settings.ManageRoles.ManageRolesController', [
        '$scope',
        '$http',
        '$timeout',
        'Endpoint',
        'rolesData',
        function ($scope, $http, $timeout, Endpoint, rolesData) {
            var self = this;
            $scope.permissions = [
                {title: 'Teacher rights', code: 0x001},
                {title: 'Administrator rights', code: 0x002},
                {title: 'Can view list of all users', code: 0x003},
                {title: 'Can edit user list', code: 0x004},
                {title: 'Can add new user', code: 0x005},
                {title: 'Can delete users', code: 0x006},
                {title: 'Can view schedule', code: 0x007},
                {title: 'Can edit schedule', code: 0x008},
                {title: 'Can add schedule', code: 0x009},
                {title: 'Can delete schedule', code: 0x00a},
                {title: 'Can view list of all events', code: 0x00b},
                {title: 'Can edit events list', code: 0x00c},
                {title: 'Can add events', code: 0x00d},
                {title: 'Can delete events', code: 0x00e}
            ];

            $scope.selection = [];

            $scope.toggleSelection = function toggleSelection(code) {
                var idx = $scope.selection.indexOf(code);

                if (idx > -1) {
                    $scope.selection.splice(idx, 1);
                } else {
                    $scope.selection.push(code);
                }
            };

            $scope.showRoleEditor = false;
            $scope.toggleShowRoleEditor = function (role) {
                $timeout(function () {
                    if (role) {
                        $scope.isExist = true;
                        $scope.selection = role.permissions;
                        $scope.id = role.id;
                        $scope.roleName = role.name;
                        $scope.roleDesc = role.description;
                    } else {
                        $scope.isExist = false;
                        $scope.selection = [];
                        $scope.id = '';
                        $scope.roleName = '';
                        $scope.roleDesc = '';

                    }
                    $scope.showRoleEditor = !$scope.showRoleEditor;
                });
            };

            $scope.roles = rolesData;

            $scope.updateRole = function (name) {
                var _role = {};
                _role.name = name;
                _role.id = $scope.id;
                _role.permissions = $scope.selection.sort(function (a, b) {
                    return a - b;
                });
                return $http(Endpoint.role.update(_role))
                    .then(function (data) {
                        _.find($scope.roles, function (role, index) {
                            if(role.id === _role.id){
                                $scope.roles[index] = data.data;
                            }
                        });
                        $scope.toggleShowRoleEditor(_role);
                        return data.data;
                    });
            };

            $scope.createRole = function (name) {
                var _role = {};
                _role.name = name;
                _role.permissions = $scope.selection.sort(function (a, b) {
                    return a - b;
                });
                return $http(Endpoint.role.post(_role))
                    .then(function (role) {
                        $scope.roles.push(role.data);
                        $scope.toggleShowRoleEditor(role.data);
                    });
            }
        }
    ]);
});