function Geometry(glContext, shaderMgr) {
	this.modelMatrix.setIdentity();
	
//Color buffer
	this.colors = 0;
	this.JSColorBuffer = new Array();
	this.JSColorFloatBuffer = null;
	
//Normal buffer
	this.JSNormalBuffer = new Array();
	this.JSNormalFloatBuffer = null;
	this.normals = 0;
	
//Vertex buffer
	this.JSVertexBuffer = new Array();
	this.JSVertexFloatBuffer = null;
	this.vertices = 0;
		
	if (glContext !== undefined) {
		this.gl = glContext;
		this.shader = shaderMgr;
		
		this.colorBuffer = new Buffer(this.gl, this.shader, glContext.ARRAY_BUFFER);
		this.normalBuffer = new Buffer(this.gl, this.shader, glContext.ARRAY_BUFFER);
		this.vertexBuffer = new Buffer(this.gl, this.shader, glContext.ARRAY_BUFFER);
	}
}

Geometry.prototype.addVertex = function(x, y, z, color) {
	this.JSColorBuffer.push(color);
	this.JSVertexBuffer.push(x);
	this.JSVertexBuffer.push(y);
	this.JSVertexBuffer.push(z);
};

Geometry.prototype.applyRotate = function(angle, x, y, z) {
	this.rotateAngle = angle;
	this.rotate[0] = x;
	this.rotate[1] = y;
	this.rotate[2] = z;
};

Geometry.prototype.applyScale = function(x, y, z) {
	this.scale[0] = x;
	this.scale[1] = y;
	this.scale[2] = z;
};

Geometry.prototype.applyTranslate = function(x, y, z) {
	this.translate[0] = x;
	this.translate[1] = y;
	this.translate[2] = z;
};

Geometry.prototype.begin = function() {
	this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
	this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
};

Geometry.prototype.commit = function(vertexVariableName, colorVariableName, normalVariableName) {
//Calculate the vertex normals
	var length = this.JSVertexBuffer.length;
	var one, two, three;
	var oneNorm, twoNorm, threeNorm;
	
	if (length % 9 != 0) {
		throw new Fatal("The vertex buffer does has not been properly filled with groups of three vertices to form triangles", "Geometry.js");
	}
	
	for(var i = 0; i < length; i += 9) {
	//Gather the vertices
		one   = [ this.JSVertexBuffer[i + 0], this.JSVertexBuffer[i + 1], this.JSVertexBuffer[i + 2] ];
		two   = [ this.JSVertexBuffer[i + 3], this.JSVertexBuffer[i + 4], this.JSVertexBuffer[i + 5] ];
		three = [ this.JSVertexBuffer[i + 6], this.JSVertexBuffer[i + 7], this.JSVertexBuffer[i + 8] ];
		
	//Calculate the normals
		oneNorm   = this.normalize(this.cross(this.subtract(two, one), this.subtract(three, one)));
		twoNorm   = this.normalize(this.cross(this.subtract(three, two), this.subtract(one, two)));
		threeNorm = this.normalize(this.cross(this.subtract(one, three), this.subtract(two, three)));
		
	//Save these values
		this.JSNormalBuffer.push(oneNorm[0]);
		this.JSNormalBuffer.push(oneNorm[1]);
		this.JSNormalBuffer.push(oneNorm[2]);
		
		this.JSNormalBuffer.push(twoNorm[0]);
		this.JSNormalBuffer.push(twoNorm[1]);
		this.JSNormalBuffer.push(twoNorm[2]);
		
		this.JSNormalBuffer.push(threeNorm[0]);
		this.JSNormalBuffer.push(threeNorm[1]);
		this.JSNormalBuffer.push(threeNorm[2]);
	}
	
//Convert the generic arrays into a Float32Arrays
	var colorList = new Array();
	
	for(var i = 0; i < this.JSColorBuffer.length; ++i) {
		colorList.push(this.JSColorBuffer[i][0]);
		colorList.push(this.JSColorBuffer[i][1]);
		colorList.push(this.JSColorBuffer[i][2]);
		colorList.push(this.JSColorBuffer[i][3]);
	}
	
	this.JSColorFloatBuffer = new Float32Array(colorList);
	this.colors = this.JSColorFloatBuffer.length / 4; //4 data points per color
	
	this.JSNormalFloatBuffer = new Float32Array(this.JSNormalBuffer);
	this.normals = this.JSNormalFloatBuffer.length / 3; //3 data points per vertex
	
	this.JSVertexFloatBuffer = new Float32Array(this.JSVertexBuffer);
	this.vertices = this.JSVertexFloatBuffer.length / 3; //3 data points per vertex
	
//Add the data to the buffer
	this.colorBuffer.addData(this.JSColorFloatBuffer, colorVariableName, 4, this.gl.FLOAT);    // 4 components for a color (r, g, b, a)
	//this.normalBuffer.addData(this.JSNormalFloatBuffer, normalVariableName, 3, this.gl.FLOAT); // 3 components per vertex (x, y, z)
	this.vertexBuffer.addData(this.JSVertexFloatBuffer, vertexVariableName, 3, this.gl.FLOAT); // 3 components per vertex (x, y, z)
};

Geometry.prototype.cross = function(first, second) {
//Only crossing vectors with three components
	if (first.length != second.length || first.length != 3 || second.length != 3) {
		throw new Fatal("This method will only cross vectors of length 3", "Geometry.js");
	}
	
	return [ first[1] * second[2] - first[2] * second[1],
	         first[2] * second[0] - first[0] * second[2],
	         first[0] * second[1] - first[1] * second[0] ];
};

Geometry.prototype.draw = function() {
//Translate
	if (this.translate[0] != 0 || this.translate[1] != 0 || this.translate[2] != 0)
		this.modelMatrix.translate(this.translate[0], this.translate[1], this.translate[2]);
	
//Rotate
	if (this.rotate[0] != 0 || this.rotate[1] != 0 || this.rotate[2] != 0)
		this.modelMatrix.rotate(this.rotateAngle, this.rotate[0], this.rotate[1], this.rotate[2]);
	
//Scale
	if (this.scale[0] != 0 || this.scale[1] != 0 || this.scale[2] != 0)
		this.modelMatrix.scale(this.scale[0], this.scale[1], this.scale[2]);
	
//Pass the translation matrix to the shader
	var u_ModelMatrix = this.shader.getUniform('u_ModelMatrix');
	this.gl.uniformMatrix4fv(u_ModelMatrix, false, this.modelMatrix.elements);
	
//Draw the geometry
	this.gl.drawArrays(this.gl.TRIANGLES, 0, this.vertices);
	
//Reset the geometry for the next draw
	this.reset();
};

Geometry.prototype.end = function() {
	this.gl.flush();
};

Geometry.prototype.magnitude = function(vector) {
//The vector must be made of three components
	if (vector.length != 3) {
		throw new Fatal("The vector must include three components before its magnitude will be found", "Geometry.js");
	}
	
	return Math.sqrt(Math.pow(vector[0], 2) + Math.pow(vector[1], 2) + Math.pow(vector[2], 2));
};

Geometry.prototype.normalize = function(vector) {
//The vector must be made of three components
	if (vector.length != 3) {
		throw new Fatal("The vector must include three components before its unit vector will be found", "Geometry.js");
	}
	
//Get the unit vector
	var magnitude = this.magnitude(vector);
	return [ vector[0] / magnitude, vector[1] / magnitude, vector[2] / magnitude ];
};

Geometry.prototype.reset = function() {
//Reset the transformation matrix
	this.modelMatrix.setIdentity();
	
//Reset all of the local transformation data
	this.rotateAngle = 0;
	this.rotate = new Float32Array([0, 0, 0]);
	this.scale = new Float32Array([1, 1, 1]);
	this.translate = new Float32Array([0, 0, 0]);
};

Geometry.prototype.subtract = function(first, second) {
	var out = new Array();
	
//Ensure the sizes are the same
	if (first.length != second.length) {
		throw new Fatal("Subtraction of two vectors with varying sizes is not allowed", "Geometry.js");
	}
	
//Perform the subtraction
	for(var i = 0; i < first.length; ++i) {
		out.push(first[i] - second[i]);
	}
	
	return out;
};

Geometry.prototype.modelMatrix = new Matrix4();
Geometry.prototype.rotateAngle = 0;
Geometry.prototype.rotate = new Float32Array([0, 0, 0]);
Geometry.prototype.scale = new Float32Array([1, 1, 1]);
Geometry.prototype.translate = new Float32Array([0, 0, 0]);

Geometry.colors = {
	BLACK   : [0.0, 0.0, 0.0, 1.0],
	BLUE    : [0.0, 1.0, 0.0, 1.0],
	CYAN    : [0.0, 1.0, 1.0, 1.0],
	GREEN   : [0.0, 0.0, 1.0, 1.0],
	MAGENTA : [1.0, 0.0, 1.0, 1.0],
	RED     : [1.0, 0.0, 0.0, 1.0],
	WHITE   : [1.0, 1.0, 1.0, 1.0],
	YELLOW  : [1.0, 1.0, 0.0, 1.0]
};