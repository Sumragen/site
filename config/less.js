/**
 * Created by sumragen on 3/10/16.
 */
module.exports = function (grunt, appConfig) {
    return {
        development: {
            options: {
                paths: ["app/styles"]
            },
            files: {
                "<%= appConfig.server %>/styles/main.css": "app/styles/main.less"
            }
        },
        dist: {
            options: {
                modifyVars: {
                    NO_CACHE: '"' + appConfig.env.build.noCache + '"'
                },
                report: 'min',
                strictMath: false,
                compress: appConfig.env.minimizeCss,
                cleancss: true,
                paths: ['<%= appConfig.server %>/styles/',
                    '<%= appConfig.app %>/styles/'
                ]
            },
            files: {
                '<%= appConfig.dist %>/styles/main.min.css': '<%= appConfig.app %>/styles/main.less'
            }
        },
        production: {
            options: {
                paths: ["app/styles"]
            },
            files: {
                "dist/styles/main.min.css": "app/styles/main.less"
            }
        }
    }
};