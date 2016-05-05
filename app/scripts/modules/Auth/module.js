/**
 * Created by sumragen on 2/27/16.
 */
define(['angular'],function(module){
    return module.module('AuthModule',['satellizer'])
        .config(function($authProvider) {
            $authProvider.google({
                clientId: '232789525039-bdbm1pdsun1lurfrle4n81v0utpov94g.apps.googleusercontent.com'
            });
        });
});