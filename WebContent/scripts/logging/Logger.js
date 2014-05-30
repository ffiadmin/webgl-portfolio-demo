function Logger(message, file, level) {
	var prefix = 'WEBGL ENGINE MESSAGE: \n\n';
	
//Keep track of the information which was given
	this.file = file !== undefined ? ('File: ' + file + '\n') : '';
	this.level = level !== undefined ? level : Logger.level.INFO;
	this.message = 'Message: ' + message;
	this.output = prefix + 'Level: ' + this.level + '\n' + this.file + this.message;
	
//Send this information to the console
	if (message !== undefined && window.console && window.console.log)
		console.log(this.output);
}

Logger.prototype = new Error();
Logger.prototype.constructor = Error;

Logger.level = {
	FATAL : 'Fatal', 
	INFO  : 'Information',
	WARN  : 'Warning'
};

Logger.prototype.report = function() {
	alert(this.output);
};