const MODE_DEVELOPMENT = 'dev';
const eleventyNavigationPlugin = require('@11ty/eleventy-navigation');
const htmlmin = require('html-minifier');

const now = new Date();
const {MODE: mode} = process.env;





module.exports = function (config) {
  config.addPassthroughCopy({'_src/assets/rootfiles/cname.txt': '/CNAME'});
  config.addPassthroughCopy({'_src/assets/rootfiles/humans.txt': '/humans.txt'});
  config.addPassthroughCopy({'_src/assets/icons/favicon.ico': '/favicon.ico'});
  config.addPassthroughCopy('_src/assets/img/');
  config.addPassthroughCopy('_src/assets/fonts');
  config.addPassthroughCopy({'_src/assets/mail': '/mail'});
  config.addPassthroughCopy('_src/assets/css/*.css');
  config.addPassthroughCopy('_src/assets/js/**/*.js');
	if (mode !== 'pro') {
		config.addPassthroughCopy('_src/assets/css/*.map');
		config.addPassthroughCopy('_src/assets/js/**/*.map');
	}

  config.addPlugin(eleventyNavigationPlugin);


  config.addTransform('htmlmin', function (content, outputPath) {
    if (mode === 'pro' && outputPath && outputPath.endsWith('.html')) {
      const minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
        preserveLineBreaks: false
      });

      return minified;
    }

    return content;
  });









  return {
    dir: {
      input: '_src',
      output: 'dist',
      includes: '_templates',
      data: '_data',
    },
    templateFormats: ['njk', 'md'],
    htmltemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
  }
}
