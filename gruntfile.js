module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		sass: {
      dist: {
        options: {
            style: 'expanded'
        },
        files: {
            'public/stylesheets/index.scss': 'public/stylesheets/index.css'
        }
      } 
    },

		watch: {
			react: {
				files: ['react_components/*/*.jsx'],
				tasks: ['browserify']
			},
			css: {
        files: ['public/stylesheets/*.scss'],
        tasks: ['sass'],
        options: {
            spawn: false
        }
      } 
		},

		browserify: {
			options: {
				transform: [ require('grunt-react').browserify  ]

			},
			app: {
				src: ['react_components/app.jsx'],
				dest: 'public/javascripts/app.js'
			},
			dinodetail: {
				src: ['react_components/dinodetail.jsx'],
				dest: 'public/javascripts/dinodetail.js'
			},
			dinolist: {
				src: ['react_components/dinolist.jsx'],
				dest: 'public/javascripts/dinolist.js'
			}
		}
	});

	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');

	grunt.registerTask('default', [
	'browserify', 'sass'
	]);
};