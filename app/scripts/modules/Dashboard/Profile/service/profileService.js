/**
 * Created by trainee on 3/22/16.
 */
define(['../module'], function (module) {
    module.service('Dashboard.Profile.ProfileService', [
        '$http',
        '$q',
        'Endpoint',
        'Common.SecurityContext',
        function ($http, $q, Endpoint, securityContext) {
            var service = {};

            service.loadUsers = function (offset, limit) {
                return $http(Endpoint.user.list(offset, limit))
                    .then(function (users) {
                        return users.data.users;
                    });
            };

            service.getFullUserData = function(id){
              return $http(Endpoint.user.get(id))
                  .then(function (data) {
                      return data.data;
                  })
                  .catch(function (err) {
                      return $q.reject(err);
                  });
            };

            service.updateUser = function (user) {
                return $http(Endpoint.user.update(user))
                    .then(function (data) {
                        if (securityContext.getPrincipal().id === data.data.id) securityContext.setPrincipal(data.data);
                        return data.data;
                    }, function (err) {
                        return $q.reject(err);
                    });
            };
            return service;
        }]);
});