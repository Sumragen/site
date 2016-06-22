/**
 * Created by sumragen on 2/27/16.
 */
define(['../module', 'lodash'], function (module, _) {
    module.controller('Dashboard.Settings.Stages.StagesController', [
        '$scope',
        '$timeout',
        'Common.Model.TeacherService',
        'Dashboard.Settings.Stages.StageService',
        'stagesData',
        function ($scope, $timeout, teacherService, stageService, stagesData) {
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
                teacherService.getTeachers()
                    .then(function (teachers) {
                        if (stage) {
                            var teachersNames = [];
                            _.each(teachers, function (teacher) {
                                if (_.every($scope.stages, function (st) {
                                        return stage._id == st._id || (st.formMaster.id != teacher._id && stage._id != st._id);
                                    })) {
                                    teachersNames.push({id: teacher._id, name: teacher.user.name});
                                }
                            });
                            updateStageModelAndForm(stage, teachersNames);
                        }
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
                        .then(function (res) {
                            _.every($scope.stages, function (stage, index) {
                                if (stage._id == res.data._id) {
                                    $scope.stages[index] = res.data;
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
            $scope.createStage = function (form) {
                $scope.$broadcast('schemaFormValidate');
                if (form.$valid) {
                    $scope.busy = true;
                    stageService.createStage($scope.stage.model)
                        .then(function (stages) {
                            $scope.stages = stages.data;
                            $scope.toggleShowEditForm();
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
                        type: "string",
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