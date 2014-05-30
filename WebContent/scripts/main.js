function main() {
	try {
		new Project('webgl');
	} catch(e) {
		if (e.level == Logger.level.FATAL) {
			e.report();
		}
	}
}

//Run the program
window.onload = function() {
	main();
};