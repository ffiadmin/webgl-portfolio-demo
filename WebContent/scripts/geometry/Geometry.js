function Geometry(glContext, shaderMgr) {
	this.modelMatrix.setIdentity();
	
	if (glContext !== undefined) {
		this.gl = glContext;
		this.shader = shaderMgr;
		
	//Color buffer
		this.colorBuffer = new Buffer(this.gl, this.shader, glContext.ARRAY_BUFFER);
		this.colors = 0;
		this.JSColorBuffer = new Array();
		this.JSColorFloatBuffer = null;
		
	//Vertex buffer
		this.JSVertexBuffer = new Array();
		this.JSVertexFloatBuffer = null;
		this.vertices = 0;
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

Geometry.prototype.commit = function(vertexVariableName, colorVariableName) {
//Convert the generic array into a Float32Array
	var colorList = new Array();
	
	for(var i = 0; i < this.JSColorBuffer.length; ++i) {
		colorList.push(this.JSColorBuffer[i][0]);
		colorList.push(this.JSColorBuffer[i][1]);
		colorList.push(this.JSColorBuffer[i][2]);
		colorList.push(this.JSColorBuffer[i][3]);
	}
	
	this.JSColorFloatBuffer = new Float32Array(colorList);
	this.colors = this.JSColorFloatBuffer.length / 4; //4 data points per color
	
	this.JSVertexFloatBuffer = new Float32Array(this.JSVertexBuffer);
	this.vertices = this.JSVertexFloatBuffer.length / 3; //3 data points per vertex
	
//Add the data to the buffer
	this.colorBuffer.addData(this.JSColorFloatBuffer, colorVariableName, 4, this.gl.FLOAT);    // 4 data points for a color
	this.vertexBuffer.addData(this.JSVertexFloatBuffer, vertexVariableName, 3, this.gl.FLOAT); // 3 vertices for a triangle
};

Geometry.prototype.draw = function() {
//Rotate
	if (this.rotate[0] != 0 || this.rotate[1] != 0 || this.rotate[2] != 0)
		this.modelMatrix.rotate(this.rotateAngle, this.rotate[0], this.rotate[1], this.rotate[2]);
	
//Translate
	if (this.translate[0] != 0 || this.translate[1] != 0 || this.translate[2] != 0)
		this.modelMatrix.translate(this.translate[0], this.translate[1], this.translate[2]);
	
//Scale
	if (this.scale[0] != 0 || this.scale[1] != 0 || this.scale[2] != 0)
		this.modelMatrix.scale(this.scale[0], this.scale[1], this.scale[2]);
	
//Pass the translation matrix to the shader
	var u_ModelMatrix = this.shader.getUniform('u_ModelMatrix');
	this.gl.uniformMatrix4fv(u_ModelMatrix, false, this.modelMatrix.elements);
	
//Draw the geometry
	this.gl.drawArrays(this.gl.TRIANGLES, 0, this.vertices);
	
//Reset the transformation matrix
	this.modelMatrix.setIdentity();
};

Geometry.prototype.end = function() {
	this.gl.flush();
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