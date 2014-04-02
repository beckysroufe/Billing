/*
 * Operating principles:
 * - {public} folder is absolutely transient, and is destroyed/rebuilt/updated
 * - {source|image|style} are ultimately copied/compiled to {public}
 *   + {source} => {public}
 *   + {image} => {public}/img
 *   + {style} => {public}/css
 * - bower task copies targeted libraries/assets to
 *     {public}/vendor/<component_name>
 *
 * End goals:
 * - {public} will be operated in 2+ modes, at minimum 'dev' and 'prod'.
 *   In each mode, especially prod, {public} will contain _only_ files that are
 *       necessary to run.
 *   + dev mode will run without any optimization
 *   + prod mode will run as a single, minified 'app.js'
 */
module.exports = function(grunt) {

  grunt.initConfig({

    path: {
      // Source folders
      source: 'src',
      image: 'img',
      style: 'less',
      temp: 'tmp',
      engineui: 'engineui',

      // Output folder (entirely transient)
      public: '_public'
    },

    clean: {
      public: ['<%- path.public %>']
    },

    less: {
      options: {
        paths: [
          '<%- path.public %>/vendor',
          '<%- path.temp %>'
        ]
      },

      precompile: {
        files: {
          '<%- path.temp %>/engineui-grid-precompile.less':
            '<%- path.style %>/engineui-grid.less'
        }
      },

      app: {
        files: {
          '<%- path.public %>/css/billing.css': '<%- path.style %>/billing.less'
        }
      },

      engineui: {
        files: {
          '<%- path.public %>/vendor/engineui/css/engineui.css':
            '<%- path.public %>/vendor/engineui/less/engineui.less'
        }
      }
    },

    bower: {
      install: {
        options: {
          targetDir: '<%- path.public %>/vendor',
          verbose: true,
          cleanTargetDir: true,
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

      sync_src: {
        command: [
          'cd <%- path.source %>',
          'rsync ./ ../<%- path.public %> ' +
            '--update --delete --verbose --recursive ' +
            '--exclude vendor --exclude img --exclude css'
        ].join('&&')
      },

      sync_img: {
        command: 'rsync <%- path.image %> <%- path.public %> ' +
               '--update --delete --verbose --recursive'
      },

      sync_engineui: {
        command: [
          'cd <%- path.engineui %>',
          'rsync ./ ../<%- path.public %>/vendor/engineui ' +
            '--update --delete --verbose --recursive ' +
            '--exclude css'
        ].join('&&')
      }
    },

    jshint: {
      src: ['<%- path.source %>/**/*.js']
    },

    watch: {
      src: {
        files: ['<%- path.source %>/**/*'],
        tasks: ['shell:sync_src']
      },

      img: {
        files: ['<%- path.image %>/**/*'],
        tasks: ['shell:sync_img']
      },

      engineui: {
        files: ['<%- path.engineui %>/**/*'],
        tasks: ['shell:sync_engineui', 'less:engineui', 'less:app']
      },

      less: {
        files: ['<%- path.style %>/**/*'],
        tasks: ['less:app']
      },

      // Start livereload server at http://localhost:35729/livereload.js
      livereload: {
        options: {
          cwd: '<%- path.public %>',
          livereload: true
        },

        files: [
          'css/**/*.css',
          'index.html',
          'vendor/engineui/css/*.css',
          'vendor/engineui/index.html'
       s ]
      }
    }

  });

  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-copy');
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');

  grunt.registerTask('default', [
    'clean',
    'bower',
    'shell:sync_src',
    'shell:sync_img',
    'shell:sync_engineui',
    'less'
  ]);
}
