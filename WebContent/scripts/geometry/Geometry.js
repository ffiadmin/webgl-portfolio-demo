function Geometry(glContext, shaderMgr) {
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
	console.log(vertexVariableName);
//Add the data to the buffer
	this.colorBuffer.addData(this.JSColorFloatBuffer, colorVariableName, 4, this.gl.FLOAT);    // 4 data points for a color
	this.vertexBuffer.addData(this.JSVertexFloatBuffer, vertexVariableName, 3, this.gl.FLOAT); // 3 vertices for a triangle
};

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

Geometry.prototype.draw = function() {
	this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
	this.gl.clear(this.gl.COLOR_BUFFER_BIT);
	this.gl.drawArrays(this.gl.TRIANGLES, 0, this.vertices);
};