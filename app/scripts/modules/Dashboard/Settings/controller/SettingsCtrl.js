/**
 * Created by sumragen on 2/27/16.
 */
define(['../module'], function (module) {
    module.controller('Dashboard.Settings.SettingsCtrl', [function () {
        var self = this;

        self.changeAvatar = function () {
           /* var selectedFile = new Image (document.getElementById('userImage').files[0]);
            var user = JSON.parse(localStorage.getItem("currentUserLS"));
            user.avatar = selectedFile;
            localStorage.removeItem("currentUserLS");
            localStorage.setItem("currentUserLS",JSON.stringify(user));*/
        };

        return self;
    }]);
});