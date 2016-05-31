/**
 * Created by sumragen on 2/27/16.
 */
define(['../module','lodash'], function (module,_) {
    module.controller('Dashboard.Profile.ProfileController', [
        '$q',
        '$scope',
        '$timeout',
        'AuthService',
        'Common.SecurityContext',
        'Common.FileUploadingService',
        'GoogleOAuthProviderService',
        'UploadContactsService',
        'Dashboard.Profile.ProfileService',
        function ($q, $scope, $timeout, authService, securityContext, fileUploadingService, googleOAuthProviderService, uploadContactsService, profileService) {
            $scope.user = {};

            $scope.uploadContacts = function () {
                var providers = [
                    {
                        id: 1,
                        name: 'Google',
                        upload: function () {
                            return googleOAuthProviderService.getContacts()
                                .then(function (data) {
                                    return _.map(data, function (user) {
                                        return {
                                            socialId: user.id,
                                            avatar: user.image.url,
                                            email : user.url,
                                            first_name : user.displayName.split(' ')[0],
                                            last_name : user.displayName.split(' ')[1] || '',
                                            username : user.displayName.split(' ').join('')
                                        }
                                    });
                                })
                        }
                    }, {
                        id: 2,
                        name: 'Facebook',
                        upload: function () {
                            var deferred = $q.defer();
                            deferred.resolve([{
                                socialId: 1,
                                avatar: null,
                                email: ' ',
                                first_name: 'test facebook',
                                last_name: 'test facebook',
                                username: 'test username'
                            }, {
                                socialId: 2,
                                avatar: null,
                                email: ' ',
                                first_name: 'test facebook',
                                last_name: 'test facebook',
                                username: 'test username'
                            }]);
                            return deferred.promise;
                        }
                    }
                ];
                uploadContactsService.openModal(providers)
                    .then(function (data) {
                        //do some with users
                        _.each(data, function (user) {
                            authService.signUp(user);
                        })
                    })
                    .catch(function (err) {
                        //display error
                    });
            };

            $timeout(function () {
                updateUserModel();
            });

            var files;
            $scope.openModal = function () {
                fileUploadingService.openModal()
                    .then(function (data) {
                        files = data;
                    })
                    .catch(function (err) {
                        err; //for example, display error
                    });
            };
            function updateUserModel() {
                $scope.user.model = securityContext.getPrincipal();
                if ($scope.user.model.passwordUndefined) {
                    $scope.errorReadPassword = true;
                }
            }

            $scope.$on('securityContext:updated', function (e, user) {
                $scope.user.model = user;
            });

            $scope.showSchemaForm = false;
            $scope.toggleShowSchemaForm = function () {
                $timeout(function () {
                    updateUserModel();
                    $scope.showSchemaForm = !$scope.showSchemaForm;
                });
            };

            $scope.editProfile = function (form) {
                $scope.$broadcast('schemaFormValidate');
                if (form.$valid) {
                    $scope.busy = true;
                    profileService.updateUser($scope.user.model)
                        .then(function () {
                            $scope.errorReadPassword = false;
                            $scope.toggleShowSchemaForm();
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
                    "email": {
                        "title": "Email",
                        "type": "string",
                        "pattern": "^\\S+@\\S+$"
                    },
                    'avatar': {
                        type: 'file'
                    },
                    'password': {
                        title: 'Password',
                        minLength: 4,
                        'type': 'string'
                    }
                },
                "required": [
                    "first_name",
                    "last_name",
                    "username",
                    "email",
                    'password'
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
                    'key': 'password',
                    type: 'password',
                    'placeholder': 'Password'
                }
            ];
        }
    ]);
});