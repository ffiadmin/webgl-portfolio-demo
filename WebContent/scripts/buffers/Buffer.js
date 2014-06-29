function Buffer(glContext, shaderMgr, bufferType) {
	this.gl = glContext;
	this.shader = shaderMgr;
	this.type = bufferType;
}

Buffer.prototype.addData = function(data, shaderVariableName, numComponentsPerVertex, GLSLType) {
	this.data = data;
	this.GLSLType = GLSLType;
	this.numComponentsPerVertex = numComponentsPerVertex;
	this.shaderVariableName = shaderVariableName;
	
	this.shader.registerJSBuffer(this);
};