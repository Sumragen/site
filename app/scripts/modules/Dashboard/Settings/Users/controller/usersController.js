/**
 * Created by sumragen on 2/27/16.
 */
define(['../module', 'lodash'], function (module, _) {
    module.controller('Dashboard.Settings.Users.UsersController', [
        '$scope',
        '$timeout',
        'Dashboard.Profile.ProfileService',
        'Dashboard.Settings.Schedule.LessonService',
        'usersData',
        function ($scope, $timeout, profileService, lessonService, usersData) {
            $scope.users = usersData;
            $scope.user = {};

            $scope.scrollDisabled = false;
            var limit = 2;

            $scope.loadMoreUsers = function () {
                if ($scope.busy) return;
                $scope.busy = true;
                profileService.loadUsers($scope.users.length, limit)
                    .then(function (users) {
                        if ($scope.users.concat(users).length - $scope.users.length < limit) $scope.scrollDisabled = true;
                        $scope.users = $scope.users.concat(users);
                    })
                    .finally(function () {
                        $timeout(function () {
                            $scope.busy = false;
                        });
                    });
            };

            function reformatObject(item) {
                return {value: item.id, name: item.name}
            }

            $scope.showEditForm = false;
            $scope.toggleShowEditForm = function (user) {
                $timeout(function () {
                    lessonService.getSubjectsNames()
                        .then(function (data) {
                            lessonService.getRoleNames()
                                .then(function (names) {
                                    if (user) {
                                        lessonService.getSubjectsForTeacher(user.id)
                                            .then(function (subjectsData) {
                                                $scope.user.model = user;
                                                $scope.user.model.subjects = subjectsData;
                                                $scope.user.model.role = $scope.user.model.roles[0].id;
                                                _.each($scope.user.model.subjects, function (subject, index) {
                                                    _.find(data.names, function (subjectName) {
                                                        if (subject.id === subjectName.id) {
                                                            $scope.user.model.subjects[index] = subjectName;
                                                        }
                                                    });
                                                });

                                                $scope.user.form = [
                                                    {
                                                        key: 'avatar',
                                                        title: 'Upload avatar',
                                                        type: 'fileinput',
                                                        fileType: 'dataUrl',
                                                        previewType: 'image',
                                                        accept: 'image/png,image/jpeg',
                                                        onFileSelect: null
                                                    },
                                                    {
                                                        "key": "first_name",
                                                        "placeholder": "First name"

                                                    },
                                                    {
                                                        "key": "last_name",
                                                        "placeholder": "Last name"
                                                    },
                                                    {
                                                        "key": "username",
                                                        "placeholder": "username"
                                                    },
                                                    {
                                                        "key": "email",
                                                        "placeholder": "email"
                                                    },
                                                    {
                                                        "key": "role",
                                                        type: "select",
                                                        titleMap: _.map(names, reformatObject)
                                                    },
                                                    {
                                                        "key": "subjects",
                                                        "type": "multiselect",
                                                        condition: "user.model.role === 1 || user.model.role === 2",
                                                        items: data.names
                                                    }
                                                ];
                                            });
                                    } else {
                                        $scope.user.model = {};
                                    }

                                });
                        });
                    $scope.scrollDisabled = !$scope.scrollDisabled;
                    $scope.showEditForm = !$scope.showEditForm;
                });
            };

            $scope.editProfile = function (form) {
                $scope.busy = true;
                $scope.$broadcast('schemaFormValidate');
                if (form.$valid) {
                    profileService.updateUser($scope.user.model)
                        .then(function (users) {
                            $scope.users = users;
                            $scope.toggleShowEditForm();
                        })
                        .finally(function () {
                            $scope.busy = false;
                        });
                }
            };

            $scope.user.schema = {
                "type": "object",
                "properties": {
                    first_name: {
                        type: "string",
                        minLength: 4,
                        title: "First Name"
                    },
                    last_name: {
                        type: "string",
                        minLength: 4,
                        title: "Last Name"
                    },
                    username: {
                        type: "string",
                        minLength: 4,
                        title: "Login"
                    },
                    email: {
                        "title": "Email",
                        "type": "string",
                        "pattern": "^\\S+@\\S+$"
                    },
                    avatar: {
                        type: 'file'
                    },
                    role: {
                        type: 'number',
                        title: 'Role'
                    },
                    subjects: {
                        type: 'Array'
                    }
                },
                "required": [
                    "first_name",
                    "last_name",
                    "username",
                    "email"
                ]
            };

        }
    ]);
});