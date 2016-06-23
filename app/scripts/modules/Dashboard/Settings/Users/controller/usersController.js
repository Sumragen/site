/**
 * Created by sumragen on 2/27/16.
 */
define(['../module', 'lodash'], function (module, _) {
    module.controller('Dashboard.Settings.Users.UsersController', [
        '$scope',
        '$timeout',
        '$q',
        'Common.Model.UserService',
        'Common.Model.RoleService',
        'Dashboard.Settings.Schedule.LessonService',
        'usersData',
        function ($scope, $timeout, $q, userService, roleService, lessonService, usersData) {
            $scope.users = usersData;
            $scope.user = {};

            $scope.scrollDisabled = false;
            var limit = 2;

            $scope.loadMoreUsers = function () {
                if ($scope.busy) return;
                $scope.busy = true;
                userService.getUsers($scope.users.length, limit)
                    .then(function (users) {
                        if ($scope.users.concat(users).length - $scope.users.length < limit) $scope.scrollDisabled = true;
                        $scope.users = $scope.users.concat(users);
                    })
                    .finally(function () {
                        $scope.busy = false;
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
                            lessonService.getRoleNames(user.id)
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
                                }),
                            roleService.getRoleById(user.role || user.roles[0])
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
                            var currentRole = responses[3];
                            $scope.user.model = user;
                            $scope.user.model.subjects = [];
                            $scope.showSubjects = currentRole.weight >= 50;
                            $scope.user.model.role = currentRole._id;

                            _.each(subjectsOfTeacher, function (subject, index) {
                                _.every(subjects, function (sub, subIndex) {
                                    if (subject.id == sub.id) {
                                        $scope.user.model.subjects[index] = subjects[subIndex];
                                        return false;
                                    }
                                    return true;
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
                    userService.updateUser($scope.user.model)
                        .then(function (respUser) {
                            _.every($scope.users, function (user, index) {
                                if (user.id === respUser.id) {
                                    $scope.users[index] = respUser;
                                    return false;
                                }
                                return true;
                            });
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
                        type: 'string',
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
                    onChange: function (modelValue, form) {
                        _.every(form.titleMap, function (role) {
                            if (role.value == modelValue) {
                                $scope.showSubjects = role.weight >= 50;
                                return false;
                            }
                            return true;
                        })
                    },
                    titleMap: null
                },
                {
                    "key": "subjects",
                    "type": "multiselect",
                    condition: "showSubjects",
                    items: null
                }
            ];
        }
    ])
    ;
});