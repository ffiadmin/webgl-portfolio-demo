function Project(canvasID) {
	this.canvas = document.getElementById(canvasID);
	
//Was the canvas retrieved?
	if (!this.canvas) {
		throw new Fatal('The canvas cannot be located', 'Project.js');
	}
	
//Get the WebGL context
	this.gl = this.getWebGLContext();
	this.gl.enable(this.gl.DEPTH_TEST);

//Create the shader program
	this.shader = new ShaderManager(this.gl);
	
//Create a camera
	this.camera = new Camera(this.gl, this.shader);
	this.camera.placeCamera(100, 100, 100);
	
//Draw a cube
	var cube = new Cube(this.gl, this.shader);
	cube.begin();
	cube.applyScale(100, 0.1, 100);
	cube.draw();
	cube.end();
}

// Thank you: https://code.google.com/p/webglsamples/source/browse/book/webgl-utils.js?r=41401f8a69b1f8d32c6863ac8c1953c8e1e8eba0
Project.prototype.getWebGLContext = function() {
//Check for WebGL context creation errors
	if (this.canvas.addEventListener) {
		this.canvas.addEventListener("webglcontextcreationerror", function(event) {
			throw new Fatal('The WebGL context could not be created', 'Program.js');
		}, false);
	}
	
//Attempt to create the WebGL context
	var context = false;
	var contexts = [ 'experimental-webgl', 'moz-webgl', 'webgl', 'webkit-3d' ];
	
	for(var i = 0; i < contexts.length; ++i) {
		try {
			context = this.canvas.getContext(contexts[i]);
		} catch(e) {
			
		}
		
	//Has the context been received, yet?
		if (context) break;
	}
	
//Make sure context capturing succeeded
	if (!context) {
		throw new Fatal('The WebGL context capturing did not succeed', 'Program.js');
	}
	
	return context;
};