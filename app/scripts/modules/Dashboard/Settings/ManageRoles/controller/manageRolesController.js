/**
 * Created by sumragen on 2/27/16.
 */
define(['../module'], function (module) {
    module.controller('Dashboard.Settings.ManageRoles.ManageRolesController', [
        '$scope',
        function ($scope) {
            var self = this;
            $scope.permissions = [
                {title: 'Teacher can do this?', code: 0x001},
                {title: 'Administrator rights are required?', code: 0x002},
                {title: 'Can view list of all users', code: 0x003},
                {title: 'Can edit any user', code: 0x004},
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

            $scope.createRole = function (name) {
                var _role = {};
                _role.name = name;
                _role.permissions = $scope.selection;
                return _role;
            }
        }
    ]);
});