/*
 * Operating principles:
 * - {public} folder is absolutely transient, and is destroyed/rebuilt/updated
 * - {source|image|style} are ultimately copied/compiled to {public}
 *   + {source} => {public}
 *   + {image} => {public}/img
 *   + {style} => {public}/css
 * - bower task copies targeted libraries/assets to {public}/vendor/<component_name>
 *
 * End goals:
 * - {public} will be operated in 2+ modes, at minimum "dev" and "prod".
 *   In each mode, especially prod, {public} will contain _only_ files that are necessary to run.
 *   + dev mode will run without any optimization
 *   + prod mode will run as a single, minified "app.js"
 */
module.exports = function( grunt ) {

    grunt.initConfig({

        path: {
            // Source folders
            source: "src",
            image: "img",
            style: "less",
            temp: "tmp",

            // Output folder (entirely transient)
            public: "_public"
        },

        clean: {
            public: [ "<%- path.public %>" ]
        },

        less: {
            options: {
                paths: [
                    "<%- path.public %>/vendor",
                    "<%- path.temp %>"
                ]
            },

            precompile: {
                files: {
                    "tmp/engineui-grid-precompile.less": "<%- path.style %>/engineui-grid.less"
                }
            },

            app: {
                files: {
                    "<%- path.public %>/css/billing.css": "<%- path.style %>/billing.less",
                    "<%- path.public %>/css/engineui.css": "<%- path.style %>/engineui/engineui.less"
                }
            }
        },

        bower: {
            install: {
                options: {
                    targetDir: "<%- path.public %>/vendor",
                    verbose: true,
                    cleanTargetDir: true,
                    layout: "byComponent",
                    bowerOptions: {
                        production: true
                    }
                }
            }
        },

        shell: {
            options: {
                stdout: true,
                stderr: true,
                failOnError: true
            },

            sync_src: {
                command: [
                    "cd <%- path.source %>",
                    "rsync ./ ../<%- path.public %> " +
                        "--update --delete --verbose --recursive " +
                        "--exclude vendor --exclude img --exclude css"
                ].join( "&&" )
            },

            sync_img: {
                command: "rsync <%- path.image %> <%- path.public %> " +
                             "--update --delete --verbose --recursive"
            }
        },

        jshint: {
            src: [ "<%- path.source %>/**/*.js" ]
        },

        watch: {
            src: {
                files: [ "<%- path.source %>/**/*" ],
                tasks: [ "shell:sync_src" ]
            },

            img: {
                files: [ "<%- path.image %>/**/*" ],
                tasks: [ "shell:sync_img" ]
            },

            less: {
                files: [ "<%- path.style %>/**/*" ],
                tasks: [ "less" ]
            },

            // Start livereload server at http://localhost:35729/livereload.js
            livereload: {
                options: {
                    cwd: "<%- path.public %>",
                    livereload: true
                },

                files: [
                    "css/**/*.css",
                    "*.html"
                ]
            }
        }

    });

    grunt.loadNpmTasks( "grunt-shell" );
    grunt.loadNpmTasks( "grunt-copy" );
    grunt.loadNpmTasks( "grunt-bower-task" );
    grunt.loadNpmTasks( "grunt-contrib-clean" );
    grunt.loadNpmTasks( "grunt-contrib-watch" );
    grunt.loadNpmTasks( "grunt-contrib-jshint" );
    grunt.loadNpmTasks( "grunt-contrib-less" );

    grunt.registerTask( "default", [
        "clean", "bower", "shell:sync_src", "shell:sync_img", "less"
    ]);
}