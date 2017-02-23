module.exports = function (grunt) {
    "use strict";

    grunt.initConfig({
        ts: {
            app: {
                files: [{
                    src: ["src/\*\*/\*.ts", "!src/.baseDir.ts", "!src/_all.d.ts"],
                    dest: "dist/"
                }],
                options: {
                    module: "commonjs",
                    target: "es6",
                    sourceMap: false
                }
            }
        },
        tslint: {
            options: {
                configuration: "tslint.json"
            },
            files: {
                src: ["src/\*\*/\*.ts"]
            }
        },
        watch: {
            ts: {
                files: ["js/src/\*\*/\*.ts", "src/\*\*/\*.ts"],
                tasks: ["ts", "tslint"]
            }
        },
        nodemon: {
            dev: {
                script: 'dist/index.js'
            }
        },
        uglify: {
            build: {
                files: {
                    'dist/output.min.js': ['dist/*.js']
                }
            }
        }

    });

    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-ts");
    grunt.loadNpmTasks("grunt-tslint");
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask("default", [
        "ts",
        "tslint"
    ]);

};
