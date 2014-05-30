function ShaderManager(glContext) {
	gl = glContext;
	this.initShaders();
}

ShaderManager.prototype.createProgram = function() {
//Create the shader objects
	var fragment = this.loadShader(gl.FRAGMENT_SHADER, new FragmentShader());
	var vertex = this.loadShader(gl.VERTEX_SHADER, new VertexShader());
	
//Create a program object
	var program = gl.createProgram();
	
	if (!program) {
		throw new Fatal('The shader program could not be created', 'ShaderManager.js');
	}
	
//Attach the shaders to the program
	gl.attachShader(program, fragment);
	gl.attachShader(program, vertex);
	
//Link the two shaders together in the program
	gl.linkProgram(program);
	
//Make sure the linking succeeded
	var linked = gl.getProgramParameter(program, gl.LINK_STATUS);
	
	if (!linked) {
		var error = gl.getProgramInfoLog(program);
		gl.deleteProgram(program);
		gl.deleteShader(fragment);
		gl.deleteShader(vertex);
		
		throw new Fatal('The shader program cannot be linked. Error details: ' + error, 'ShaderManager.js');
	}
	
	return program;
};

ShaderManager.prototype.initShaders = function() {
//Create the shader program
	var program = this.createProgram();
	
	if (!program) {
		throw new Fatal('The shader program could not be created', 'ShaderManager.js');
	}
	
//Start to use the program
	gl.useProgram(program);
	gl.program = program;
	
	return true;
};

ShaderManager.prototype.loadShader = function(type, source) {
//Create the shader object
	var shader = gl.createShader(type);
	
	if (shader == null) {
		throw new Fatal('The shader could not be loaded', 'ShaderManager.js');
	}
	
//Set the shader source program
	gl.shaderSource(shader, source.code);
	
//Compile the shader
	gl.compileShader(shader);
	
//Make sure the compilation succeeded
	var compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
	
	if (!compiled) {
		var error = gl.getShaderInfoLog(shader);
		gl.deleteShader(shader);
		
		throw new Fatal('Cannot compile the shader. Error details: ' + error, 'ShaderManager.js');
	}
	
	return shader;
};