/**
 * Created by trainee on 3/21/16.
 */
define(['../module'], function (module) {
    module.service('Dashboard.Event.EventService', [
        '$http',
        '$q',
        'Endpoint',
        function ($http, $q, Endpoint) {
            var service = {};
            service.updateEvent = function (event) {
                return $http(Endpoint.events.update(event))
                    .then(function (data) {
                        return data.data;
                    }, function (err) {
                        return $q.reject(err);
                    });
            };
            service.getEventList = function () {
                return $http(Endpoint.events.list())
                    .then(function (data) {
                        return data.data.events;
                    }, function (err) {
                        return $q.reject(err);
                    });
            };
            service.addEvent = function (event) {
                return $http(Endpoint.events.post(event))
                    .then(function (data) {
                        return data.data;
                    })
                    .catch(function (err) {
                        return $q.reject(err);
                    })
            };
            service.updateEventList = function (events) {
                return $http(Endpoint.events.updateList(events))
                    .then(function (data) {
                        return data.data;
                    })
                    .catch(function (err) {
                        return $q.reject(err);
                    });
            };
            return service;
        }]);
});