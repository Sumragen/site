/**
 * Created by sumragen on 2/27/16.
 */
define(['../module', 'lodash'], function (module, _) {
    module.controller('Dashboard.Settings.Users.UsersController', [
        '$scope',
        '$timeout',
        '$q',
        'Common.NotificationService',
        'Dashboard.Profile.ProfileService',
        'Dashboard.Settings.Schedule.LessonService',
        'usersData',
        function ($scope, $timeout, $q, notificationService, profileService, lessonService, usersData) {
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
                if (user) {
                    $q.all([
                            lessonService.getSubjectsNames()
                                .then(function (data) {
                                    return data;
                                })
                                .catch(function (err) {
                                    $q.reject(err);
                                }),
                            lessonService.getRoleNames()
                                .then(function (data) {
                                    return data;
                                })
                                .catch(function (err) {
                                    $q.reject(err);
                                }),
                            lessonService.getSubjectsForTeacher(user.id)
                                .then(function (data) {
                                    return data;
                                })
                                .catch(function (err) {
                                    $q.reject(err);
                                })
                        ])
                        .then(function (responses) {
                            var subjects = responses[0];
                            var roles = responses[1];
                            var subjectsOfTeacher = responses[2];
                            $scope.user.model = user;
                            $scope.user.model.subjects = subjectsOfTeacher;
                            $scope.user.model.role = $scope.user.model.roles[0].id;
                            _.each($scope.user.model.subjects, function (subject, index) {
                                _.find(subjects, function (subjectName) {
                                    if (subject.id === subjectName.id) {
                                        $scope.user.model.subjects[index] = subjectName;
                                    }
                                });
                            });
                            $scope.user.form[5].titleMap = roles;
                            $scope.user.form[6].items = subjects;
                            $scope.$broadcast('schemaFormRedraw');
                        })
                        .catch(function (err) {
                            $scope.errorMsg = err;
                        });
                } else {
                    $scope.user.model = {};
                }
                $scope.scrollDisabled = !$scope.scrollDisabled;
                $scope.showEditForm = !$scope.showEditForm;

            };

            $scope.editProfile = function (form) {
                $scope.busy = true;
                $scope.$broadcast('schemaFormValidate');
                if (form.$valid) {
                    profileService.updateUser($scope.user.model)
                        .then(function (tempUser) {
                            _.every($scope.users, function (user, index) {
                                if (user.id === tempUser.id) {
                                    $scope.users[index] = tempUser;
                                }
                                return true;
                            });
                            notificationService.showMessage('Changes were saved', 'success');
                            $scope.toggleShowEditForm();
                        })
                        .catch(function (err) {
                            notificationService.showMessage(err.message, error)
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
                    titleMap: null
                },
                {
                    "key": "subjects",
                    "type": "multiselect",
                    condition: "user.model.role === 1 || user.model.role === 2",
                    items: null
                }
            ];
        }
    ]);
});