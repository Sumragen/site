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

            $scope.showEditForm = false;
            $scope.toggleShowEditForm = function (user) {
                $timeout(function () {
                    if (user) {
                        $scope.user.model = user;
                        lessonService.getSubjectsForTeacher($scope.user.model.id)
                            .then(function (data) {
                                $scope.user.model.subjects = data;
                            });
                    } else {
                        $scope.user.model = {};
                    }

                    lessonService.getNames()
                        .then(function (data) {
                            _.each($scope.user.model.subjects, function (subject, index) {
                                _.find(data.names.subject, function (subjectName) {
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
                                    "key": "subjects",
                                    "type": "multiselect",
                                    show: ($scope.user.model.roles)
                                        ? $scope.user.model.roles[0].permissions[0] === 1 || $scope.user.model.roles[0].permissions[0] === 2
                                        : false,
                                    items: data.names.subject
                                }
                            ];
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
                        .then(function () {
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