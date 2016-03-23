/**
 * Created by artem on 11/9/15.
 */
define(['Env'], function (Env) {
    'use strict';
    var conf = {
        siteUrl: Env.siteUrl,
        apiUrl: Env.apiUrl,
        showVersionInfo: Env.showVersionInfo,
        useHeaderAuth: Env.useHeaderAuth,
        useCookiesAuth: Env.useCookiesAuth,
        useGetParamAuth: Env.useGetParamAuth,
        useFakeAPIService: Env.useFakeAPIService,
        build: Env.build
    };
    return conf;
});