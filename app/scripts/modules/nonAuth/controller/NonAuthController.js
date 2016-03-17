/**
 * Created by sumragen on 2/27/16.
 */
define(['../module'], function (module) {
    module.controller('NonAuthController', ['$scope', function ($scope) {
        var self = this;
        $scope.tabs = [
            {
                name: 'Home',
                url: './views/tabs/home.html'
            },
            {
                name: 'Location',
                url: './views/tabs/location.html'
            },
            {
                name: 'Contacts',
                url: './views/tabs/contacts.html'
            }
        ];
        self.currentTab = {
            name: 'Home',
            url: './views/tabs/home.html'
        };
        self.selectTab = function (tab) {
            self.currentTab = tab;
        }
    }]);
});