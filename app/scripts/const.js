/**
 * Created by trainee on 3/25/16.
 */
define(['./modules/Dashboard/Schedule/module'], function (module) {
    module.constant('ScheduleConstants', {
        'PERMISSION':{
            'isTeacher': 0x001,
            'hasAdminRights': 0x002,
            'canViewUsers': 0x003,
            'canEditUser': 0x004,
            'canAddUsers': 0x005,
            'canDeleteUsers': 0x006,
            'canViewSchedule': 0x007,
            'canEditSchedule': 0x008,
            'canAddSchedule': 0x009,
            'canDeleteSchedule': 0x00a,
            'canViewEvents': 0x00b,
            'canEditEvents': 0x00c,
            'canAddEvents': 0x00d,
            'canDeleteEvents': 0x00e
        },
        'color': {
            'error': {
                'background': '#FF3F44',
                'border': '#8A1D20'
            },
            'default': {
                'background': '#55BBAA',
                'border': '#3A87AD'
            }
        },
        'STREETVIEW_MAX_DISTANCE': 100,
        'TimeSchedule': {
            0: {
                startH: 8,
                startM: 30,
                endH: 9,
                endM: 15
            },
            1: {
                startH: 9,
                startM: 30,
                endH: 10,
                endM: 15
            },
            2: {
                startH: 10,
                startM: 30,
                endH: 11,
                endM: 15
            },
            3: {
                startH: 11,
                startM: 30,
                endH: 12,
                endM: 15
            },
            4: {
                startH: 12,
                startM: 30,
                endH: 13,
                endM: 15
            },
            5: {
                startH: 13,
                startM: 30,
                endH: 14,
                endM: 15
            },
            6: {
                startH: 14,
                startM: 30,
                endH: 15,
                endM: 15
            },
            7: {
                startH: 15,
                startM: 30,
                endH: 16,
                endM: 15
            },
            8: {
                startH: 16,
                startM: 30,
                endH: 17,
                endM: 15
            }
        }
    });
});