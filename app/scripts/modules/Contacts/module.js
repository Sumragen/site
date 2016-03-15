/**
 * Created by sumragen on 2/27/16.
 */
define(['angular'],function(module){
    return module.module('ContactsModule',[])
        .config(function ($stateProvider) {
            $stateProvider
                .state('dashboard.contacts', {
                    url: "/contacts",
                    templateUrl: './views/tabs/contacts.html',
                    controller: 'ContactsController as controller'
                });
        });

});