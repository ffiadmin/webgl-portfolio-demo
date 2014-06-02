function Camera(glContext, shaderMgr) {
	this.gl = glContext;
	this.shader = shaderMgr;
}

Camera.prototype.placeCamera = function(x, y, z) {
	var u_ViewMatrix = this.shader.getUniform('u_ViewMatrix');
	
//Create the view matrix
	var viewMatrix = new Matrix4();
	viewMatrix.setLookAt(x, y, z, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0);
	
//Give the view matrix to the shader
	this.gl.uniformMatrix4fv(u_ViewMatrix, false, viewMatrix.elements);
};