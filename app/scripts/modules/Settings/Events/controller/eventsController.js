/**
 * Created by sumragen on 2/27/16.
 */
define(['../module'], function (module) {
    module.controller('Settings.Events.EventsController', [
        '$scope',
        '$timeout',
        'Settings.Events.EventsService',
        'eventsData',
        function ($scope, $timeout, eventsService, eventsData) {
            var self = this;
            $scope.events = eventsData;

            self.showSchemaForm = false;
            self.toggleShowSchemaForm = function (event) {
                $timeout(function () {
                    $scope.selectedEvent = event;
                    self.showSchemaForm = !self.showSchemaForm;
                });
            };

            self.editEvent = function (form) {
                $scope.busy = true;
                $scope.$broadcast('schemaFormValidate');
                if (form.$valid) {
                    eventsService.updateEvent($scope.selectedEvent)
                        .then(function () {
                            self.toggleShowSchemaForm($scope.selectedEvent);
                        })
                        .finally(function () {
                            $scope.busy = false;
                        });
                }
            };

            $scope.schema = {
                "type": "object",
                "properties": {
                    name: {
                        type: "string",
                        minLength: 1,
                        title: "Name"
                    },
                    description: {
                        type: "string",
                        minLength: 4,
                        title: "Description"
                    },
                    date: {
                        type: "string",
                        minLength: 4,
                        title: "date"
                    }
                },
                "required": [
                    "name",
                    "description",
                    "date"
                ]
            };

            $scope.form = [
                {
                    "key": "name",
                    "placeholder": "Name"

                },
                {
                    "key": "description",
                    "placeholder": "Description"
                },
                {
                    "key": "date",
                    "placeholder": "Date"
                }
            ];
        }
    ]);
});