/**
 * Created by artem on 3/23/16.
 */
define(
    ['../module', 'lodash', 'tv4'],
    function (module, _, tv4) {
        'use strict';
        module.service('Common.ValidationMessagesBuilder',
            [
                function () {
                    var service = {};
                    /**
                     *
                     * @param filedName
                     * @param data
                     * @param additional - could be object or function. If it is object default message set will be
                     *                     extended with data from that object. If it is function - it will be invoked with default message set as argument.
                     * @returns {{}} object. Key - error code, value - localized error message
                     */
                    service.build = function (filedName, data, additional) {

                        function capitalizeIt(text) {
                            return text.charAt(0).toUpperCase() + text.substring(1, text.length);
                        }

                        var
                            args = {
                                filed_name_lower: filedName.toLowerCase(),
                                filed_name_capitalized: capitalizeIt(filedName.toLowerCase())
                            };
                        var messages = {};

                        function getString(str, args) {
                            _.each(args, function (value, key) {
                                str = str.replace('{{'+key+'}}', value)
                            });
                            return str;
                        }

                        messages['default'] = getString("Please enter a valid  {{filed_name_lower}}.", args);
                        messages[tv4.errorCodes.STRING_LENGTH_SHORT] = getString("{{filed_name_capitalized}} is too short.", args);
                        messages[tv4.errorCodes.STRING_LENGTH_LONG] = getString("{{filed_name_capitalized}} is too long.", args);
                        messages[tv4.errorCodes.NUMBER_MINIMUM] = getString("{{filed_name_capitalized}} is too small.", args);
                        messages[tv4.errorCodes.NUMBER_MAXIMUM] = getString("{{filed_name_capitalized}} is too big.", args);
                        messages[tv4.errorCodes.OBJECT_REQUIRED] = getString("{{filed_name_capitalized}} is required.", args);
                        messages[tv4.errorCodes.ARRAY_LENGTH_SHORT] = getString("At least one {{filed_name_lower}} should be added.", args);
                        messages[tv4.errorCodes.FORMAT_CUSTOM] = messages['default'];
                        messages[tv4.errorCodes.STRING_PATTERN] = messages['default'];
                        if (typeof(additional) == 'function') {
                            additional(messages);
                        } else {
                            messages = _.extend(messages, additional || {})
                        }
                        return messages;
                    };

                    return service;
                }
            ]
        );
    }
);
