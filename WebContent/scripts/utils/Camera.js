function Camera(glContext, shaderMgr) {
	this.gl = glContext;
	this.shader = shaderMgr;
}

Camera.prototype.placeCamera = function(x, y, z) {
	var u_ProjMatrix = this.shader.getUniform('u_ProjMatrix');
	var u_ViewMatrix = this.shader.getUniform('u_ViewMatrix');
	
//Create the projection matrix (for the frustrum clipping volume)
	var projectionMatrix = new Matrix4();
	projectionMatrix.setPerspective(90, 640 / 480, 0.1, 500);
	
//Create the view matrix (for setting camera position)
	var viewMatrix = new Matrix4();
	viewMatrix.setLookAt(x, y, z, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0);
	
//Give the view matrix to the shader
	this.gl.uniformMatrix4fv(u_ProjMatrix, false, projectionMatrix.elements);
	this.gl.uniformMatrix4fv(u_ViewMatrix, false, viewMatrix.elements);
	console.log(viewMatrix.elements);
};