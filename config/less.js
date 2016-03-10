/**
 * Created by sumragen on 3/10/16.
 */
module.exports = {
    development: {
        options: {
            paths: ["app/styles"]
        },
        files: {
            "dist/styles/main.min.css": "app/styles/main.less"
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
};