function ShaderManager(glContext) {
	this.gl = glContext;
	this.initShaders();
}

ShaderManager.prototype.bufferRegistry = new Array();

ShaderManager.prototype.commit = function() {
//Are there any registered buffers?
	if (this.bufferRegistry.length == 0) {
		throw new Fatal('No JavaScript buffer objects have been registered for entry into the WebGL buffer', 'ShaderManager.js');
	}
	
//Just a performance note
	new Info('Performance note: calling ShaderManager.commit() should only be done once, otherwise performance could be impacted', 'ShaderManager.js');
	
//Collapse all similar buffer types together, that is, all buffers writing to the same shader variable are combined
	var exist = false;
	var index = 0;
	var writer = new Array(); // Key, value collection holding <target shader variable, JS buffer object>
	
	for(var i = 0; i < this.bufferRegistry.length; ++i) {
		exist = false;
		index = 0;
		
	//Does this variable already exist?
		for(var j = 0; j < writer.length; ++j) {
			if (writer[j][0] == this.bufferRegistry[i].shaderVariableName) {
				exist = true;
				index = j;
				break;
			}
		}
		
	//If so, merge the new data with the existing
		if (exist) {
			var first = writer[index][1].data.length;
			var second = this.bufferRegistry[i].data.length;
			var temp = writer[index][1].data;
			
			writer[index][1].data = new Float32Array(first + second);
			writer[index][1].data.set(temp);
			writer[index][1].data.set(this.bufferRegistry[i].data, first);
	//Otherwise, add the buffer to the dictionary
		} else {
			writer.push(new Array(this.bufferRegistry[i].shaderVariableName, this.bufferRegistry[i]));
		}
	}
	
//Commit the consolidated data to the buffer
	for(var i = 0; i < writer.length; ++i) {
	//Create the buffer
		var buffer = this.gl.createBuffer();
		
		if (!buffer) {
			throw new Fatal('The requested buffer could not be created', 'ShaderManager.js');
		}
		
	//Bind the buffer object to the target
		this.gl.bindBuffer(writer[i][1].type, buffer);
		
	//Get the shader variable
		var attribute = this.getAttribute(writer[i][1].shaderVariableName);
		
	//Add data to the buffer and assign it to a shader variable
		this.gl.bufferData(writer[i][1].type, writer[i][1].data, this.gl.STATIC_DRAW);
		this.gl.vertexAttribPointer(attribute, writer[i][1].numComponentsPerVertex, writer[i][1].GLSLType, false, 0, 0);
		
	//Enable assignment to the shader variable
		this.gl.enableVertexAttribArray(attribute);
	}
	
console.log(writer);
};

ShaderManager.prototype.createProgram = function() {
//Create the shader objects
	var fragment = this.loadShader(this.gl.FRAGMENT_SHADER, new FragmentShader());
	var vertex = this.loadShader(this.gl.VERTEX_SHADER, new VertexShader());
	
//Create a program object
	var program = this.gl.createProgram();
	
	if (!program) {
		throw new Fatal('The shader program could not be created', 'ShaderManager.js');
	}
	
//Attach the shaders to the program
	this.gl.attachShader(program, fragment);
	this.gl.attachShader(program, vertex);
	
//Link the two shaders together in the program
	this.gl.linkProgram(program);
	
//Make sure the linking succeeded
	var linked = this.gl.getProgramParameter(program, this.gl.LINK_STATUS);
	
	if (!linked) {
		var error = this.gl.getProgramInfoLog(program);
		this.gl.deleteProgram(program);
		this.gl.deleteShader(fragment);
		this.gl.deleteShader(vertex);
		
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
	this.gl.useProgram(program);
	this.gl.program = program;
	
	return true;
};

ShaderManager.prototype.loadShader = function(type, source) {
//Create the shader object
	var shader = this.gl.createShader(type);
	
	if (shader == null) {
		throw new Fatal('The shader could not be loaded', 'ShaderManager.js');
	}
	
//Set the shader source program
	this.gl.shaderSource(shader, source.code);
	
//Compile the shader
	this.gl.compileShader(shader);
	
//Make sure the compilation succeeded
	var compiled = this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS);
	
	if (!compiled) {
		var error = this.gl.getShaderInfoLog(shader);
		this.gl.deleteShader(shader);
		
		throw new Fatal('Cannot compile the shader. Error details: ' + error, 'ShaderManager.js');
	}
	
	return shader;
};

ShaderManager.prototype.getAttribute = function(attributeName) {
	return this.gl.getAttribLocation(this.gl.program, attributeName);
};

ShaderManager.prototype.setAttribute = function(attributeName, value, type) {
//Get the attribute	
	var attribute = this.gl.getAttribLocation(this.gl.program, attributeName);
	
//Did the programmer try to help us out?
	if (type !== undefined) {
		switch(value) {
			case this.type.INT : 
				this.gl.vertexAttrib1i(attribute, value); break;
				
			case this.type.INT1 : 
				this.gl.vertexAttrib1i(attribute, value[0]); break;
				
			case this.type.INT2 : 
				this.gl.vertexAttrib2i(attribute, value[0], value[1]); break;
				
			case this.type.INT3 : 
				this.gl.vertexAttrib3i(attribute, value[0], value[1], value[2]); break;
				
			case this.type.INT4 : 
				this.gl.vertexAttrib4i(attribute, value[0], value[1], value[2], value[3]); break;
				
			case this.type.FLOAT : 
				this.gl.vertexAttrib1f(attribute, value); break;
				
			case this.type.FLOAT1 : 
				this.gl.vertexAttrib1f(attribute, value[0]); break;
				
			case this.type.FLOAT2 : 
				this.gl.vertexAttrib2f(attribute, value[0], value[1]); break;
				
			case this.type.FLOAT3 : 
				this.gl.vertexAttrib3f(attribute, value[0], value[1], value[2]); break;
				
			case this.type.FLOAT4 : 
				this.gl.vertexAttrib4f(attribute, value[0], value[1], value[2], value[3]); break;
				
			default : 
				return false;
		}
		
		return true;
	}
	
/*
 * Value will only accept the following types:
 *  - Integers
 *  - Floats
 *  - Int32Array
 *  - Float32Array
 *  
 *  These types can be routed to the attributes using the 
 *  appropriate WebGL API methods.
*/
	if (Object.prototype.toString.call(value) === '[object Float32Array]') {
		switch(value.length) {
			case 1 : this.gl.vertexAttrib1f(attribute, value[0]); break;
			case 2 : this.gl.vertexAttrib2f(attribute, value[0], value[1]); break;
			case 3 : this.gl.vertexAttrib3f(attribute, value[0], value[1], value[2]); break;
			case 4 : this.gl.vertexAttrib4f(attribute, value[0], value[1], value[2], value[3]); break;
			default : return false;
		}
		
		return true;
	} else if (Object.prototype.toString.call(value) === '[object Int32Array]') {
		switch(value.length) {
			case 1 : this.gl.vertexAttrib1f(attribute, parseFloat(value[0])); break;
			case 2 : this.gl.vertexAttrib2i(attribute, value[0], value[1]); break;
			case 3 : this.gl.vertexAttrib3i(attribute, value[0], value[1], value[2]); break;
			case 4 : this.gl.vertexAttrib4i(attribute, value[0], value[1], value[2], value[3]); break;
			default : return false;
		}
		
		return true;
	} else if (value === +value && value !== (value|0)) { // Float?
		this.gl.vertexAttrib1f(attribute, value);
		return true;
	} else if (value === +value && value === (value|0)) { // Int?
		this.gl.vertexAttrib1f(attribute, parseFloat(value));
		return true;
	}
	
	return false;
};

ShaderManager.prototype.getUniform = function(uniformName) {	
	return this.gl.getUniformLocation(this.gl.program, uniformName);
};

ShaderManager.prototype.registerJSBuffer = function(buffer) {
	this.bufferRegistry.push(buffer);
};

ShaderManager.prototype.type = {
	FLOAT  : 'f',
	FLOAT1 : '1f',
	FLOAT2 : '2f',
	FLOAT3 : '3f',
	FLOAT4 : '4f',
	
	INT    : 'i',
	INT1   : '1i',
	INT2   : '2i',
	INT3   : '3i',
	INT4   : '4i'
};