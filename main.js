var through = require('through2');
var PluginError = require('gulp-util').PluginError;
var path = require('path');

function ChromeToFirefoxTranslatorPlugin(file, encoding, done) {
    if (file.isNull() || file.isDirectory()) {
        this.push(file);
        return done();
    }

    if (file.path.indexOf('.json') === -1) {
        this.emit('error', new PluginError({
            plugin: 'ChromeToFirefoxTranslator',
            message: 'Input has to be a chrome locale json file.'
        }));
        return done();
    }

    if (file.isBuffer()) {
        var jsonInput = JSON.parse(file.contents);

        var output = "";

        for (var key in jsonInput) {
            var value = jsonInput[key];
        
            output += key + "=" + value.message + "\n";
        }

        file.contents = new Buffer(output);

        var parts = path.dirname(file.path).split('\\');
        
		file.path = file.path.replace(path.extname(file.path), '.properties');

        file.path = file.path.replace(path.basename(file.path, '.properties'), parts[parts.length - 1]);

        this.push(file);
    }
    return done();
};

function gulpPlugin(){
    return through.obj(ChromeToFirefoxTranslatorPlugin);
}

module.exports = gulpPlugin;