function Project(canvasID) {
	this.canvas = document.getElementById(canvasID);
	
//Was the canvas retrieved?
	if (!this.canvas) {
		throw new Fatal('The canvas cannot be located', 'Project.js');
	}
	
//Get the WebGL context
	this.gl = this.getWebGLContext();

//Create the shader program
	this.shader = new ShaderManager(this.gl);
	this.shader.setAttribute('a_Size', 10);
	
	this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
	this.gl.clear(this.gl.COLOR_BUFFER_BIT);
	
	this.gl.drawArrays(this.gl.POINTS, 0, 1);
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