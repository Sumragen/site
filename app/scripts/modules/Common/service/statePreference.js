/**
 * Created by trainee on 3/17/16.
 */
define(['../module', 'lodash'], function (module, _) {
    module.service('Common.StatePreference', [
        '$rootScope',
        'Common.SecurityContext',
        function ($rootScope, securityContext) {
            var service = {};
            service.getStateData = function (stateName) {
                var result = null;
                var userId = securityContext.getPrincipal().id;
                var stateData = JSON.parse(localStorage.getItem('stateData'));
                if (stateData) {
                    _.every(stateData, function (state) {
                        if (userId === state.id) {
                            _.every(state.state, function (stateItem) {
                                if (stateItem.name === stateName) {
                                    result = stateItem.preference;
                                    return false;
                                }
                                return true;
                            });
                        }
                        return true;
                    });
                }
                return result;
            };
            service.setStateData = function (newState) {
                var stateData = JSON.parse(localStorage.getItem('stateData'));
                var userId = securityContext.getPrincipal().id;
                if (stateData) {
                    if (_.every(stateData, function (state, index) {
                            if (userId === state.id) {
                                if (_.every(state.state, function (stateItem, ind) {
                                        if (stateItem.name === newState.name) {
                                            stateData[index].state[ind] = newState;
                                            return false;
                                        }
                                        return true;
                                    })) {
                                    stateData[index].state.push(newState);
                                }
                                return false;
                            }
                            return true;
                        })) {
                        stateData.push({id: userId, state: [newState]})
                    }
                } else {
                    stateData = [
                        {
                            id: userId,
                            state: [newState]
                        }
                    ]
                }
                localStorage.setItem('stateData', JSON.stringify(stateData));
                $rootScope.$broadcast('stateData:updated', stateData);
                return stateData;
            };
            return service;
        }
    ]);
});