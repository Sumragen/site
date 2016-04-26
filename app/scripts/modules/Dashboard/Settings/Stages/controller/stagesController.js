/**
 * Created by sumragen on 2/27/16.
 */
define(['../module', 'lodash'], function (module, _) {
    module.controller('Dashboard.Settings.Stages.StagesController', [
        '$scope',
        '$timeout',
        'Dashboard.Settings.Stages.StageService',
        'stagesData',
        function ($scope, $timeout, stageService, stagesData) {
            $scope.stages = stagesData;

            $scope.stage = {};
            $scope.showEditForm = false;
            $scope.toggleShowEditForm = function (stage) {
                $timeout(function () {
                    stageService.getTeachersName(_.merge(stage,{isFormMasterData : true}))
                        .then(function (names) {
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
                            $scope.showEditForm = !$scope.showEditForm;
                        });
                });
            };

            function reformatObject(item) {
                return {value: item.id, name: item.name}
            }

            $scope.updateStage = function (form) {
                $scope.busy = true;
                $scope.$broadcast('schemaFormValidate');
                if (form.$valid) {
                    stageService.updateStage($scope.stage.model)
                        .then(function (stages) {
                            $scope.stages = stages.data;
                            $scope.toggleShowEditForm();
                        })
                        .finally(function () {
                            $scope.busy = false;
                        });
                }
            };
            $scope.createStage = function (form) {
                $scope.busy = true;
                $scope.$broadcast('schemaFormValidate');
                if (form.$valid) {
                    stageService.createStage($scope.stage.model)
                        .then(function (stages) {
                            $scope.stages = stages.data;
                            $scope.toggleShowEditForm();
                        })
                        .finally(function () {
                            $scope.busy = false;
                        });
                }else{
                    $scope.busy = false;
                }
            };

            $scope.stage.schema = {
                "type": "object",
                "properties": {
                    stage: {
                        type: "number",
                        title: "Stage"
                    },
                    suffix: {
                        type: "string",
                        maxLength: 1,
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