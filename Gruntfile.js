module.exports = function(grunt) {

  grunt.initConfig({

    path: {
      // Source folders
      app: 'app',
      billing: 'app/billing',
      less: 'app/less',
      engineui: 'engineui',

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
        options: {
          sourceMapFilename: ''
        },
        files: {
          '<%- path.temp %>/engineui-grid-precompile.less':
              '<%- path.less %>/engineui-grid.less'
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
      },

      engineui: {
        files: {
          '<%- path.dist_vendor %>/engineui/style/engineui.css':
            '<%- path.dist_vendor %>/engineui/less/engineui.less'
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

      sync_engineui: {
        command: 'rsync <%- path.engineui %> <%- path.dist_vendor %> ' +
                 '--update --delete --verbose --recursive '
      },

      sourcemap_links: {
        command: [
          'cd dist/style',
          'ln -s ../../app app',
          'ln -s ../ dist'
        ].join('&&')
      }
    },

    jshint: {
      options: {
        jshintrc: true
      },
      all: ['Gruntfile.js', 'app/billing/**/*.js']
    },

    jscs: {
      options: {
        config: 'app/billing/.jscsrc'
      },
      all: ['Gruntfile.js', 'app/billing/**/*.js']
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
        files: ['<%- path.less %>/**/*'],
        tasks: ['less:app']
      },

      engineui: {
        files: ['<%- path.engineui %>/**/*'],
        tasks: ['shell:sync_engineui', 'less:engineui', 'less:app']
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
          'style/*.css',
          'vendor/engineui/style/*.css',
          'vendor/engineui/*.html'
        ]
      }
    }
  });

  // bring in all grunt plugins from package.json
  require('load-grunt-tasks')(grunt);

  grunt.registerTask('dist-dev', [
    'clean',
    'shell:sync_app',
    'shell:sync_engineui',
    'bower',
    'less',
    'shell:sourcemap_links'
  ]);

  grunt.registerTask('default', ['dist-dev']);
};
