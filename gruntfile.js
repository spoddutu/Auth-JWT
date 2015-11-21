module.exports = function(grunt){
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		jshint: {
			reporter: require('jshint-stylish')
		    options: {
		      curly: true,
		      eqeqeq: true,
		      eqnull: true,
		      browser: true,
		      globals: {
		        jQuery: true
		      },
		    },
		    ignore_warning: {
		      options: {
		        '-W015': true,
		      },
		      src: ['**/*.js'],
		    },
		    files: {
		    	src: ["public/**/*.js"]
		    } 
		}
	});
}