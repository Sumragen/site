/**
 * Created by sumragen on 2/27/16.
 */
define(['../module', 'lodash'], function (module, _) {
    module.controller('Dashboard.Settings.Stages.StagesController', [
        '$scope',
        '$timeout',
        'Common.NotificationService',
        'Dashboard.Settings.Stages.StageService',
        'stagesData',
        function ($scope, $timeout, notificationService, stageService, stagesData) {
            $scope.stages = stagesData;

            $scope.stage = {};
            $scope.showEditForm = false;
            function updateStageModelAndForm(stage, names) {
                if (stage) {
                    $scope.stage.model = angular.copy(stage);
                    $scope.stage.model.formMaster = $scope.stage.model.formMaster.id;
                    $scope.stage.form = [
                        {
                            "key": "formMaster",
                            type: 'select',
                            titleMap: _.map(names, reformatObject)
                        }
                    ];
                } else {
                    $scope.stage.model = {};
                    $scope.stage.form = [
                        {
                            "key": "stage",
                            "placeholder": "Stage"

                        },
                        {
                            "key": "suffix",
                            "placeholder": "Suffix"
                        },
                        {
                            "key": "formMaster",
                            type: 'select',
                            titleMap: _.map(names, reformatObject)
                        }
                    ];
                }
            }

            $scope.toggleShowEditForm = function (stage) {
                stage = angular.fromJson(stage);
                stageService.getTeachersName(_.merge(stage, {isFormMasterData: true}))
                    .then(function (names) {
                        updateStageModelAndForm(stage, names);
                        $scope.showEditForm = !$scope.showEditForm;
                    });
            };

            function reformatObject(item) {
                return {value: item.id, name: item.name}
            }

            $scope.updateStage = function (form) {
                $scope.$broadcast('schemaFormValidate');
                if (form.$valid) {
                    $scope.busy = true;
                    stageService.updateStage($scope.stage.model)
                        .then(function (stages) {
                            $scope.stages = stages.data;
                            notificationService.showMessage('Stage was updated', 'success');
                            $scope.toggleShowEditForm();
                        })
                        .catch(function (err) {
                            notificationService.showMessage(err.message, 'error');
                        })
                        .finally(function () {
                            $scope.busy = false;
                        });
                }
            };
            $scope.createStage = function (form) {
                $scope.$broadcast('schemaFormValidate');
                if (form.$valid) {
                    $scope.busy = true;
                    stageService.createStage($scope.stage.model)
                        .then(function (stages) {
                            $scope.stages = stages.data;
                            notificationService.showMessage('Stage was created', 'success');
                            $scope.toggleShowEditForm();
                        })
                        .catch(function (err) {
                            notificationService.showMessage(err.message, 'error');
                        })
                        .finally(function () {
                            $scope.busy = false;
                        });
                }
            };

            $scope.stage.schema = {
                "type": "object",
                "properties": {
                    stage: {
                        type: "number",
                        minimum: 1,
                        maximum: 11,
                        title: "Stage"
                    },
                    suffix: {
                        type: "string",
                        maxLength: 1,
                        pattern: /[a-z,A-Z]/,
                        title: "Suffix"
                    },
                    formMaster: {
                        type: "number",
                        title: "Form master"
                    }
                },
                "required": [
                    "stage",
                    "suffix",
                    "formMaster"
                ]
            };
            $scope.stage.form = [];
        }
    ]);
});