function Info(message, file) {
	Logger.call(this, message, file, Logger.level.INFO);
}

Info.prototype = new Logger();
Info.prototype.constructor = Logger;