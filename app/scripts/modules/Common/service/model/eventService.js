/**
 * Created by trainee on 6/21/16.
 */
define(['../../module'], function (module) {
    module.service('Common.Model.EventService', [
        '$http',
        '$q',
        'Endpoint',
        function ($http, $q, Endpoint) {
            var service = {};
            //CRUD
            service.createEvent = function (event) {
                return $http(Endpoint.event.post(event))
                    .then(function (res) {
                        return res.data;
                    }, function (err) {
                        return $q.reject(err);
                    });
            };
            service.getEventById = function (id) {
                return $http(Endpoint.event.get(id))
                    .then(function (res) {
                        return res.data;
                    }, function (err) {
                        return $q.reject(err);
                    });
            };
            service.getEvents = function (offset, limit) {
                return $http(Endpoint.event.list(offset, limit))
                    .then(function (res) {
                        return res.data;
                    }, function (err) {
                        return $q.reject(err);
                    });
            };
            service.updateEvent = function (event) {
                return $http(Endpoint.event.put(event))
                    .then(function (res) {
                        return res.data;
                    }, function (err) {
                        return $q.reject(err);
                    });
            };
            service.updateEventList = function (events) {
                return $http(Endpoint.event.updateList(events))
                    .then(function (res) {
                        return res.data;
                    })
                    .catch(function (err) {
                        return $q.reject(err);
                    });
            };
            service.deleteEvent = function (event) {
                return $http(Endpoint.event.delete(event))
                    .then(function (res) {
                        return res.data;
                    }, function (err) {
                        return $q.reject(err);
                    });
            };
            return service;
        }]);
});