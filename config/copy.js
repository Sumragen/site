/**
 * Created by sumragen on 3/10/16.
 */
module.exports = {
    dist:{
        files:[
            {
                expand: true,
                cwd: 'app/fonts',
                src: '**/*.*',
                dest: 'dist/fonts'
            },{
                expand: true,
                cwd: 'app/',
                src: '**/*.html',
                dest: 'dist/'
            },{
                expand: true,
                cwd: 'app/images',
                src: '**/*.{ico,png,jpeg}',
                dest: 'dist/images'
            }
        ]
    }
};