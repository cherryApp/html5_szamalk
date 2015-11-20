module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    uglify: {
      options: {
        banner: '/*! <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: ['!js/*.min.js', 'js/*.js'],
        dest: 'build/js/app.min.js'
      }
    },
    copy: {
      main: {
        files: [
          // includes files within path
          {expand: true, src: ['css/*', 'angular.html', 'template/*'], dest: 'build/'}
        ],
      },
    },
    watch: {
      scripts: {
        files: ['**/*.js'],
        tasks: ['fast'],
        options: {
          spawn: false,
        },
      },
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('fast', ['uglify', 'copy']);
  grunt.registerTask('default', ['watch']);

};