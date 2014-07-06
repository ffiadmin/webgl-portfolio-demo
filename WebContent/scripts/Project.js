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
	this.camera.placeCamera(30, 30, 30);
	
//Draw stuff
	var cylinder = new Surfrev(this.gl, this.shader);
	cylinder.addPolyline([
	    [ 0, 0, 0 ],
	    [ 1, 0, 0 ],
	    [ 5, 2, 0 ],
	    [ 1, 4, 0 ],
	    [ 0, 4, 0 ]
	], 3);
	
	var cube = new Cube(this.gl, this.shader);
	
	this.shader.commit();
	
	setInterval(function() {
		cube.begin();
		
	//Floor
		//cube.applyScale(450, 0.1, 450);
		//cube.draw();
		
	//Ceiling
		//cube.applyScale(450, 0.1, 450);
		//cube.applyTranslate(0, 30, 0);
		//cube.draw();
		/*
	//Cove 1
		cube.applyRotate(90, 0, 1, 0);
		cube.applyScale(150, 30, 1);
		cube.applyTranslate(225, 15, 0);
		//cube.draw();
		
		cube.applyScale(150, 30, 1);
		cube.applyTranslate(150, 15, 75);
		//cube.draw();
		
		cube.applyScale(150, 30, 1);
		cube.applyTranslate(150, 15, -75);
		//cube.draw();
		
	//Cove 2
		cube.applyRotate(90, 0, 1, 0);
		cube.applyScale(150, 30, 1);
		cube.applyTranslate(-225, 15, 0);
		//cube.draw();
		
		cube.applyScale(150, 30, 1);
		cube.applyTranslate(-150, 15, 75);
		//cube.draw();
		
		cube.applyScale(150, 30, 1);
		cube.applyTranslate(-150, 15, -75);
		//cube.draw();
		
	//Cove 3
		cube.applyScale(150, 30, 1);
		cube.applyTranslate(0, 15, 225);
		//cube.draw();
		
		cube.applyRotate(90, 0, 1, 0);
		cube.applyScale(150, 30, 1);
		cube.applyTranslate(75, 15, 150);
		//cube.draw();
		
		cube.applyRotate(90, 0, 1, 0);
		cube.applyScale(150, 30, 1);
		cube.applyTranslate(-75, 15, 150);
		//cube.draw();
		
	//Cove 4
		cube.applyScale(150, 30, 1);
		cube.applyTranslate(0, 15, -225);
		//cube.draw();
		
		cube.applyRotate(90, 0, 1, 0);
		cube.applyScale(150, 30, 1);
		cube.applyTranslate(75, 15, -150);
		cube.draw();
		*/
		cube.applyRotate(90, 0, 1, 0);
		cube.applyScale(150, 30, 1);
		cube.applyTranslate(-75, 15, -150);
		cube.draw();
		
	//Draw a cylinder
		//cylinder.applyRotate(rotate, 1, 0, 0);
		cylinder.applyScale(2, 2, 2);
		cylinder.draw();
		
		cube.end();
	}, 10);	
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