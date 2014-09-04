function Buffer(glContext, shaderMgr, bufferType) {
	this.gl = glContext;
	this.shader = shaderMgr;
	this.type = bufferType;
}

Buffer.prototype.addData = function(data, shaderVariableName, numComponentsPerVertex, GLSLType) {
//Create the buffer
	this.buffer = this.gl.createBuffer();

	if (!this.buffer) {
		throw new Fatal('The requested buffer could not be created', 'Buffer.js');
	}

//Bind the buffer object to the target
	this.gl.bindBuffer(this.type, this.buffer);

//Get the shader variable
	var attribute = this.shader.getAttribute(shaderVariableName);

//Add data to the buffer and assign it to a shader variable
	this.gl.bufferData(this.type, data, this.gl.STATIC_DRAW);
	this.gl.vertexAttribPointer(attribute, numComponentsPerVertex, GLSLType, false, 0, 0);

//Enable assignment to the shader variable
	this.gl.enableVertexAttribArray(attribute);
};