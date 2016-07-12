/**
 * Created by sumragen on 2/27/16.
 */
define(['../module', 'lodash'], function (module, _) {
    module.controller('Dashboard.Settings.Stages.StagesController', [
        '$scope',
        '$timeout',
        'Common.Model.TeacherService',
        'Common.Model.StageService',
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
                        var teachersNames = [];
                        _.each(teachers, function (teacher) {
                            if (_.every($scope.stages, function (st) {
                                    if (stage) {
                                        return stage.id == st.id || (st.formMaster.id != teacher.id && stage.id != st.id );
                                    } else {
                                        return st.formMaster.id != teacher.id;
                                    }
                                })) {
                                teachersNames.push({
                                    id: teacher.id,
                                    name: teacher.user.first_name + ' ' + teacher.user.last_name
                                });
                            }
                        });
                        updateStageModelAndForm(stage, teachersNames);

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
                        .then(function (data) {
                            _.every($scope.stages, function (stage, index) {
                                if (stage.id == data.id) {
                                    $scope.stages[index] = data;
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
                    $scope.stage.model.suffix = $scope.stage.model.suffix.toUpperCase();
                    stageService.createStage($scope.stage.model)
                        .then(function (data) {
                            $scope.stages.push(data);
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