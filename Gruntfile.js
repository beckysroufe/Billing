module.exports = function(grunt) {
  /* jshint camelcase:false */

  grunt.initConfig({

    path: {
      // Source folders
      app: 'app',
      billing: 'app/billing',
      less: 'app/less',

      // Intermediate folders (transient)
      temp: 'temp',

      // Output folders (transient)
      dist: 'dist',
      dist_style: 'dist/style',
      dist_vendor: 'dist/vendor'
    },

    clean: {
      dist: ['<%- path.dist %>', '<%- path.temp %>']
    },

    less: {
      options: {
        paths: [
          '<%- path.dist_vendor %>',
          '<%- path.temp %>'
        ]
      },

      precompile: {
        files: {
          '<%- path.temp %>/engine-ui-grid-precompile.less':
              '<%- path.less %>/engine-ui-grid.less'
        }
      },

      app: {
        options: {
          sourceMap: true,
          sourceMapFilename: '<%- path.dist_style %>/billing.css.map',
          sourceMapBasepath: '<%- path.dist_style %>'
        },
        files: {
          '<%- path.dist_style %>/billing.css':
              '<%- path.less %>/billing.less'
        }
      }
    },

    bower: {
      install: {
        options: {
          targetDir: '<%- path.dist_vendor %>',
          verbose: true,
          layout: 'byComponent',
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

      sync_app: {
        command: [
          'cwd=$(pwd)',
          'cd <%- path.app %>',
          'rsync . $cwd/<%- path.dist %> ' +
              '--update --delete --verbose --recursive ' +
              '--exclude less --exclude style --exclude vendor' 
        ].join('&&') 
      },

      sourcemap_links: {
        command: [
          'mkdir -p <%- path.dist_style %>',
          'cd <%- path.dist_style %>',
          'rm -f app && ln -s ../../app app',
          'rm -f dist && ln -s ../ dist'
        ].join('&&')
      }
    },

    jshint: {
      options: {
        jshintrc: true
      },

      app: ['Gruntfile.js', 'app/billing/**/*.js']
    },

    jscs: {
      options: {
        config: 'app/billing/.jscsrc'
      },

      app: ['Gruntfile.js', 'app/billing/**/*.js']
    },

    watch: {
      options: {
        nospawn: true
      },

      billing: {
        files: [
          '<%- path.app %>/**/*',
          '!<%- path.less %>/**/*'
        ],
        tasks: ['shell:sync_app']
      },

      less: {
        files: [
          '<%- path.less %>/**/*',
          '<%- path.dist_vendor %>/engine-ui/less/**/*'
        ],
        tasks: ['less:app']
      },

      // Start livereload server at http://localhost:35729/livereload.js
      livereload: {
        options: {
          cwd: '<%- path.dist %>',
          livereload: true
        },

        files: [
          '*.html',
          'views/*.html',
          'billing/**/*.html',
          'style/*.css'
        ]
      }
    }
  });

  // bring in all grunt plugins from package.json
  require('load-grunt-tasks')(grunt);

  grunt.registerTask('dist-dev', [
    'shell:sync_app',
    'bower',
    'less',
    'shell:sourcemap_links'
  ]);

  grunt.registerTask('default', ['dist-dev']);
};
