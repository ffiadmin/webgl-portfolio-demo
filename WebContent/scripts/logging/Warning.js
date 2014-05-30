function Warning(message, file) {
	Logger.call(this, message, file, Logger.level.WARN);
}

Warning.prototype = new Logger();
Warning.prototype.constructor = Logger;