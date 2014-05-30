function Fatal(message, file) {
	Logger.call(this, message, file, Logger.level.FATAL);
}

Fatal.prototype = new Logger();
Fatal.prototype.constructor = Logger;