function Camera(glContext, shaderMgr) {
	this.gl = glContext;
	this.shader = shaderMgr;
}

Camera.prototype.placeCamera = function(x, y, z) {
	var u_ModelMatrix = this.shader.getUniform('u_ModelMatrix');
	var u_ProjMatrix = this.shader.getUniform('u_ProjMatrix');
	var u_ViewMatrix = this.shader.getUniform('u_ViewMatrix');
	
//Create the model matrix (For rotating stuff)
	var modelMatrix = new Matrix4();
	modelMatrix.setRotate(0, 1, 1, 1);
	
//Create the projection matrix (for the frustrum clipping volume)
	var projectionMatrix = new Matrix4();
	projectionMatrix.setPerspective(90, 640 / 480, 0.1, 100);
	
//Create the view matrix (for setting camera position)
	var viewMatrix = new Matrix4();
	viewMatrix.setLookAt(3, 3, 3, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0);
	
//Give the view matrix to the shader
	this.gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);
	this.gl.uniformMatrix4fv(u_ProjMatrix, false, projectionMatrix.elements);
	this.gl.uniformMatrix4fv(u_ViewMatrix, false, viewMatrix.elements);
};