function Camera(glContext, shaderMgr) {
	this.gl = glContext;
	this.shader = shaderMgr;
	
//Listen for keyboard input
	var camClass = this;
	
	document.addEventListener('keydown', function(e) {
		camClass.update(e.keyCode);
	});
}

Camera.inputCodes = {
	MOVE_BACKWARD : 83, // S
	MOVE_FORWARD  : 87, // W
	MOVE_LEFT     : 65, // A
	MOVE_RIGHT    : 68, // D
	
	PITCH_DOWN    : 40, // Down arrow
	PITCH_UP      : 38, // Up arrow
	
	YAW_LEFT      : 37, // Left arrow
	YAW_RIGHT     : 39  // Right arrow
};

Camera.prototype.forward = new Float32Array([0.0, 0.0, 1.0]);
Camera.prototype.moveBF = 0.0;
Camera.prototype.moveLR = 0.0;
Camera.prototype.pitch = 0.0;
Camera.prototype.right = new Float32Array([1.0, 0.0, 0.0]);
Camera.prototype.rotation = new Matrix4();
Camera.prototype.speed = 10.0;
Camera.prototype.yaw = 0.0;

Camera.prototype.xPos = 0.0;
Camera.prototype.zPos = 0.0;

Camera.prototype.placeCamera = function(x, y, z) {
	var u_ProjMatrix = this.shader.getUniform('u_ProjMatrix');
	var u_ViewMatrix = this.shader.getUniform('u_ViewMatrix');
	
//Create the projection matrix (for the frustrum clipping volume)
	var projectionMatrix = new Matrix4();
	projectionMatrix.setPerspective(90, 640 / 480, 0.1, 500);
	
//Create the view matrix (for setting camera position)
	var viewMatrix = new Matrix4();
	viewMatrix.setLookAt(5.0, 5.0, 5.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0);
	
//Give the view matrix to the shader
	this.gl.uniformMatrix4fv(u_ProjMatrix, false, projectionMatrix.elements);
	this.gl.uniformMatrix4fv(u_ViewMatrix, false, viewMatrix.elements);
};

//learningwebgl.com/lessons/lesson10/index.html
Camera.prototype.update = function(keyCode) {
	var speed = 5;
	var u_ProjMatrix = this.shader.getUniform('u_ProjMatrix');
	var u_ViewMatrix = this.shader.getUniform('u_ViewMatrix');
	
//Camera movement input
	if (keyCode == Camera.inputCodes.MOVE_LEFT) this.moveLR = speed;
	if (keyCode == Camera.inputCodes.MOVE_RIGHT) this.moveLR = speed;
	if (keyCode == Camera.inputCodes.MOVE_BACKWARD) this.moveBF = speed;
	if (keyCode == Camera.inputCodes.MOVE_FORWARD) this.moveBF = speed;
	
	if (keyCode == Camera.inputCodes.YAW_LEFT) this.yaw -= speed;
	if (keyCode == Camera.inputCodes.YAW_RIGHT) this.yaw += speed;
	if (keyCode == Camera.inputCodes.PITCH_UP) this.pitch -= speed;
	if (keyCode == Camera.inputCodes.PITCH_DOWN) this.pitch += speed;
	
	this.xPos -= Math.sin(this.yaw * (Math.PI / 180.0)) * this.moveLR;
    this.zPos -= Math.cos(this.yaw * (Math.PI / 180.0)) * this.moveLR;
	
//Create the projection matrix (for the frustrum clipping volume)
	var projectionMatrix = new Matrix4();
	projectionMatrix.setPerspective(90, 640 / 480, 0.1, 500);
	
//Create the view matrix (for setting camera position)
	var viewMatrix = new Matrix4();
	//viewMatrix.setLookAt(10, 10, 10, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0);
	viewMatrix.rotate(this.pitch, 1, 0, 0);
	viewMatrix.rotate(this.yaw, 0, 1, 0);
	viewMatrix.translate(-this.xPos, -15, -this.zPos);
	//viewMatrix.translate(, 0, );
	console.log(this.pitch + " " + this.yaw);
//Give the view matrix to the shader
	this.gl.uniformMatrix4fv(u_ProjMatrix, false, projectionMatrix.elements);
	this.gl.uniformMatrix4fv(u_ViewMatrix, false, viewMatrix.elements);
};