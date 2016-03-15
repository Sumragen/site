/**
 * Created by sumragen on 3/10/16.
 */
module.exports = {
    livereload: {
        options: {
            port: 9002,
            hostname: 'localhost',
            open: {
                target: 'http://localhost:9002/#/home'
            },
            middleware: function (connect) {
                return [
                    //connect.static('.tmp'),
                    connect().use(
                        '/bower_components',
                        connect.static('./bower_components')
                    ),
                    connect().use(
                        '/vendor',
                        connect.static('.tmp/vendor')
                    ),
                    connect().use(
                        '/.tmp',
                        connect.static('.tmp')
                    ),
                    connect().use(
                        '/scripts',
                        connect.static('app/scripts')
                    ),
                    connect.static('.tmp')
                ];
            }
        }
    }
};